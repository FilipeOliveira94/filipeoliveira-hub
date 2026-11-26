// Fails when an image file is tracked, or added by a commit of a range, outside
// the places D-027 allows (I-04). Photos never enter this repository (D-021):
// they live in the private filipeoliveira-hub-assets repository.
// Usage: node scripts/check-no-photos.mjs [--range <base>..<head>]
// Without --range only the tracked files (the git index) are checked. With it,
// every file each commit of the range adds or changes is checked too, so an
// image removed by a later commit still fails: it would stay in the history.
// An image is found by its extension or by its first bytes, so a renamed photo
// is caught. Only git objects are read; ignored files such as .assets/ are not.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// D-027: diagrams, project images and brand files, in these directories only.
const ALLOWED_DIRS = ['src/assets/brand/', 'src/assets/diagrams/', 'src/assets/projects/'];

// D-027: the favicon files at the root of public/, named as in the assets
// repository's brand/favicon/ directory.
const ALLOWED_PUBLIC_FILES = new Set(
  [
    'apple-touch-icon-rounded.png',
    'apple-touch-icon.png',
    'favicon-16.png',
    'favicon-32.png',
    'favicon.ico',
    'favicon.svg',
    'icon-192-rounded.png',
    'icon-192.png',
    'icon-512-light-rounded.png',
    'icon-512-light.png',
    'icon-512-rounded.png',
    'icon-512.png',
  ].map((name) => `public/${name}`),
);

const IMAGE_EXTENSIONS = new Set(
  (
    'jpg jpeg jpe jfif pjpeg png apng gif webp avif heic heif tif tiff bmp ico cur svg svgz ' +
    'jxl jp2 j2k psd xcf dng cr2 cr3 crw nef nrw arw orf rw2 raf raw srw pef'
  ).split(' '),
);

// Brands of the ISO base media "ftyp" box used by still images.
const FTYP_BRANDS = {
  avif: 'avif',
  avis: 'avif',
  heic: 'heif',
  heix: 'heif',
  heim: 'heif',
  heis: 'heif',
  hevc: 'heif',
  hevx: 'heif',
  mif1: 'heif',
  msf1: 'heif',
  'crx ': 'cr3',
};

const EMPTY_TREE_RANGE = /^0+\.\./;

export function isAllowedPath(file) {
  return ALLOWED_DIRS.some((dir) => file.startsWith(dir)) || ALLOWED_PUBLIC_FILES.has(file);
}

export function hasImageExtension(file) {
  const dot = file.lastIndexOf('.');
  return dot > file.lastIndexOf('/') && IMAGE_EXTENSIONS.has(file.slice(dot + 1).toLowerCase());
}

const starts = (buf, bytes, at = 0) => bytes.every((b, i) => buf[at + i] === b);
const ascii = (buf, from, to) => buf.subarray(from, to).toString('latin1');

/** Returns the image format the content starts with, or null. */
export function sniffImage(buf) {
  if (buf.length < 4) return null;
  if (starts(buf, [0xff, 0xd8, 0xff])) return 'jpeg';
  if (starts(buf, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'png';
  if (ascii(buf, 0, 6) === 'GIF87a' || ascii(buf, 0, 6) === 'GIF89a') return 'gif';
  if (ascii(buf, 0, 4) === 'RIFF' && ascii(buf, 8, 12) === 'WEBP') return 'webp';
  if (ascii(buf, 4, 8) === 'ftyp' && FTYP_BRANDS[ascii(buf, 8, 12)]) return FTYP_BRANDS[ascii(buf, 8, 12)];
  // TIFF also covers most camera RAW formats (DNG, NEF, CR2, ARW).
  if (starts(buf, [0x49, 0x49, 0x2a, 0x00]) || starts(buf, [0x4d, 0x4d, 0x00, 0x2a])) return 'tiff';
  if (starts(buf, [0xff, 0x0a]) || starts(buf, [0, 0, 0, 0x0c, 0x4a, 0x58, 0x4c, 0x20])) return 'jxl';
  if (starts(buf, [0, 0, 0, 0x0c, 0x6a, 0x50, 0x20, 0x20])) return 'jp2';
  if (ascii(buf, 0, 4) === '8BPS') return 'psd';
  // "BM" alone is too common in text; a bitmap also stores its own size.
  if (ascii(buf, 0, 2) === 'BM' && buf.length >= 6 && buf.readUInt32LE(2) === buf.length) return 'bmp';
  return null;
}

function git(cwd, args, encoding = 'utf8') {
  return execFileSync('git', args, { cwd, encoding, maxBuffer: 1 << 30 });
}

/** Lists [mode, blob, path] for the index, or for what each commit of the range adds or changes. */
function trackedEntries(cwd) {
  const out = [];
  for (const line of git(cwd, ['ls-files', '-s', '-z']).split('\0')) {
    if (!line) continue;
    const tab = line.indexOf('\t');
    const [mode, blob] = line.slice(0, tab).split(' ');
    out.push({ mode, blob, path: line.slice(tab + 1) });
  }
  return out;
}

function commitEntries(cwd, commit) {
  // --no-renames reports a rename as a deletion plus an addition, so the new
  // path is checked; first-parent also covers what a merge commit brings in.
  const raw = git(cwd, [
    'diff-tree', '-r', '-z', '--root', '--no-commit-id', '--no-renames',
    '--diff-filter=AMT', '--diff-merges=first-parent', commit,
  ]).split('\0');
  const out = [];
  for (let i = 0; i + 1 < raw.length; i += 2) {
    if (!raw[i].startsWith(':')) break;
    const [, mode, , blob] = raw[i].slice(1).split(' ');
    out.push({ mode, blob, path: raw[i + 1] });
  }
  return out;
}

/**
 * Returns the image files found outside the allowed places, as
 * { path, where, why }: where is "tracked" or the commit that added the file.
 */
export async function findImages({ cwd = process.cwd(), range } = {}) {
  const sniffed = new Map();
  const imageWhy = ({ mode, blob, path }) => {
    if (mode === '160000' || isAllowedPath(path)) return null;
    if (hasImageExtension(path)) return 'image extension';
    if (!sniffed.has(blob)) sniffed.set(blob, sniffImage(git(cwd, ['cat-file', 'blob', blob], 'buffer')));
    return sniffed.get(blob) && `${sniffed.get(blob)} content`;
  };

  const found = [];
  for (const entry of trackedEntries(cwd)) {
    const why = imageWhy(entry);
    if (why) found.push({ path: entry.path, where: 'tracked', why });
  }
  if (range && !EMPTY_TREE_RANGE.test(range)) {
    for (const commit of git(cwd, ['rev-list', range]).split('\n').filter(Boolean)) {
      for (const entry of commitEntries(cwd, commit)) {
        const why = imageWhy(entry);
        if (why) found.push({ path: entry.path, where: commit.slice(0, 12), why });
      }
    }
  }
  return found;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--range');
  const range = i > -1 ? process.argv[i + 1] : undefined;
  if (i > -1 && !range) {
    console.error('Usage: node scripts/check-no-photos.mjs [--range <base>..<head>]');
    process.exit(2);
  }
  const found = await findImages({ range });
  if (found.length) {
    console.error('Image files outside the allowed places (D-021, D-027):');
    for (const f of found) {
      console.error(`  ${f.where === 'tracked' ? 'tracked' : `added in ${f.where}`}: ${f.path} (${f.why})`);
    }
    console.error(
      'Photos go to the private filipeoliveira-hub-assets repository. Diagrams, project images and brand files go in ' +
        `${ALLOWED_DIRS.join(', ')} or the favicon files of public/. An image added by a commit stays in the ` +
        'history even after it is deleted: remove that commit from the branch before the merge.',
    );
    process.exit(1);
  }
  console.log(`Image check passed (${range ? `tracked files and commits ${range}` : 'tracked files'}).`);
}

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { findImages, isAllowedPath, sniffImage } from './check-no-photos.mjs';

// Image bytes are generated here; no binary fixture is committed (D-021).
const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0x0d]);
const HEIC = Buffer.concat([Buffer.from([0, 0, 0, 0x18]), Buffer.from('ftypheic\0\0\0\0mif1heic')]);
const AVIF = Buffer.concat([Buffer.from([0, 0, 0, 0x1c]), Buffer.from('ftypavif\0\0\0\0avifmif1miaf')]);
const WEBP = Buffer.concat([Buffer.from('RIFF'), Buffer.from([0x24, 0, 0, 0]), Buffer.from('WEBPVP8 ')]);
const TIFF = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0, 0, 0]);
const SVG = '<svg xmlns="http://www.w3.org/2000/svg"/>';

function git(cwd, ...args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

async function repo() {
  const dir = await mkdtemp(path.join(tmpdir(), 'check-no-photos-'));
  git(dir, 'init', '-q', '-b', 'main');
  git(dir, 'config', 'user.email', 'test@example.com');
  git(dir, 'config', 'user.name', 'test');
  git(dir, 'config', 'commit.gpgsign', 'false');
  await put(dir, { 'README.md': '# test\n' });
  commit(dir, 'base');
  return dir;
}

async function put(dir, files) {
  for (const [name, body] of Object.entries(files)) {
    const file = path.join(dir, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, body);
  }
}

function commit(dir, message) {
  git(dir, 'add', '-A');
  git(dir, 'commit', '-q', '--allow-empty', '-m', message);
  return git(dir, 'rev-parse', 'HEAD');
}

const paths = (found) => found.map((f) => `${f.where} ${f.path}`).sort();

test('sniffImage recognises photo formats by their first bytes', () => {
  assert.equal(sniffImage(JPEG), 'jpeg');
  assert.equal(sniffImage(PNG), 'png');
  assert.equal(sniffImage(HEIC), 'heif');
  assert.equal(sniffImage(AVIF), 'avif');
  assert.equal(sniffImage(WEBP), 'webp');
  assert.equal(sniffImage(TIFF), 'tiff');
  assert.equal(sniffImage(Buffer.from('BM is not a bitmap here\n')), null);
  assert.equal(sniffImage(Buffer.from('# heading\n')), null);
  assert.equal(sniffImage(Buffer.alloc(0)), null);
});

test('only the D-027 directories and the favicon files of public/ are allowed', () => {
  for (const p of [
    'src/assets/brand/logo.svg',
    'src/assets/diagrams/architecture-light.svg',
    'src/assets/projects/pedsletter/cover.webp',
    'public/favicon.ico',
    'public/favicon.svg',
    'public/apple-touch-icon.png',
    'public/icon-512-light-rounded.png',
  ]) {
    assert.ok(isAllowedPath(p), p);
  }
  for (const p of [
    'portrait.jpg',
    'public/portrait.jpg',
    'public/icons/favicon.ico',
    'src/assets/generated/portrait.webp',
    'src/assets/brandx/logo.svg',
    'docs/screenshot.png',
  ]) {
    assert.ok(!isAllowedPath(p), p);
  }
});

test('a clean repository with allowed images passes', async () => {
  const dir = await repo();
  await put(dir, {
    'src/assets/brand/logo.svg': SVG,
    'src/assets/projects/cover.png': PNG,
    'public/favicon.ico': Buffer.from([0, 0, 1, 0, 1, 0]),
    'src/pages/index.astro': '<svg viewBox="0 0 1 1"></svg>',
  });
  commit(dir, 'allowed images');
  assert.deepEqual(await findImages({ cwd: dir, range: 'HEAD~1..HEAD' }), []);
  await rm(dir, { recursive: true });
});

test('a tracked image outside the allowed directories fails', async () => {
  const dir = await repo();
  await put(dir, { 'docs/photo.jpg': JPEG, 'public/portrait.svg': SVG });
  commit(dir, 'photo');
  assert.deepEqual(paths(await findImages({ cwd: dir })), ['tracked docs/photo.jpg', 'tracked public/portrait.svg']);
  await rm(dir, { recursive: true });
});

test('an image with a non-image extension is caught by its bytes', async () => {
  const dir = await repo();
  await put(dir, { 'notes.txt': JPEG, 'data/raw': HEIC, 'src/x.md': PNG });
  commit(dir, 'disguised');
  assert.deepEqual(paths(await findImages({ cwd: dir })), ['tracked data/raw', 'tracked notes.txt', 'tracked src/x.md']);
  await rm(dir, { recursive: true });
});

test('a staged image is caught before it is committed', async () => {
  const dir = await repo();
  await put(dir, { 'photo.png': PNG });
  git(dir, 'add', 'photo.png');
  assert.deepEqual(paths(await findImages({ cwd: dir })), ['tracked photo.png']);
  await rm(dir, { recursive: true });
});

test('an ignored or untracked image passes', async () => {
  const dir = await repo();
  await put(dir, { '.gitignore': '.assets/\n' });
  commit(dir, 'ignore');
  await put(dir, { '.assets/photos/portrait.jpg': JPEG, 'loose.jpg': JPEG });
  assert.deepEqual(await findImages({ cwd: dir }), []);
  await rm(dir, { recursive: true });
});

test('an image added and then deleted inside the range still fails', async () => {
  const dir = await repo();
  const base = git(dir, 'rev-parse', 'HEAD');
  await put(dir, { 'photo.jpg': JPEG });
  const added = commit(dir, 'add photo');
  git(dir, 'rm', '-q', 'photo.jpg');
  commit(dir, 'remove photo');
  const found = await findImages({ cwd: dir, range: `${base}..HEAD` });
  assert.deepEqual(paths(found), [`${added.slice(0, 12)} photo.jpg`]);
  // Without the range only the current tree is checked, and it is clean.
  assert.deepEqual(await findImages({ cwd: dir }), []);
  await rm(dir, { recursive: true });
});

test('an image moved out of an allowed directory fails', async () => {
  const dir = await repo();
  await put(dir, { 'src/assets/projects/shot.png': PNG });
  commit(dir, 'allowed');
  const base = git(dir, 'rev-parse', 'HEAD');
  await mkdir(path.join(dir, 'docs'));
  git(dir, 'mv', 'src/assets/projects/shot.png', 'docs/shot.png');
  const moved = commit(dir, 'move');
  assert.deepEqual(paths(await findImages({ cwd: dir, range: `${base}..HEAD` })), [
    `${moved.slice(0, 12)} docs/shot.png`,
    'tracked docs/shot.png',
  ]);
  await rm(dir, { recursive: true });
});

test('a text file overwritten with image bytes fails', async () => {
  const dir = await repo();
  await put(dir, { 'notes.txt': 'hello\n' });
  commit(dir, 'text');
  const base = git(dir, 'rev-parse', 'HEAD');
  await put(dir, { 'notes.txt': WEBP });
  const changed = commit(dir, 'overwrite');
  await put(dir, { 'notes.txt': 'hello again\n' });
  commit(dir, 'restore');
  assert.deepEqual(paths(await findImages({ cwd: dir, range: `${base}..HEAD` })), [
    `${changed.slice(0, 12)} notes.txt`,
  ]);
  await rm(dir, { recursive: true });
});

test('an image brought in by a merge commit of the range fails', async () => {
  const dir = await repo();
  const base = git(dir, 'rev-parse', 'HEAD');
  git(dir, 'checkout', '-q', '-b', 'side');
  await put(dir, { 'side/photo.tif': TIFF });
  commit(dir, 'side photo');
  git(dir, 'checkout', '-q', 'main');
  git(dir, 'checkout', '-q', '-b', 'feature');
  await put(dir, { 'a.txt': 'a\n' });
  commit(dir, 'feature');
  git(dir, 'merge', '-q', '--no-edit', 'side');
  const found = paths(await findImages({ cwd: dir, range: `${base}..HEAD` }));
  assert.ok(found.includes('tracked side/photo.tif'));
  assert.ok(found.some((f) => f.endsWith(' side/photo.tif') && !f.startsWith('tracked')));
  await rm(dir, { recursive: true });
});

test('a range whose start is all zeros checks only the tracked files', async () => {
  const dir = await repo();
  assert.deepEqual(await findImages({ cwd: dir, range: `${'0'.repeat(40)}..HEAD` }), []);
  await rm(dir, { recursive: true });
});

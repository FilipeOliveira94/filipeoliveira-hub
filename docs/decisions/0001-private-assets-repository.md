# ADR-0001: Original photos in a private assets repository

| Field | Value |
| --- | --- |
| State | `approved` |
| Opened | 2026-11-17 |
| Decided | 2026-11-17 |
| Owner | Filipe |
| Index ID | D-021 |
| Related issues | I-03, I-04, I-11 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The home page uses a photo of Filipe (I-11). This repository is public, and a committed file stays in the history even after it is deleted. The photo was received as an attachment in the T3 thread and is not in any repository yet.

## Decision

This repository stays public and receives no photos or source images. The originals live in the private repository `FilipeOliveira94/filipeoliveira-hub-assets`, at web size (about 3000 px on the long side), not RAW; the home page photo is `photos/portrait.jpg`. The Actions workflow checks out that repository into `.assets/` with the `ASSETS_DEPLOY_KEY` secret, an ed25519 key registered as a read-only deploy key on the assets repository only, with `persist-credentials: false`. The step runs only when the secret exists (`HAS_ASSETS_KEY`). A script with `sharp` crops the originals into `src/assets/generated/`, and Astro generates AVIF/WebP. `.assets/` and `src/assets/generated/` are in `.gitignore`. Without the secret (a local build without access, a fork PR), the build finishes with a neutral placeholder. CI fails if a PR adds an image file to this repository.

The assets repository serves this site only. A deploy key is valid for a single repository, so separate repositories give the least privilege and independent owners. Private repositories cost nothing on GitHub's free plan.

## Alternatives considered

| Option | Pros | Cons | Why not |
| --- | --- | --- | --- |
| Private repository for this site only, fetched at build time (chosen) | The originals and their history stay private; this repository stays public and free | A second repository, a deploy key and a workflow step | — |
| Commit the photo to this repository | Simpler build | The original and every version are public in the history | Rejected |
| Git LFS | Stays in the same repository | Free quota of 1 GB of storage and 1 GB of bandwidth per month; every CI clone uses bandwidth; the files are still public in a public repository | Rejected |
| Make this repository private | A single repository | GitHub Pages on a private repository needs a paid plan | Rejected |
| An assets repository shared with other sites | One repository for all of them | The deploy key would give access to every site's photos | Rejected |

## Consequences and trade-offs

- The optimized photo is still public on the site, like any page image. What stays private is the original and its history.
- The Actions deploy does not write the generated site to a branch, so the optimized photo does not enter this repository's history either.
- Fork PRs do not get the secret and build with the placeholder.
- Work created: I-03 fetches the assets in the workflow (on PRs too); I-04 blocks images in PRs with `scripts/check-no-photos.mjs`; I-11 generates the photo with `scripts/prepare-assets.mjs`.
- Filipe's manual steps, before I-11:
  1. Create the private repository `FilipeOliveira94/filipeoliveira-hub-assets` and upload `photos/portrait.jpg`.
  2. Generate the key outside any repository: `ssh-keygen -t ed25519 -N "" -C filipeoliveira-hub-assets-deploy -f <temporary folder>/assets_key`.
  3. Register `assets_key.pub` as a deploy key of the assets repository, **without** "Allow write access".
  4. Store the private key as a secret: `gh secret set ASSETS_DEPLOY_KEY -R FilipeOliveira94/filipeoliveira-hub < <temporary folder>/assets_key`.
  5. Check that the key clones the assets repository and that a push is refused.
  6. Delete `assets_key` and `assets_key.pub` from disk.

## Evidence / validation

On 2026-11-17, in this checkout, `git ls-files` listed no image, and `git log --all --diff-filter=A` for jpg, jpeg, png, webp, avif, heic, gif and tif returned nothing: there is no history to rewrite. Nothing has been built yet; the implementation evidence goes into `docs/status-log.md` in I-03, I-04 and I-11.

The same model is already validated in the `dra-victoria-laufer` repository (its ADR-0010).

## Revisit when

The deploy key can no longer stay read-only and limited to the assets repository, or the visibility of either repository changes.

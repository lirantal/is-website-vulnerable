# Development

## Prerequisites

- Node.js compatible with this repository's packages and tooling.
- pnpm for dependency installation and scripts.

## Setup

```sh
pnpm install
```

## Common Commands

- `pnpm lint` - runs lint checks.
- `pnpm test` - runs the test suite.
- `pnpm format` - formats supported files.

## Repository Notes

This repository is organized around the root package `is-website-vulnerable`.

## Package-manager pin

Run `bash .github/scripts/setup-npm.sh` from the repository to install the exact
npm version in `package.json#packageManager`, then install dependencies using
the existing project setup instructions. CI uses the same setup script.

Upgrade the pin and matching lockfile metadata together in a maintenance PR.
Choose a release at least 30 days old and run the project checks with it.
Keep `.npmrc` and `pnpm-workspace.yaml` security policies enabled.
Periodic upgrade automation is not configured.

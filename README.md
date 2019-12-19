# is-website-vulnerable

finds publicly known security vulnerabilities in a website's frontend JavaScript libraries

[![npm version](https://badgen.net/npm/v/is-website-vulnerable)](https://www.npmjs.org/package/is-website-vulnerable) [![license](https://badgen.net/npm/license/is-website-vulnerable)](https://www.npmjs.org/package/is-website-vulnerable) [![downloads](https://badgen.net/npm/dt/is-website-vulnerable)](https://www.npmjs.org/package/is-website-vulnerable) [![build](https://github.com/lirantal/is-website-vulnerable/workflows/CI/badge.svg)](https://github.com/lirantal/is-website-vulnerable/actions?workflow=CI) [![codecov](https://badgen.net/codecov/c/github/lirantal/is-website-vulnerable)](https://codecov.io/gh/lirantal/is-website-vulnerable) [![Known Vulnerabilities](https://snyk.io/test/github/lirantal/is-website-vulnerable/badge.svg)](https://snyk.io/test/github/lirantal/is-website-vulnerable) [![Responsible Disclosure Policy](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](./SECURITY.md)

![Screenshot of npm module called is website vulnerable that detects security vulnerabilities in websites based on Snyk database](./.github/is-website-vulnerable-logo.png)

Many thanks to [![](./.github/snyk-logo.png)](https://snyk.io) for supporting open source security

# About

Finds publicly known security vulnerabilities in a website's frontend JavaScript libraries

# Usage

## Commandline:

Using Node.js's `npx` to run a one-off scan of a website:

```bash
npx is-website-vulnerable https://example.com [--json] [--js-lib] [--mobile|--desktop] [--chromePath]
```

## Docker:

To build and run the container locally:

```
# Clone Repo:
git clone https://github.com/lirantal/is-website-vulnerable.git

# Change to repo's cloned directory:
cd is-website-vulnerable

# Build Image locally:
docker build -t local/is-website-vulnerable:1.0 . --no-cache

# Run container:
docker run -e SCAN_URL="https://www.google.com/" local/is-website-vulnerable:1.0
```

`SCAN_URL` is an environment variable and the value for that can be replaced with desired URL during Docker run. Docker container will exit once the scan has been completed.

:warning: A modern version of Chrome is assumed to be available when using `is-website-vulnerable`. It may not be safe to assume that this is satisfied automatically on some CI services. For example, [additional configuration](https://docs.travis-ci.com/user/chrome#selecting-a-chrome-version) is necessary for [Travis CI](https://travis-ci.com/).

# Install

You can install globally via:

```bash
npm install -g is-website-vulnerable
```

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**is-website-vulnerable** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.

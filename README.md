<p align="center"><h1 align="center">
  is-website-vulnerable
</h1>

<p align="center">
  finds publicly known security vulnerabilities in a website's frontend JavaScript libraries
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/is-website-vulnerable"><img src="https://badgen.net/npm/v/is-website-vulnerable" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/is-website-vulnerable"><img src="https://badgen.net/npm/license/is-website-vulnerable" alt="license"/></a>
  <a href="https://www.npmjs.org/package/is-website-vulnerable"><img src="https://badgen.net/npm/dt/is-website-vulnerable" alt="downloads"/></a>
  <a href="https://github.com/lirantal/is-website-vulnerable/actions?workflow=CI"><img src="https://github.com/lirantal/is-website-vulnerable/workflows/CI/badge.svg" alt="build"/></a>
  <a href="https://codecov.io/gh/lirantal/is-website-vulnerable"><img src="https://badgen.net/codecov/c/github/lirantal/is-website-vulnerable" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/lirantal/is-website-vulnerable"><img src="https://snyk.io/test/github/lirantal/is-website-vulnerable/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

<p align="center">
  <img src="./.github/is-website-vulnerable-logo.png" alt="Screenshot of npm module called is website vulnerable that detects security vulnerabilities in websites based on Snyk database" />
  
  <p align="center">
  	<p align="center">Many thanks to <a href="https://snyk.io"><img src="./.github/snyk-logo.png" width="100"></a> for supporting open source security</p>
    
</p>


</p>


# About

Finds publicly known security vulnerabilities in a website's frontend JavaScript libraries

# Usage

## Commandline:

Using Node.js's `npx` to run a one-off scan of a website:

```bash
npx is-website-vulnerable https://example.com [--json] [--js-lib] [--mobile|--desktop] [--chromePath]
```

The CLI will gracefully handle cases where the URL to scan is missing by prompting you to enter it:

```
$ npx is-website-vulnerable
Woops! You forgot to provide a URL of a website to scan.
? Please provide a URL here: https://example.com
...
```

## Docker:

To build and run the container locally:

```
# Clone Repo:
git clone https://github.com/lirantal/is-website-vulnerable.git

# Change to repo's cloned directory:
cd is-website-vulnerable

# Build Image locally:
docker build -t lirantal/is-website-vulnerable:1.0 . --no-cache

# Run container:
docker run -e SCAN_URL="https://www.google.com/" lirantal/is-website-vulnerable:1.0
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

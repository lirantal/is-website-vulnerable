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

Finds publicly known security vulnerabilities in a website's frontend JavaScript libraries.

# Usage

## Command line

Using Node.js's `npx` to run a one-off scan of a website:

```bash
npx is-website-vulnerable https://example.com [--json] [--js-lib] [--mobile|--desktop] [--chromePath] [--cookie] [--token]
```

The CLI will gracefully handle cases where the URL to scan is missing by prompting you to enter it:

```bash
$ npx is-website-vulnerable
Woops! You forgot to provide a URL of a website to scan.
? Please provide a URL to scan: › https://example.com
...
```

### Exit codes

If the CLI detects an error, it will terminate with an exit code different from 0.

Exit Code 0: Everything is fine. No vulnerabilities found.

Exit Code 1: An error happened during the execution. Check the logs for details.

Exit Code 2: Vulnerabilities were found. Check the logs for details.

## Docker

To build and run the container locally:

```bash
# Clone Repo:
git clone https://github.com/lirantal/is-website-vulnerable.git

# Change to repo's cloned directory:
cd is-website-vulnerable

# Build Image locally:
docker build --no-cache -t lirantal/is-website-vulnerable:latest .

# Run container:
docker run --rm -e SCAN_URL="https://www.google.com/" lirantal/is-website-vulnerable:latest
```

`SCAN_URL` is an environment variable and its value must be replaced with the desired URL during Docker run. Docker container will exit once the scan has been completed.

If you wish to provide command line arguments to `is-website-vulnerable` and customize the run, such as providing `--json` or other supported arguments, you should omit the environment variable and provide the full command. Here is an example:

```
docker run --rm lirantal/is-website-vulnerable:latest https://www.google.com --json
```

:warning: A modern version of Chrome is assumed to be available when using `is-website-vulnerable`. It may not be safe to assume that this is satisfied automatically on some CI services. For example, [additional configuration](https://docs.travis-ci.com/user/chrome#selecting-a-chrome-version) is necessary for [Travis CI](https://travis-ci.com/).

# GitHub Action
Create .github/workflows/is-website-vulnerable.yml with the url that you want scanned:

```yaml
name: Test site for publicly known js vulnerabilities

on: push
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - name: Test for public javascript library vulnerabilities 
        uses: lirantal/is-website-vulnerable@main
        with:
          scan-url: "https://yoursite.com"
```

# Install

You can install globally via:

```bash
npm install -g is-website-vulnerable
```

# Learn Node.js Security

<hr/>

<div align="center">
  <p>
    <a href="https://nodejs-security.com">
      <img alt="Node.js Security" align="center" src="https://img.shields.io/badge/%F0%9F%A6%84-Learn%20Node.js%20Security%E2%86%92-gray.svg?colorA=5734F5&colorB=5734F5&style=flat" />
    </a>
  </p>
  
  ![Screenshot 2024-09-12 at 20 14 27](https://github.com/user-attachments/assets/586f3151-eed9-4542-92f1-de9237f6783c)
  
  <p>
    Learn Node.js Secure Coding techniques and best practices from <a href="https://www.lirantal.com">Liran Tal</a>
  </p>
</div>


# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**is-website-vulnerable** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.

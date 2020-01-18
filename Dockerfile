# Dockerfile for is-website-vulnerable
# License: Apache 2.0
# © Liran Tal 2019
FROM node:12-alpine
LABEL org.label-schema.name="is-website-vulnerable" \
    org.label-schema.description="is-website-vulnerable Docker image" \
    org.label-schema.url="https://www.npmjs.com/package/is-website-vulnerable" \
    org.label-schema.vcs-url="https://github.com/lirantal/is-website-vulnerable" \
    org.label-schema.maintainer="lirantal" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.docker.cmd="docker run --rm -e SCAN_URL='https://example.com' lirantal/is-website-vulnerable:latest"

# Configure npm
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Set SCAN_URL env to satisfy at build and/or container runtime.
ENV SCAN_URL="https://github.com/lirantal/is-website-vulnerable"

RUN mkdir -p /home/node/is-website-vulnerable
WORKDIR /home/node/is-website-vulnerable

# Install from npmjs.com
RUN npm install --only=prod -g is-website-vulnerable

# Chromium is needed for the scan
RUN apk add --no-cache chromium

CMD ["sh", "-c", "npx is-website-vulnerable $SCAN_URL"]

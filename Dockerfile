FROM alpine:latest
LABEL maintainer="darkwizard242"

# Install required dependencies and create folder
RUN apk update \
    && apk upgrade \
    && apk add --no-cache git nodejs npm chromium \
    && npm install -g is-website-vulnerable

# Set ENV to satisfy at build and/or container runtime.
ENV SCAN_URL="https://github.com/lirantal/is-website-vulnerable"

# Container Configurations
CMD ["sh", "-c", "npx is-website-vulnerable $SCAN_URL"]

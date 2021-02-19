#!/usr/bin/env sh
if [ "$#" -ne 0 ]
then
    npx is-website-vulnerable "$@"
else
    npx is-website-vulnerable "$SCAN_URL"
fi
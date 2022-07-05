#!/bin/bash

# Set environment passed to container at runtime to global variable ENV.
set -euo pipefail

sed -i "s/<noscript id=\"env-insertion-point\"><\/noscript>/<script>var ENV=\"${APP_ENV}\"<\/script>/g" /app/react/build/index.html

exec "$@"

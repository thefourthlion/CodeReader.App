#!/bin/sh
set -eu

mkdir -p /data
chown -R node:node /data

if [ -f /legacy/database.sqlite ] && [ ! -s /data/database.sqlite ]; then
  cp /legacy/database.sqlite /data/database.sqlite
  chown node:node /data/database.sqlite
fi

exec su-exec node node index.js

#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  ./etl/scripts/node_modules/.bin/tsx ./etl/scripts/seed_if_empty.mjs
else
  echo "DATABASE_URL не задан — пропускаю автозагрузку данных"
fi

exec node_modules/.bin/next start

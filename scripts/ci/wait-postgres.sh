#!/bin/bash
set -e

ATTEMPTS=0
MAX=30

until php -r "new PDO('pgsql:host=127.0.0.1;port=5432;dbname=raafco_ims_pgsql','admin','admin');" || [ $ATTEMPTS -eq $MAX ]; do
    echo "Waiting for Postgres ($ATTEMPTS/$MAX)..."
    sleep 2
    ATTEMPTS=$((ATTEMPTS+1))
done

if [ $ATTEMPTS -eq $MAX ]; then
    echo "❌ Postgres did not become ready in time"
    exit 1
fi

echo "✅ Postgres is ready!"


echo "Waiting for Postgres..."
until pg_isready -h pgsql -U admin -d raafco_ims_pgsql; do
  sleep 2
done
echo "✅ Postgres is ready!"

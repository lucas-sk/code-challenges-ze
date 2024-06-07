#!/bin/bash
apt-get update && apt-get install -y postgis

exec docker-entrypoint.sh postgres
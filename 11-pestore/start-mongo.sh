#!/usr/bin/env bash
docker kill todo
docker rm -v todo
docker run --name todo -p 27017:27017 -d mongo
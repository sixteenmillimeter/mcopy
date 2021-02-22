#!/bin/sh

mkdir -p lib

./node_modules/.bin/tsc -p tsconfig.json --extendedDiagnostics

#electron-build fails when local modules are in parent directory
#copy them into lib directory
cp -r ./lib/* ./app/lib/

rm -r ./lib

cp ./data/cfg.json ./app/data/
cp ./data/cfg.json ./processing/mcopy/
#!/bin/bash

./node_modules/.bin/electron-packager . mcopy --overwrite --platform=win32 --arch=x64 --icon=assets/icons/icon.ico --prune=true --out=../dist --version-string.CompanyName="sixteenmillimeter.com" --version-string.FileDescription="Open Source Optical Printer Platform" --version-string.ProductName="mcopy"

mkdir -p ../dist/installers

node ./scripts/build_win.js
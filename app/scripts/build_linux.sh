#!/bin/bash

#package app
./node_modules/.bin/electron-packager . mcopy-app --overwrite --platform=linux --arch=x64 --icon=assets/icons/icon.png --prune=true --out=../dist
#build a .deb installer
./node_modules/.bin/electron-installer-debian --src ../dist/mcopy-app-linux-x64/ --arch amd64 --config ./scripts/build_linux.json
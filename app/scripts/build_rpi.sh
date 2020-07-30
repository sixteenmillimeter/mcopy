#!/bin/bash

#package app
./node_modules/.bin/electron-packager . mcopy-app --overwrite --platform=linux --arch=armv7l --icon=assets/icons/icon.png --prune=true --out=../dist
#build a .deb installer
./node_modules/.bin/electron-installer-debian --src ../dist/mcopy-app-linux-armv7l/ --arch armv7l --config ./scripts/build_linux.json
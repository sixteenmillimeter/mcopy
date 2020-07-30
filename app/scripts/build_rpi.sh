#!/bin/bash

#package app
./node_modules/.bin/electron-packager . mcopy-app --overwrite --platform=linux --arch=armhf --icon=assets/icons/icon.png --prune=true --out=../dist
#build a .deb installer
./node_modules/.bin/electron-installer-debian --src ../dist/mcopy-app-linux-armhf/ --arch armhf --config ./scripts/build_linux.json
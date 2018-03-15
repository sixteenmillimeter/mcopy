#!/bin/bash

#package app
./node_modules/.bin/electron-packager . mcopy --overwrite --asar --platform=linux --arch=x64 --icon=assets/icons/icon.png --prune=true --out=../dist
#build a .deb installer
./node_modules/.bin/electron-installer-debian --src ../dist/mcopy-linux-x64/ --arch amd64 --config build_linux.json
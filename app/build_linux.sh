#!/bin/bash

electron-packager . mcopy --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/icon.png --prune=true --out=../dist

#!/bin/bash

mkdir ../../mcopy_build_mac/Electron.app/Contents/Resources/app/css
mkdir ../../mcopy_build_mac/Electron.app/Contents/Resources/app/data
mkdir ../../mcopy_build_mac/Electron.app/Contents/Resources/app/fonts
mkdir ../../mcopy_build_mac/Electron.app/Contents/Resources/app/js
mkdir ../../mcopy_build_mac/Electron.app/Contents/Resources/app/lib
mkdir ../../mcopy_build_mac/Electron.app/Contents/Resources/app/logs

cp -R ./css/* ../../mcopy_build_mac/Electron.app/Contents/Resources/app/css
cp -R ./fonts/* ../../mcopy_build_mac/Electron.app/Contents/Resources/app/fonts
cp -R ./js/* ../../mcopy_build_mac/Electron.app/Contents/Resources/app/js
cp -R ./lib/* ../../mcopy_build_mac/Electron.app/Contents/Resources/app/lib

cp ./data/cfg.json.default ../../mcopy_build_mac/Electron.app/Contents/Resources/app/data/

cp ./index.html ../../mcopy_build_mac/Electron.app/Contents/Resources/app/
cp ./main.js ../../mcopy_build_mac/Electron.app/Contents/Resources/app/
cp ./package.json ../../mcopy_build_mac/Electron.app/Contents/Resources/app/

cd ../../mcopy_build_mac/Electron.app/Contents/Resources/app/ && npm install && ./node_modules/.bin/electron-rebuild
#!/bin/bash

version=$(jq -r  '.version' ./package.json)

node ./scripts/build_and_sign_mac.js

sleep 5s

mkdir -p ../dist/installers

./node_modules/.bin/electron-installer-dmg ../dist/mcopy-app-darwin-x64/mcopy-app.app mcopy-app --out=../dist/installers  --icon=assets/icons/icon.icns  --overwrite    


mv "../dist/installers/mcopy-app.dmg" "../dist/installers/mcopy-app_${version}.dmg"
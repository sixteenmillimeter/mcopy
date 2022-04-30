#!/bin/bash

version=$(jq -r  '.version' ./package.json)

mkdir -p ../dist

if [ -f "./.appleIdentity" ]; then
	echo "Building, signing and notarizing application..."
	node ./scripts/build_and_sign_mac.js
else
	echo "Building application..."
	./node_modules/.bin/electron-packager . --overwrite --platform=darwin --ignore=^../dist --arch=x64 --prune=true --out=../dist/installers
fi

sleep 5s

mkdir -p ../dist/installers

echo "Building dmg installer..."

./node_modules/.bin/electron-installer-dmg ../dist/mcopy-app-darwin-x64/mcopy-app.app mcopy-app --out=../dist/installers  --icon=assets/icons/icon.icns  --overwrite    

mv "../dist/installers/mcopy-app.dmg" "../dist/installers/mcopy-app_${version}.dmg"

echo "Built installer of version ${version}"
#!/bin/bash

./node_modules/.bin/electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/icon.icns --prune=true --out=../dist
#build dmg for mac install
sleep 5s
mkdir ../dist/installers
./node_modules/.bin/electron-installer-dmg ../dist/mcopy-darwin-x64/mcopy.app mcopy --out=../dist/installers  --icon=assets/icons/icon.icns  --overwrite    
# Path to the icon file that will be the app icon in the DMG window.
#  --icon-size=<px>     How big to make the icon for the app in the DMG. [Default: `80`].
#  --background=<path>  Path to a PNG image to use as the background of the DMG.
#--overwrite          Overwrite any existing DMG.
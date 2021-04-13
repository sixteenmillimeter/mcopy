#!/bin/bash

node ./scripts/build_and_sign_mac.js
#build dmg for mac install
sleep 5s
mkdir -p ../dist/installers
./node_modules/.bin/electron-installer-dmg ../dist/mcopy-app-darwin-x64/mcopy-app.app mcopy-app --out=../dist/installers  --icon=assets/icons/icon.icns  --overwrite    
# Path to the icon file that will be the app icon in the DMG window.
#  --icon-size=<px>     How big to make the icon for the app in the DMG. [Default: `80`].
#  --background=<path>  Path to a PNG image to use as the background of the DMG.
#--overwrite          Overwrite any existing DMG.
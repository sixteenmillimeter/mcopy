#!/bin/bash

npm install -g gulp electron
npm install electron-prebuilt
npm install
./node_modules/.bin/electron-rebuild
mkdir logs

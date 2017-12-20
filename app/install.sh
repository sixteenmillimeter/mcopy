#!/bin/bash

npm install -g gulp electron
npm install
./node_modules/.bin/electron-rebuild
mkdir logs

#!/bin/bash

set -e

# compile main process code
cd ..
npm run compile

cd ./app

# compile renderer process code
npm run compile

# compile LESS and pack javascript
npm run gulp

npm run test

# start app with dev flag
./node_modules/.bin/electron main.js -d
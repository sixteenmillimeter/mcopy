#!/bin/sh

./node_modules/.bin/tsc ./src/lib/ui/grid.ts --outFile ./lib/ui/grid.js --noImplicitAny --lib ES2017 --lib ES2016 --lib dom -t ES2016

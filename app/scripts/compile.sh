#!/bin/bash

./node_modules/.bin/tsc ./src/lib/ui/grid.ts --outFile ./lib/ui/grid.js --noImplicitAny --lib ES2017 --lib ES2016 --lib dom -t ES2016
./node_modules/.bin/tsc ./src/lib/ui/seq.ts --outFile ./lib/ui/seq.js --noImplicitAny --lib ES2017 --lib ES2016 --lib dom -t ES2016
./node_modules/.bin/tsc ./src/lib/ui/filmout.ts --outFile ./lib/ui/filmout.js --noImplicitAny --lib ES2017 --lib ES2016 --lib dom -t ES2016
./node_modules/.bin/tsc ./src/lib/ui/devices.ts --outFile ./lib/ui/devices.js --noImplicitAny --lib ES2017 --lib ES2016 --lib dom -t ES2016

#!/bin/bash

libs="./lib/*"
for l in $libs
do
	echo "Generating documentation for $l"
	./node_modules/.bin/jsdoc2md $l/index.js > $l/Readme.md
done 
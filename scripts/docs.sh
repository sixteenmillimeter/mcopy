#!/bin/sh

libs="./lib/*"
for l in $libs
do
	if [ -f "${l}" ]; then
		continue
	fi
	echo "Generating documentation for $l"
	./node_modules/.bin/jsdoc2md $l/index.js > $l/Readme.md
done 
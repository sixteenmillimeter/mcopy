#!/bin/sh

#./node_modules/.bin/tsc -p tsconfig.json

#electron-build fails when local modules are in parent directory
#copy them into lib directory
cp -r ./lib/* ./app/lib/
cp -r ./lib/* ./cli/lib/

cp ./data/cfg.json ./app/data/
cp ./data/cfg.json ./cli/data/


#version all sub projects and config files
version=$(jq -r  '.version' ./package.json)
echo "VERSION: $version"

declare -a fileArr=("./data/cfg.json" "./app/package.json" "./cli/package.json")

for i in "${fileArr[@]}"
do 
	tmp=$(mktemp)
	VERSION="$version" jq '.version = env.VERSION' "$i" > "$tmp" && mv "$tmp" "$i"
done
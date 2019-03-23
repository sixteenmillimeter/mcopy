#!/bin/bash

npm version --no-git-tag-version ${1}

#version all sub projects and config files
version=$(jq -r  '.version' ./package.json)
echo "VERSION: $version"

declare -a fileArr=("./data/cfg.json" "./app/package.json" "./cli/package.json")

for i in "${fileArr[@]}"
do 
	tmp=$(mktemp)
	VERSION="$version" jq '.version = env.VERSION' "$i" > "$tmp" && mv "$tmp" "$i"
done
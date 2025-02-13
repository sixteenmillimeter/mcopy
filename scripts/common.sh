#!/bin/bash

listParts () {
	cat "${1}" | grep 'PART ==' | grep -v 'debug' | awk -F'"' '{print $2}'
}

allParts () {
	PARTS=($(listParts "scad/${1}.scad"))
	for part in "${PARTS[@]}"; do
		bash ./scripts/openscadPart.sh "scad/${1}.scad" "${part}" "stl/${1}_${part}.stl"
	done
}

parallelParts () {
	PARTS=($(listParts "scad/${1}.scad"))
	parallel --jobs 8 bash ./scripts/openscadPart.sh "scad/${1}.scad" "{}" "${1}_{}.stl" ::: "${PARTS[@]}"
}
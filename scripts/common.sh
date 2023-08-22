#!/bin/bash

listParts () {
	cat "${1}" | grep 'PART ==' | grep -v 'debug' | awk -F'"' '{print $2}'
}

allParts () {
	PARTS=($(listParts "scad/${1}.scad"))
	for part in "${PARTS[@]}"; do
		bash ./scripts/openscadPart.sh "${1}.scad" "${part}" "${1}_${part}.stl"
	done
}

parallelParts () {
	PARTS=($(listParts "scad/${1}.scad"))
	parallel --use-cpus-instead-of-cores -j -1 bash ./scripts/openscadPart.sh "${1}.scad" "{}" "${1}_{}.stl" ::: "${PARTS[@]}"
}
#!/bin/bash

FILES=(
	arri_s
	bellows
	cpc_connectors
	mcopy_rails
	mcopy_projector
)

openscadPart () {
	openscad -o "./stl/${3}" -D"PART=\"${2}\"" "./scad/${1}"
	echo "Compiled ${3} from ${1}"
	if [ -f "./scad/common/c14n_stl.py" ]; then
		python3 ./scad/common/c14n_stl.py "./stl/${3}"
		echo "Normalized ${3}"
	fi
}

listParts () {
	cat "${1}" | grep 'PART ==' | grep -v 'debug' | awk -F'"' '{print $2}'
}

allParts () {
	PARTS=($(listParts "scad/${1}.scad"))
	for part in "${PARTS[@]}"; do
		echo opencadPart "${1}.scad" "${part}" "${1}_${part}.stl"
	done
}

if [[ "${1}" == "all" ]]; then
	for file in "${FILES[@]}"; do
		allParts "${file}"
	done
else
	if [ -f "scad/${1}.scad" ]; then
		allParts "${1}"
	elif [[ "${1}" != "" ]]; then
		echo "File scad/${1}.scad not found"
		exit 2
	else
		echo "Please provide a target to compile or use \"all\""
	fi
fi

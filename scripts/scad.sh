#!/bin/bash

source ./scripts/common.sh

FILES=(
	arri_s
	bellows
	cpc_connectors
	mcopy_rails
	mcopy_projector
	mcopy_lens_assembly
	mcopy_gate
)

PARALLEL=0
HAS_PARALLEL=$(which parallel)
if [[ "${HAS_PARALLEL}" != "" ]]; then
	PARALLEL=1
fi

if [[ "${1}" == "all" ]]; then
	for file in "${FILES[@]}"; do
		allParts "${file}"
	done
else
	if [ -f "scad/${1}.scad" ]; then
		if [ ${PARALLEL} -eq 1 ]; then
			parallelParts "${1}"
		else
			allParts "${1}"
		fi
	elif [[ "${1}" != "" ]]; then
		echo "File scad/${1}.scad not found"
		exit 2
	else
		echo "Please provide a target to compile or use \"all\""
	fi
fi

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
	projector_controller
)

if [[ "${1}" == "all" ]]; then
	for file in "${FILES[@]}"; do
		bash scad/common/scad.sh "./scad/${file}.scad" "${2}"
		bash scripts/bom.sh "./scad/${file}.scad"
	done
else
	if [ -f "scad/${1}.scad" ]; then
		bash scad/common/scad.sh "./scad/${1}.scad" "${2}"
		bash scripts/bom.sh "./scad/${1}.scad"
	elif [[ "${1}" != "" ]]; then
		echo "File scad/${1}.scad not found"
		exit 2
	else
		echo "Please provide a target to compile or use \"all\""
	fi
fi

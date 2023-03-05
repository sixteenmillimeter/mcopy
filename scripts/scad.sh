#!/bin/bash

openscadPart () {
	openscad -o "./stl/${3}" -D"PART=\"${2}\"" "./scad/${1}"
	if [ -f "./scad/common/c14n_stl.py" ]; then
		python3 ./scad/common/c14n_stl.py "./stl/${3}"
	fi
}


# mcopy mono 99 projector controller

openscadPart "projector_controller.scad" "electronics_mount" "mcopy_mono99_electronics_mount.stl"
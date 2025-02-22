#!/bin/bash

openscad --export-format=asciistl --enable manifold -o "./stl/${3}" -D"PART=\"${2}\"" "./${1}"
echo "Compiled ${3} from ${1}"
if [ -f "./scad/common/c14n_stl.py" ]; then
	python3 ./scad/common/c14n_stl.py "./stl/${3}"
	echo "Normalized ${3}"
fi
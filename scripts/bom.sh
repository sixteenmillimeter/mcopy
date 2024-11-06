#!/bin/bash

if [[ "${1}" == "" ]]; then
	echo "Please use a .scad file as first argument"
	exit 1
fi

FILENAME=$(basename "${1}" | tr '[:upper:]' '[:lower:]')
EXTENSION="${FILENAME##*.}"

if [[ "${EXTENSION}" != "scad" ]]; then
	echo "Please use a .scad file as first argument, not .${EXTENSION}"
	exit 2
fi

if [[ ! -f "${1}" ]]; then
	echo "File ${1} does not exist"
	exit 3
fi

mkdir -p ./hardware/bom

NAME="${FILENAME%.*}"
DESTINATION="./hardware/bom/${NAME}_BOM.csv"
TOTAL="./hardware/bom/${NAME}_BOM_total.csv"

touch "${DESTINATION}"
touch "${TOTAL}"

DESTINATION=$(realpath "${DESTINATION}")
TOTAL=$(realpath "${TOTAL}")
PRICES=$(realpath "./hardware/parts/prices.csv")
MODULE=""

echo "module,c,part,part_id,description" > "${DESTINATION}"

tac "${1}" | while read line; do
    module=$(echo "${line}" | grep 'module')
    if [[ "${module}" != "" ]]; then
    	MODULE=$(echo "${module}" | xargs | awk '{print $2}' | awk -F'{' '{print $1}')
    fi
    bom=$(echo "${line}" | grep '//' | grep 'BOM' | awk -F'BOM:' '{print $2}'| xargs)
    if [[ "${bom}" != "" ]]; then
    	COUNT=$(echo "${bom}" | awk -F',' '{print $1}' | xargs)
    	PART=$(echo "${bom}" | awk -F',' '{print $2}' | xargs)
    	ID=$(echo "${bom}" | awk -F',' '{print $3}' | xargs)
    	DESCRIPTION=$(echo "${bom}" | awk -F',' '{print $4}' | xargs)
    	echo "[${MODULE}] ${COUNT}x ${PART} (${ID})"
    	echo "${MODULE},${COUNT},${PART},${ID},${DESCRIPTION}" >> "${DESTINATION}"
    fi
done

echo "count,part_id,part,price" > "${TOTAL}"
sqlite3 :memory: -cmd '.mode csv' -cmd ".import ${DESTINATION} bom" -cmd ".import ${PRICES} prices"\
  'SELECT SUM(c),part,part_id, SUM(c) * (SELECT prices.price FROM prices WHERE prices.part = bom.part) as price FROM bom GROUP BY part ORDER BY part DESC;' >> "${TOTAL}"

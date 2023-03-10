#!/bin/bash

#sync libs'

if [ -f "$(which jq)" ]; then
	HEADER=ino/lib/McopySerial/McopySerial.h
	TMP_FILE=$(mktemp)

	awk '{print} /CMD FLAGS/ {exit}' "${HEADER}" > "${TMP_FILE}"

	cat ./data/cfg.json | jq -r '.arduino.cmd | keys[] as $k | "    char \($k) = '"'"'\(.[$k])'"'"';"' | awk '{print "\t"$1" "toupper($2)" "$3" "$4}' >> "${TMP_FILE}"

	awk '/END CMD/,EOF { print $0 }' "${HEADER}" >> "${TMP_FILE}"

	cp "${TMP_FILE}" "${HEADER}"
	rm -f "${TMP_FILE}"
fi

cp ino/lib/McopySerial/McopySerial.* ino/mcopy_cam_canon/
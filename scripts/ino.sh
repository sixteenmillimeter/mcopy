#!/bin/bash

#sync libs'

if [ -f "$(which jq)" ]; then
	HEADER=ino/lib/McopySerial/McopySerial.h
	TMP_FILE=$(mktemp)

	awk '{print} /CMD FLAGS/ {exit}' "${HEADER}" > "${TMP_FILE}"

	cat ./data/cfg.json | jq -r '.arduino.cmd | keys[] as $k | "   const char \($k) = '"'"'\(.[$k])'"'"';"' | awk '{print "\t"$1" "$2" "toupper($3)" "$4" "$5}' >> "${TMP_FILE}"

	awk '/END CMD/,EOF { print $0 }' "${HEADER}" >> "${TMP_FILE}"

	cp "${TMP_FILE}" "${HEADER}"
	rm -f "${TMP_FILE}"
fi

cp ino/lib/McopySerial/McopySerial.* ino/mcopy_cam_canon/
cp ino/lib/McopySerial/McopySerial.* ino/mcopy_JKMM100/
cp ino/lib/McopySerial/McopySerial.* ino/components/mcopy_light/
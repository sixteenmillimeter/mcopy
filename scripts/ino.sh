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

SKETCHES=(
	mcopy_arri_s_firmware
	mcopy_cam_canon_ble_nano
	mcopy_cam_relay
	mcopy_JKMM100
	mcopy_JKMM100_work
	mcopy_JKMM100_second_projector
	components/mcopy_light
	mcopy_projector_firmware
	mcopy_ACME_Trebes_Nanolab
	mcopy_oxberry_mitchell
)

for sketch in "${SKETCHES[@]}"; do
	cp ino/lib/McopySerial/McopySerial.* ino/${sketch}/
done

if [ -d ../McopySerial ]; then
	cp ino/lib/McopySerial/McopySerial.* ../McopySerial/
fi
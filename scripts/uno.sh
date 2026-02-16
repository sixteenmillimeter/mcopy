#!/bin/bash

FQBN="arduino:avr:uno"
PORT="/dev/ttyACM0"
#"/dev/ttyUSB0"

arduino-cli compile -b "${FQBN}"
arduino-cli upload -b "${FQBN}" -p "${PORT}" .
arduino-cli monitor -p "${PORT}" -b "${FQBN}" --config 57600


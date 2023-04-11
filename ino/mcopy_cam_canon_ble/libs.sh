#!/bin/bash

if [ -d "../../../ArduinoNvs" ]; then
	cp "../../../ArduinoNvs/src/"* ./
fi

if [ -d "../../../ESP32-Canon-BLE-Remote" ]; then
	cp "../../../ESP32-Canon-BLE-Remote/src/"* ./
fi

if [ -d "../../../TickTwo" ]; then
	cp "../../../TockTwo/"*.cpp ./
	cp "../../../TockTwo/"*.h ./
fi
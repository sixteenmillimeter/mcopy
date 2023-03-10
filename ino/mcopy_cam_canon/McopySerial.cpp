/// mcopy Serial Library

#include "McopySerial.h" 

McopySerial::McopySerial () {
	//create mcopy serial
}

void McopySerial::begin () {
	Serial.begin(baud);
}

char McopySerial::loop () {
	if (Serial.available()) {
		cmdChar = (char) Serial.read();
	} else {
		cmdChar = 'z';
	}
	return cmdChar;
}

void McopySerial::setBaud (int baudRate) {
	baud = baudRate;
}

void McopySerial::debug (bool state) {
	debugOn = state;
}

void McopySerial::log (String message) {
	if (debugOn) {
		Serial.println(message);
	}
}
/// mcopy Serial Library

#include "McopySerial.h" 

McopySerial::McopySerial (char identity) {
	id = identity;
}

void McopySerial::begin () {
	Serial.begin(baud);
}

void McopySerial::identify (char identity) {
	id = identity;
}

char McopySerial::loop () {
	if (Serial.available()) {
		cmdChar = (char) Serial.read();
		internal();
	} else {
		cmdChar = 'z';
	}
	return cmdChar;
}

void McopySerial::internal () {
	if (cmdChar == DEBUG) {
		debugOn = !debugOn;
		cmdChar = 'z';
	}
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
/// mcopy Serial Library

#include "McopySerial.h" 

McopySerial::McopySerial () {

}

void McopySerial::on()

void McopySerial::begin () {
	Serial.begin(baud);
}

void McopySerial::loop () {
	if (Serial.available()) {
		cmdChar = (char) Serial.read();
	}
	if (cmdChar != 'z') {
		//cmd(cmdChar);
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
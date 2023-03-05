#include "McopySerial.h" 

McopySerial::McopySerial () {

}

void McopySerial::begin () {
	Serial.begin(baud);
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
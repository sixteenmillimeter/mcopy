#include "McopySerial.h" 

void McopySerial::begin (int baudRate) {
	baud = baudRate;
	begin();	
}

void McopySerial::begin () {

}

void McopySerial::debug (bool state) {
	debugOn = state;
}

void McopySerial::log (String message) {
	if (debugOn) {
		Serial.println(message);
	}
}
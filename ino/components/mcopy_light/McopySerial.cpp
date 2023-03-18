/// mcopy Serial Library

#include "McopySerial.h" 

McopySerial::McopySerial (char identity) {
	id = identity;
}

void McopySerial::begin () {
	Serial.begin(baud);
	Serial.flush();
  	Serial.setTimeout(serialDelay);
}

char McopySerial::loop () {
	if (Serial.available()) {
		cmdChar = (char) Serial.read();
		_internal();
	} else {
		cmdChar = 'z';
	}
	return cmdChar;
}

void McopySerial::_internal () {
	if (cmdChar == DEBUG) {
		debugOn = !debugOn;
	} else if (cmdChar == CONNECT) {
		_connect();
	} else if (cmdChar == MCOPY_IDENTIFIER) {
		_identify();
	}
}

void McopySerial::_connect () {
  Serial.println(CONNECT);
  log("connect()");
}

void McopySerial::_identify () {
  Serial.println(id);
  log("identify()");  
}

void McopySerial::setBaud (int baudRate) {
	baud = baudRate;
}

void McopySerial::setIdentity (char identity) {
	id = identity;
}

void McopySerial::debug (bool state) {
	debugOn = state;
}

void McopySerial::confirm (char cmd) {
	Serial.println(cmd);
}

void McopySerial::log (String message) {
	if (debugOn) {
		Serial.println(message);
	}
}

String McopySerial::getString () {
  while (Serial.available() == 0) {             
    //Wait for value string
  }
  return Serial.readString();
}

void McopySerial::print (String message) {
	Serial.println(message);
}
/// mcopy Serial Library

#include "McopySerial.h" 

McopySerial::McopySerial () {}

void McopySerial::begin (char identity) {
	id = identity;
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
		debug(!debugOn);
	} else if (cmdChar == CONNECT) {
		_connect();
	} else if (cmdChar == MCOPY_IDENTIFIER) {
		_identify();
	}
}

void McopySerial::_connect () {
  connected = true;
  Serial.println(CONNECT);
  log("connect()");
}

void McopySerial::_identify () {
  identified = true;
  Serial.println(id);
  log("identify()");  
}

void McopySerial::debug (bool state) {
	debugOn = state;
	log("debug()");
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

void McopySerial::sendString (String str) {
	Serial.println(str);
}

void McopySerial::print (String message) {
	Serial.println(message);
}
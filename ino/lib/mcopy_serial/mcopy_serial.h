#ifndef MCOPY_SERIAL
#define MCOPY_SERIAL

#include "Arduino.h"

class McopySerial {           

	private:
	volatile int baud = 57600;
	volatile bool debugOn = false;

	public:
	void begin();
	void begin(int baudRate);

	void debug (bool state);
	void log (String message);
};

#endif
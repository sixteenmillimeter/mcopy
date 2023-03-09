#ifndef MCOPY_SERIAL
#define MCOPY_SERIAL

#include "Arduino.h"

typedef void (*mcopy_callback)(void);

class McopySerial {           

	private:
	volatile int baud = 57600;
	volatile bool debugOn = false;
	volatile char cmdChar = 'z';

	public:
	McopySerial();

	void begin();
	void setBaud(int baudRate);
	void loop();

	void debug (bool state);
	void log (String message);
};

#endif
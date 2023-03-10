#ifndef MCOPY_SERIAL
#define MCOPY_SERIAL

#include "Arduino.h"

class McopySerial {           

	private:
	volatile int baud = 57600;
	volatile bool debugOn = false;
	volatile char cmdChar = 'z';

	void internal ();

	public:

	/* CMD FLAGS */
	char BLACK = 'b';
	char CAMERA = 'c';
	char CAMERA_BACKWARD = 'f';
	char CAMERA_CAPPER_IDENTIFIER = '8';
	char CAMERA_CAPPER_PROJECTOR_IDENTIFIER = '9';
	char CAMERA_CAPPER_PROJECTORS_IDENTIFIER = '0';
	char CAMERA_FORWARD = 'e';
	char CAMERA_IDENTIFIER = 'k';
	char CAMERA_PROJECTORS_IDENTIFIER = '5';
	char CAMERA_SECOND = '3';
	char CAMERA_SECOND_BACKWARD = '2';
	char CAMERA_SECOND_FORWARD = '1';
	char CAMERA_SECOND_IDENTIFIER = 'y';
	char CAMERA_TIMED = 'n';
	char CAMERAS = '4';
	char CAMERAS_IDENTIFIER = 'a';
	char CAMERAS_PROJECTOR_IDENTIFIER = '6';
	char CAMERAS_PROJECTORS_IDENTIFIER = '7';
	char CAPPER_IDENTIFIER = 'C';
	char CAPPER_OFF = 'B';
	char CAPPER_ON = 'A';
	char CONNECT = 'i';
	char DEBUG = 'd';
	char LIGHT = 'l';
	char LIGHT_IDENTIFIER = 'o';
	char MCOPY_IDENTIFIER = 'm';
	char PROJECTOR = 'p';
	char PROJECTOR_BACKWARD = 'h';
	char PROJECTOR_CAMERA_IDENTIFIER = 's';
	char PROJECTOR_CAMERA_LIGHT_IDENTIFIER = 'r';
	char PROJECTOR_FORWARD = 'g';
	char PROJECTOR_IDENTIFIER = 'j';
	char PROJECTOR_LIGHT_IDENTIFIER = 'q';
	char PROJECTOR_SECOND = 'w';
	char PROJECTOR_SECOND_BACKWARD = 'v';
	char PROJECTOR_SECOND_FORWARD = 'u';
	char PROJECTOR_SECOND_IDENTIFIER = 't';
	char PROJECTORS = 'x';
	char PROJECTORS_IDENTIFIER = 'd';
	char TAKEUP_BACKWARD = 'E';
	char TAKEUP_FORWARD = 'D';
	/* END CMD FLAGS */

	McopySerial();

	void begin();
	void setBaud(int baudRate);
	char loop();

	void debug (bool state);
	void log (String message);

};

#endif

#ifndef MCOPY_SERIAL
#define MCOPY_SERIAL

#include "Arduino.h"

class McopySerial {           

	private:
	volatile int baud = 57600;
	volatile bool debugOn = false;
	volatile char cmdChar = 'z';
	volatile char id;

	void _internal ();
	void _connect ();
	void _identify ();

	public:

	/* CMD FLAGS */
	static const char BLACK = 'b';
	static const char CAMERA = 'c';
	static const char CAMERA_BACKWARD = 'f';
	static const char CAMERA_CAPPER_IDENTIFIER = '8';
	static const char CAMERA_CAPPER_PROJECTOR_IDENTIFIER = '9';
	static const char CAMERA_CAPPER_PROJECTORS_IDENTIFIER = '0';
	static const char CAMERA_FORWARD = 'e';
	static const char CAMERA_IDENTIFIER = 'k';
	static const char CAMERA_PROJECTORS_IDENTIFIER = '5';
	static const char CAMERA_SECOND = '3';
	static const char CAMERA_SECOND_BACKWARD = '2';
	static const char CAMERA_SECOND_FORWARD = '1';
	static const char CAMERA_SECOND_IDENTIFIER = 'y';
	static const char CAMERA_TIMED = 'n';
	static const char CAMERAS = '4';
	static const char CAMERAS_IDENTIFIER = 'a';
	static const char CAMERAS_PROJECTOR_IDENTIFIER = '6';
	static const char CAMERAS_PROJECTORS_IDENTIFIER = '7';
	static const char CAPPER_IDENTIFIER = 'C';
	static const char CAPPER_OFF = 'B';
	static const char CAPPER_ON = 'A';
	static const char CONNECT = 'i';
	static const char DEBUG = 'd';
	static const char LIGHT = 'l';
	static const char LIGHT_IDENTIFIER = 'o';
	static const char MCOPY_IDENTIFIER = 'm';
	static const char PROJECTOR = 'p';
	static const char PROJECTOR_BACKWARD = 'h';
	static const char PROJECTOR_CAMERA_IDENTIFIER = 's';
	static const char PROJECTOR_CAMERA_LIGHT_IDENTIFIER = 'r';
	static const char PROJECTOR_FORWARD = 'g';
	static const char PROJECTOR_IDENTIFIER = 'j';
	static const char PROJECTOR_LIGHT_IDENTIFIER = 'q';
	static const char PROJECTOR_SECOND = 'w';
	static const char PROJECTOR_SECOND_BACKWARD = 'v';
	static const char PROJECTOR_SECOND_FORWARD = 'u';
	static const char PROJECTOR_SECOND_IDENTIFIER = 't';
	static const char PROJECTORS = 'x';
	static const char PROJECTORS_IDENTIFIER = 'd';
	static const char TAKEUP_BACKWARD = 'E';
	static const char TAKEUP_FORWARD = 'D';
	/* END CMD FLAGS */

	McopySerial(char identity);

	void begin();
	void setBaud(int baudRate);
	void setIdentity(char identity);
	char loop();

	void debug (bool state);
	void log (String message);

};

#endif

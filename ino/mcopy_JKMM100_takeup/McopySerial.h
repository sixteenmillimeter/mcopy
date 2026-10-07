#ifndef MCOPY_SERIAL
#define MCOPY_SERIAL

#include <Arduino.h>

class McopySerial {           

	private:

	const uint16_t serialDelay = 5;
	const uint16_t baud = 57600;

	volatile bool debugOn = false;
	volatile char cmdChar = 'z';
	volatile char id;

	void _internal ();
	void _connect ();
	void _identify ();

	public:

	volatile bool connected = false;
	volatile bool identified = false;

	/* CMD FLAGS */
	const char BLACK = 'b';
	const char CAMERA = 'c';
	const char CAMERA_BACKWARD = 'f';
	const char CAMERA_CAPPER_IDENTIFIER = '8';
	const char CAMERA_CAPPER_PROJECTOR_IDENTIFIER = '9';
	const char CAMERA_CAPPER_PROJECTORS_IDENTIFIER = '0';
	const char CAMERA_CLOSE = 'K';
	const char CAMERA_EXPOSURE = 'G';
	const char CAMERA_FORWARD = 'e';
	const char CAMERA_IDENTIFIER = 'k';
	const char CAMERA_OPEN = 'J';
	const char CAMERA_PROJECTORS_IDENTIFIER = '5';
	const char CAMERA_SECOND = '3';
	const char CAMERA_SECOND_BACKWARD = '2';
	const char CAMERA_SECOND_FORWARD = '1';
	const char CAMERA_SECOND_IDENTIFIER = 'y';
	const char CAMERA_TIMED = 'n';
	const char CAMERAS = '4';
	const char CAMERAS_IDENTIFIER = 'a';
	const char CAMERAS_PROJECTOR_IDENTIFIER = '6';
	const char CAMERAS_PROJECTORS_IDENTIFIER = '7';
	const char CAPPER_IDENTIFIER = 'C';
	const char CAPPER_OFF = 'B';
	const char CAPPER_ON = 'A';
	const char CONNECT = 'i';
	const char DEBUG = 'd';
	const char ERROR = 'E';
	const char HOME = 'I';
	const char LIGHT = 'l';
	const char LIGHT_IDENTIFIER = 'o';
	const char MCOPY_IDENTIFIER = 'm';
	const char OFFSET = 'O';
	const char PROJECTOR = 'p';
	const char PROJECTOR_BACKWARD = 'h';
	const char PROJECTOR_CAMERA_IDENTIFIER = 's';
	const char PROJECTOR_CAMERA_LIGHT_IDENTIFIER = 'r';
	const char PROJECTOR_FORWARD = 'g';
	const char PROJECTOR_IDENTIFIER = 'j';
	const char PROJECTOR_LIGHT_IDENTIFIER = 'q';
	const char PROJECTOR_SECOND = 'w';
	const char PROJECTOR_SECOND_BACKWARD = 'v';
	const char PROJECTOR_SECOND_FORWARD = 'u';
	const char PROJECTOR_SECOND_IDENTIFIER = 't';
	const char PROJECTORS = 'x';
	const char PROJECTORS_IDENTIFIER = 'd';
	const char STATE = 'H';
	const char TAKEUP_BACKWARD = 'F';
	const char TAKEUP_FORWARD = 'D';
	/* END CMD FLAGS */

	McopySerial();

	void begin(char identity);
	char loop();
	void confirm(char cmd);
	String getString();
	void print(String message);
	void sendString(String str);

	void debug (bool state);
	void log (String message);

};

#endif

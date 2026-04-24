#ifndef TAKEUP
#define TAKEUP

#include <Arduino.h>

class Takeup {           

	private:

	const uint8_t PWM = 200; //calculate corresponding RPM
	const long frameTime = 220;
	
	const uint8_t feedPin = 9;
	const uint8_t takeupPin = 10;

	volatile long timer = 0;
	volatile long feedStop = -1;
	volatile long takeupStop = -1;

	void _stopFeed();
	void _stopTakeup();

	public:

	Takeup();

	void setup();
	void loop();

	void forward();
	void backward();

};

#endif
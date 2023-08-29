#ifndef MCOPY_PROJECTOR
#define MCOPY_PROJECTOR

#include <Arduino.h>
#include <AccelStepper.h>

class McopyProjector {

	private:

	AccelStepper _takeup;
	AccelStepper _feed;

	uint8_t _motorSteps = 1600; //microstepped
	uint8_t _frames = 8;
	uint8_t _stepsPerFrame = 25; //round(_motorSteps / _frames);
	float _speed = 500.0;

	int64_t _posTakeup = 0;
	int64_t _posFeed = 0;

	const uint8_t FORWARD  = 1; //CW
	const uint8_t BACKWARD = 0; //CCW

	const uint8_t TAKEUP = 0;
	const uint8_t FEED   = 0;

	bool _dir = true;

	bool _running = false;
	bool _adjusting = false;

	public:

	McopyProjector(AccelStepper takeup, AccelStepper feed);
	void begin();
	//0 = takeup, 1 = feed
	void adjust(uint8_t motor, int64_t steps);
	void adjustBoth(int64_t steps);
	//true = forward, false = back
	void frame(bool dir);
	void setDirection(bool dir);
	void loop();
};

#endif
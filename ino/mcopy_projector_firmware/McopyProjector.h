#ifndef MCOPY_PROJECTOR
#define MCOPY_PROJECTOR

#include <Arduino.h>
#include "IteadDualStepperShield.h"

class McopyProjector {

	private:

	IteadDualStepperShield steppers;

	uint8_t _motorSteps = 200;
	uint8_t _frames = 8;
	uint8_t _stepsPerFrame = 25; //round(_motorSteps / _frames);
	uint16_t _speed = 300;

	int64_t _posTakeup = 0;
	int64_t _posFeed = 0;

	const uint8_t FORWARD  = 1; //CW
	const uint8_t BACKWARD = 0; //CCW

	const uint8_t TAKEUP = 0;
	const uint8_t FEED   = 0;

	bool _dir = true;

	public:

	McopyProjector();
	void begin();
	//0 = takeup, 1 = feed
	void adjust(uint8_t motor, int64_t steps);
	void adjustBoth(int64_t steps);
	//true = forward, false = back
	void frame(bool dir);
	void frames(bool dir, uint64_t count);
	void setDirection(bool dir);
};

#endif
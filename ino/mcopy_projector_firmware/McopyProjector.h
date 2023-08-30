#ifndef MCOPY_PROJECTOR
#define MCOPY_PROJECTOR

#include <Arduino.h>
#include <AccelStepper.h>

/**
 * D2 X Step
 * D3  X Direction
 * D4  X MS1 setting
 * D5  X MS2 setting
 * D6  Y Step
 * D7  Y Direction
 * D8  Y MS1 setting
 * D9  Y MS2 setting
 *
 * MS1(X/Y)  MS2(X/Y)  Description
 * L         L         Full step
 * H         L         Half step
 * L         H         Quarter step
 * H         H         Eighth STEP
 **/

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


	uint8_t _takeupSettingA = 4;
	uint8_t _takeupSettingB = 5;
	uint8_t _feedSettingA = 8;
	uint8_t _feedSettingB = 9;

	bool _dir = true;

	bool _running = false;
	bool _adjusting = false;

	public:

	McopyProjector(AccelStepper takeup, AccelStepper feed,  uint8_t takeupSettingA, uint8_t takeupSettingB, uint8_t feedSettingA, uint8_t feedSettingB);
	void begin();
	//0 = takeup, 1 = feed
	void adjust(uint8_t motor, int64_t steps);
	void adjustBoth(int64_t steps);
	//true = forward, false = back
	void frame(bool dir);
	void setDirection(bool dir);
	void setStepperMode(uint8_t mode);
	void loop();
};

#endif
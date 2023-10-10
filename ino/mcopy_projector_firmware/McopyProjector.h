#ifndef MCOPY_PROJECTOR
#define MCOPY_PROJECTOR

#include <Arduino.h>
#include <AccelStepper.h>
#include <Servo.h>

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

	Servo _servo;

	const uint16_t _motorSteps = 200; //full steps
	const uint8_t _frames = 8;
	const uint16_t _stepsPerFrame = 25; //round(_motorSteps / _frames);
	const float _speed = 2000.0;

	const uint8_t _servoHome = 90;
	const uint8_t _servoAway = 60;

	volatile uint8_t _mode = 1;

	int64_t _posTakeup = 0;
	int64_t _posFeed = 0;
	//Y
	uint8_t _takeupSettingA;
	uint8_t _takeupSettingB;
	//X
	uint8_t _feedSettingA;
	uint8_t _feedSettingB;
	//Y
	uint8_t _takeupEmitter;
	uint8_t _takeupReceiver;
	//X
	uint8_t _feedEmitter;
	uint8_t _feedReceiver;

	uint8_t _servoPin;

	long _feedSamples[200]; 
	long _takeupSamples[200]; 

	bool _dir = true;

	bool _running = false;
	bool _adjusting = false;

	long readVcc();
	long analogReadAccurate (uint8_t &pin);
	long analogReadAccurateAverage (uint8_t &pin);
	uint16_t findPeak(long (&arr)[200], uint16_t &steps);
	void emitters(bool enabled);

	public:

	McopyProjector(AccelStepper takeup, AccelStepper feed,  
		uint8_t takeupSettingA, uint8_t takeupSettingB, 
		uint8_t feedSettingA, uint8_t feedSettingB,
		uint8_t takeupEmitter, uint8_t takeupReceiver,
		uint8_t feedEmitter, uint8_t feedReceiver,
		uint8_t servoPin);
	void begin();
	//0 = takeup, 1 = feed
	void adjust(uint8_t motor, int64_t steps);
	void adjustBoth(int64_t steps);
	//true = forward, false = back
	void frame(bool dir);
	void setDirection(bool dir);
	void setStepperMode(uint8_t mode);
	void loop();
	void home();
	void firstPass();
	void centerPass();

};

#endif
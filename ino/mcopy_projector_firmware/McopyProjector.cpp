/// Mcopy Projector Class

#include "McopyProjector.h"
#include "IteadDualStepperShield.h"

McopyProjector::McopyProjector () {

}

void McopyProjector::begin () {
	steppers.setup();
	steppers.setSpeed(0, _speed);
	steppers.setSpeed(1, _speed);
}

void McopyProjector::setDirection (bool dir) {
	_dir = dir;
	if (_dir) {
		steppers.setDir(0, FORWARD);
    	steppers.setDir(1, FORWARD);
	} else {
		steppers.setDir(0, BACKWARD);
    	steppers.setDir(1, BACKWARD);
	}
}

void McopyProjector::frame (bool dir) {
	if (dir != _dir) {
		setDirection(dir);
	}
	steppers.step(FEED, _stepsPerFrame, _dir ? FORWARD : BACKWARD);
	_posTakeup += dir ? _stepsPerFrame : -_stepsPerFrame;
	_posFeed += dir ? _stepsPerFrame : -_stepsPerFrame;
}

void McopyProjector::adjust(uint8_t motor, int64_t steps) {
	uint64_t s = abs(steps);
	if (steps < 0) {
		steppers.setDir(motor, BACKWARD);
	} else {
		steppers.setDir(motor, FORWARD);
	}
	steppers.step(motor, s, _dir ? FORWARD : BACKWARD);
	if (motor == 0) {
		_posTakeup += steps;
	} else if (motor == 1) {
		_posFeed += steps;
	}
	//restore set direction after adjustment
	steppers.setDir(motor, _dir ? FORWARD : BACKWARD);
}

void McopyProjector::adjustBoth(int64_t steps) {
	uint64_t s = abs(steps);
	if (steps < 0) {
		steppers.setDir(TAKEUP, BACKWARD);
		steppers.setDir(FEED,   BACKWARD);
	} else {
		steppers.setDir(TAKEUP, FORWARD);
		steppers.setDir(FEED, FORWARD);
	}
	steppers.stepBoth(s);
	_posTakeup += steps;
	_posFeed += steps;

	//restore set direction after adjustment
	steppers.setDir(TAKEUP, _dir ? FORWARD : BACKWARD);
	steppers.setDir(FEED, _dir ? FORWARD : BACKWARD);
}

void McopyProjector::frames(bool dir, uint64_t count) {

}

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
		steppers.setDir(0, 1);
    	steppers.setDir(1, 1);
	} else {
		steppers.setDir(0, 0);
    	steppers.setDir(1, 0);
	}
}

void McopyProjector::frame (bool dir) {
	if (dir != _dir) {
		setDirection(dir);
	}
	steppers.stepBoth(_stepsPerFrame);
	_posTakeup += dir ? _stepsPerFrame : -_stepsPerFrame;
	_posFeed += dir ? _stepsPerFrame : -_stepsPerFrame;
}

void McopyProjector::adjust(uint8_t motor, int32_t steps) {
	if (steps < 0) {
		steppers.setDir(motor, 0);
	} else {
		steppers.setDir(motor, 1);
	}
	steppers.step(motor, abs(steps));
	if (motor == 0) {
		_posTakeup += steps;
	} else if (motor == 1) {
		_posFeed += steps;
	}
}

void McopyProjector::adjustBoth(int32_t steps) {
	if (steps < 0) {
		steppers.setDir(0, 0);
		steppers.setDir(1, 0);
	} else {
		steppers.setDir(0, 1);
		steppers.setDir(1, 1);
	}
	steppers.stepBoth(abs(steps));
	_posTakeup += steps;
	_posFeed += steps;
}

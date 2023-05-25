
#include "IteadDualStepperShield.h"

IteadDualStepperShield::IteadDualStepperShield () {}

void IteadDualStepperShield::setup () {
	pinMode(_directionA, OUTPUT);
	pinMode(_directionB, OUTPUT);
	pinMode(_stepA, OUTPUT);
	pinMode(_stepB, OUTPUT);
	setDir(0, 1);
	setDir(1, 1);
}

void IteadDualStepperShield::setDir (uint8_t motor, uint8_t dir) {
	if (motor == 0) {
		directionA = dir;
		digitalWrite(_directionA, directionA > 0 ? HIGH : LOW);
	} else if (motor == 1) {
		directionB = dir;
		digitalWrite(_directionB, directionB  > 0 ? HIGH : LOW);
	}
}

void IteadDualStepperShield::setSpeed (uint8_t motor, uint16_t rpm) {
	uint32_t usPerStep = 60000000 / ((uint32_t) revsteps * (uint32_t) rpm);
	if (motor == 0) {
		_usStepA = usPerStep;
	} else if (motor == 1) {
		_usStepB = usPerStep;
	}
}

void IteadDualStepperShield::_micro (uint8_t motor) {
	uint8_t stepPin = motor == 0 ? _stepA : _stepB;
	uint32_t usStep = motor == 0 ? _usStepA : _usStepB;
	digitalWrite(stepPin, HIGH);
	delayMicroseconds(usStep);
	digitalWrite(stepPin, LOW);
	delayMicroseconds(usStep);
}

//full
void IteadDualStepperShield::_single (uint8_t motor) {
	uint8_t stepPin = motor == 0 ? _stepA : _stepB;
	uint32_t usStep = motor == 0 ? _usStepA : _usStepB;
	for (uint8_t i = 0; i < _microsteps; i++) {
		digitalWrite(stepPin, HIGH);
		delayMicroseconds(usStep);
		digitalWrite(stepPin, LOW);
		delayMicroseconds(usStep);
	}
}
void IteadDualStepperShield::_both () {
	for (uint8_t i = 0; i < _microsteps; i++) {
		digitalWrite(_stepA, HIGH);
		digitalWrite(_stepB, HIGH);
		delayMicroseconds(_usStepA);
		digitalWrite(_stepA, LOW);
		digitalWrite(_stepB, LOW);
		delayMicroseconds(_usStepA);
	}
}
void IteadDualStepperShield::step (uint8_t motor, uint16_t steps, uint8_t dir) {
	uint8_t stepPin = motor == 0 ? _stepA : _stepB;
	setDir(motor, dir);
	for (int i = 0; i < steps; i++) {
		_single(stepPin);
	}
}
void IteadDualStepperShield::onestep (uint8_t motor, uint8_t dir) {
	uint8_t stepPin = motor == 0 ? _stepA : _stepB;
	setDir(motor, dir);
	_single(stepPin);
}

void IteadDualStepperShield::stepBoth (uint16_t steps) {
	for (int i = 0; i < steps; i++) {
		_both();
	}
}
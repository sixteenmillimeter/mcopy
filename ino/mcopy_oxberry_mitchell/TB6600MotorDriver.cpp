#include "TB6600MotorDriver.h"

TB6600MotorDriver::TB6600MotorDriver() {
	//
}

TB6600MotorDriver::TB6600MotorDriver(uint8_t enablePin, uint8_t directionPin, uint8_t pulsePin, uint32_t usPulse, uint8_t microsteps) {
	_enablePin = enablePin;
	_directionPin = directionPin;
	_pulsePin = pulsePin;

	_usPulse = usPulse;
	_microsteps = microsteps;
	_revsteps = 200 * microsteps;
}


void TB6600MotorDriver::setup() {
	if (_enablePin != 0) {
		pinMode(_enablePin, OUTPUT);
	}
	pinMode(_directionPin, OUTPUT);
	pinMode(_pulsePin, OUTPUT);

	digitalWrite(_directionPin, LOW);
	digitalWrite(_enablePin, HIGH);
}

void TB6600MotorDriver::setDirection(uint8_t direction) {
	if (direction != _direction) {
		_direction = direction;
		_setDirection();
	}
}

void TB6600MotorDriver::_setDirection{
	digitalWrite(_directionPin, _direction ? LOW : HIGH);
}

void TB6600MotorDriver::setSpeed(uint16_t rpm) {
	_usPulse = 60000000 / ((uint32_t) revsteps * (uint32_t) rpm);
}

void TB6600MotorDriver::steps(uint64_t stepCount) {
	for (uint64_t i = 0; i < stepCount; i++) {
		_step();
	}
}

void TB6600MotorDriver::_step() {
	digitalWrite(_pulsePin, HIGH);
	delayMicroseconds(_usPulse);
	digitalWrite(_pulsePin, LOW);
	delayMicroseconds(_usPulse);
}

void TB6600MotorDriver::step() {
	_step();
}

void TB6600MotorDriver::release() {
	_enabled = false;
	_setEnable();
}

void TB6600MotorDriver::enable() {
	_enabled = true;
	_setEnable();
}

void TB6600MotorDriver::_setEnable() {
	if (_enablePin != 0) {
		digitalWrite(_enablePin, _enabled ? HIGH : LOW);
	}
}


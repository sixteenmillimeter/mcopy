#include "EndstopCameraShield.h"

volatile bool EndstopCameraShield::_direction = true; //true = forward, false = backward
volatile bool EndstopCameraShield::_enabled = false;
volatile bool EndstopCameraShield::_isClosed = false;
volatile bool EndstopCameraShield::_isOpened = false;

EndstopCameraShield::EndstopCameraShield (uint32_t usPulse, uint8_t microsteps) : _motorUsPulse(usPulse), _motorMicrosteps(microsteps), _motor(_motorEnablePin, _motorDirectionPin, _motorPulsePin, _motorUsPulse, _motorMicrosteps) {
	_stepAngle = (double) 360 / ((double) microsteps * (double) 200);
}

void EndstopCameraShield::loop () {

}

void EndstopCameraShield::setup () {
	_motor.setup();
	pinMode(_emitterOpenPin, OUTPUT);
	pinMode(_emitterClosePin, OUTPUT);

	_checkState();
	_enableMotor();
	Serial.println(_minSteps);
}

void EndstopCameraShield::_enableCloseInterrupt() {
	attachInterrupt(digitalPinToInterrupt(_receiverClosePin), EndstopCameraShield::_handleCloseInterrupt, FALLING);
}

void EndstopCameraShield::_enableOpenInterrupt() {
	attachInterrupt(digitalPinToInterrupt(_receiverOpenPin), EndstopCameraShield::_handleOpenInterrupt, FALLING);
}

void EndstopCameraShield::_enableCloseEmitter() {
	digitalWrite(_emitterClosePin, HIGH);
}

void EndstopCameraShield::_enableOpenEmitter() {
	digitalWrite(_emitterOpenPin, HIGH);
}

void EndstopCameraShield::_enableMotor() {
	_enabled = true;
	_motor.enable();
}

void EndstopCameraShield::_disableCloseInterrupt() {
	detachInterrupt(digitalPinToInterrupt(_receiverClosePin));
}

void EndstopCameraShield::_disableOpenInterrupt() {
	detachInterrupt(digitalPinToInterrupt(_receiverOpenPin));
}

void EndstopCameraShield::_disableCloseEmitter() {
	digitalWrite(_emitterClosePin, LOW);
}

void EndstopCameraShield::_disableOpenEmitter() {
	digitalWrite(_emitterOpenPin, LOW);
}

void EndstopCameraShield::_disableMotor() {
	_enabled = false;
	_motor.release();
}

void EndstopCameraShield::_handleCloseInterrupt() {
	_isClosed = true;
}

void EndstopCameraShield::_handleOpenInterrupt() {
	_isOpened = true;
}

void EndstopCameraShield::_checkState() {
	_enableCloseEmitter();
	_enableOpenEmitter();
	delay(3);
	if (digitalRead(_receiverClosePin) == LOW) {
		_isClosed = true;
	} else if (digitalRead(_receiverOpenPin) == LOW) {
		_isOpened = true;
	}
	_disableCloseEmitter();
	_disableOpenEmitter();
}

void EndstopCameraShield::_checkClose() {
	if (digitalRead(_receiverClosePin) == LOW) {
		_isClosed = true;
	} else {
		_isClosed = false;
	}
}

void EndstopCameraShield::_checkOpen() {
	if (digitalRead(_receiverOpenPin) == LOW) {
		_isOpened = true;
	} else {
		_isOpened = false;
	}
}

uint32_t EndstopCameraShield::frame() {
	bool primed = false;
	bool running = true;
	uint32_t i = 0;
	_isClosed = false;
	_enableMotor();

	while (running) {
		if (!primed && i > _minSteps) {
			_enableCloseEmitter();
			_enableOpenEmitter();
			//_enableCloseInterrupt();
			primed = true;
		}
		_checkClose();
		if (primed && _isClosed) {
			running = false;
			break;
		}
		_motor.step();
		i++;
	}
	//_disableCloseInterrupt();
	_disableCloseEmitter();
	return i;
}

uint32_t EndstopCameraShield::toOpen() {
	bool primed = false;
	bool running = true;
	uint32_t i = 0;
	_isOpened = false;
	_enableMotor();
	while (running) {
		if (!primed && i > _minSteps) {
			_enableOpenEmitter();
			_enableCloseEmitter();
			//_enableOpenInterrupt();
			primed = true;
		}
		_checkOpen();
		if (primed && _isOpened) {
			running = false;
			break;
		}
		_motor.step();
		i++;
	}
	//_disableOpenInterrupt();
	_disableOpenEmitter();
	return i;
}

uint32_t EndstopCameraShield::toClose() {
	bool primed = false;
	bool running = true;
	uint32_t i = 0;
	_isClosed = false;
	_enableMotor();
	while (running) {
		if (!primed && i > _minSteps) {
			_enableCloseEmitter();
			_enableOpenEmitter();
			//_enableCloseInterrupt();
			primed = true;
		}
		_checkClose();
		if (primed && _isClosed) {
			running = false;
			break;
		}
		_motor.step();
		i++;
	}
	_disableCloseInterrupt();
	//_disableCloseEmitter();
	return i;
}

void EndstopCameraShield::setDirection(bool direction) {
	if (direction != _direction) {
		_direction = direction;
		_motor.setDirection(_direction);
	}
}

bool EndstopCameraShield::isOpened() {
	return _isOpened;
}

bool EndstopCameraShield::isClosed() {
	return _isClosed;
}

void EndstopCameraShield::test () {
	_enableCloseEmitter();
	_enableOpenEmitter();
	delay(1000);
	for (uint32_t i = 0; i < _motorMicrosteps * 200; i++) {
		_motor.step();
		Serial.print(i);
		Serial.print(" ");
		if (digitalRead(_receiverOpenPin) == HIGH) {
			Serial.print("OPEN _ ");
		} else {
			Serial.print("OPEN x ");
		}
		if (digitalRead(_receiverClosePin) == HIGH) {
			Serial.print("CLOSE _");
		} else {
			Serial.print("CLOSE x");
		}
		Serial.println("");
	}
	_enableCloseEmitter();
	_enableOpenEmitter();
}
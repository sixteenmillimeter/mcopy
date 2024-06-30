#include "EndstopCameraShield.h"

EndstopCameraShield::EndstopCameraShield () :  motor(motorEnablePin, motorDirectionPin, motorPulsePin, motorUsPulse, motorMicrosteps) {

}

void EndstopCameraShield::loop () {

}

void EndstopCameraShield::setup () {
	motor.setup();
	pinMode(emitterOpenPin, OUTPUT);
	pinMode(emitterClosePin, OUTPUT);
}
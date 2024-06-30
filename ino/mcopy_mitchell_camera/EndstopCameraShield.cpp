#include "EndstopCameraShield.h"

EndstopCameraShield::EndstopCameraShield (uint32_t usPulse, uint8_t microsteps) : motorUsPulse(usPulse), motorMicrosteps(microsteps),   motor(motorEnablePin, motorDirectionPin, motorPulsePin, motorUsPulse, motorMicrosteps) {

}

void EndstopCameraShield::loop () {

}

void EndstopCameraShield::setup () {
	motor.setup();
	pinMode(emitterOpenPin, OUTPUT);
	pinMode(emitterClosePin, OUTPUT);
}
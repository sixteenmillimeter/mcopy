#include "EndstopCameraShield.h"
#include "McopySerial.h"

const uint32_t usPulse = 300;
const uint8_t microsteps = 2;

EndstopCameraShield cam(usPulse, microsteps);

void setup () {
	cam.setup();
}

void loop () {
	cam.loop();
}
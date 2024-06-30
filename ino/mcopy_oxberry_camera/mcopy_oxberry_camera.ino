#include "EndstopCameraShield.h"
#include "McopySerial.h"

EndstopCameraShield cam();

void setup () {
	cam.setup();
}

void loop () {
	cam.loop();
}
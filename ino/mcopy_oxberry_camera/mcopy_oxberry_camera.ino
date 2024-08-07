#include "EndstopCameraShield.h"
#include "McopySerial.h"

const bool DEBUG = false;
const uint8_t LEDPin = 13;

const uint32_t usPulse = 300;
const uint8_t microsteps = 2;
volatile char cmdChar = 'z';
volatile long now;

volatile long exposureAvg = 250; //pre-fill
volatile String exposureString;
volatile long exposureTarget = -1;

volatile bool direction = true;

EndstopCameraShield cam(usPulse, microsteps);
McopySerial mc;

void setup () {
	mc.begin(mc.CAMERA_IDENTIFIER);
	mc.debug(DEBUG);
	cam.setup();
	if (cam.isOpened()) {
		mc.log("Camera is OPENED, closing...");
		cam.toClose();
		mc.log("Camera is CLOSED");
	} else if (cam.isClosed()) {
		mc.log("Camera is CLOSED");
	} else {
		mc.log("Camera is in UNKNOWN state, closing...");
		cam.toClose();
		mc.log("Camera is CLOSED");
	}
	//cam.test();
}

void loop () {
	now = millis();
	cmdChar = mc.loop();
	cmd(cmdChar);
	cam.loop();
}

void cmd (char val) {
  if (val == mc.CAMERA_FORWARD) {
    camera_direction(true);
  } else if (val == mc.CAMERA_BACKWARD) {
    camera_direction(false);
  } else if (val == mc.CAMERA) {
    camera();
  } else if (val == mc.CAMERA_OPEN) {
  	camera_open();
  } else if (val == mc.CAMERA_CLOSE) {
  	camera_close();
  } else if (val == mc.CAMERA_EXPOSURE) {
    exposure();
  } else if (val == mc.STATE) {
    state();
  }
}

void exposure () {
    exposureString = mc.getString();
    parseExposureString();
    exposureAvg = exposureTarget;
    mc.confirm(mc.CAMERA_EXPOSURE);
}

void parseExposureString () {
    exposureTarget = exposureString.toInt();
}

void camera_direction (boolean state) {
	direction = state;
	cam.setDirection(direction);
	if (state) {
		mc.confirm(mc.CAMERA_FORWARD);
		mc.log("camera_direction(true)");
	} else {
		mc.confirm(mc.CAMERA_BACKWARD);
		mc.log("camera_direction(false)");
	}
}

void camera () {
	long start = millis();
	long half;
	long pause;
	long ms;

	if (exposureTarget > -1) {
		half = exposureAvg / 2; //assume a 180 shutter
		pause = exposureTarget - half;
		if (pause < exposureAvg) {
			cam.frame();
		} else {
			cam.toOpen();
			delay(pause);
			cam.toClose();
		}
	} else{
		cam.frame();
	}
	ms = millis() - start;
	if (exposureTarget < 0) {
		updateAvg(ms);
	}
	mc.log("camera()");
	mc.log(String(ms) + "ms");
	mc.confirm(mc.CAMERA);
}

void camera_open () {
	long start = millis();
	long ms;
	cam.toOpen();
	ms = millis() - start;
	mc.log("camera_open()");
	mc.log(String(ms) + "ms");
	mc.confirm(mc.CAMERA_OPEN);
}

void camera_close () {
	long start = millis();
	long ms;
	cam.toClose();
	ms = millis() - start;
	mc.log("camera_close()");
	mc.log(String(ms) + "ms");
	mc.confirm(mc.CAMERA_CLOSE);
}

void state () {
	String stateString = String(mc.STATE);
	stateString += String(mc.CAMERA_EXPOSURE);
	if (exposureTarget > -1) {
		stateString += String(exposureTarget);
	} else {
		stateString += String(exposureAvg);
	}
	stateString += String(mc.STATE);
	mc.sendString(stateString);
}

void updateAvg (long value) {
	exposureAvg = round((exposureAvg + value) / 2);
}
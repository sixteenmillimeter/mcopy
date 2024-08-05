#include "EndstopCameraShield.h"
#include "McopySerial.h"

const bool DEBUG = false;

//const uint8_t enableButtonPin = 9; //enable feature 
const uint8_t directionSwitchPin = 10;
const uint8_t cameraButtonPin = 11;
const uint8_t openCloseSwitchPin = 12;
const uint8_t LEDPin = 13;

const uint32_t usPulse = 300;
const uint8_t microsteps = 2;
volatile char cmdChar = 'z';
volatile long now;

volatile long exposureAvg = 250;
volatile String exposureString;
volatile long exposureTarget = -1;

volatile bool direction = true; //true forward, false backward

volatile bool directionSwitch = true; //true forward, false backward
volatile bool openCloseSwitch = true; //true closed, false opened

EndstopCameraShield cam(usPulse, microsteps);
McopySerial mc;

void setup () {
	pinMode(directionSwitchPin, INPUT_PULLUP);
	pinMode(openCloseSwitchPin, INPUT_PULLUP);
	pinMode(cameraButtonPin, INPUT_PULLUP);

	mc.begin(mc.CAMERA_IDENTIFIER);
	mc.debug(DEBUG);
	cam.setup();
	
	if (cam.isOpened()) {
		mc.log("Camera is OPENED");
	} else if (cam.isClosed()) {
		mc.log("Camera is CLOSED");
	} else {
		mc.log("Camera is in UNKNOWN state");
	}
}

void loop () {
	now = millis();
	cmdChar = mc.loop();
	cmd(cmdChar);
	cam.loop();
	buttons();
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

	if (cam.isOpened()) {
		cam.toClose();
		start = millis();
	}

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

/**
 * Button/Switch logic
 **/

void buttons () {
 	int cameraButtonState = digitalRead(cameraButtonPin);
 	int directionSwitchState = digitalRead(directionSwitchPin);
 	int openCloseSwitchState = digitalRead(openCloseSwitchPin);
 	
 	if (directionSwitchState == LOW && directionSwitch == false) {
 		directionSwitch = true;
 	} else if (directionSwitchState == HIGH && directionSwitch == true) {
 		directionSwitch = false;
 	}

 	if (openCloseSwitchState == LOW && openCloseSwitch == false) {
 		openCloseSwitch = true;
 		switch_open_close();
 	} else if (openCloseSwitchState == HIGH && openCloseSwitch == true) {
 		openCloseSwitch = false;
 		switch_open_close();
 	}

 	if (cameraButtonState == LOW) {
 		button_camera();
 	}
}

void button_camera () {
 	long start = millis();
	long ms;

	if (direction != directionSwitch) {
		cam.setDirection(directionSwitch);
	}

	if (cam.isOpened()) {
		cam.toClose();
		start = millis();
	}

	cam.frame();
	ms = millis() - start;
	updateAvg(ms);

	mc.log("button_camera()");

	if (direction != directionSwitch) {
		cam.setDirection(direction);
	}
}

void switch_open_close () {
	if (direction != directionSwitch) {
		cam.setDirection(directionSwitch);
	}
	if (openCloseSwitch && !cam.isClosed()) {
		cam.toClose();
	} else if (!openCloseSwitch && !cam.isOpened()) {
		cam.toOpen();
	}
	if (direction != directionSwitch) {
		cam.setDirection(direction);
	}
}
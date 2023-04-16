#include <Adafruit_MotorShield.h>
#include "McopySerial.h"

volatile boolean cam_dir = true; 
volatile boolean running = true;

const int stepsPerRevolution = 200;  
const int fullRotation = 3 * stepsPerRevolution;
const int openRotationForward = 300;
const int openRotationBackward = 300;

volatile char cmdChar = 'z';
volatile long now;
volatile long cameraFrame = -1;

Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 
//Set up for a 200step motor (NEMA 17)
Adafruit_StepperMotor *stepper = AFMS.getStepper(stepsPerRevolution, 2);

McopySerial mc;

void setupMotor () {
	//TWBR = ((F_CPU /400000l) - 16) / 2; // Change the i2c clock to 400KHz
  if (!AFMS.begin()) { // default frequency 1.6KHz
    mc.log("Could not find Motor Shield. Check wiring.");
    while (1);
  }
  
  mc.log("Motor Shield found.");
  stepper->setSpeed(600);
}

void setup() {
  mc.begin(mc.CAMERA_IDENTIFIER);
  setupMotor();
}

void loop() {
	now = millis();
  cmdChar = mc.loop();
  cmd(cmdChar);
}

void cmd (char val) {
  if (val == mc.CAMERA_FORWARD) {
    setDir(true);
  } else if (val == mc.CAMERA_BACKWARD) {
    setDir(false);
  } else if (val == mc.CAMERA) {
    cam();
  }
}

void setDir (boolean dir) {
  cam_dir = dir;
  if (cam_dir) {
  	mc.confirm(mc.CAMERA_FORWARD);
  	mc.log("setDir = true");
  } else {
  	mc.confirm(mc.CAMERA_BACKWARD);
  	mc.log("setDir -> false");
	}
}

void cam () {
	long startTime = millis();
	if (cam_dir) {
		stepper->step(fullRotation, FORWARD, DOUBLE);
    mc.log("cam() -> forward");
	} else {
		stepper->step(fullRotation, BACKWARD, DOUBLE);
    mc.log("cam() -> backward");
	}
  mc.confirm(mc.CAMERA);
  if (cameraFrame == -1) {
    cameraFrame = millis() - startTime;
  } else {
    cameraFrame = round((cameraFrame + (millis() - startTime)) / 2);
  }
	mc.log(String(cameraFrame));
}

void state () {
  String stateString = String(mc.CAMERA_EXPOSURE);
  stateString += String(cameraFrame);
  stateString += String(mc.STATE);
  mc.print(stateString);
}
/*

  JK-compatible projector element

  Hardware

  Arduino Uno
  Itead Dual Stepper Shield
  2x NEMA17 Stepper Motors

  Wiring
  
  (Will vary from motor to motor)
  X01A - Green
  X01B - Black
  X02A - Blue
  X02B - Red

  Y01A - Green
  Y01B - Black
  Y02A - Blue
  Y02B - Red
*/

#include "McopySerial.h"
#include "IteadDualStepperShield.h"

//CAMERA CONSTANTS
const int BUTTON = 7;
const int LED_FWD = 8;
const int LED_BWD = 9;

const int PROJECTOR_MOMENT = 240;
const int PROJECTOR_STEPS = 25;

//VARIABLES
volatile int projectorFrame = -1;
volatile char cmdChar = 'z';
volatile long now;
volatile bool direction = true;
volatile long start;

McopySerial mcopy;
IteadDualStepperShield steppers;

void setup () {
  steppers.setup();
  steppers.setSpeed(0, 2000);
  steppers.setSpeed(1, 2000);

  pins();
  digitalWrite(LED_FWD, HIGH);
  digitalWrite(LED_BWD, HIGH);
  mcopy.begin(mcopy.PROJECTOR_IDENTIFIER);
  delay(42);
  digitalWrite(LED_FWD, LOW);
  digitalWrite(LED_BWD, LOW);
}

void loop () {
  now = millis();
  cmdChar = mcopy.loop();
  cmd(cmdChar);
  if (digitalRead(BUTTON) == LOW) {
    projector();
  }
}

void pins () {
  pinMode(LED_FWD, OUTPUT);
  pinMode(LED_BWD, OUTPUT);
  pinMode(BUTTON, INPUT_PULLUP);

  digitalWrite(LED_FWD, LOW);
  digitalWrite(LED_BWD, LOW);
}

void cmd (char val) {
  if (val == mcopy.CAMERA_FORWARD) {
    projector_direction(true);
  } else if (val == mcopy.CAMERA_BACKWARD) {
    projector_direction(false);
  } else if (val == mcopy.PROJECTOR) {
    projector();
  } else if (val == mcopy.STATE) {
    state();
  }
}

void projector_direction (boolean state) {
  direction = state;
  if (state) {
    mcopy.confirm(mcopy.PROJECTOR_FORWARD);
    mcopy.log("projector_direction(true)");
    steppers.setDir(0, 1);
    steppers.setDir(1, 1);
  } else {
    mcopy.confirm(mcopy.PROJECTOR_BACKWARD);
    mcopy.log("projector_direction(false)");
    steppers.setDir(0, 0);
    steppers.setDir(1, 0);
  }
}

void projector_timing_start () {
  start = millis();
}

void projector_timing_end () {
  long end = millis();
  if (projectorFrame == -1) {
    projectorFrame = (end - start);
  } else {
    //rolling mean
    projectorFrame = (projectorFrame + (end - start) / 2);
  }
}

void projector () {
  int LED = direction ? LED_FWD : LED_BWD;
  digitalWrite(LED, HIGH);
  steppers.stepBoth(PROJECTOR_STEPS);
  mcopy.confirm(mcopy.PROJECTOR);
  digitalWrite(LED, LOW);
}

void state () {
  String stateString = String(mcopy.CAMERA_EXPOSURE);
  stateString += String(cameraFrame);
  stateString += String(mcopy.STATE);
  mcopy.print(stateString);
}

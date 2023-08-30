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
#include "McopyProjector.h"
#include "McopySerial.h"
#include <AccelStepper.h>

#define TAKEUP_DIR_PIN 3
#define TAKEUP_STEP_PIN 2

#define FEED_DIR_PIN 7
#define FEED_STEP_PIN 6

#define TAKEUP_SETTINGS_A 4
#define TAKEUP_SETTINGS_B 5

#define FEED_SETTINGS_A 8
#define FEED_SETTINGS_B 9

AccelStepper takeup(AccelStepper::DRIVER, TAKEUP_STEP_PIN, TAKEUP_DIR_PIN);
AccelStepper feed(AccelStepper::DRIVER, FEED_STEP_PIN, FEED_DIR_PIN);

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
McopyProjector projector(takeup, feed, TAKEUP_SETTINGS_A, TAKEUP_SETTINGS_B, FEED_SETTINGS_A, FEED_SETTINGS_B);

void setup () {
  pins();
  digitalWrite(LED_FWD, HIGH);
  digitalWrite(LED_BWD, HIGH);
  mcopy.begin(mcopy.PROJECTOR_IDENTIFIER);
  projector.begin();
  delay(42);
  digitalWrite(LED_FWD, LOW);
  digitalWrite(LED_BWD, LOW);
}

void loop () {
  now = millis();
  cmdChar = mcopy.loop();
  cmd(cmdChar);
  if (digitalRead(BUTTON) == LOW) {
    projector_frame();
  }
  projector.loop();
}

void pins () {
  pinMode(LED_FWD, OUTPUT);
  pinMode(LED_BWD, OUTPUT);
  pinMode(BUTTON, INPUT_PULLUP);

  digitalWrite(LED_FWD, LOW);
  digitalWrite(LED_BWD, LOW);
}

void cmd (char val) {
  if (val == mcopy.PROJECTOR_FORWARD) {
    projector_direction(true);
  } else if (val == mcopy.PROJECTOR_BACKWARD) {
    projector_direction(false);
  } else if (val == mcopy.PROJECTOR) {
    projector_frame();
  } else if (val == mcopy.STATE) {
    state();
  }
}

void projector_direction (boolean state) {
  direction = state;
  if (state) {
    mcopy.confirm(mcopy.PROJECTOR_FORWARD);
    mcopy.log("projector_direction(true)");
    projector.setDirection(true);
  } else {
    mcopy.confirm(mcopy.PROJECTOR_BACKWARD);
    mcopy.log("projector_direction(false)");
    projector.setDirection(false);
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

void projector_frame () {
  int LED = direction ? LED_FWD : LED_BWD;
  digitalWrite(LED, HIGH);
  projector.frame(direction);
  mcopy.confirm(mcopy.PROJECTOR);
  digitalWrite(LED, LOW);
}

void state () {
  String stateString = String(mcopy.CAMERA_EXPOSURE);
  stateString += String(projectorFrame);
  stateString += String(mcopy.STATE);
  mcopy.print(stateString);
}

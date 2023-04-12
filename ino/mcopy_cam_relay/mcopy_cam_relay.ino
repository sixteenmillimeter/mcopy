/*

  Control a camera with a single relay that
  triggers a shutter release.

  Hardware

  Arduino Nano
  Relay module
  LED
  480 Ohm resistor

  Wiring
  
  CAMERA
  Wire directly to corresponding relay pins.
  Arduino  2  5V   GND
  Relay    1  VCC  GND
*/

#include "McopySerial.h"

//CAMERA CONSTANTS
const int CAMERA = 2;
const int BUTTON = 7;
const int LED = 8;

const int CAMERA_MOMENT = 240;

//VARIABLES
volatile int cameraFrame = 2000;
volatile char cmdChar = 'z';
volatile long now;

McopySerial mc;

void setup () {
  pins();
  digitalWrite(LED, HIGH);
  mc.begin(mc.CAMERA_IDENTIFIER);
  delay(42);
  digitalWrite(LED, LOW);
}

void loop () {
  now = millis();
  cmdChar = mc.loop();
  cmd(cmdChar);
  if (digitalRead(BUTTON) == LOW) {
    camera();
  }
}

void pins () {
  pinMode(CAMERA, OUTPUT);
  pinMode(LED, OUTPUT);
  pinMode(BUTTON, INPUT_PULLUP);

  digitalWrite(CAMERA, LOW);
  digitalWrite(LED, LOW);

}

void cmd (char val) {
  if (val == mc.CAMERA_FORWARD) {
    camera_direction(true);
  } else if (val == mc.CAMERA_BACKWARD) {
    camera_direction(false);
  } else if (val == mc.CAMERA) {
    camera();
  } else if (val == mc.STATE) {
    state();
  }
}

//null route direction
void camera_direction (boolean state) {
  if (state) {
    mc.confirm(mc.CAMERA_FORWARD);
    mc.log("camera_direction(true)");
  } else {
    mc.confirm(mc.CAMERA_BACKWARD);
    mc.log("camera_direction(false)");
  }
}

void camera () {
  digitalWrite(CAMERA, HIGH);
  digitalWrite(LED, HIGH);
  delay(CAMERA_MOMENT);
  digitalWrite(CAMERA, LOW);
  delay(cameraFrame - CAMERA_MOMENT);
  digitalWrite(LED, LOW);
  mc.confirm(mc.CAMERA);
}

void state () {
  String stateString = String(mc.CAMERA_EXPOSURE);
  stateString += String(cameraFrame);
  stateString += String(mc.STATE);
  mc.print(stateString);
}

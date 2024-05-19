/*
 * Sketch containing firmware for the ACME Trebes
 * optical printer with an existing Nanolab modification.
 * 
 * Uses an Arduino Uno compatible board, a Sainsmart 
 * 8 relay module board and an ON/OFF toggle switch.
 * Each relay is wired into a momentary switch in 
 * the Nanolab modification box.


  Wiring

  CAMERA (OPTIONAL) + PROJECTOR + PROJECTOR 2

  Wire to corresponding pins
  Arduino  2   3   4   5   6   7   5V   GND
  Relay    1   2   3   4   5   6   VCC  GND
  Nanolab  P2B P2F PB  PF  CB  CF

  Arduino  12  GND
  Switch   A   B
  
*/

#include "McopySerial.h"

//CAMERA CONSTANTS
const int CAMERA_FORWARD_PIN  = 7;
const int CAMERA_BACKWARD_PIN = 6;

const int CAMERA_MOMENT = 300;
const int CAMERA_LENGTH = 1000;

//PROJECTOR CONSTANTS
const int PROJECTOR_FORWARD_PIN  = 5;
const int PROJECTOR_BACKWARD_PIN = 4;

const int PROJECTOR_SECOND_FORWARD_PIN  = 3;
const int PROJECTOR_SECOND_BACKWARD_PIN = 2;

const int PROJECTOR_MOMENT = 800;
const int PROJECTOR_LENGTH = 900;

//OTHER CONSTATNS
const int MODE_SWITCH_PIN = 12;
const int LED_PIN         = 13;

//VARIABLES
volatile bool cameraModeOn = false;
volatile char cmdChar = 'z';
volatile long now;

bool cam_dir = true;
bool proj_dir = true; 
bool proj2_dir = true;

McopySerial mc;

void setup () {
  pins();
  digitalWrite(LED_PIN, HIGH);
  cameraMode();
  if (cameraModeOn) {
    mc.begin(mc.CAMERA_PROJECTORS_IDENTIFIER);
  } else {
    mc.begin(mc.PROJECTORS_IDENTIFIER);
  }
  delay(42);
  digitalWrite(LED_PIN, HIGH);
}

void loop () {
  now = millis();
  cmdChar = mc.loop();
  cmd(cmdChar);
}

void cameraMode () {
  for (uint8_t i = 0; i < 3; i++) {
    //low
    if (digitalRead(MODE_SWITCH_PIN) == LOW && !cameraModeOn) {
      cameraModeOn = true;
    }
    delay(3);
  }
}

void pins () {
  pinMode(MODE_SWITCH_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);

  pinMode(CAMERA_FORWARD_PIN, OUTPUT);
  pinMode(CAMERA_BACKWARD_PIN, OUTPUT);
  pinMode(PROJECTOR_FORWARD_PIN, OUTPUT);
  pinMode(PROJECTOR_BACKWARD_PIN, OUTPUT);
  pinMode(PROJECTOR_SECOND_FORWARD_PIN, OUTPUT);
  pinMode(PROJECTOR_SECOND_BACKWARD_PIN, OUTPUT);

  digitalWrite(CAMERA_FORWARD_PIN, HIGH);
  digitalWrite(CAMERA_BACKWARD_PIN, HIGH);
  digitalWrite(PROJECTOR_FORWARD_PIN, HIGH);
  digitalWrite(PROJECTOR_BACKWARD_PIN, HIGH);
  digitalWrite(PROJECTOR_SECOND_FORWARD_PIN, HIGH);
  digitalWrite(PROJECTOR_SECOND_BACKWARD_PIN, HIGH);
}

void cmd (char val) {
  if (cameraModeOn && val == mc.CAMERA_FORWARD) {
    camera_direction(true);
  } else if (cameraModeOn && val == mc.CAMERA_BACKWARD) {
    camera_direction(false);
  } else if (cameraModeOn && val == mc.CAMERA) {
    camera();
  } else if (val == mc.PROJECTOR_FORWARD) {
    projector_direction(true);
  } else if (val == mc.PROJECTOR_BACKWARD) {
    projector_direction(false);
  } else if (val == mc.PROJECTOR) {
    projector();
  } else if (val == mc.PROJECTOR_SECOND_FORWARD) {
    projector_second_direction(true);
  } else if (val == mc.PROJECTOR_SECOND_BACKWARD) {
    projector_second_direction(false);
  } else if (val == mc.PROJECTOR_SECOND) {
    projector_second();
  } else if (val == mc.PROJECTORS) {
    projectors();
  }
}

void camera_direction (bool dir) {
  cam_dir = dir;
  if (cam_dir) {
    mc.log("Camera direction set to forward");
    mc.confirm(mc.CAMERA_FORWARD);
  } else {
    mc.log("Camera direction set to backward");
    mc.confirm(mc.CAMERA_BACKWARD);
  }
}

void camera () {
  if (cam_dir) {
    digitalWrite(CAMERA_FORWARD_PIN, LOW);
  } else {
    digitalWrite(CAMERA_BACKWARD_PIN, LOW);
  }
  delay(CAMERA_MOMENT);
  if (cam_dir) {
    digitalWrite(CAMERA_FORWARD_PIN, HIGH);
  } else {
    digitalWrite(CAMERA_BACKWARD_PIN, HIGH);
  }
  delay(CAMERA_LENGTH - CAMERA_MOMENT);
  mc.log("camera()");
  mc.confirm(mc.CAMERA);
}

void projector_direction (bool dir) {
  proj_dir = dir;
  if (proj_dir) {
    mc.log("Projector direction set to forward");
    mc.confirm(mc.PROJECTOR_FORWARD);
  } else {
    mc.log("Projector direction set to backward");
    mc.confirm(mc.PROJECTOR_BACKWARD);
  }
}

void projector () {
  if (proj_dir) {
    digitalWrite(PROJECTOR_FORWARD_PIN, LOW);
  } else {
    digitalWrite(PROJECTOR_BACKWARD_PIN, LOW);
  }
  delay(PROJECTOR_MOMENT);
  if (proj_dir) {
    digitalWrite(PROJECTOR_FORWARD_PIN, HIGH);
  } else {
    digitalWrite(PROJECTOR_BACKWARD_PIN, HIGH);
  }
  delay(PROJECTOR_LENGTH - PROJECTOR_MOMENT);
  mc.log("projector()");
  mc.confirm(mc.PROJECTOR);
}

void projector_second_direction (bool dir) {
  proj2_dir = dir;
  if (proj2_dir) {
    mc.log("Projector second direction set to forward");
    mc.confirm(mc.PROJECTOR_SECOND_FORWARD);
  } else {
    mc.log("Projector second direction set to backward");
    mc.confirm(mc.PROJECTOR_SECOND_BACKWARD);
  }
}

void projector_second () {
  if (proj2_dir) {
    digitalWrite(PROJECTOR_SECOND_FORWARD_PIN, LOW);
  } else {
    digitalWrite(PROJECTOR_SECOND_BACKWARD_PIN, LOW);
  }
  delay(PROJECTOR_MOMENT);
  if (proj2_dir) {
    digitalWrite(PROJECTOR_SECOND_FORWARD_PIN, HIGH);
  } else {
    digitalWrite(PROJECTOR_SECOND_BACKWARD_PIN, HIGH);
  }
  delay(PROJECTOR_LENGTH - PROJECTOR_MOMENT);
  mc.log("projector_second()");
  mc.confirm(mc.PROJECTOR_SECOND);
}

void projectors () {
  if (proj_dir) {
    digitalWrite(PROJECTOR_FORWARD_PIN, LOW);
  } else {
    digitalWrite(PROJECTOR_BACKWARD_PIN, LOW);
  }
  delay(PROJECTOR_MOMENT);
  if (proj_dir) {
    digitalWrite(PROJECTOR_FORWARD_PIN, HIGH);
  } else {
    digitalWrite(PROJECTOR_BACKWARD_PIN, HIGH);
  }
  delay(PROJECTOR_LENGTH - PROJECTOR_MOMENT);
  if (proj2_dir) {
    digitalWrite(PROJECTOR_SECOND_FORWARD_PIN, LOW);
  } else {
    digitalWrite(PROJECTOR_SECOND_BACKWARD_PIN, LOW);
  }
  delay(PROJECTOR_MOMENT);
  if (proj2_dir) {
    digitalWrite(PROJECTOR_SECOND_FORWARD_PIN, HIGH);
  } else {
    digitalWrite(PROJECTOR_SECOND_BACKWARD_PIN, HIGH);
  }
  delay(PROJECTOR_LENGTH - PROJECTOR_MOMENT);
  mc.log("projectors()");
  mc.confirm(mc.PROJECTORS);
}
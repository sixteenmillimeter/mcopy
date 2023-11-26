/*
 * Sketch containing firmware for the JKMM100
 * A collaboration between MONO NO AWARE and mcopy.
 * Compatible with JK105 hardware.
 * 
 * Uses an Arduino Uno compatible board and a
 * custom PCB. 
 * Rrelay module for proj : 

  Wiring

  PROJECTOR + PROJECTOR_DIR

  Wire to corresponding pins
  Arduino  3    4   5V   GND
  Relay    1    2   VCC  GND

  For controling JK Projectors 106 models
  Solid state relays connect to:
  2uf run capacitory
  400 Ohm Resistor (50W)


  PINS FOR PROJ WIRE

  #
  1 -
  2 -
  3 -
  4 -

  Relay 1 corresponds to FWD
  Relay 2 corresponse to BWD
  
*/

#include "McopySerial.h"

volatile unsigned long now;

//PROJECTOR CONSTANTS
const int PROJECTOR_MICROSWITCH = 11;
const int LED_FWD = 12;
const int LED_BWD = 13;

const int PROJECTOR_FWD = 3;
const int PROJECTOR_BWD = 4; 

const int PROJECTOR_MOMENT = 240;
const int PROJECTOR_FRAME = 600;
const int PROJECTOR_MICROSWITCH_CLOSED = 0;
const int PROJECTOR_MICROSWITCH_OPENED = 1;
const int PROJECTOR_HALF_TIME = 450;
const int PROJECTOR_STOP_DELAY = 15;

//PROJECTOR VARIABLES
boolean proj_dir = true; 
boolean proj_running = false;
boolean proj_primed = false;
volatile int proj_micro_state = 0;
volatile long proj_time = 0;
volatile long proj_avg = -1;

volatile char cmdChar = 'z';

McopySerial mc;

void setup () {
  pins();
  digitalWrite(LED_FWD, HIGH);
  digitalWrite(LED_BWD, HIGH);
  mc.begin(mc.PROJECTOR_IDENTIFIER);
  delay(42);
  digitalWrite(LED_FWD, LOW);
  digitalWrite(LED_BWD, LOW);
}

void loop () {
  now = millis();
  if (proj_running) {
    proj_microswitch();
  } else {
    cmdChar = mc.loop();
    cmd(cmdChar);
  }
}

void pins () {
  pinMode(PROJECTOR_MICROSWITCH, INPUT_PULLUP);
  pinMode(PROJECTOR_FWD, OUTPUT);
  pinMode(PROJECTOR_BWD, OUTPUT);
  pinMode(LED_FWD, OUTPUT);
  pinMode(LED_BWD, OUTPUT);

  digitalWrite(PROJECTOR_FWD, LOW);
  digitalWrite(PROJECTOR_BWD, LOW);

  digitalWrite(LED_FWD, LOW);
  digitalWrite(LED_BWD, LOW);
}

void cmd (char val) {
  if (val == mc.PROJECTOR_FORWARD) {
    proj_direction(true);
  } else if (val == mc.PROJECTOR_BACKWARD) {
    proj_direction(false);
  } else if (val == mc.PROJECTOR) {
    proj_start();
  } else if (val == mc.STATE) {
    state();
  }
}

void proj_start () {
  proj_time = millis();

  if (proj_dir) {
    digitalWrite(PROJECTOR_FWD, HIGH);
    digitalWrite(LED_FWD, HIGH);
  } else {
    digitalWrite(PROJECTOR_BWD, HIGH);
    digitalWrite(LED_BWD, HIGH);
  }
  
  proj_running = true;
}

void proj_stop () {
  //stop both directions
  //delay(10);
  digitalWrite(PROJECTOR_FWD, LOW);
  digitalWrite(PROJECTOR_BWD, LOW);
  digitalWrite(LED_FWD, LOW);
  digitalWrite(LED_BWD, LOW);

  if (digitalRead(PROJECTOR_MICROSWITCH) == PROJECTOR_MICROSWITCH_CLOSED) {
    if (proj_dir) {
      digitalWrite(PROJECTOR_BWD, HIGH);
      delay(PROJECTOR_STOP_DELAY);
      digitalWrite(PROJECTOR_BWD, LOW);
    } else {
      digitalWrite(PROJECTOR_FWD, HIGH);
      delay(PROJECTOR_STOP_DELAY);
      digitalWrite(PROJECTOR_FWD, LOW);
    }
  }

  mc.confirm(mc.PROJECTOR);
  mc.log("projector()");
  proj_running = false;

  update_timing(millis() - proj_time);
  delay(10);
  mc.log(String(digitalRead(PROJECTOR_MICROSWITCH)));
}

void proj_direction (boolean state) {
  proj_dir = state;
  if (state) {
    mc.confirm(mc.PROJECTOR_FORWARD);
    mc.log("proj_direction -> true");
  } else {
    mc.confirm(mc.PROJECTOR_BACKWARD);
    mc.log("proj_direction -> false");
  }
}

//LOW=0=CLOSED
//HIGH=1=OPEN
void proj_microswitch () {
  int val = digitalRead(PROJECTOR_MICROSWITCH);
  if (!proj_primed                                  // if not primed
    && val != proj_micro_state                      // AND if state changes
    && val == PROJECTOR_MICROSWITCH_OPENED          // AND state changes to open
    && now - proj_time > PROJECTOR_HALF_TIME) { 
    //prime
    mc.log("proj_primed => true");
    proj_micro_state = val;
    proj_primed = true;
  } else if (proj_primed                              //if primed
        && val != proj_micro_state                    //AND if state changes
        && val == PROJECTOR_MICROSWITCH_CLOSED        //AND state changes to open
        && now - proj_time > PROJECTOR_HALF_TIME) {   //AND total elapsed time is greater than half frame time
    //stop
    proj_primed = false;
    proj_micro_state = val; //unneeded?
    proj_stop();
  } else {
    //delay(1); //some smothing value
  }
}

void update_timing (int timing) {
  if (proj_avg == -1) {
    proj_avg = timing;
  } else {
    proj_avg = (int) round((proj_avg + timing) / 2);
  }
  mc.log(String(timing) + "ms");
}

void state () {
  String stateString = String(mc.CAMERA_EXPOSURE);
  stateString += String(proj_avg);
  stateString += String(mc.STATE);
  mc.print(stateString);
}

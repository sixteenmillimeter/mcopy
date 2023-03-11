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
  Arduino  9   10   5V   GND
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
const int PROJECTOR_MICROSWITCH = 8;

const int PROJECTOR_FWD = 9;
const int PROJECTOR_BWD = 10; 
const int PROJECTOR_ON = 11;

const int PROJECTOR_MOMENT = 240;
const int PROJECTOR_FRAME = 600;
const int PROJECTOR_MICROSWITCH_CLOSED = 0;
const int PROJECTOR_MICROSWITCH_OPENED = 1;
const int PROJECTOR_HALF_TIME = 450;

//PROJECTOR VARIABLES
boolean proj_dir = true; 
boolean proj_running = false;
boolean proj_primed = false;
volatile int proj_micro_state = 0;
volatile long proj_time = 0;

volatile char cmdChar = 'z';

McopySerial mc(McopySerial::PROJECTOR_IDENTIFIER);

void setup () {
  mc.begin();
  pins();
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
  pinMode(PROJECTOR_ON, OUTPUT);

  digitalWrite(PROJECTOR_FWD, LOW);
  digitalWrite(PROJECTOR_BWD, LOW);
  digitalWrite(PROJECTOR_ON, LOW);
}

void cmd (char val) {
  if (val == McopySerial::PROJECTOR_FORWARD) {
    proj_direction(true); //explicit
  } else if (val == McopySerial::PROJECTOR_BACKWARD) {
    proj_direction(false);
  } else if (val == McopySerial::PROJECTOR) {
    proj_start();
  }
}

void proj_start () {
  proj_time = millis();
  
  digitalWrite(PROJECTOR_ON, HIGH);

  if (proj_dir) {
    digitalWrite(PROJECTOR_FWD, HIGH);
  } else {
    digitalWrite(PROJECTOR_BWD, HIGH);
  }
  
  proj_running = true;
}

void proj_stop () {
  //stop both directions
  delay(10);
  digitalWrite(PROJECTOR_ON, LOW);
  digitalWrite(PROJECTOR_FWD, LOW);
  digitalWrite(PROJECTOR_BWD, LOW);

  //evaluate total time

  mc.confirm(McopySerial::PROJECTOR);
  mc.log("projector()");
  proj_running = false;

  //Serial.println(millis() - proj_time);
}

void proj_direction (boolean state) {
  proj_dir = state;
  if (state) {
    mc.confirm(McopySerial::PROJECTOR_FORWARD);
    mc.log("proj_direction -> true");
  } else {
    mc.confirm(McopySerial::PROJECTOR_BACKWARD);
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
    //delay(2); //some smothing value
  }
}

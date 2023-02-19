/**
 * This is a specialized version of the mcopy firmware for
 * controlling the JK104-R/Bolex camera of the optical printer 
 * at MONO NO AWARE. This uses a Sainsmart 8 Solid State Relay 
 * board wired into the directional switches of a JK104-R/Bolex camera 
 * controller box, a secondary projector controller box and it 
 * runs on an Arduino Uno compatible board.
 * 
 * 7/17/2022
 * 
 * This firmware has been modified to include an optional capper element.
 * 
 * Pins 
 * 12 - CH1 - BWD CAM 1
 * 11 - CH2 - FWD CAM 1 (bridged to CH1)
 * 10 - CH3 - BWD CAM 1
 * 09 - CH4 - FWD CAM 1  (bridged to CH3)
 * 08 - CH5 - BWD CAM 1
 *  - controls the directional relays of the Bolex Camera.
 * 07 - CH8 - 4 pronged trigger cable
 *  - triggers the camera
 * 
 * 06 - SIGNAL - Capper servo signal
 * 05 - GND - Closed circuit to GND in cable to detect capper is attached.
 */

#include <Servo.h>

boolean debug_state = false;

Servo servo;

const int cam_bwd_pin_1 = 12;
const int cam_fwd_pin_1 = 11;
const int cam_bwd_pin_2 = 10;
const int cam_fwd_pin_2 = 9;
const int cam_bwd_pin_3 = 8;
const int cam_pin = 7;
const int capper_pin = 6; //servo
const int capper_exists_pin = 5;

const int cam_momentary = 60;
const int cam_time = 600; //secondary projector speed
const int cam_delay = 42;

volatile boolean cam_dir = true; 
volatile boolean cam_running = false;
volatile boolean capper_exists = false;
volatile boolean capper_state = false;

volatile int capper_angle = 0; 
const int capper_on_angle = 153; // tune this variable to your servo
const int capper_off_angle = 93; // -60 degrees apart

//SG-5010 speed 0.18s / 60 degree
//
//converted to milliseconds/angle
const float servo_speed = 400.0 / 60.0;

const char cmd_camera = 'c';
const char cmd_cam_forward = 'e';
const char cmd_cam_backward = 'f';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_cam_identifier = 'k';

const char cmd_camera_capper_identifier = '8';
const char cmd_capper_on = 'A';
const char cmd_capper_off = 'B';

const int serialDelay = 5;

void setup() {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);
  
  pinMode(cam_fwd_pin_1, OUTPUT);
  pinMode(cam_bwd_pin_1, OUTPUT);
  
  pinMode(cam_fwd_pin_2, OUTPUT);
  pinMode(cam_bwd_pin_2, OUTPUT);
  
  pinMode(cam_bwd_pin_3, OUTPUT);
  
  pinMode(cam_pin, OUTPUT);

  pinMode(capper_exists_pin, INPUT_PULLUP);

  digitalWrite(cam_pin, LOW);
  
  digitalWrite(cam_fwd_pin_1, HIGH);
  digitalWrite(cam_fwd_pin_2, HIGH);
  
  digitalWrite(cam_bwd_pin_1, LOW);
  digitalWrite(cam_bwd_pin_2, LOW);
  digitalWrite(cam_bwd_pin_3, LOW);

  capper_init();
}

void loop() {
  if (Serial.available()) {
    /* read the most recent byte */
    cmd_char = (char)Serial.read();
  }
  if (cmd_char != 'z') {
    cmd(cmd_char);
    cmd_char = 'z';
  }
}

void cmd (char val) {
  if (val == cmd_debug) {
    debug();
  } else if (val == cmd_connect) {
    connect();
  } else if (val == cmd_mcopy_identifier) {
    identify();
  } else if (val == cmd_camera) {
    camera();
  } else if (val == cmd_cam_forward) {
    cam_direction(true);
  } else if (val == cmd_cam_backward) {
    cam_direction(false);
  } else if (capper_exists && val == cmd_capper_on) {
    capper_on(false, false);
  } else if (capper_exists && val == cmd_capper_off) {
    capper_off(false, false);
  }
}

void debug () {
  debug_state = true;
  Serial.println(cmd_debug);
  log("debugging enabled");
}

void connect () {
  Serial.println(cmd_connect);
  log("connect()");
}

void identify () {
  if (capper_exists) {
    Serial.println(cmd_camera_capper_identifier);
  } else {
    Serial.println(cmd_cam_identifier);
  }
  log("identify()");  
}

void camera () {
  if (!cam_running) {
    cam_running = true;
    digitalWrite(cam_pin, HIGH);
    
    delay(cam_momentary);
    digitalWrite(cam_pin, LOW);
  
    delay(cam_time - cam_momentary + cam_delay);
    
    Serial.println(cmd_camera);
    log("camera()");
    cam_running = false;
    
  }
}

void cam_direction (boolean state) {
  cam_dir = state;
  digitalWrite(cam_fwd_pin_1, LOW);
  digitalWrite(cam_fwd_pin_2, LOW);

  digitalWrite(cam_bwd_pin_1, LOW);
  digitalWrite(cam_bwd_pin_2, LOW);
  digitalWrite(cam_bwd_pin_3, LOW);

  if (state) {
    digitalWrite(cam_fwd_pin_1, HIGH);
    digitalWrite(cam_fwd_pin_2, HIGH);
    
    Serial.println(cmd_cam_forward);
    log("cam_direction -> true");
  } else {
    digitalWrite(cam_bwd_pin_1, HIGH);
    digitalWrite(cam_bwd_pin_2, HIGH);
    digitalWrite(cam_bwd_pin_3, HIGH);
    
    Serial.println(cmd_cam_backward);
    log("cam_direction -> false");
  }
  //delay(50); //delay after direction change to account for slippage of the belt
}

boolean does_capper_exist () {
  boolean exists = false;
  if (digitalRead(capper_exists_pin) == 0) {
    exists = true;
  }
  return exists;
}

void capper_init () {
  capper_exists = does_capper_exist();
  if (capper_exists) {
    log("Capper exists");
    servo.attach(capper_pin);
    capper_off(true, true);
  }
}

void set_capper_angle (int newAngle) {
  int delay_time = get_capper_delay(newAngle, capper_angle) + 50;
  servo.write(newAngle);
  delay(delay_time);
  capper_angle = newAngle;
}

int get_capper_delay (int angleA, int angleB) {
  int range = abs(angleA - angleB);
  return (int) ceil((float) range * servo_speed);
}

void capper_off (boolean suppress, boolean force) {
  int current_angle = servo.read();
  if (capper_state || current_angle != capper_off_angle) {
    set_capper_angle(capper_off_angle);
    capper_state = false;
  } else {
    log("Capper already off");
  }
  log("cap_off()");
  if (!suppress) {
    Serial.println(cmd_capper_off);
  }
}

void capper_on (boolean suppress, boolean force) {
  int current_angle = servo.read();
  if (!capper_state || current_angle != capper_on_angle) {
    set_capper_angle(capper_on_angle);
    capper_state = true;
  } else {
    log("Capper already on");
  }
  log("capper_on()");
  if (!suppress) {
    Serial.println(cmd_capper_on);
  }
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}
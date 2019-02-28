/**
 * This is a specialized version of the mcopy firmware for
 * controlling the camera of the optical printer 
 * at MONO NO AWARE. This uses a Sainsmart 4 Relay Module
 * board wired into the directional switches and "indiv" trigger 
 * switch of a JK104-R camera controller box, and it runs on an 
 * Arduino Uno compatible board.
 * 
 * Pins 
 * 12 - CH1 - FWD LOW, BWD HIGH
 * 11 - CH2 - FWD LOW, BWD HIGH
 * 10 - CH3 - FWD LOW, nothing HIGH
 *  - controls the directional relays of the camera.
 *  
 * 07 - CH4 - 4 pronged trigger cable, LOW
 *  - triggers the camera
 */

boolean debug_state = false;
/* ------------------------------------------------
 *  pins
 * ------------------------------------------------*/

const int cam_dir_pin_1 = 12;
const int cam_dir_pin_2 = 11;
const int cam_dir_pin_3 = 10;

const int cam_pin =        9;

boolean running = false;
boolean cam_dir = true;

const int cam_time = 700;
const int cam_momentary = 120;
const int cam_delay = 42;

const char cmd_camera = 'c';
const char cmd_cam_forward = 'e';
const char cmd_cam_backward = 'f';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_cam_identifier = 'k';

const int serialDelay = 5;

void setup() {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);

  Pins_init();
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
    Frame();
  } else if (val == cmd_cam_forward) {
    cam_direction(true); //explicit
  } else if (val == cmd_cam_backward) {
    cam_direction(false);
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
  Serial.println(cmd_cam_identifier);
  log("identify()");  
}

void Pins_init () {
  pinMode(cam_dir_pin_1, OUTPUT);
  pinMode(cam_dir_pin_2, OUTPUT);
  pinMode(cam_dir_pin_3, OUTPUT);
  
  pinMode(cam_pin, OUTPUT);

  digitalWrite(cam_dir_pin_1, LOW);
  digitalWrite(cam_dir_pin_2, LOW);
  digitalWrite(cam_dir_pin_3, LOW);
  
  digitalWrite(cam_pin, HIGH);
}

void Frame () { 
  if (!running) {
    running = true;
  
    digitalWrite(cam_pin, LOW);
    delay(cam_momentary);
    digitalWrite(cam_pin, HIGH);
  
    delay(cam_time - cam_momentary + cam_delay);
    
    Serial.println(cmd_camera);
    log("Frame completed");
    running = false;
  }
}

void cam_direction (boolean state) {
  cam_dir = state;
  if (state) {
    digitalWrite(cam_dir_pin_1, LOW);
    digitalWrite(cam_dir_pin_2, LOW);
    digitalWrite(cam_dir_pin_3, LOW);
    Serial.println(cmd_cam_forward);
    log("cam_direction -> true");
  } else {
    digitalWrite(cam_dir_pin_1, HIGH);
    digitalWrite(cam_dir_pin_2, HIGH);
    digitalWrite(cam_dir_pin_3, HIGH);
    Serial.println(cmd_cam_backward);
    log("cam_direction -> false");
  }
}
void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

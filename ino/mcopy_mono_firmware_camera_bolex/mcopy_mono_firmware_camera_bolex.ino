/**
 * This is a specialized version of the mcopy firmware for
 * controlling the JK104-R/Bolex camera of the optical printer 
 * at MONO NO AWARE. This uses a Sainsmart 8 Solid State Relay 
 * board wired into the directional switches of a JK104-R/Bolex camera 
 * controller box, a secondary projector controller box and it 
 * runs on an Arduino Uno compatible board.
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
 */


boolean debug_state = false;

const int cam_bwd_pin_1 = 12;
const int cam_fwd_pin_1 = 11;
const int cam_bwd_pin_2 = 10;
const int cam_fwd_pin_2 = 9;
const int cam_bwd_pin_3 = 8;
const int cam_pin = 7;

const int cam_momentary = 60;
const int cam_time = 600; //secondary projector speed
const int cam_delay = 42;

boolean cam_dir = true; 
boolean cam_running = false;

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
  
  pinMode(cam_fwd_pin_1, OUTPUT);
  pinMode(cam_bwd_pin_1, OUTPUT);
  
  pinMode(cam_fwd_pin_2, OUTPUT);
  pinMode(cam_bwd_pin_2, OUTPUT);
  
  pinMode(cam_bwd_pin_3, OUTPUT);
  
  pinMode(cam_pin, OUTPUT);

  digitalWrite(cam_pin, LOW);
  
  digitalWrite(cam_fwd_pin_1, HIGH);
  digitalWrite(cam_fwd_pin_2, HIGH);
  
  digitalWrite(cam_bwd_pin_1, LOW);
  digitalWrite(cam_bwd_pin_2, LOW);
  digitalWrite(cam_bwd_pin_3, LOW);
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

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

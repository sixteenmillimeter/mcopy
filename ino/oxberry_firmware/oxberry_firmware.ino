/**
 * This is a customized firmware originally designed to
 * control the Oxberry camera at the . This uses an 8 Solid State Relay
 * board wired into the "EXPOSE" trigger switch of an Oxberry control box.
 * 
 * Pins 
 * 07 - CH4 - 
 */

boolean debug_state = false;
/* ------------------------------------------------
 *  pins
 * ------------------------------------------------*/

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
const char cmd_cam_identifier = 'k'; //cam only

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
  pinMode(cam_pin, OUTPUT);
  digitalWrite(cam_pin, LOW);
}

void Frame () { 
  if (!running) {
    running = true;
  
    digitalWrite(cam_pin, HIGH);
    delay(cam_momentary);
    digitalWrite(cam_pin, LOW);
  
    delay(cam_time - cam_momentary + cam_delay);
    
    Serial.println(cmd_camera);
    log("Frame completed");
    running = false;
  }
}

void cam_direction (boolean state) {
  cam_dir = state;
  if (state) {
    Serial.println(cmd_cam_forward);
    log("cam_direction -> true");
  } else {
    Serial.println(cmd_cam_backward);
    log("cam_direction -> false");
  }
}
void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

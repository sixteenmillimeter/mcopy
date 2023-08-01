/**
 * TEMPORARY PROOF OF CONCEPT
 * 
 * This is a specialized version of the mcopy firmware for
 * controlling the projectors of the optical printer 
 * at MONO NO AWARE. This uses a Sainsmart 8 Solid State Relay 
 * board wired into the directional switches of a JK104-R projector 
 * controller box, a secondary projector controller box and it 
 * runs on an Arduino Uno compatible board.
 * 
 * Pins 
 * 12 - CH1 - FWD
 * 11 - CH2 - BWD (bridged to CH1)
 *  - controls the directional relays of the secondary projector.
 * 10 - CH3 - 4 pronged trigger cable
 *  - triggers the secondary projector
 */


boolean debug_state = false;

const int proj_fwd_pin = 6;
const int proj_bwd_pin = 5;
const int proj_pin = 4;

const int proj_momentary = 60;
const int proj_time = 950; //secondary projector speed
const int proj_delay = 42;

boolean proj_dir = true; 
boolean proj_running = false;

const char cmd_projector = 'w'; //_second
const char cmd_proj_forward = 'u';
const char cmd_proj_backward = 'v';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_proj_identifier = 't'; //_second

const int serialDelay = 5;

void setup() {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);
  pinMode(proj_fwd_pin, OUTPUT);
  pinMode(proj_bwd_pin, OUTPUT);
  pinMode(proj_pin, OUTPUT);

  digitalWrite(proj_pin, LOW);
  digitalWrite(proj_fwd_pin, HIGH);
  digitalWrite(proj_bwd_pin, LOW);
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
  } else if (val == cmd_projector) {
    projector();
  } else if (val == cmd_proj_forward) {
    proj_direction(true);
  } else if (val == cmd_proj_backward) {
    proj_direction(false);
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
  Serial.println(cmd_proj_identifier);
  log("identify()");  
}

void projector () {
  if (!proj_running) {
    proj_running = true;
    digitalWrite(proj_pin, HIGH);
    
    delay(proj_momentary);
    digitalWrite(proj_pin, LOW);
  
    delay(proj_time - proj_momentary + proj_delay);
    
    Serial.println(cmd_projector);
    log("projector()");
    proj_running = false;
    
  }
}

void proj_direction (boolean state) {
  proj_dir = state;
  digitalWrite(proj_fwd_pin, LOW);
  digitalWrite(proj_bwd_pin, LOW);
  if (state) {
    digitalWrite(proj_fwd_pin, HIGH);
    Serial.println(cmd_proj_forward);
    log("proj_direction -> true");
  } else {
    digitalWrite(proj_bwd_pin, HIGH);
    Serial.println(cmd_proj_backward);
    log("proj_direction -> false");
  }
  //delay(50); //delay after direction change to account for slippage of the belt
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

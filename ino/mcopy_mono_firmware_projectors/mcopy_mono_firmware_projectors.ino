/**
 * This is a specialized version of the mcopy firmware for
 * controlling the projectors of the optical printer 
 * at MONO NO AWARE. This uses a Sainsmart 8 Solid State Relay 
 * board wired into the directional switches of a JK104-R projector 
 * controller box, a secondary projector controller box and it 
 * runs on an Arduino Mega 1280 compatible board.
 * 
 * Pins - 8CH Sainsmart Solid State Relay Board
 * 12 - CH1 - BWD PROJ 1
 * 11 - CH2 - FWD PROJ 1 (bridged to CH1)
 * 10 - CH3 - BWD PROJ 1
 * 09 - CH4 - FWD PROJ 1  (bridged to CH3)
 * 08 - CH5 - BWD PROJ 1
 *  - controls the directional relays of the primary projector.
 * 07 - CH8 - 4 pronged trigger cable
 *  - triggers the primary projectory
 */

boolean debug_state = false;

const int proj_bwd_pin_1 = 12;
const int proj_fwd_pin_1 = 11;
const int proj_bwd_pin_2 = 10;
const int proj_fwd_pin_2 = 9;
const int proj_bwd_pin_3 = 8;
const int proj_pin = 7;

const int proj_second_fwd_pin = 6;
const int proj_second_bwd_pin = 5;
const int proj_second_pin = 4;

const int proj_momentary = 60;
const int proj_time = 950; //secondary projector speed
const int proj_delay = 42;

const int proj_second_momentary = 60;
const int proj_second_time = 950; //adjust
const int proj_second_delay = 42; //use same

boolean proj_dir = true; 
boolean proj_running = false;

boolean proj_second_dir = true;
boolean proj_second_running = false;

const char cmd_projector = 'p';
const char cmd_proj_forward = 'g';
const char cmd_proj_backward = 'h';

const char cmd_proj_second_forward = 'u';
const char cmd_proj_second_backward = 'v';
const char cmd_projector_second = 'w';

const char cmd_projectors = 'x';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_proj_identifier = 'j'; //'d'; //dual projector identifier

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
  } else if (val == cmd_projector) {
    projector();
  } else if (val == cmd_proj_forward) {
    proj_direction(true);
  } else if (val == cmd_proj_backward) {
    proj_direction(false);
  } else if (val == cmd_proj_second_forward) {
    proj_second_direction(true);
  } else if (val == cmd_proj_second_backward) {
    proj_second_direction(false);
  } else if (val == cmd_projector_second) {
    projector_second();
  } else if (val == cmd_projectors) {
    projectors();
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

void projector_second () {
  if (!proj_second_running) {
    proj_second_running = true;
    digitalWrite(proj_second_pin, HIGH);
    
    delay(proj_second_momentary);
    digitalWrite(proj_second_pin, LOW);
  
    delay(proj_second_time - proj_second_momentary + proj_second_delay);
    
    Serial.println(cmd_projector_second);
    log("projector_second()");
    proj_second_running = false;
  }
}

void projectors () {
  int proj_time_highest = proj_time;
  if (!proj_running && !proj_second_running) {
    if (proj_second_time > proj_time) {
      proj_time_highest =  proj_second_time;
    }
    proj_running = true;  
    proj_second_running = true;
    
    digitalWrite(proj_pin, HIGH);
    digitalWrite(proj_second_pin, HIGH);
    delay(proj_momentary); //highest? they are the same
    digitalWrite(proj_pin, LOW);
    digitalWrite(proj_second_pin, LOW);
  
    delay(proj_time_highest - proj_momentary + proj_delay);
    
    Serial.println(cmd_projectors); //cmd_projectors
    log("projectors()");
    proj_running = false;
    proj_second_running = false;
  }
}

void proj_direction (boolean state) {
  proj_dir = state;
  digitalWrite(proj_fwd_pin_1, LOW);
  digitalWrite(proj_fwd_pin_2, LOW);

  digitalWrite(proj_bwd_pin_1, LOW);
  digitalWrite(proj_bwd_pin_2, LOW);
  digitalWrite(proj_bwd_pin_3, LOW);
  if (state) {
    digitalWrite(proj_fwd_pin_1, HIGH);
    digitalWrite(proj_fwd_pin_2, HIGH);
    
    Serial.println(cmd_proj_forward);
    log("proj_direction -> true");
  } else {
    digitalWrite(proj_bwd_pin_1, HIGH);
    digitalWrite(proj_bwd_pin_2, HIGH);
    digitalWrite(proj_bwd_pin_3, HIGH);
    
    Serial.println(cmd_proj_backward);
    log("proj_direction -> false");
  }
  //delay(50); //delay after direction change to account for slippage of the belt
}

void proj_second_direction (boolean state) {
  proj_second_dir = state;
  digitalWrite(proj_second_fwd_pin, LOW);
  digitalWrite(proj_second_bwd_pin, LOW);
  if (state) {
    digitalWrite(proj_second_fwd_pin, HIGH);
    Serial.println(cmd_proj_second_forward);
    log("proj_second_direction -> true");
  } else {
    digitalWrite(proj_second_bwd_pin, HIGH);
    Serial.println(cmd_proj_second_backward);
    log("proj_second_direction -> false");
  }
}

void Pins_init () {
  //Declare primary projector pins
  pinMode(proj_fwd_pin_1, OUTPUT);
  pinMode(proj_bwd_pin_1, OUTPUT);
  pinMode(proj_fwd_pin_2, OUTPUT);
  pinMode(proj_bwd_pin_2, OUTPUT);
  pinMode(proj_bwd_pin_3, OUTPUT);
  pinMode(proj_pin, OUTPUT);

  //declare secondary projector pins
  pinMode(proj_second_fwd_pin, OUTPUT);
  pinMode(proj_second_bwd_pin, OUTPUT);
  pinMode(proj_second_pin, OUTPUT);

  //Set primary projector to forward
  digitalWrite(proj_pin, LOW);
  digitalWrite(proj_fwd_pin_1, HIGH);
  digitalWrite(proj_fwd_pin_2, HIGH);
  digitalWrite(proj_bwd_pin_1, LOW);
  digitalWrite(proj_bwd_pin_2, LOW);
  digitalWrite(proj_bwd_pin_3, LOW);

  //Set secondary projector to forward
  digitalWrite(proj_second_fwd_pin, HIGH);
  digitalWrite(proj_second_bwd_pin, LOW);
  digitalWrite(proj_second_pin, LOW);
  
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

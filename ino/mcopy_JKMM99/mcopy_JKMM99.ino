/*
 * Sketch containing firmware for the JKMM99
 * A collaboration between MONO NO AWARE and mcopy.
 * Compatible with JK106 hardware.
 * 
 * Uses an Arduino Uno compatible board and a
 * protoshield. 
 * Relay module for the cam : 
 * Solid state relay module for proj : 

  Wiring
  
  CAMERA + CAMERA_DIR
  Wire directly to corresponding relay pins.
  Arduino  2   3  5V   GND
  Relay    1   2  VCC  GND

  Relays wired to JK Camera Controller 103/104 models

  PINS FOR CAM WIRE

  (# = Connector #)
  Arduino  #   Wire      In case     Relay
  =========================================
  PIN3     1 - Yellow  = Grey      = IN2
  5V       2 - Red     = Purple    = VCC
  PIN2     3 - Green   = White     = IN1
  GND      4 - Black   = Black     = GND

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

boolean debug_state = false;

//unsigned long now; //to be compared to stored values every loop

//CAMERA CONSTANTS
const int CAMERA = 2;
const int CAMERA_DIR = 3;

const int CAMERA_MOMENT = 240;
const int CAMERA_FRAME = 600;


//PROJECTOR CONSTANTS
const int PROJECTOR_MICROSWITCH = 8;

const int PROJECTOR_FWD = 9;
const int PROJECTOR_BWD = 10;


const int PROJECTOR_MOMENT = 240;
const int PROJECTOR_FRAME = 600;


//CAMERA VARIABLES
boolean cam_dir = true; 
volatile long cam_time = 0;

//PROJECTOR VARIABLES
boolean proj_dir = true; 
boolean proj_running = false;
volatile int proj_micro_state = 0;
volatile long proj_time = 0;

//CAMERA COMMANDS
const char cmd_camera = 'c';
const char cmd_cam_forward = 'e';
const char cmd_cam_backward = 'f';

//PROJECTOR COMMANDS
const char cmd_projector = 'p';
const char cmd_proj_forward = 'g';
const char cmd_proj_backward = 'h';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';

const char cmd_proj_cam_identifier = 's';

const int serialDelay = 5;

void setup () {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);

  pins();
}

void loop () {
  //now = millis();
  if (!proj_running && Serial.available()) {
    /* read the most recent byte */
    cmd_char = (char)Serial.read();
  }
  if (proj_running) {
    proj_microswitch();
  } else if (cmd_char != 'z') {
    cmd(cmd_char);
    cmd_char = 'z';
  }
}

void pins () {
  //CAMERA RELAYS
  pinMode(CAMERA, OUTPUT);
  pinMode(CAMERA_DIR, OUTPUT);

  pinMode(PROJECTOR_MICROSWITCH, INPUT_PULLUP);
  pinMode(PROJECTOR_FWD, OUTPUT);
  pinMode(PROJECTOR_BWD, OUTPUT);

  //SET LOW
  digitalWrite(CAMERA, HIGH);
  digitalWrite(CAMERA_DIR, HIGH);

  digitalWrite(PROJECTOR_FWD, LOW);
  digitalWrite(PROJECTOR_FWD, LOW);
}

void cmd (char val) {
  if (val == cmd_debug) {
    debug();
  } else if (val == cmd_connect) {
    connect();
  } else if (val == cmd_mcopy_identifier) {
    identify();
  } else if (val == cmd_cam_forward) {
    cam_direction(true); //explicit
  } else if (val == cmd_cam_backward) {
    cam_direction(false);
  } else if (val == cmd_camera) {
    cam_start();
  } else if (val == cmd_proj_forward) {
    proj_direction(true); //explicit
  } else if (val == cmd_proj_backward) {
    proj_direction(false);
  } else if (val == cmd_projector) {
    proj_start();
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
  Serial.println(cmd_proj_cam_identifier);
  log("identify()");  
}

void cam_start () {
  if (debug_state) {
    cam_time = millis();
  }
  digitalWrite(CAMERA, LOW);
  delay(CAMERA_MOMENT);
  digitalWrite(CAMERA, HIGH);
  delay(CAMERA_FRAME - CAMERA_MOMENT);
  cam_stop();
  if (debug_state) {
    Serial.println(millis() - cam_time);
  }
}

void cam_stop () {
  Serial.println(cmd_camera);
  log("camera()");
}


void cam_direction (boolean state) {
  cam_dir = state;
  if (state) {
    digitalWrite(CAMERA_DIR, LOW);
    Serial.println(cmd_cam_forward);
    log("cam_direction -> true");
  } else {
    digitalWrite(CAMERA_DIR, HIGH);
    Serial.println(cmd_cam_backward);
    log("cam_direction -> false");
  }
}

void proj_start () {
  if (debug_state) {
    proj_time = millis();
  }

  if (proj_dir) {
    digitalWrite(PROJECTOR_FWD, HIGH);
  } else {
    digitalWrite(PROJECTOR_BWD, HIGH);
  }
  
  proj_running = true;
}

void proj_stop () {
  //stop both directions
  digitalWrite(PROJECTOR_FWD, LOW);
  digitalWrite(PROJECTOR_BWD, LOW);

  Serial.println(cmd_projector);
  log("projector()");
  proj_running = false;

  if (debug_state) {
    Serial.println(millis() - proj_time);
  }
}

void proj_direction (boolean state) {
  proj_dir = state;
  if (state) {
    log("proj_direction -> true");
  } else {
    log("proj_direction -> false");
  }
}

void proj_microswitch () {
  int val = digitalRead(PROJECTOR_MICROSWITCH);
  if (val != proj_micro_state && val == LOW) {
    //prime
    Serial.print("[1] ");
    Serial.print(val);
    Serial.print("!=");
    Serial.println(proj_micro_state);
    proj_micro_state = val;
  } else if (val != proj_micro_state && val == HIGH) {
    //turn off
    Serial.print("[2] ");
    Serial.print(val);
    Serial.print("!=");
    Serial.println(proj_micro_state);
    proj_micro_state = val;
    proj_stop();
  } else {
    delay(2); //some smothing value
  }
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

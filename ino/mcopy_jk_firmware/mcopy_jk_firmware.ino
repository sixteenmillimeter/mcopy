/*
  Wiring

  HOLD OFF FOR NOW
  For "MONITOR" pins with INPUT_PULLUP resistors:
  GND-----\ | \-----PIN
  No additional resistors/caps needed.
  --Note: not needed in prototype
  

  CAMERA + CAMERA_DIR and PROJECTOR + PROJECTOR_DIR:
  Wire directly to corresponding relay pins.
  Arduino  2   3   8   9
  Relay    1   2   3   4
*/

boolean debug_state = false;

//unsigned long now; //to be compared to stored values every loop

//CAMERA CONSTANTS
const int CAMERA = 2;
const int CAMERA_FWD = 3;
const int CAMERA_BWD = 4;
const int CAMERA_MOMENT = 240;
const int CAMERA_FRAME = 600;
//CAMERA VARIABLES
boolean cam_dir = true; 

//PROJECTOR CONSTANTS
const int PROJECTOR = 8;
const int PROJECTOR_FWD = 9;
const int PROJECTOR_BWD = 10;
const int PROJECTOR_MOMENT = 200;
const int PROJECTOR_FRAME = 950;
//PROJECTOR VARIABLES
boolean proj_dir = true;

//PROJECTOR COMMANDS
const char cmd_projector = 'p';
const char cmd_proj_forward = 'g';
const char cmd_proj_backward = 'h';

//CAMERA COMMANDS
const char cmd_camera = 'c';
const char cmd_cam_forward = 'e';
const char cmd_cam_backward = 'f';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';

//const char cmd_proj_identifier = 'j';
const char cmd_proj_cam_identifier = 's';

const int serialDelay = 5;

void setup () {
  Serial.begin(57600);
  Serial.flush();
  //Serial.setTimeout(serialDelay);

  pins();
}

void loop () {
  //now = millis();
  if (Serial.available()) {
    /* read the most recent byte */
    cmd_char = (char)Serial.read();
  }
  if (cmd_char != 'z') {
    cmd(cmd_char);
    cmd_char = 'z';
  }

  /*delay(2000);
  cam_start();
  delay(2000);
  proj_start();*/
}

void pins () {
  //RELAYS
  pinMode(CAMERA, OUTPUT);
  pinMode(PROJECTOR, OUTPUT);

  pinMode(CAMERA_FWD, OUTPUT);
  pinMode(CAMERA_BWD, OUTPUT);
  pinMode(PROJECTOR_FWD, OUTPUT);
  pinMode(PROJECTOR_BWD, OUTPUT);

  //SET LOW
  digitalWrite(CAMERA, LOW);
  digitalWrite(PROJECTOR, LOW);

  digitalWrite(CAMERA_FWD, HIGH);
  digitalWrite(CAMERA_BWD, LOW);

  digitalWrite(PROJECTOR_FWD, HIGH);
  digitalWrite(PROJECTOR_BWD, LOW);
}

void cmd (char val) {
  if (val == cmd_debug) {
    debug();
  } else if (val == cmd_connect) {
    connect();
  } else if (val == cmd_mcopy_identifier) {
    identify();
  } else if (val == cmd_projector) {
    proj_start();
  } else if (val == cmd_proj_forward) {
    proj_direction(true);
  } else if (val == cmd_proj_backward) {
    proj_direction(false);
  } else if (val == cmd_cam_forward) {
    cam_direction(true); //explicit
  } else if (val == cmd_cam_backward) {
    cam_direction(false);
  } else if (val == cmd_camera) {
    cam_start();
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

void setDir (int pin, boolean dir) {
  if (!dir) {
    digitalWrite(pin, HIGH);
  } else {
    digitalWrite(pin, LOW);
  }
}

void proj_start () {
  digitalWrite(PROJECTOR, HIGH);
  delay(PROJECTOR_MOMENT);
  digitalWrite(PROJECTOR, LOW);
  delay(PROJECTOR_FRAME - PROJECTOR_MOMENT);
  proj_stop();
}

void cam_start () {
  digitalWrite(CAMERA, HIGH);
  delay(CAMERA_MOMENT);
  digitalWrite(CAMERA, LOW);
  delay(CAMERA_FRAME - CAMERA_MOMENT);
  cam_stop();
}

void proj_stop () {
  Serial.println(cmd_projector);
  log("projector()");
}

void cam_stop () {
  Serial.println(cmd_camera);
  log("camera()");
}

void proj_direction (boolean state) {
  proj_dir = state;
  if (state) {
    digitalWrite(PROJECTOR_BWD, LOW);
    delay(10);
    digitalWrite(PROJECTOR_FWD, HIGH);
    Serial.println(cmd_proj_forward);
    log("proj_direction -> true");
  } else {
    digitalWrite(PROJECTOR_FWD, LOW);
    delay(10);
    digitalWrite(PROJECTOR_BWD, HIGH);
    Serial.println(cmd_proj_backward);
    log("proj_direction -> false");
  }
}

void cam_direction (boolean state) {
  cam_dir = state;
  if (state) {
    digitalWrite(CAMERA_BWD, LOW);
    delay(10);
    digitalWrite(CAMERA_FWD, HIGH);
    Serial.println(cmd_cam_forward);
    log("cam_direction -> true");
  } else {
    digitalWrite(CAMERA_FWD, LOW);
    delay(10);
    digitalWrite(CAMERA_BWD, HIGH);
    Serial.println(cmd_cam_backward);
    log("cam_direction -> false");
  }
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}


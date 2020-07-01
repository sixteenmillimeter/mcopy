/*
  Wiring
  
  CAMERA + CAMERA_DIR
  Wire directly to corresponding relay pins.
  Arduino  2   3
  Relay    1   2
*/

boolean debug_state = false;

//unsigned long now; //to be compared to stored values every loop

//CAMERA CONSTANTS
const int CAMERA = 2;
const int CAMERA_DIR = 3;

const int CAMERA_MOMENT = 240;
const int CAMERA_FRAME = 600;
//CAMERA VARIABLES
boolean cam_dir = true; 

//CAMERA COMMANDS
const char cmd_camera = 'c';
const char cmd_cam_forward = 'e';
const char cmd_cam_backward = 'f';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';

const char cmd_cam_identifier = 'k';

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
}

void pins () {
  //RELAYS
  pinMode(CAMERA, OUTPUT);

  pinMode(CAMERA_DIR, OUTPUT);

  //SET LOW
  digitalWrite(CAMERA, HIGH);
  
  digitalWrite(CAMERA_DIR, HIGH);

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

void setDir (int pin, boolean dir) {
  if (!dir) {
    digitalWrite(pin, LOW);
  } else {
    digitalWrite(pin, HIGH);
  }
}

void cam_start () {
  digitalWrite(CAMERA, LOW);
  delay(CAMERA_MOMENT);
  digitalWrite(CAMERA, HIGH);
  delay(CAMERA_FRAME - CAMERA_MOMENT);
  cam_stop();
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

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

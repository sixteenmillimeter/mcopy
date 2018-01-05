
/*
  Wiring

  For "MONITOR" pins with INPUT_PULLUP resistors:
  GND-----\ | \-----PIN
  No additional resistors/caps needed.

  CAMERA + CAMERA_DIR and PROJECTOR + PROJECTOR_DIR:
  Wire directly to corresponding relay pins.
  Arduino  2   3   8   9
  Relay    1   2   3   4
*/

boolean debug_state = false;

unsigned long now; //to be compared to stored values every loop

const int CAMERA = 2;
const int CAMERA_DIR = 3;
const int CAMERA_MONITOR = 4;

unsigned long cam_momentary_end;
const long cam_moment = 300;
boolean cam_dir = true; 
boolean cam_running = false;
boolean cam_momentary = false;

const int PROJECTOR = 8;
const int PROJECTOR_DIR = 9;
const int PROJECTOR_MONITOR = 10;

unsigned long proj_momentary_end;
const long proj_moment = 300;
boolean proj_dir = true;
boolean proj_running = false;
boolean proj_momentary = false;

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
  Serial.setTimeout(serialDelay);

  pins();
}

void loop () {
  now = millis();
  if (Serial.available()) {
    /* read the most recent byte */
    cmd_char = (char)Serial.read();
  }
  if (cmd_char != 'z') {
    cmd(cmd_char);
    cmd_char = 'z';
  }
  
  if (cam_running) {
    monitorCam();
  }

  if (proj_running) {
    monitorProj();
  }
}

void pins () {
  //RELAYS
  pinMode(CAMERA, OUTPUT);
  pinMode(PROJECTOR, OUTPUT);

  pinMode(CAMERA_DIR, OUTPUT);
  pinMode(PROJECTOR_DIR, OUTPUT);

  //PULLUP
  pinMode(CAMERA_MONITOR, INPUT_PULLUP);
  pinMode(PROJECTOR_MONITOR, INPUT_PULLUP);

  //SET LOW
  digitalWrite(CAMERA, LOW);
  digitalWrite(CAMERA_DIR, LOW);
  digitalWrite(PROJECTOR, LOW);
  digitalWrite(PROJECTOR_DIR, LOW);
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


void monitorCam () {
  int position = digitalRead(CAMERA_MONITOR);
  if (cam_momentary && now >= cam_momentary_end) {
    digitalWrite(CAMERA, LOW);
    cam_momentary = false;
  }
  if (!cam_momentary) {
    if (position == LOW) {
      cam_stop();
    }
  }
}

void monitorProj () {
  int position = digitalRead(PROJECTOR_MONITOR);
  if (proj_momentary && now >= proj_momentary_end) {
    digitalWrite(PROJECTOR, LOW);
    proj_momentary = false;
  }
  if (!proj_momentary) {
    //If internam microswitch is set to LOW?
    if (position == LOW) {
      proj_stop();
    }
  }
}

void setDir (int pin, boolean dir) {
  if (dir) {
    digitalWrite(pin, HIGH);
  } else {
    digitalWrite(pin, LOW);
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

void proj_start () {
  digitalWrite(PROJECTOR, HIGH);
  proj_running = true;
  proj_momentary = true;
  proj_momentary_end = now + proj_moment;
}

void cam_start () {
  digitalWrite(CAMERA, HIGH);
  cam_running = true;
  cam_momentary = true;
  cam_momentary_end = now + cam_moment;
}

void proj_stop () {
  proj_running = false;
  Serial.println(cmd_projector);
  log("projector()");
}

void cam_stop () {
  cam_running = false;
  Serial.println(cmd_camera);
  log("camera()");
}

void proj_direction (boolean state) {
  proj_dir = state;
  setDir(PROJECTOR_DIR, state);
  if (state) {
    Serial.println(cmd_proj_forward);
    log("proj_direction -> true");
  } else {
    Serial.println(cmd_proj_backward);
    log("proj_direction -> false");
  }
}

void cam_direction (boolean state) {
  cam_dir = state;
  setDir(CAMERA_DIR, state);
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
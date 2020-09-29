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
  Camera controller is a modified intval2 
  model with a 60RPM motor.

  PINS FOR CAM WIRE

  (# = Connector #)
  Arduino  #   Wire      In case     Device
  =========================================
  PIN2     3 - Green   = White     = L298N 1
  PIN3     1 - Yellow  = Grey      = L298N 2
  PIN4     2 - Red     = Purple    = MICRO
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
const int CAMERA_FORWARD  = 2;
const int CAMERA_BACKWARD = 3;
const int CAMERA_MICROSWITCH = 4;

const int CAMERA_MOMENT = 240;
const int CAMERA_FRAME = 600;


//PROJECTOR CONSTANTS
const int PROJECTOR_MICROSWITCH = 8;

const int PROJECTOR_FWD = 9; //
const int PROJECTOR_BWD = 10; //
const int PROJECTOR_ON = 11;


const int PROJECTOR_MOMENT = 240;
const int PROJECTOR_FRAME = 600;
const int PROJECTOR_MICROSWITCH_CLOSED = 0;
const int PROJECTOR_MICROSWITCH_OPENED = 1;
const int PROJECTOR_HALF_TIME = 450;

//CAMERA VARIABLES
boolean cam_dir = true; 
boolean cam_running = false;
boolean cam_primed = false;
volatile int cam_micro_state = 0;
volatile long cam_time = 0;

//PROJECTOR VARIABLES
boolean proj_dir = true; 
boolean proj_running = false;
boolean proj_primed = false;
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
volatile long now = 0;

void setup () {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);

  pins();
}

void loop () {
  now = millis();
  if (!proj_running && Serial.available()) {
    /* read the most recent byte */
    cmd_char = (char)Serial.read();
  }
  if (proj_running) {
    proj_microswitch();
  } else if (cam_running) {
    cam_microswitch();
  } else if (cmd_char != 'z') {
    cmd(cmd_char);
    cmd_char = 'z';
  }
}

void pins () {
  //CAMERA RELAYS
  pinMode(CAMERA_FORWARD, OUTPUT);
  pinMode(CAMERA_BACKWARD, OUTPUT);
  pinMode(CAMERA_MICROSWITCH, INPUT_PULLUP);

  pinMode(PROJECTOR_MICROSWITCH, INPUT_PULLUP);
  pinMode(PROJECTOR_FWD, OUTPUT);
  pinMode(PROJECTOR_BWD, OUTPUT);
  pinMode(PROJECTOR_ON, OUTPUT);

  //SET LOW
  digitalWrite(CAMERA_FORWARD, LOW);
  digitalWrite(CAMERA_BACKWARD, LOW);

  digitalWrite(PROJECTOR_FWD, LOW);
  digitalWrite(PROJECTOR_BWD, LOW);
  digitalWrite(PROJECTOR_ON, LOW);
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
  cam_time = millis();
  if (cam_dir) {
    digitalWrite(CAMERA_FORWARD, HIGH);
    digitalWrite(CAMERA_BACKWARD, LOW);
  } else {
    digitalWrite(CAMERA_BACKWARD, HIGH);
    digitalWrite(CAMERA_FORWARD, LOW);
  }
  cam_running = true;
  cam_primed = false;
}

void cam_stop () {
  delay(10);
  digitalWrite(CAMERA_BACKWARD, LOW);
  digitalWrite(CAMERA_FORWARD, LOW);
  cam_running = false;
  cam_primed = false;
  Serial.println(cmd_camera);
  log("camera()");
  if (debug_state) {
    Serial.println(millis() - cam_time);
  }
}


/* ------------------------------------------------
 *  Determines whether or not the motor has turned
 *  far enough to start reading the micoswitch state.
 *  This prevents the switch from checking too early,
 *  while it is not yet pressed.
 * ------------------------------------------------*/
boolean cam_delay () {
  if (now - cam_time >= 600) {
    return true;
  }
  return false;
}

/* ------------------------------------------------
 *  Reads the state of the microswitch after the
 *  Read_delay() period. If the micoswitch is pressed,
 *  set the micro_primed flag to true. If primed and
 *  microswitch gets opened, Stop() the frame.
 * ------------------------------------------------*/
void cam_microswitch () {
  if (cam_delay()) {
    cam_micro_state = digitalRead(CAMERA_MICROSWITCH);
    if (cam_micro_state == LOW 
        && cam_primed == false) {
      cam_primed = true;
      log("cam_primed => true");
    } else if (cam_micro_state == HIGH 
              && cam_primed == true) {
      cam_stop();
    }
    delay(2);//smooths out signal-
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

void proj_start () {
  if (debug_state) {
    proj_time = millis();
  }
  digitalWrite(PROJECTOR_ON, HIGH);
  if (proj_dir) {
    digitalWrite(PROJECTOR_FWD, HIGH);
  } else {
    digitalWrite(PROJECTOR_BWD, HIGH);
  }
  
  proj_running = true;
}

void proj_stop () {
  //stop both directions
  delay(10);
  digitalWrite(PROJECTOR_ON, LOW);
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
    Serial.println(cmd_proj_forward);
    log("proj_direction -> true");
  } else {
    Serial.println(cmd_proj_backward);
    log("proj_direction -> false");
  }
}

//LOW=0=CLOSED
//HIGH=1=OPEN
void proj_microswitch () {
  int val = digitalRead(PROJECTOR_MICROSWITCH);
  long now = millis();
  if (!proj_primed && val != proj_micro_state && val == PROJECTOR_MICROSWITCH_OPENED) {
    //prime
    log("projector primed to stop");
    proj_micro_state = val;
    proj_primed = true;
  } else if (proj_primed && val != proj_micro_state 
        && val == PROJECTOR_MICROSWITCH_CLOSED 
        && now - proj_time > PROJECTOR_HALF_TIME) {
    //turn off
    proj_primed = false;
    proj_micro_state = val;
    proj_stop();
  } else {
    //delay(1); //some smothing value
  }
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

boolean debug_state = false;

//const int proj_pin = 5; //relay 4
//const int proj_time = {{proj.time}};
//const int proj_delay = {{proj.delay}};

boolean proj_dir = true; 

const char cmd_projector = 'p';
const char cmd_proj_forward = 'g';
const char cmd_proj_backward = 'h';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const int serialDelay = 5;

void setup() {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);
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

void projector () {
  /* FROM INTVAL
   * WILL USE OPTICAL ENDSTOP
   * Time_start();
  cam_dir = dir;
  if (cam_dir) {
    analogWrite(PIN_MOTOR_FORWARD, fwd_speed);
    analogWrite(PIN_MOTOR_BACKWARD, 0);
  } else {
    analogWrite(PIN_MOTOR_BACKWARD, bwd_speed);
    analogWrite(PIN_MOTOR_FORWARD, 0);
  }
  running = true;
  if (fwd_speed == 255) {
      delay(300);
  } else {
      delay(600);
  }
  micro_primed = false;*/
  delay(1300); //TEMPORARY DELAY FOR TESTING TIMING
  Serial.println(cmd_projector);
  log("projector()");
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

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

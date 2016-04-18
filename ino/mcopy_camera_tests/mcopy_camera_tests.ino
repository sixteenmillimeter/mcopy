boolean debug_state = false;

/*const int cam_pin = 4; //relay 8
const int cam_time = {{cam.time}};
const int cam_delay = {{cam.delay}};
const int cam_momentary = {{cam.momentary}};

const int cam_dir_1 = 6; //relay 7*/

boolean cam_dir = true; //camera defaults to forward

const char cmd_camera = 'c';
const char cmd_cam_forward = 'e';
const char cmd_cam_backward = 'f';

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
  } else if (val == cmd_camera) {
    camera();
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

void camera () {
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
  delay(750); //TEMPORARY DELAY FOR TESTING TIMING
  Serial.println(cmd_camera);
  log("camera()");
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

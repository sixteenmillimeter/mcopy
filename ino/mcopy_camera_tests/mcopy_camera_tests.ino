boolean debug_state = false;

/*
----------------------------------------------------
Microswitch (use INPUT_PULLUP!!)
GND-----\ | \-----PIN
----------------------------------------------------
*/

const int FAST_PWM = 255;
const int SLOW_PWM = 127;

/* ------------------------------------------------
 *  pins
 * ------------------------------------------------*/
//Adafruit Metro Mini
const int PIN_INDICATOR = 13;
const int PIN_MOTOR_FORWARD = 9;
const int PIN_MOTOR_BACKWARD = 10;
const int PIN_MICRO = 19; //laser cut version

volatile boolean running = false;
volatile boolean cam_dir = true;

volatile int micro_position = 0;
volatile boolean micro_primed = false;

unsigned long timer = 0;
unsigned long frame_start = 0;
unsigned long delay_start = 0;

volatile int fwd_speed = FAST_PWM;
volatile int bwd_speed = FAST_PWM;

volatile long seq_delay = 42;

const char cmd_camera = 'c';
const char cmd_cam_forward = 'e';
const char cmd_cam_backward = 'f';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_cam_identifier = 'k';

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
  timer = millis();

  if (running) {
    Read_micro();
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
  pinMode(PIN_MOTOR_FORWARD, OUTPUT);
  pinMode(PIN_MOTOR_BACKWARD, OUTPUT);
  pinMode(PIN_MICRO, INPUT_PULLUP);
  pinMode(PIN_INDICATOR, OUTPUT);
}

void Frame () {
  frame_start = millis();
  if (cam_dir) {
    analogWrite(PIN_MOTOR_FORWARD, fwd_speed);
    analogWrite(PIN_MOTOR_BACKWARD, 0);
  } else {
    analogWrite(PIN_MOTOR_BACKWARD, bwd_speed);
    analogWrite(PIN_MOTOR_FORWARD, 0);
  }
  running = true;
  micro_primed = false;
}

boolean Read_delay () {
  if (fwd_speed == FAST_PWM) {
      if (timer - frame_start >= 300) {
        return true;
      }
  } else {
      if (timer - frame_start >= 600) {
        return true;
      }
  }
  return false;
}

void Read_micro () {
  if (Read_delay()) {
    micro_position = digitalRead(PIN_MICRO);
    if (micro_position == LOW 
        && micro_primed == false) {
      micro_primed = true;
    } else if (micro_position == HIGH 
              && micro_primed == true) {
      Stop();
    }
    delay(2);//smooths out signal
  }
}

void Stop () {
  delay(10);
  analogWrite(PIN_MOTOR_FORWARD, 0);
  analogWrite(PIN_MOTOR_BACKWARD, 0);
  
  running = false;
  micro_primed = false;

  Serial.println(cmd_cam_backward);
  log("Frame completed");
  log(String(timer - frame_start));
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

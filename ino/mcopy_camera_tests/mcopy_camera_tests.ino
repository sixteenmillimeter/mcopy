boolean debug_state = false;

//Can be controlled via serial
//Buttons are optional
//Exposure controls assumes use  of a 120RPM motor
//Uses L298N H-bridge breakout board
//Target board is an Adafruit Metro Mini,
//also using an Uno as a dev board

/*
----------------------------------------------------
Microswitch (use INPUT_PULLUP!!)
GND-----\ | \-----PIN
----------------------------------------------------
*/

const int MOTOR_RPM = 120;
const int BOLEX_C = round((133 / (1.66 * 360)) * 1000); //bolex exposure constant
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
const int BUTTON[4] = {3, 6, 5, 4};  //trigger, direction, speed, delay

/* ------------------------------------------------
 *  loop
 * ------------------------------------------------*/
const int LOOP_DELAY = 10;

/* ------------------------------------------------
 *  state
 * ------------------------------------------------*/
volatile int button_state[4] = {1, 1, 1, 1};
volatile long button_time[4] = {0, 0, 0, 0};
volatile long buttontime = 0;

volatile boolean sequence = false;
volatile boolean running = false;
volatile boolean cam_dir = true;
volatile boolean delaying = false;
volatile boolean timed = false;

volatile int counter = 0;

volatile int micro_position = 0;
volatile boolean micro_primed = false;

unsigned long timer = 0;
unsigned long frame_start = 0;
unsigned long delay_start = 0;

String timed_str = "600";
unsigned long timed_val = 600;
unsigned long timed_open = 300; //ms after start_frame to pause
volatile boolean timed_paused = false;
unsigned long timed_delay = 0;
unsigned long timed_last = 0;
unsigned long timed_avg = 600;

volatile int fwd_speed = FAST_PWM;
volatile int bwd_speed = FAST_PWM;

volatile long seq_delay = 42;

/* ------------------------------------------------
 *  serial
 * ------------------------------------------------*/

const char cmd_camera = 'c';
const char cmd_cam_forward = 'e';
const char cmd_cam_backward = 'f';
const char cmd_timed = 'n';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_cam_identifier = 'k';

const int serialDelay = 5;

void setup() {
  Serial_init();
  Pins_init();
  Buttons_init();
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
  Btn(0);
  Btn(1);
  Btn(2);
  Btn(3);
  if (sequence && delaying) {
    Watch_delay();
  }
  
  if (running) {
    if (timed) {
     Read_timed();  
    } else {
     Read_micro(); 
    }
  }
  if (!running && !sequence && !delaying){ 
    delay(LOOP_DELAY);
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
  } else if (val == cmd_timed) {
    timedString();  
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

//sending "0" will reset to default exposure time
void timedString () {
  while (Serial.available() == 0) {             
    //Wait for timed string
  }
  timed_str = Serial.readString();
  timed_val = timed_str.toInt();
  if (timed_val < 600) {
    timed_val = 600;
    timed_str = "600";
    timed = false;
  } else {
    timed_delay = timed_val - BOLEX_C;
    timed = true;
  }
  Serial.println(cmd_timed);
  log("Set exposure time to: ");
  log(timed_str);
}

void Serial_init () {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);  
}

void Pins_init () {
  pinMode(PIN_MOTOR_FORWARD, OUTPUT);
  pinMode(PIN_MOTOR_BACKWARD, OUTPUT);
  pinMode(PIN_MICRO, INPUT_PULLUP);
  pinMode(PIN_INDICATOR, OUTPUT);
}

void Buttons_init () {
  for (int i = 0; i < 4; i++) {
    pinMode(BUTTON[i], INPUT_PULLUP);
  }
}

void Btn (int index) {
  int val = digitalRead(BUTTON[index]);
  if (val != button_state[index]) {
    if (val == LOW) { // pressed
      button_time[index] = millis();
      //button_start(index);
    } else if (val == HIGH) { // not pressed
      buttontime = millis() - button_time[index];
      button_end(index, buttontime);
    }
  }
  button_state[index] = val;
}

/*
 * dormant for now
 * void button_start (int index) {
  if (index == 0) {
  }
}*/

void button_end (int index, long buttontime) {
  if (index == 0) {
    if (buttontime > 1000) {
      if (!sequence) {
        sequence = true;
        Output(2, 75);
        Frame();
      }
    } else {
       if (sequence) {
        sequence = false;
        //Output(2, 75);
      } else {
         Frame();
      }
    }
  } else if (index == 1) { //set direction
    if (buttontime < 1000) {
      cam_dir = true;
      Output(1, 500);
    } else if (buttontime > 1000) {
      cam_dir = false;
      Output(2, 250);
    }
  } else if (index == 2) { // set speed
    if (buttontime <= 1000) {
      fwd_speed = FAST_PWM;
      bwd_speed = FAST_PWM;
      Output(1, 500);
    } else if (buttontime > 1000) {
      fwd_speed = SLOW_PWM;
      bwd_speed = SLOW_PWM;
      Output(2, 250);    
    }
  } else if (index == 3) { //set delay
    if (buttontime < 42) {
      seq_delay = 42;
      Output(1, 500);
    } else {
      seq_delay = buttontime;
      Output(2, 250);
    }
  }
  buttontime = 0;
}

void Indicator (boolean state) {
  if (state) {
    digitalWrite(PIN_INDICATOR, HIGH);
  } else {
    digitalWrite(PIN_INDICATOR, LOW);
  }
}

void Output (int number, int len) {
  for (int i = 0; i < number; i++) {
    Indicator(true);
    delay(len);
    Indicator(false);
    delay(42);
  }
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

void Watch_delay () {
  if (timer - delay_start >= seq_delay) {
    delaying = false;
    Frame();
  }
}

void Read_timed () {
  if (!timed_paused) {
    if (timer - frame_start > timed_open 
      && timer - frame_start < timed_open + timed_delay) {
       timed_paused = true; 
       Pause_timed();
    } else if (timer - frame_start > timed_open + timed_delay) {
      micro_position = digitalRead(PIN_MICRO);
      if (micro_position == HIGH) {
        Stop();
      }
      delay(2);//smooths out signal  
    }
  } if (timed_paused && timer - frame_start > timed_open + timed_delay) {
    timed_paused = false;
    Start_timed();   
  }
  
}

void Pause_timed () {
  analogWrite(PIN_MOTOR_FORWARD, 0);
  analogWrite(PIN_MOTOR_BACKWARD, 0);
}

void Start_timed () {
   if (cam_dir) {
    analogWrite(PIN_MOTOR_FORWARD, fwd_speed);
    analogWrite(PIN_MOTOR_BACKWARD, 0);
  } else {
    analogWrite(PIN_MOTOR_BACKWARD, bwd_speed);
    analogWrite(PIN_MOTOR_FORWARD, 0);
  } 
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

  if (cam_dir) {
    counter += 1;  
  } else {
    counter -= 1;
  }

  timed_last = timer - frame_start;

  timed_avg = (timed_avg + timed_last) / 2;

  Serial.println(cmd_camera);
  log("Frame completed");
  log(String(timed_last));
}

void cam_direction (boolean state) {
  cam_dir = state;
  if (state) {
    timed_open = 300;
    Serial.println(cmd_cam_forward);
    log("cam_direction -> true");
  } else {
    timed_open = 400;
    Serial.println(cmd_cam_backward);
    log("cam_direction -> false");
  }
}
void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

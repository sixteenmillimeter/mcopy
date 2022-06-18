 #include <Servo.h>

boolean debug_state = true;

/*
----------------------------------------------------
Servo      -      Arduino
           -
Red        -      5V
Black      -      GND
Yellow     -      PWM Pin (9 in example)

Optical Endstop
       -
Red        -      5V
Black      -      GND
Yellow     -      Pin 10
----------------------------------------------------
*/

/* ------------------------------------------------
 *  pins
 * ------------------------------------------------*/
//Arduino Duemilanove
const int PIN_SERVO = 9;
const int PIN_ENDSTOP = 10;
const int PIN_ENDSTOP_PWR = 11;

volatile boolean running = false;
volatile boolean cap_state = false;
volatile boolean endstop_state = false;

volatile int angle = 0;
const int cap_on_angle = 153;
const int cap_off_angle = 93;
volatile long timer = 0;
volatile int current_angle = 0;

const char cmd_cap_on = 'A';
const char cmd_cap_off = 'B';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_capper_identifier = 'C';

const int serialDelay = 5;

Servo servo;
//SG-5010 speed 0.18s / 60 degree
//converted to milliseconds/angle
const float servoSpeed = 400.0 / 60.0;

void setup() {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);

  Pins_init();
  Servo_init();
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

}

void cmd (char val) {
  if (val == cmd_debug) {
    debug();
  } else if (val == cmd_connect) {
    connect();
  } else if (val == cmd_mcopy_identifier) {
    identify();
  } else if (val == cmd_cap_on) {
    Cap_on(false, false);
  } else if (val == cmd_cap_off) {
    Cap_off(false, false);
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
  Serial.println(cmd_capper_identifier);
  log("identify()");  
}

void Pins_init () {
  pinMode(PIN_ENDSTOP, INPUT_PULLUP);
  pinMode(PIN_ENDSTOP_PWR, OUTPUT);
  Endstop_on();
}

void Servo_init () {
  servo.attach(PIN_SERVO);
  Cap_off(true, true);
}

boolean Read_endstop () {
  endstop_state = digitalRead(PIN_ENDSTOP) != LOW;
  log(endstop_state);
  return endstop_state;
}

void Endstop_on () {
  digitalWrite(PIN_ENDSTOP_PWR, HIGH);
  delay(1);
}

void Endstop_off () {
  digitalWrite(PIN_ENDSTOP_PWR, LOW);
  delay(1);
}

void Servo_angle (int newAngle) {
  servo.write(newAngle);
  delay(Servo_delay(newAngle, angle) + 50);
  angle = newAngle;
}

int Servo_delay (int angleA, int angleB) {
  int angle = abs(angleA - angleB);
  return (int) ceil((float) angle * servoSpeed);
}

void Cap_off (boolean suppress, boolean force) {
  Endstop_on();
  current_angle = servo.read();
  if ( (cap_state || current_angle != cap_off_angle)) {
    Servo_angle(cap_off_angle);
    cap_state = false;
  } else {
    log("Cap already off");
  }
  /*while (Read_endstop()) {
    delay(1);
  }*/
  Endstop_off();
  log("Cap_off()");
  if (!suppress) {
    Serial.println(cmd_cap_off);
  }
}

void Cap_on (boolean suppress, boolean force) {
  Endstop_on();
  current_angle = servo.read();
  if ( (!cap_state || current_angle != cap_on_angle)) {
    Servo_angle(cap_on_angle);
    cap_state = true;
  } else {
    log("Cap already on");
  }
  /*while (!Read_endstop()) {
    delay(1);
  }*/
  Endstop_off();
  log("Cap_on()");
  if (!suppress) {
    Serial.println(cmd_cap_on);
  }
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

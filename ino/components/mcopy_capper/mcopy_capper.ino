 #include <Servo.h>

boolean debug_state = false;

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

volatile boolean running = false;
volatile boolean cap_state = false;
volatile boolean endstop_state = false;

volatile int angle = 0;
const int cap_on_angle = 0;
const int cap_off_angle = 60;
volatile long timer = 0;

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
const float servoSpeed = 180.0 / 60.0;

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
    Cap_on(false);
  } else if (val == cmd_cap_off) {
    Cap_off(false);
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
}

void Servo_init () {
  servo.attach(PIN_SERVO);
  delay(100);
  servo.write(180);
  delay(500);
  servo.write(0);
  delay(500);
  if (!Read_endstop()) {
    Cap_off(true);
  }
}

boolean Read_endstop () {
  return digitalRead(PIN_ENDSTOP) != LOW;
}

void Servo_angle (int newAngle) {
  servo.write(newAngle);
  delay(Servo_delay(newAngle, angle));
  angle = newAngle;
}

int Servo_delay (int angleA, int angleB) {
  int angle = abs(angleA - angleB);
  return (int) ceil((float) angle * servoSpeed);
}

void Cap_off (boolean suppress) {
  if (cap_state) {
    Servo_angle(cap_off_angle);
    cap_state = false;
  } else {
    log("Cap already off");
  }
  log("Cap_off()");
  if (!suppress) {
    Serial.println(cmd_cap_off);
  }
}

void Cap_on (boolean suppress) {
  if (!cap_state) {
    Servo_angle(cap_on_angle);
    cap_state = true;
  } else {
    log("Cap already on");
  }
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
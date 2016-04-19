//Test lighting with NeoPixels instead of Pixies to prevent eye damage.
//LIGHT HEADERS
//#include "SoftwareSerial.h"
//#include "Adafruit_Pixie.h"
#include <Adafruit_NeoPixel.h>
#define NUMPIXELS 1 // Number of Pixies in the strip
//#define PIXIEPIN  6 // Pin number for SoftwareSerial output
#define PIXELPIN  3 // Pin number for SoftwareSerial output
//SoftwareSerial pixieSerial(-1, PIXIEPIN);
//Adafruit_Pixie light = Adafruit_Pixie(NUMPIXELS, &pixieSerial);
Adafruit_NeoPixel light = Adafruit_NeoPixel(1, PIXELPIN, NEO_GRB + NEO_KHZ800);

//PROJECTOR HEADERS

String color = "000,000,000";

volatile int commaR = 0;
volatile int commaG = 0;

String strR = "000";
String strG = "000";
String strB = "000";

volatile int r = 0;
volatile int g = 0;
volatile int b = 0;

boolean debug_state = false;

//const int proj_pin = 5; //relay 4
//const int proj_time = {{proj.time}};
//const int proj_delay = {{proj.delay}};

//LIGHT VARIABLES

//PROJECTOR VARIABLES
boolean proj_dir = true; 

const char cmd_light = 'l';
const char cmd_projector = 'p';
const char cmd_proj_forward = 'g';
const char cmd_proj_backward = 'h';
const char cmd_mcopy_identifier = 'm';
const char cmd_proj_identifier = 'j';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const int serialDelay = 5;

void setup() {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);
  //pixieSerial.begin(115200); // Pixie REQUIRES this baud rate
  light.begin();
  light.setPixelColor(0, 0, 0, 0);
  light.show();
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
  } else if (val == cmd_mcopy_identifier) {
    identify();
  } else if (val == cmd_projector) {
    projector();
  } else if (val == cmd_proj_forward) {
    proj_direction(true);
  } else if (val == cmd_proj_backward) {
    proj_direction(false);
  } else if (val == cmd_light) {
    colorString();
    Serial.println(cmd_light);//confirm light change
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
  Serial.println(cmd_proj_identifier);
  log("identify()");  
}

void colorString () {
  while (Serial.available() == 0) {             
    //Wait for color string
  }
  color = Serial.readString();
  //Serial.println(color);

  commaR = color.indexOf(','); //comma trailing R
  commaG = color.indexOf(',', commaR + 1);

  strR = color.substring(0, commaR);
  strG = color.substring(commaR + 1, commaG);
  strB = color.substring(commaG + 1);

  r = strR.toInt();
  g = strG.toInt();
  b = strB.toInt();

  light.setPixelColor(0, r, g, b);
  light.show();
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

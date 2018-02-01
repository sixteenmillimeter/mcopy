//Test projector + light combination
//Test lighting with NeoPixels instead of Pixies to prevent eye damage.
//NeoPixel wiring, put 1000uF cap across 5V and GND and 470ohm resistor
//in series with the data connection to the Arduino pin
//
// ARDUINO                     NEOPIXEL
//  5VDC      --|--| 1000uF     5V   
//  GND       --|--| 1000uF     GND
//  PIN 3     --==-- 470ohm     Din

//LIGHT HEADERS
#include <SoftwareSerial.h>
#include <Adafruit_Pixie.h>
//#include <Adafruit_NeoPixel.h>

#define NUMPIXELS 1 // Number of Pixies in the strip
#define PIXIEPIN  6 // Pin number for SoftwareSerial output
//#define PIXELPIN  3 // Pin number for SoftwareSerial output

SoftwareSerial pixieSerial(-1, PIXIEPIN);
Adafruit_Pixie light = Adafruit_Pixie(NUMPIXELS, &pixieSerial);

//Adafruit_NeoPixel light = Adafruit_NeoPixel(1, PIXELPIN, NEO_GRB + NEO_KHZ800);

/*
----------------------------------------------------
Microswitch (use INPUT_PULLUP!!)
GND-----\ | \-----PIN
----------------------------------------------------
*/

//PROJECTOR HEADERS

boolean debug_state = false;

//LIGHT VARIABLES
String color = "000,000,000";

volatile int commaR = 0;
volatile int commaG = 0;

String strR = "000";
String strG = "000";
String strB = "000";

volatile int r = 0;
volatile int g = 0;
volatile int b = 0;

unsigned long light_time;

//PROJECTOR VARIABLES
//const int proj_time = {{proj.time}};
//const int proj_delay = {{proj.delay}};

const int proj_fwd_pin = 8;
const int proj_bwd_pin = 9;
volatile boolean proj_running = false;
const int proj_micro_pin = 4;
volatile int proj_micro_raw;
boolean proj_dir = true; 

//APP
unsigned long now; //to be compared to stored values every loop

const char cmd_light = 'l';
const char cmd_projector = 'p';
const char cmd_proj_forward = 'g';
const char cmd_proj_backward = 'h';
const char cmd_mcopy_identifier = 'm';
//for just proj
//const char cmd_proj_identifier = 'j';
//for proj + light
const char cmd_proj_identifier = 'q';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const int serialDelay = 5;

void setup() {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);
  
  pixieSerial.begin(115200); // Pixie REQUIRES this baud rate
  //light.begin(); //neopixel only
  light.setBrightness(255);
  light.setPixelColor(0, 0, 0, 0);
  light.show();

  pinMode(proj_micro_pin, INPUT_PULLUP);
  pinMode(proj_fwd_pin, OUTPUT);
  pinMode(proj_bwd_pin, OUTPUT);
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
  now = millis();
  if (proj_running) {
    proj_reading();
  }
  //send light signal to pixie every second
  if (now - light_time >= 1000) {
      /*Serial.print(r);
      Serial.print(",");
      Serial.print(g);
      Serial.print(",");
      Serial.println(b);*/
      light.setPixelColor(0, r, g, b);
      light.show();
      light_time = now;
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
    proj_start();
  } else if (val == cmd_proj_forward) {
    proj_direction(true);
  } else if (val == cmd_proj_backward) {
    proj_direction(false);
  } else if (val == cmd_light) {
    light_set();
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

void light_set () {
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
  
  Serial.println(cmd_light);//confirm light change
  log(color);
}

void proj_start () {
  if (proj_dir) {
    digitalWrite(proj_fwd_pin, HIGH);
    digitalWrite(proj_bwd_pin, LOW); 
  } else {
    digitalWrite(proj_bwd_pin, HIGH); 
    digitalWrite(proj_fwd_pin, LOW); 
  }
  proj_running = true;
  delay(500); // Let bump pass out of microswitch

  //delay(1300); //TEMPORARY DELAY FOR TESTING TIMING
}

void proj_reading () {
   proj_micro_raw = digitalRead(proj_micro_pin);
    if (proj_micro_raw == 1) {
        //do nothing
    } else if (proj_micro_raw == 0) {
        proj_stop();
    }
    //delay(1); //needed?
}

void proj_stop () {
  digitalWrite(proj_bwd_pin, LOW); 
  digitalWrite(proj_fwd_pin, LOW);
  
  proj_running = false;
  
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
  //delay(50); //delay after direction change to account for slippage of the belt
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

#include "SoftwareSerial.h"
#include "Adafruit_Pixie.h"
#include "McopySerial.h"

#define NUMPIXELS 1 // Number of Pixies in the strip
#define PIXIEPIN  6 // Pin number for SoftwareSerial output

SoftwareSerial pixieSerial(-1, PIXIEPIN);
Adafruit_Pixie light = Adafruit_Pixie(NUMPIXELS, &pixieSerial);
McopySerial mc;

String color = "000,000,000";

volatile int commaR = 0;
volatile int commaG = 0;

String strR = "000";
String strG = "000";
String strB = "000";

volatile int r = 0;
volatile int g = 0;
volatile int b = 0;

unsigned long now; //to be compared to stored values every loop
unsigned long light_time;
volatile char cmd = 'z';


void setup () {
  mc.begin(mc.LIGHT_IDENTIFIER);
	pixieSerial.begin(115200); // Pixie REQUIRES this baud rate
	light.setPixelColor(0, 0, 0, 0);
  light.show();
  r = 90;
  g = 90;
  b = 90;
}

void loop () {
  now = millis();
  cmd = mc.loop();

  if (cmd == mc.LIGHT) {
    color = mc.getString();
    parseColorString();
    mc.confirm(mc.LIGHT);
  }

  //send light signal to pixie every second
  if (now - light_time >= 1000) {
    light.setPixelColor(0, r, g, b);
    light.show();
    light_time = now;
  }
}


void parseColorString () {
  commaR = color.indexOf(','); //comma trailing R
  commaG = color.indexOf(',', commaR + 1);

  strR = color.substring(0, commaR);
  strG = color.substring(commaR + 1, commaG);
  strB = color.substring(commaG + 1);

  r = strR.toInt();
  g = strG.toInt();
  b = strB.toInt();

  light.setPixelColor(0, r, g, b);
}

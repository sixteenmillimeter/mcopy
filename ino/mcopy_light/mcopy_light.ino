#include "SoftwareSerial.h"
#include "Adafruit_Pixie.h"

#define NUMPIXELS 1 // Number of Pixies in the strip
#define PIXIEPIN  6 // Pin number for SoftwareSerial output

SoftwareSerial pixieSerial(-1, PIXIEPIN);
Adafruit_Pixie light = Adafruit_Pixie(NUMPIXELS, &pixieSerial);

String color = "000,000,000";

volatile int commaR = 0;
volatile int commaG = 0;

String strR = "000";
String strG = "000";
String strB = "000";

volatile int r = 0;
volatile int g = 0;
volatile int b = 0;

const char cmd_debug = 'd';
const char cmd_connect = 'i';

const char cmd_light = 'l';

volatile char cmd_char = 'z';
const int serialDelay = 5;

void setup () {
	Serial.begin(57600);
	Serial.flush();
	Serial.setTimeout(serialDelay);
	pixieSerial.begin(115200); // Pixie REQUIRES this baud rate
	light.setPixelColor(0, 0, 0, 0);
}

void loop () {
	if (Serial.available()) {
		/* read the most recent byte */
		cmd_char = (char)Serial.read();
	}
	if (cmd_char != 'z') {
		cmd(cmd_char);
		cmd_char = 'z';
	}
}

//
//l - light - followed by String
//
void cmd (char val) {
  if (val == cmd_connect) {
    Serial.println(cmd_connect);//confirm connection
  } else if (val == cmd_light) {
    colorString();
    Serial.println(cmd_light);//confirm light change
  }
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
}

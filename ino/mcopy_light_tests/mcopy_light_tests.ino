//Test lighting with NeoPixels instead of Pixies to prevent eye damage.

//#include "SoftwareSerial.h"
//#include "Adafruit_Pixie.h"

#include <Adafruit_NeoPixel.h>

#define NUMPIXELS 1 // Number of Pixies in the strip
//#define PIXIEPIN  6 // Pin number for SoftwareSerial output

#define PIXELPIN  3 // Pin number for SoftwareSerial output

//SoftwareSerial pixieSerial(-1, PIXIEPIN);
//Adafruit_Pixie light = Adafruit_Pixie(NUMPIXELS, &pixieSerial);

Adafruit_NeoPixel light = Adafruit_NeoPixel(1, PIXELPIN, NEO_GRB + NEO_KHZ800);

String color = "000,000,000,000";

volatile int commaR = 0;
volatile int commaG = 0;

String strR = "000";
String strG = "000";
String strB = "000";

volatile int r = 0;
volatile int g = 0;
volatile int b = 0;

volatile char cmd_char = 'z';

void setup () {
	Serial.begin(57600);
	Serial.flush();
	//pixieSerial.begin(115200); // Pixie REQUIRES this baud rate
  light.begin();
	light.setPixelColor(0, 0, 0, 0);
  light.show();
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
//c - color - followed by String
//
void cmd (char val) {
  if (val == 'i') {
    Serial.println("i");//confirm connection
  } else if (val == 'l') {
		colorString();
    Serial.println("l");//confirm light change
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
  light.show();
}

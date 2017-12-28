//Test lighting with NeoPixels instead of Pixies to prevent eye damage.
//NeoPixel wiring, put 1000uF cap across 5V and GND and 470ohm resistor
//in series with the data connection to the Arduino pin
//
// ARDUINO                     NEOPIXEL
//  5VDC      --|--| 1000uF     5V   
//  GND       --|--| 1000uF     GND
//  PIN 3     --==-- 470ohm     Din


//#include "SoftwareSerial.h"
//#include "Adafruit_Pixie.h"

#include <Adafruit_NeoPixel.h>

#define NUMPIXELS 1 // Number of Pixies in the strip
//#define PIXIEPIN  6 // Pin number for SoftwareSerial output

#define PIXELPIN  3 // Pin number for SoftwareSerial output

//SoftwareSerial pixieSerial(-1, PIXIEPIN);
//Adafruit_Pixie light = Adafruit_Pixie(NUMPIXELS, &pixieSerial);

Adafruit_NeoPixel light = Adafruit_NeoPixel(1, PIXELPIN, NEO_GRB + NEO_KHZ800);

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

const char cmd_light = 'l';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const int serialDelay = 5;

void setup () {
	Serial.begin(57600);
	Serial.flush();
	Serial.setTimeout(serialDelay);
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
  now = millis();
  if (now - light_time >= 1000) {
    light.setPixelColor(0, r, g, b);
    light.show();
    light_time = now;
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

//takes 1004ms w/ string method
//takes 2ms(!!!!!) w/o readString() ugh
//WAIT!! Serial.setTimeout(1000) by default!
//500 - WORKS
//250 - WORKS
//100 - WORKS
//25? - WORKS
//5   - WORKS - STAY HERE FOR NOW
void colorString () {
	while (Serial.available() == 0) {             
		//Wait for color string
	}
	color = Serial.readString();
  Serial.println(color);

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

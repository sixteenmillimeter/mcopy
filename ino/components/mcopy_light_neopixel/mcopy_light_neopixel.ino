#include <Adafruit_NeoPixel.h>

#define PIN 9
#define NUM 7

//https://www.adafruit.com/product/2226

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUM, PIN, NEO_GRBW + NEO_KHZ800);


String strR = "000";
String strG = "000";
String strB = "000";
String strW = "000"; //w = brightness

volatile int r = 0;
volatile int g = 0;
volatile int b = 0;
volatile int w = 0;

float brightness  = 0.2;

void setup() {
	w = floor(brightness * 255.0f);
	Serial.begin(56700);
	pixels.begin();
	pixels.setBrightness(w);
	pixels.fill( 0xFFFFFF);
	pixels.show();
	Serial.print("brightness: ");
	Serial.println(w);
}

void setColor (int r, int g, int b, int w) {
	pixels.setBrightness(w);
	pixels.fill(pixels.Color(r, g, b));
	pixels.show();
}

void loop () {
	pixels.show();
	//delay(1000);
	r = 255; 
	g = 161; 
	b = 72;
/*	int i = random(0, 3);
	uint16_t total = 230 * 3;
	if (i == 0) {
		r = random(205, 256);
		g = random(205, 256);
		b = total - r - g;
;	} else if (i == 1) {
		r = random(205, 256);
		b = random(205, 256);
		g = total - r - b;
	} else if (i == 2) {
		b = random(205, 256);
		g = random(205, 256);
		r = total - g - b;
	}*/
	setColor(r, g, b, w); 
	//delay(1000);
}
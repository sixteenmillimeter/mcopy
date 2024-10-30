#include <Adafruit_NeoPixel.h>

#define PIN 9
#define NUM 7

//https://www.adafruit.com/product/2226

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUM, PIN, NEO_GRBW + NEO_KHZ800);

float brightness  = 0.2;
int b = floor(brightness * 255.0f);

void setup() {
	Serial.begin(56700);
	pixels.begin();
	pixels.setBrightness(b);
	pixels.fill( 0xFFFFFF);
	pixels.show();
	Serial.print("brightness: ");
	Serial.println(b);
}

void loop () {
	pixels.show();
}
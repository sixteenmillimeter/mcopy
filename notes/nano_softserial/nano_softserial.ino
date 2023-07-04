#include <SoftwareSerial.h>

#define SOFTWARE_RX     10
#define SOFTWARE_TX     11

SoftwareSerial softPort(SOFTWARE_RX, SOFTWARE_TX);

volatile char cmd = 'z';
volatile long now;
volatile long start;

void setup () {
    softPort.begin(9600);
    start = millis();
    pinMode(LED_BUILTIN, OUTPUT);
}

void loop () {
    now = millis();
    if (softPort.available() > 0) {
        cmd = softPort.read();
    }
    if (cmd == 'x') {
        digitalWrite(LED_BUILTIN, HIGH);
    }
    if (now >= start + 5000) {
        softPort.print('x');
    }
}


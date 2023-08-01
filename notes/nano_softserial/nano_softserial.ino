#include <SoftwareSerial.h>

#define SOFTWARE_RX     10
#define SOFTWARE_TX     11

SoftwareSerial softPort(SOFTWARE_RX, SOFTWARE_TX);

volatile char proxy = 'z';
volatile char cmd = 'z';


void setup () {
    Serial.begin(57600);
    softPort.begin(9600);
    pinMode(LED_BUILTIN, OUTPUT);
}
//////
// Sending an x character to the nano over
// Serial will proxy it to the ESP32 over SoftSerial
// which will reflect it back to the Nano
// and will turn on the built-in LED. Proof of
// concept round trip
//////
void loop () {
    if (Serial.available() > 0) {
        proxy = Serial.read();
        softPort.print(proxy);
    }
    if (softPort.available() > 0) {
        cmd = softPort.read();
    }
    if (cmd != 'z') {
        Serial.println(cmd);
    }
    if (cmd == 'x') {
        digitalWrite(LED_BUILTIN, HIGH);
    }
    cmd = 'z';
}


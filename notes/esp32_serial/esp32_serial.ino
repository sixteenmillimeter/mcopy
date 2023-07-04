
#include <Arduino.h>

#define RXD2 16
#define TXD2 -1

HardwareSerial Serial2(1);


void setup () {
    Serial2.begin(57600, SERIAL_8N1, RXD2, TXD2);
}



void loop () {
    now = millis();

    if (Serial2.available() > 0) {
        //cmdChar = Serial2.read();
    }
}

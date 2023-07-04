
#include <Arduino.h>

#define RXD2 16
#define TXD2 17

#define LOG_LOCAL_LEVEL ESP_LOG_INFO
#include "esp_log.h"
#include <esp32-hal-log.h>


HardwareSerial Serial2(1);

volatile char cmd = 'z';

void setup () {
    Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
}

void loop () {
    if (Serial2.available() > 0) {
        cmd = Serial2.read();
    }

    if (cmd == 'x') {
        Serial2.print('x');
    }
}

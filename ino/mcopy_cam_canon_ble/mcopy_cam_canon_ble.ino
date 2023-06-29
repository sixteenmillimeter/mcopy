/**
 * 
 * Camera Remote Menu
 * 
 * 
 * 
 * 
 * 
 * Camera Settings
 * 
 * 
 * 
 * 
 * 
 **/

#include "CanonBLERemote.h"
#include <Arduino.h>

#define RXD2 16
#define TXD2 -1

#define LOG_LOCAL_LEVEL ESP_LOG_INFO
#include "esp_log.h"
#include <esp32-hal-log.h>

const String name_remote = "mcopy";
CanonBLERemote canon_ble(name_remote);
HardwareSerial Serial2(1);

volatile boolean connected = false;
volatile boolean bleInit = false;

volatile long now;
volatile long last = -1;

volatile char cmdChar = 'z';

void setup () {
    esp_log_level_set("*", ESP_LOG_NONE);
    delay(500);
    Serial2.begin(57600, SERIAL_8N1, RXD2, TXD2);
}

void connectBLE () {
    do {
        //
    }
    while(!canon_ble.pair(10));

    connected = true;
    Serial2.println('C');
}

void loop () {
    now = millis();

    if (Serial2.available() > 0) {
        cmdChar = Serial2.read();
    }

    if (connected && cmdChar == 'c') {
        camera();
    }

    if (!bleInit && !connected && cmdChar == 'i') {
        canon_ble.init();
        bleInit = true;
        Serial2.println('i');
    }

    if (!connected && cmdChar == 'C') {
        connectBLE();
    }

    if (connected && !canon_ble.isConnected()) {
        connected = false;
        Serial2.println('d');
    }

    cmdChar = 'z';
}

void camera () {
    long start = now;
    long end;

    if (!canon_ble.trigger()) {
        Serial2.println('E');
    }
    Serial2.println('c');

    end = millis();
}

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
#define TXD2 17
#define LED_BUILTIN 2

#define LOG_LOCAL_LEVEL ESP_LOG_INFO
#include "esp_log.h"
#include <esp32-hal-log.h>

const String name_remote = "mcopy";
CanonBLERemote canon_ble(name_remote);

volatile boolean connected = false;
volatile boolean bleInit = false;
volatile boolean blinkState = false;

volatile long now;
volatile long last = -1;
volatile long blinkLast = 0;

volatile char cmdChar = 'z';

void setup () {
    esp_log_level_set("*", ESP_LOG_NONE);
    Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
    pinMode(LED_BUILTIN, OUTPUT);
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

    if (!bleInit && !connected) {
        canon_ble.init();
        bleInit = true;
    }

    if (bleInit && !connected && cmdChar == 'C') {
        connectBLE();
    }

    if (connected && !canon_ble.isConnected()) {
        connected = false;
        Serial2.print('d');
    }

    blink();

    cmdChar = 'z';
}

void camera () {
    long start = now;
    long end;

    if (!canon_ble.trigger()) {
        Serial2.print('E');
    }
    Serial2.print('c');

    end = millis();
}

void blink () {
    if (!connected && bleInit) {
        if (now >= blinkLast + 200) {
            if (blinkState) {
                digitalWrite(LED_BUILTIN, HIGH);
            } else {
                digitalWrite(LED_BUILTIN, LOW);
            }
            blinkState = !blinkState;
            blinkLast = now;
        } 
    }
}
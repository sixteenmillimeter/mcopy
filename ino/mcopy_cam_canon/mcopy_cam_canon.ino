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
#include "TickTwo.h"
#include "McopySerial.h"

#define LOG_LOCAL_LEVEL ESP_LOG_INFO
#include "esp_log.h"
#include <esp32-hal-log.h>

#define SHUTTTER_BTN    12
#define RELAY_PIN       14
#define LED 22

void blink();
volatile bool ledState;

const String name_remote = "mcopy";
CanonBLERemote canon_ble(name_remote);
TickTwo blinker(blink, 500);
McopySerial mc(McopySerial::CAMERA_IDENTIFIER);

volatile boolean connected = false;

volatile long now;
volatile long last = -1;

volatile byte cmd;

void blink(){
    digitalWrite(LED, ledState);
    ledState = !ledState;
}

void setup()
{
    esp_log_level_set("*", ESP_LOG_INFO); 

    pinMode(SHUTTTER_BTN, INPUT_PULLUP);  
    pinMode(LED, OUTPUT);

    mc.begin();

    canon_ble.init();
    delay(1000);
    blinker.start();
}

void connectBLE () {
    do {
        Serial.println("Pairing...");
    }
    while(!canon_ble.pair(10));

    connected = true;
    blinker.pause();
    blinker.interval(100);

    digitalWrite(LED, HIGH);
    delay(1000);
    
    mc.log("Camera paired");
    mc.log(canon_ble.getPairedAddressString());
}

void loop()
{
    now = millis();
    cmd = mc.loop();

    if (cmd == McopySerial::CAMERA && last + 1000 < now) {
        shutter();
    }

    // Shutter
    if (digitalRead(SHUTTTER_BTN) == LOW && last + 1000 < now){
        shutter();
    }

    blinker.update();

    if (connected && !canon_ble.isConnected()) {
        connected = false;
        //mc.log("Disconnected");
        blinker.interval(500);
        blinker.resume();
    }
}

void shutter () {
    digitalWrite(LED, LOW);
    blinker.resume();
    mc.log("Shutter pressed");

    if(!canon_ble.trigger()){
        mc.log("Trigger Failed");
    }

    blinker.pause();
    digitalWrite(LED, HIGH);
    last = millis();
}
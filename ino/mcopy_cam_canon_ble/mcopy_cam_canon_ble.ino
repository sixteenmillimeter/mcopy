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
#include "McopySerial.h"

#define LOG_LOCAL_LEVEL ESP_LOG_INFO
#include "esp_log.h"
#include <esp32-hal-log.h>

#define SHUTTTER_BTN    12
#define RELAY_PIN       14
#define RED_LED         23
#define GREEN_LED             22

void blink();
volatile bool greenLEDstate;

const String name_remote = "mcopy";
CanonBLERemote canon_ble(name_remote);

McopySerial mc;

volatile boolean connected = false;

volatile long now;
volatile long last = -1;

volatile byte cmd;

void blink(){
    digitalWrite(GREEN_LED, greenLEDstate);
    greenLEDstate = !greenLEDstate;
}

void setup()
{
    esp_log_level_set("*", ESP_LOG_INFO); 

    pinMode(SHUTTTER_BTN, INPUT_PULLUP);  
    pinMode(GREEN_LED, OUTPUT);

    mc.begin(mc.CAMERA_IDENTIFIER);
    digitalWrite(GREEN_LED, HIGH);
    canon_ble.init();

    delay(1000);
}

void connectBLE () {
    do {
        Serial.println("Pairing...");
    }
    while(!canon_ble.pair(10));

    connected = true;

    digitalWrite(GREEN_LED, HIGH);
    delay(1000);
    
    mc.log("Camera paired");
    mc.log(canon_ble.getPairedAddressString());
}

void loop()
{
    now = millis();
    cmd = mc.loop();

    if (cmd == mc.CAMERA && last + 1000 < now) {
        shutter();
    }

    // Shutter
    if (digitalRead(SHUTTTER_BTN) == LOW && last + 1000 < now){
        shutter();
    }

    if (connected && !canon_ble.isConnected()) {
        connected = false;
    }
}

void shutter () {
    digitalWrite(GREEN_LED, LOW);
    mc.log("Shutter pressed");

    if(!canon_ble.trigger()){
        mc.log("Trigger Failed");
    }

    digitalWrite(GREEN_LED, HIGH);
    last = millis();
    mc.confirm(mc.CAMERA);
}
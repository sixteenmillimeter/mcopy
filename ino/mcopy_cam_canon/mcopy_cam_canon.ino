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

#define LOG_LOCAL_LEVEL ESP_LOG_INFO
#include "esp_log.h"
#include <esp32-hal-log.h>

#define SHUTTTER_BTN    14
#define FOCUS_BTN   12
#define LED 22

void blink();
bool ledState;

String name_remote = "mcopy";
CanonBLERemote canon_ble(name_remote);
TickTwo blinker(blink, 500);
boolean connected = false;
long last = -1;

void blink(){
    digitalWrite(LED, ledState);
    ledState = !ledState;
}

void setup()
{
    Serial.begin(57600);
    esp_log_level_set("*", ESP_LOG_INFO); 

    pinMode(SHUTTTER_BTN, INPUT_PULLUP);  
    pinMode(FOCUS_BTN, INPUT_PULLUP);   
    pinMode(LED, OUTPUT);

    canon_ble.init();
    delay(1000);
    blinker.start();

    do {
        Serial.println("Pairing...");
    }
    while(!canon_ble.pair(10));

    connected = true;
    blinker.pause();
    blinker.interval(100);

    digitalWrite(LED, HIGH);
    delay(1000);
    
    Serial.println("Camera paired");
    Serial.println(canon_ble.getPairedAddressString());
}

void loop()
{
    // Shutter
    if (digitalRead(SHUTTTER_BTN) == LOW && last + 1000 < millis()){
        digitalWrite(LED, LOW);
        blinker.resume();
        Serial.println("Shutter pressed");

        if(!canon_ble.trigger()){
            Serial.println("Trigger Failed");
        }
    
        blinker.pause();
        digitalWrite(LED, HIGH);
        last = millis();
    }
    blinker.update();
    if (connected && !canon_ble.isConnected()) {
        connected = false;
        Serial.println("Disconnected");
        blinker.interval(500);
    }
}
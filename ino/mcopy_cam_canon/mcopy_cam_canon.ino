#include "CanonBLERemote.h"
#include <Arduino.h>
#include "TickTwo.h"

#define LOG_LOCAL_LEVEL ESP_LOG_INFO
#include "esp_log.h"
#include <esp32-hal-log.h>

#define SHUTTTER_BTN    14
#define FOCUS_BTN   12
#define LED 2

void blink();
bool ledState;

String name_remote = "mcopy";
CanonBLERemote canon_ble(name_remote);
TickTwo blinker(blink, 500);

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

    blinker.stop();
    delay(1000);
    Serial.println("Camera paired");
    Serial.println(canon_ble.getPairedAddressString());
}

void loop()
{
    // Shutter
    if (digitalRead(SHUTTTER_BTN) == LOW){
        blinker.pause();
        Serial.println("Shutter pressed");
        digitalWrite(LED, LOW);
        if(!canon_ble.trigger()){
            Serial.println("Trigger Failed");
        }
        blinker.resume();
    }
    // Focus
    else if (digitalRead(FOCUS_BTN) == LOW){
        blinker.pause();
        Serial.println("Focus pressed");
        digitalWrite(LED, LOW);
        if(!canon_ble.focus()){
            Serial.println("Focus failed");
        }
        blinker.resume();
    }
    blinker.update();
}
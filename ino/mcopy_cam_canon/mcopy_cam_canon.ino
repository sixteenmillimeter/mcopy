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
volatile boolean connected = false;

volatile long now;
volatile long last = -1;

volatile byte cmd_char;

void blink(){
    digitalWrite(LED, ledState);
    ledState = !ledState;
}

void setup()
{
    Serial.begin(57600);
    esp_log_level_set("*", ESP_LOG_INFO); 

    pinMode(SHUTTTER_BTN, INPUT_PULLUP);  
    pinMode(LED, OUTPUT);

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
    
    Serial.println("Camera paired");
    Serial.println(canon_ble.getPairedAddressString());
}

void loop()
{
    now = millis();
    if (Serial.available()) {
        /* read the most recent byte */
        cmd_char = (char)Serial.read();
    }
    if (cmd_char == 'c' && last + 1000 < now) {
        shutter();
        cmd_char = 'z';
    }
    // Shutter
    if (digitalRead(SHUTTTER_BTN) == LOW && last + 1000 < now){
        shutter();
    }
    blinker.update();
    if (connected && !canon_ble.isConnected()) {
        connected = false;
        Serial.println("Disconnected");
        blinker.interval(500);
        blinker.resume();
    }
}

void shutter () {
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
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

#define LOG_LOCAL_LEVEL ESP_LOG_INFO
#include "esp_log.h"
#include <esp32-hal-log.h>


const String name_remote = "mcopy";
CanonBLERemote canon_ble(name_remote);

volatile boolean connected = false;
volatile boolean bleInit = false;

volatile long now;
volatile long last = -1;

volatile char cmdChar = 'z';


void setup()
{
    esp_log_level_set("*", ESP_LOG_NONE);
}

void connectBLE () {
    do {
        //
    }
    while(!canon_ble.pair(10));

    connected = true;
    
    //mc.log("Camera paired");
    //mc.log(canon_ble.getPairedAddressString());
}

void loop()
{
    now = millis();

    // Shutter
    if (connected){ //&&
        camera();
    }

    if (connected && !canon_ble.isConnected()) {
        connected = false;
    }

    if (!bleInit && mc.connected && mc.identified) {
        //mc.log("Initializing BLE...");
        canon_ble.init();
        bleInit = true;
        delay(1000);
    }

    if (!connected && mc.connected && mc.identified) {
        //mc.log("Connecting BLE...");
        connectBLE();
    }
}

void camera () {
    long start = now;
    long end;

    //mc.log("Shutter pressed");

    if(!canon_ble.trigger()){
        //mc.log("camera() failed");
    }

    end = millis();
}

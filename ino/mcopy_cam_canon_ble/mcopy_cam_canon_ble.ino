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
//#include "McopySerial.h"

#define LOG_LOCAL_LEVEL ESP_LOG_INFO
#include "esp_log.h"
#include <esp32-hal-log.h>

#define SHUTTTER_BTN    12
#define RELAY_PIN       14
#define RED_LED         23
#define GREEN_LED       22


const String name_remote = "mcopy";
CanonBLERemote canon_ble(name_remote);

McopySerial mc;

volatile boolean connected = false;
volatile boolean bleInit = false;

volatile long now;
volatile long last = -1;
volatile long cameraFrame = 2000;

volatile char cmdChar = 'z';


void setup()
{
    esp_log_level_set("*", ESP_LOG_NONE);

    pins();
    mc.begin(mc.CAMERA_IDENTIFIER);

    digitalWrite(RED_LED, HIGH);
    digitalWrite(GREEN_LED, HIGH);

    delay(42);

    digitalWrite(RED_LED, LOW);
    digitalWrite(GREEN_LED, LOW);
}

void pins () {
    pinMode(SHUTTTER_BTN, INPUT_PULLUP);  
    pinMode(RED_LED, OUTPUT);
    pinMode(GREEN_LED, OUTPUT);

    digitalWrite(RED_LED, LOW);
    digitalWrite(GREEN_LED, LOW);
}

void connectBLE () {
    digitalWrite(RED_LED, HIGH);
    digitalWrite(GREEN_LED, LOW);
    do {
        mc.log("Pairing...");
    }
    while(!canon_ble.pair(10));

    connected = true;

    digitalWrite(RED_LED, LOW);
    digitalWrite(GREEN_LED, HIGH);
    delay(1000);
    
    mc.log("Camera paired");
    mc.log(canon_ble.getPairedAddressString());
}

void loop()
{
    now = millis();
    cmdChar = mc.loop();

    cmd(cmdChar);

    // Shutter
    if (digitalRead(SHUTTTER_BTN) == LOW && connected){
        camera();
    }

    if (connected && !canon_ble.isConnected()) {
        connected = false;
    }

    if (!bleInit && mc.connected && mc.identified) {
        mc.log("Initializing BLE...");
        canon_ble.init();
        bleInit = true;
        delay(1000);
    }

    if (!connected && mc.connected && mc.identified) {
        mc.log("Connecting BLE...");
        connectBLE();
    }
}

void cmd (char val) {
    if (val == mc.CAMERA && connected) {
        camera();
    } else if (val == mc.CAMERA_FORWARD) {
        camera_direction(true);
    } else if (val == mc.CAMERA_BACKWARD) {
        camera_direction(false);
    } else if (val == mc.STATE) {
        state();
    }
}

void camera () {
    long start = now;
    long end;

    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(RED_LED, HIGH);
    mc.log("Shutter pressed");

    if(!canon_ble.trigger()){
        mc.log("camera() failed");
    }

    end = millis();
    delay(cameraFrame - (end - start));
    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(RED_LED, LOW);
    last = millis();
    mc.confirm(mc.CAMERA);
}

//null route direction
void camera_direction (boolean state) {
    if (state) {
        mc.confirm(mc.CAMERA_FORWARD);
        mc.log("camera_direction(true)");
    } else {
        mc.confirm(mc.CAMERA_BACKWARD);
        mc.log("camera_direction(false)");
    }
}

void state () {
  String stateString = String(mc.CAMERA_EXPOSURE);
  stateString += String(cameraFrame);
  stateString += String(mc.STATE);
  mc.print(stateString);
}
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

#include "McopySerial.h"

#define SHUTTTER_BTN    12
#define RELAY_PIN       14
#define RED_LED         23
#define GREEN_LED       22

McopySerial mc;

volatile boolean connected = false;
volatile boolean bleInit = false;

volatile long now;
volatile long last = -1;
volatile long cameraFrame = 2000;

volatile char cmdChar = 'z';


void setup()
{
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
        bleInit = true;
        delay(1000);
    }

    if (!connected && mc.connected && mc.identified) {
        mc.log("Connecting BLE...");
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
    String stateString = String(mc.STATE);
    stateString += String(mc.CAMERA_EXPOSURE);
    stateString += String(cameraFrame);
    stateString += String(mc.STATE);
    mc.print(stateString);
}
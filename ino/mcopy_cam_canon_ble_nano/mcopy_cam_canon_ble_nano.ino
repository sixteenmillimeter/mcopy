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

#include <SoftwareSerial.h>
#include "McopySerial.h"

#define SHUTTTER_BTN    5
#define RED_LED         6
#define GREEN_LED       7
#define SOFTWARE_RX     10
#define SOFTWARE_TX     11

McopySerial mc;
SoftwareSerial SoftSerial(SOFTWARE_RX, SOFTWARE_TX);

volatile boolean connected = false;
volatile boolean bleInit = false;

volatile boolean blinkState = false;
volatile long blinkLast = 0;

volatile long now;
volatile long last = -1;
volatile long cameraFrame = 2000;

volatile long start;
volatile long end;

volatile char cmdChar = 'z';
volatile char sChar = 'z';

volatile bool connectedOnce = false;


void setup () {
    pins();
    mc.begin(mc.CAMERA_IDENTIFIER);
    SoftSerial.begin(9600);

    digitalWrite(RED_LED, HIGH);
    digitalWrite(GREEN_LED, HIGH);

    delay(42);

    digitalWrite(RED_LED, LOW);
    digitalWrite(GREEN_LED, LOW);
    blinkLast = millis();
}

void pins () {
    pinMode(SHUTTTER_BTN, INPUT_PULLUP);  
    pinMode(RED_LED, OUTPUT);
    pinMode(GREEN_LED, OUTPUT);

    digitalWrite(RED_LED, LOW);
    digitalWrite(GREEN_LED, LOW);
}


void loop () {
    now = millis();
    cmdChar = mc.loop();

    if (SoftSerial.available() > 0) {
        sChar = SoftSerial.read();
    }

    s_cmd(sChar);
    cmd(cmdChar);

    // Shutter
    if (digitalRead(SHUTTTER_BTN) == LOW && connected){
        camera();
    }

    if (!connected && mc.connected && mc.identified && !connectedOnce) {
        mc.log("Connecting BLE...");
        SoftSerial.print('C');
        connectedOnce = true;
    }

    blink();
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
    cmdChar = 'z';
}

void s_cmd (char val) {
    if (val == 'C') {
        connected = true;
        digitalWrite(RED_LED, HIGH);
        digitalWrite(GREEN_LED, LOW);
    } else if (val == 'd') {
        connected = false;
        digitalWrite(RED_LED, LOW);
        digitalWrite(GREEN_LED, LOW);
    } else if (val == 'c') {
        camera_end();
    }
    sChar = 'z';
}

void camera () {
    start = now;
    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(RED_LED, LOW);
    mc.log("Shutter pressed");
    SoftSerial.print('c');
}

void camera_end () {
    end = millis();
    delay(cameraFrame - (end - start));
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(RED_LED, HIGH);
    last = millis();
    mc.confirm(mc.CAMERA);
    mc.log("camera()");
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

void blink () {
    if (!connected) {
        if (now >= blinkLast + 200) {
            if (blinkState) {
                digitalWrite(RED_LED, HIGH);
            } else {
                digitalWrite(RED_LED, LOW);
            }
            blinkState = !blinkState;
            blinkLast = now;
        } 
    }
}

void state () {
    String stateString = String(mc.STATE);
    stateString += String(mc.CAMERA_EXPOSURE);
    stateString += String(cameraFrame);
    stateString += String(mc.STATE);
    mc.print(stateString);
}
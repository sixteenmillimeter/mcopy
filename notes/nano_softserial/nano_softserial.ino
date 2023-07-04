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

#define SOFTWARE_RX     10
#define SOFTWARE_TX     11

SoftwareSerial softPort(SOFTWARE_RX, SOFTWARE_TX);

void setup () {
    softPort.begin(57600);
}


void loop () {
    if (softPort.available() > 0) {
        //sChar = softPort.read();
    }
}


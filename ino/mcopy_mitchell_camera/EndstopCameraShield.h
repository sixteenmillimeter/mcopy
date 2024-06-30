#ifndef EndstopCameraShield_h
#define EndstopCameraShield_h

#include <Arduino.h>
#include "TB6600MotorDriver.h"

/**
 * Default pins
 * 2 Close Receiver Pin
 * 3 Open Receiver Pin
 * 4 Open Emitter Pin
 * 5 Close Emitter Pin
 **/

class EndstopCameraShield {
  private:
  const uint8_t receiverClosePin = 2;
  const uint8_t receiverOpenPin = 3;
  const uint8_t emitterOpenPin = 4;
  const uint8_t emitterClosePin = 5;

  const uint8_t motorEnablePin = 6;
  const uint8_t motorDirectionPin = 7;
  const uint8_t motorPulsePin = 8;
  
  volatile uint32_t motorUsPulse = 300;
  volatile uint8_t motorMicrosteps = 2; //half stepping

  TB6600MotorDriver motor;

  public:

  EndstopCameraShield(uint32_t usPulse, uint8_t microsteps);

  void setup();
  void loop();
};

#endif
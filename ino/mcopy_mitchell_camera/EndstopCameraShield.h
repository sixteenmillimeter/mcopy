#ifndef EndstopCameraShield_h
#define EndstopCameraShield_h

#include <Arduino.h>

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

  public:

  EndstopCameraShield();

  void setup();
  void loop();
};

#endif
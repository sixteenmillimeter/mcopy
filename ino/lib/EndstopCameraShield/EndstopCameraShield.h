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
  const uint8_t _receiverClosePin = 2;
  const uint8_t _receiverOpenPin = 3;
  const uint8_t _emitterOpenPin = 4;
  const uint8_t _emitterClosePin = 5;

  const uint8_t _motorEnablePin = 6;
  const uint8_t _motorDirectionPin = 7;
  const uint8_t _motorPulsePin = 8;

  const double _ledAngle = 7.0;
  
  volatile uint32_t _motorUsPulse = 300;
  volatile uint8_t _motorMicrosteps = 2; //half stepping
  volatile double _stepAngle = (double) 360 / ((double) 2 * (double) 200);

  TB6600MotorDriver _motor;

  static volatile bool _direction; //true = forward, false = backward
  static volatile bool _enabled;
  static volatile bool _isClosed;
  static volatile bool _isOpened;

  void _checkState();
  void _enableCloseInterrupt();
  void _enableOpenInterrupt();
  void _enableCloseEmitter();
  void _enableOpenEmitter();
  void _enableMotor();
  void _disableCloseInterrupt();
  void _disableOpenInterrupt();
  void _disableCloseEmitter();
  void _disableOpenEmitter();
  void _disableMotor();

  static void _handleCloseInterrupt();
  static void _handleOpenInterrupt();

  public:

  EndstopCameraShield(uint32_t usPulse, uint8_t microsteps);

  void setup();
  void loop();
  uint32_t frame();
  uint32_t toOpen();
  uint32_t toClose();
  void setDirection(bool direction);
  bool isOpened();
  bool isClosed();
};

#endif
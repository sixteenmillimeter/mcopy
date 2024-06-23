#ifndef TB6600MotorDriver_h
#define TB6600MotorDriver_h

#include <Arduino.h>

/**
 * Default pins
 * D6 Enable +
 * D7 Direction +
 * D8 Pulse +
 **/

class TB6600MotorDriver {
  private:

  volatile uint8_t _enablePin = 0; //0 is disabled
  volatile uint8_t _directionPin = 7;
  volatile uint8_t _pulsePin = 8;

  volatile uint32_t _usPulse = 300;

  //physically set, can't change
  volatile uint8_t _microsteps = 1;   //1, 2, 4, 8, 16, 32

  volatile uint16_t _revsteps = 200; // # steps per revolution
  volatile bool _direction = true;
  volatile bool _enabled = true;

  void _step();
  void _setDirection();
  void _setEnable();

  public:

  TB6600MotorDriver();
  TB6600MotorDriver(uint8_t enablePin, uint8_t directionPin, uint8_t pulsePin, uint32_t usPulse, uint8_t microsteps);


  void setup();

  void setDirection(uint8_t direction);
  void setSpeed(uint16_t rpm);

  //full
  void steps(uint64_t stepCount);
  void step();

  void enable();
  void release();
};

#endif
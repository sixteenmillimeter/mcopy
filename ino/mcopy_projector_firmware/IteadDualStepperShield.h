#ifndef IteadDualStepperShield_h
#define IteadDualStepperShield_h

#include <Arduino.h>

class IteadDualStepperShield {
  private:
  const uint8_t _microsteps = 8;   //8 or 16
  const uint8_t _directionA = 3;
  const uint8_t _directionB = 7;
  const uint8_t _stepA = 2;
  const uint8_t _stepB = 6;

  void _single(uint8_t motor);
  void _micro(uint8_t motor);
  void _both();

  uint32_t _usStepA = 300;
  uint32_t _usStepB = 300;

  public:
  IteadDualStepperShield();

  uint16_t revsteps = 200; // # steps per revolution

  volatile uint8_t directionA = 1;
  volatile uint8_t directionB = 1;
  void setup();

  void setDir(uint8_t motor, uint8_t dir);
  void setSpeed(uint8_t motor, uint16_t speed);

  //full
  void step(uint8_t motor, uint64_t steps, uint8_t dir);
  void stepBoth(uint64_t steps);
  void onestep(uint8_t motor, uint8_t dir);

  void release();
};

#endif
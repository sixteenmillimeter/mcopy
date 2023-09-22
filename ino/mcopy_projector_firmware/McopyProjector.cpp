/// Mcopy Projector Class

#include "McopyProjector.h"

McopyProjector::McopyProjector (AccelStepper takeup, AccelStepper feed, uint8_t takeupSettingA, uint8_t takeupSettingB, uint8_t feedSettingA, uint8_t feedSettingB) {
	_takeup = takeup;
	_feed = feed;

	_takeupSettingA = takeupSettingA;
	_takeupSettingB = takeupSettingB;
	_feedSettingA = feedSettingA;
	_feedSettingB = feedSettingB;
}

void McopyProjector::begin () {
    _takeup.setMaxSpeed(_speed);
    _takeup.setSpeed(_speed);
    _takeup.setAcceleration(1000.0);
   
    _feed.setMaxSpeed(_speed);
    _feed.setSpeed(_speed);
    _feed.setAcceleration(1000.0);

    pinMode(_takeupSettingA, OUTPUT);
	pinMode(_takeupSettingB, OUTPUT);
	pinMode(_feedSettingA, OUTPUT);
	pinMode(_feedSettingB, OUTPUT);

    setStepperMode(1);
}

void McopyProjector::setDirection (bool dir) {
	_dir = dir;
}

void McopyProjector::frame (bool dir) {
	uint16_t spf = _stepsPerFrame * _mode; //scaled
	bool running = true;
	if (dir != _dir) {
		setDirection(dir);
	}

	int64_t takeupGoal = _takeup.currentPosition();
	int64_t feedGoal = _feed.currentPosition();
		
	takeupGoal += _dir ? spf : -spf;
	feedGoal += _dir ? spf : -spf;

	_takeup.moveTo(takeupGoal);
	_feed.moveTo(feedGoal);

	_running = true;

	while (running) {
		if (_takeup.distanceToGo() == 0 && _feed.distanceToGo() == 0) {
			//frame done
			running = false;
			_posTakeup = takeupGoal;
			_posFeed += feedGoal;
		} else {
			_takeup.run();
    		_feed.run();
		}
	}

	_running = false;

}

void McopyProjector::adjust(uint8_t motor, int64_t steps) {
	uint64_t s = abs(steps);

	//moveTo
	if (motor == 0) {
		_posTakeup += steps;
	} else if (motor == 1) {
		_posFeed += steps;
	}
}

void McopyProjector::adjustBoth (int64_t steps) {
	uint64_t s = abs(steps);
	
	//steppers.stepBoth(s);
	_posTakeup += steps;
	_posFeed += steps;

}

void McopyProjector::loop () {
	/*
	if (_running) {
		if (_takeup.distanceToGo() == 0 && _feed.distanceToGo() == 0) {
			//frame done
			_running = false;
			_posTakeup += _dir ? _stepsPerFrame : -_stepsPerFrame;
			_posFeed += _dir ? _stepsPerFrame : -_stepsPerFrame;
		} else {
			_takeup.run();
    		_feed.run();
		}
	} else if (_adjusting) {
		if (_takeup.distanceToGo() == 0 && _feed.distanceToGo() == 0) {
			//adjustment done
			_adjusting = false;
		} else {
			_takeup.run();
    		_feed.run();
		}
	}*/
}

//https://wiki.iteadstudio.com/Arduino_Dual_Step_Motor_Driver_Shield
void McopyProjector::setStepperMode (uint8_t mode) {
	_mode = mode;
	switch (mode) {
		case 1 :
			digitalWrite(_takeupSettingA, LOW);
			digitalWrite(_takeupSettingB, LOW);
			digitalWrite(_feedSettingA, LOW);
			digitalWrite(_feedSettingB, LOW);
			break;
		case 2 :
			digitalWrite(_takeupSettingA, HIGH);
			digitalWrite(_takeupSettingB, LOW);
			digitalWrite(_feedSettingA, HIGH);
			digitalWrite(_feedSettingB, LOW);
			break;
		case 4 :
			digitalWrite(_takeupSettingA, LOW);
			digitalWrite(_takeupSettingB, HIGH);
			digitalWrite(_feedSettingA, LOW);
			digitalWrite(_feedSettingB, HIGH);
			break;
		case 8 :
			digitalWrite(_takeupSettingA, HIGH);
			digitalWrite(_takeupSettingB, HIGH);
			digitalWrite(_feedSettingA, HIGH);
			digitalWrite(_feedSettingB, HIGH);
			break;
	}
}

long McopyProjector::readVcc() {
  long result;
  // Read 1.1V reference against AVcc
  ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  delay(2); // Wait for Vref to settle
  ADCSRA |= _BV(ADSC); // Convert
  while (bit_is_set(ADCSRA,ADSC));
  result = ADCL;
  result |= ADCH<<8;
  result = 1125300L / result; // Back-calculate AVcc in mV
  return result;
}

long McopyProjector::analogReadAccurate (int pin) {
  double Vcc = readVcc() / 1000.0;
  double ADCValue = analogRead(pin);
  return (ADCValue / 1024.0) * Vcc;
}

long McopyProjector::analogReadAccurateAverage (int pin) {
  int count = 3;
  double sum = 0.0;
  for (int i = 0; i < count; i++) {
    sum += analogReadAccurate(pin);
    delay(1);
  }
  return sum / (double) count;
}
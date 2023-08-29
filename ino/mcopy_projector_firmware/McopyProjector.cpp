/// Mcopy Projector Class

#include "McopyProjector.h"

McopyProjector::McopyProjector (AccelStepper takeup, AccelStepper feed) {
	_takeup = takeup;
	_feed = feed;
}

void McopyProjector::begin () {
    _takeup.setMaxSpeed(_speed);
    _takeup.setSpeed(_speed);
    _takeup.setAcceleration(1000.0);
   
    _feed.setMaxSpeed(_speed);
    _feed.setSpeed(_speed);
    _feed.setAcceleration(1000.0);
}

void McopyProjector::setDirection (bool dir) {
	_dir = dir;
}

void McopyProjector::frame (bool dir) {
	if (dir != _dir) {
		setDirection(dir);
	}

	int64_t takeupGoal = _takeup.currentPosition();
	int64_t feedGoal = _feed.currentPosition();
		
	takeupGoal += _dir ? _stepsPerFrame : -_stepsPerFrame;
	feedGoal += _dir ? _stepsPerFrame : -_stepsPerFrame;

	_takeup.moveTo(takeupGoal);
	_feed.moveTo(feedGoal);

	_running = true;

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
	}
}

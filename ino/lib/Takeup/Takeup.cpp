
#include "Takeup.h" 

Takeup::Takeup () {}

void Takeup::setup () {
	pinMode(feedPin, OUTPUT);
	pinMode(takeupPin, OUTPUT);
	digitalWrite(feedPin, LOW);
	digitalWrite(takeupPin, LOW);
}

void Takeup::loop () {
	if (takeupStop > 0 || feedStop > 0) {
		timer = millis();
		if (feedStop > 0) {
			if (timer >= feedStop) {
				_stopFeed();
			}
		}
		if (takeupStop > 0) {
			if (timer >= takeupStop) {
				_stopTakeup();
			}
		}
	}
}

void Takeup::forward () {
	bool start = takeupStop < 0;
	takeupStop = start ? millis() + frameTime : takeupStop + frameTime;
	if (start) {
		analogWrite(takeupPin, PWM);
	}
}

void Takeup::backward () {
	bool start = feedStop < 0;
	feedStop = start ? millis() + frameTime : feedStop + frameTime;
	if (start) {
		analogWrite(feedPin, PWM);
	}
}

void Takeup::_stopFeed () {
	digitalWrite(feedPin, LOW);
	feedStop = -1;
}

void Takeup::_stopTakeup () {
	digitalWrite(takeupPin, LOW);
	takeupStop = -1;
}
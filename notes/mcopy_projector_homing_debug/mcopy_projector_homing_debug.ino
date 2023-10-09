#include <AccelStepper.h>

#define TAKEUP_DIR_PIN 3
#define TAKEUP_STEP_PIN 2

#define FEED_DIR_PIN 7
#define FEED_STEP_PIN 6

#define TAKEUP_SETTINGS_A 4
#define TAKEUP_SETTINGS_B 5

#define FEED_SETTINGS_A 8
#define FEED_SETTINGS_B 9

#define TAKEUP_EMITTER 17
#define TAKEUP_RECEIVER A8
#define FEED_EMITTER 18
#define FEED_RECEIVER A9

AccelStepper _takeup(AccelStepper::DRIVER, TAKEUP_STEP_PIN, TAKEUP_DIR_PIN);
AccelStepper _feed(AccelStepper::DRIVER, FEED_STEP_PIN, FEED_DIR_PIN);

uint32_t _motorSteps = 200;
uint8_t _mode = 1;

long _feedSamples[200]; 
long _takeupSamples[200];

const float _speed = 2000.0;

void setup () {
	Serial.begin(57600);

	_takeup.setMaxSpeed(_speed);
	_takeup.setSpeed(_speed);
	_takeup.setAcceleration(1000.0);

	_feed.setMaxSpeed(_speed);
	_feed.setSpeed(_speed);
	_feed.setAcceleration(1000.0);

    pinMode(TAKEUP_SETTINGS_A, OUTPUT);
	pinMode(TAKEUP_SETTINGS_B, OUTPUT);
	pinMode(FEED_SETTINGS_A, OUTPUT);
	pinMode(FEED_SETTINGS_B, OUTPUT);
	
	pinMode(TAKEUP_RECEIVER, INPUT);
	pinMode(FEED_RECEIVER, INPUT);

	digitalWrite(TAKEUP_SETTINGS_A, LOW);
	digitalWrite(TAKEUP_SETTINGS_B, LOW);
	digitalWrite(FEED_SETTINGS_A, LOW);
	digitalWrite(FEED_SETTINGS_B, LOW);

	delay(2000);
	home();
}

void loop () {

}

long readVcc() {
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

long analogReadAccurate (uint8_t pin) {
	double Vcc = readVcc() / 1000.0;
	double ADCValue = analogRead(pin);
	return (ADCValue / 1024.0) * Vcc;
}

long analogReadAccurateAverage (uint8_t pin) {
	uint8_t count = 3;
	double sum = 0.0;
	for (uint8_t i = 0; i < count; i++) {
		sum += analogReadAccurate(pin);
		delay(1);
	}
	return sum / (double) count;
}

uint16_t findPeak(long (&arr)[200], uint16_t &steps) {
	uint16_t maxI = 0;
	long max = 0;
	for (uint16_t i = 0; i < steps; i++) {
		if (arr[i] > max) {
			maxI = i;
			max = arr[i];
		}
	}
	return maxI;
}

void home () {
	uint16_t steps = _motorSteps * _mode;
	uint16_t quarter = steps / 4;
	uint16_t eighth = quarter / 2;
	uint16_t takeupPeak = 0;
	uint16_t feedPeak = 0;
	uint16_t takeupOffset = 0;
	uint16_t feedOffset = 0;
	long takeupReading = 0.0;
	long feedReading = 0.0;

	Serial.println("home()");

	delay(10);

	for (uint16_t i = 0; i < steps; i++) {
		takeupReading = analogReadAccurateAverage(TAKEUP_RECEIVER);
		feedReading = analogReadAccurateAverage(FEED_RECEIVER);
		_takeupSamples[i] = takeupReading;
		_feedSamples[i] = feedReading;
		if (i < steps - 1) {
			_takeup.move(1);
			_feed.move(1);
			_takeup.runToPosition();
			_feed.runToPosition();
		}
	}

	for (uint16_t i = 0; i < steps; i++) {
		Serial.print(i);
		Serial.print(", ");
		Serial.print(_takeupSamples[i]);
		Serial.print(", ");
		Serial.println(_feedSamples[i]);
	}

	takeupPeak = findPeak(_takeupSamples, steps);
	feedPeak = findPeak(_feedSamples, steps);
	Serial.print("  takeup peak: ");
	Serial.println(takeupPeak);
	Serial.print("    feed peak: ");
	Serial.println(feedPeak);

	takeupOffset = abs(steps - takeupPeak);
	feedOffset = abs(steps - feedPeak);

	Serial.print("takeup offset: ");
	Serial.println(takeupOffset);
	Serial.print("  feed offset: ");
	Serial.println(feedOffset);

	if (takeupOffset > 0) {
		for (uint16_t i = 0; i < takeupOffset; i++) {
			_takeup.move(-1);
			_takeup.runToPosition();
		}
	}
	if (feedOffset > 0) {
		for (uint16_t i = 0; i < feedOffset; i++) {
			_feed.move(-1);
			_feed.runToPosition();
		}
	}
	/*
	for (uint16_t i = 0; i < eighth; i++) {
		_takeup.move(-1);
		_feed.move(-1);
		_takeup.runToPosition();
		_feed.runToPosition();
	}

	for (uint16_t i = 0; i < quarter; i++) {
		takeupReading = analogReadAccurateAverage(TAKEUP_RECEIVER);
		feedReading = analogReadAccurateAverage(FEED_RECEIVER);
		_takeupSamples[i] = takeupReading;
		_feedSamples[i] = feedReading;
		if (i < steps - 1) {
			_takeup.move(1);
			_feed.move(1);
			_takeup.runToPosition();
			_feed.runToPosition();
		}
	}
	
	takeupPeak = findPeak(_takeupSamples, quarter);
	feedPeak = findPeak(_feedSamples, quarter);
	takeupOffset = abs(quarter - takeupPeak);
	feedOffset = abs(quarter - feedPeak);
	
	if (takeupOffset > 0) {
		for (uint16_t i = 0; i < takeupOffset; i++) {
			_takeup.move(-1);
			_takeup.runToPosition();
		}
	}
	if (feedOffset > 0) {
		for (uint16_t i = 0; i < feedOffset; i++) {
			_feed.move(-1);
			_feed.runToPosition();
		}
	}
	*/
}
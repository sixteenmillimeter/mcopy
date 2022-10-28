volatile boolean DEBUG = true;

class ArriSMotor {
  public:
	int speed = 255;
	int average = -1;
    boolean direction = true;
    boolean running = false;
    boolean primed = false;

    void Begin () {
		pinMode(pinPositive, OUTPUT);
		pinMode(pinNegative, OUTPUT);
		pinMode(pinMicroswitch, INPUT_PULLUP);
	}
    
    void Start (boolean dir) {
    	startTime = millis();
    	direction = dir;

    	Run(direction, speed);

		running = true;
		primed = false;
    };

    void Run (boolean dir, int speed) {
    	if (dir) {
    		analogWrite(pinPositive, speed);
    		analogWrite(pinNegative, 0);
    	} else {
    		analogWrite(pinPositive, 0);
    		analogWrite(pinNegative, speed);
		}
    }
    
    void CheckMicroswitch () {
		int value = digitalRead(pinMicroswitch);
		if (value == 1) {
			if (running && !primed && millis() - startTime > primeTime) {
				primed = true;
			}
		}

		if (value == 0) {
			if (running && primed && millis() - startTime > minTime) {
				Stop();
			}
		}
	};

  private:
    int pinPositive = 5;
    int pinNegative = 6;
    int pinMicroswitch = 7;

    int startTime = 0;
    int primeTime = 100;
    int minTime = 200;

    void Stop () {
    	int val = 1;
    	digitalWrite(pinPositive, LOW);
    	digitalWrite(pinNegative, LOW);
    	Run(!direction, 55);
    	delay(50);
    	digitalWrite(pinPositive, LOW);
    	digitalWrite(pinNegative, LOW);
    	running = false;
    	primed = false;
    	EvaluateTiming();
    }

    void EvaluateTiming () {
    	long ms = millis() - startTime;

    	if (ms < 0) {
    		return;
    	}

    	if (average == -1) {
    		average = ms;
    	} else {
    		average = round(( ms + average ) / 2);
    	}

    	if (DEBUG) {
			Serial.print("Frame: ");
			Serial.print(ms);
			Serial.println("ms");

			Serial.print("Average: ");
			Serial.print(average);
			Serial.println("ms");
		}
    }
};

ArriSMotor motor;

void setup() {
	Serial.begin(57600);
	motor.Begin();
}

boolean d = false;
void loop() {
	if (!motor.running) {
		delay(3000);
		motor.Start(d);
		d = !d;
	}
	motor.CheckMicroswitch();
	if (!motor.primed) {
		delay(1);
	}
}
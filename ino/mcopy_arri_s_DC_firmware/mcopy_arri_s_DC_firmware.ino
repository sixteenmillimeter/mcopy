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
    	rotationTime = startTime;
    	direction = dir;
    	rotations = 0;
    	Run(direction, speed);

		running = true;
		primed = false;
    };

    void Run (boolean dir, int speed) {
    	if (dir) {
    		analogWrite(pinPositive, 0);
    		analogWrite(pinNegative, speed);
    	} else {
    		analogWrite(pinPositive, speed);
    		analogWrite(pinNegative, 0);
		}
    }
    
    void CheckMicroswitch () {
		int value = digitalRead(pinMicroswitch);
		if (value == 1) {
			if (running && !primed && millis() - rotationTime > primeTime) {
				primed = true;
			}
		}

		if (value == 0) {
			if (running && primed && millis() - rotationTime > minTime) {
				if (rotations < rotationsPer - 1) {
					rotations++;
					primed = false;
					rotationTime = millis();
				} else {
					Stop();
				}
			}
		}
	};

  private:
    const int pinPositive = 5;
    const int pinNegative = 6;
    const int pinMicroswitch = 7;

    const int rotationsPer = 3;
    volatile int rotations = 0;

    volatile long startTime = 0;
    volatile long rotationTime = 0;
    const int primeTime = 100;
    const int minTime = 200;

    void Stop () {
    	int val = 1;
    	digitalWrite(pinPositive, LOW);
    	digitalWrite(pinNegative, LOW);
    	EvaluateTiming();
    	Run(!direction, 40);
    	long c = millis();
    	while (val == 1) {
    		delay(4);
    		val = digitalRead(pinMicroswitch);
    	}
    	Serial.print("Correction: ");
    	Serial.print(millis() - c);
    	Serial.println("ms");
    	digitalWrite(pinPositive, LOW);
    	digitalWrite(pinNegative, LOW);
    	running = false;
    	primed = false;
    	
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
int count = 0;
void loop() {
	if (!motor.running) {
		delay(5000);
		motor.Start(d);
		count++;
		if (count > 9) {
			d = !d;
			count = 0;
		}
	}
	motor.CheckMicroswitch();
	if (!motor.primed) {
		delay(1);
	}
}

#include <AccelStepper.h>
#include <Adafruit_MotorShield.h>

volatile boolean DEBUG = true;

Adafruit_MotorShield AFMStop(0x60);
// Create the motor shield object with the default I2C address
Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 
//Set up for a 200step motor (NEMA 17)
Adafruit_StepperMotor *myMotor = AFMS.getStepper(200, 1);

void forwardstep() {
  myMotor->onestep(FORWARD, DOUBLE);
}

void backwardstep() {
  myMotor->onestep(BACKWARD, DOUBLE);
}

//Set up AccelStepper
AccelStepper stepper(forwardstep, backwardstep);

void setupMotor () {
	TWBR = ((F_CPU /400000l) - 16) / 2; // Change the i2c clock to 400KHz

  if (!AFMS.begin()) { // default frequency 1.6KHz
    Serial.println("Could not find Motor Shield. Check wiring.");
    while (1);
  }
  Serial.println("Motor Shield found.");
  //myMotor->setSpeed(600);
  //stepper.setMaxSpeed(600.0);
  //stepper.setSpeed(600.0);
  //stepper.setAcceleration(500.0);
}

void setup() {
  Serial.begin(57600);
  setupMotor();

  //stepper.setMaxSpeed(600.0);
  //stepper.move(600);
}

void loop() {
  // put your main code here, to run repeatedly:
  //Serial.println("Microstep steps");
  //myMotor->step(200, FORWARD, MICROSTEP); 
  
  //myMotor->step(round(200 / 8), FORWARD, SINGLE); //109ms @ speed 600
  //myMotor->step(round(200 / 8), FORWARD, SINGLE); //172ms @ speed 100

  //myMotor->step(round(200 / 8), FORWARD, MICROSTEP); //1557ms @ speed 600
  //myMotor->step(round(200 / 8), FORWARD, MICROSTEP); //1621ms @ speed 100

  //myMotor->step(200, FORWARD, SINGLE); //873ms @ speed 600
  //myMotor->step(200, FORWARD, SINGLE); //1377ms @ speed 100

  //myMotor->step(200, FORWARD, MICROSTEP); //12466ms @ speed 600
  //myMotor->step(200, FORWARD, MICROSTEP); //12967ms @ speed 100
  
  //if (stepper.distanceToGo() != 0) {
    long startTime = millis();
    //stepper.runToNewPosition(0);
    //stepper.runToNewPosition(600);
    myMotor->step(600, FORWARD, DOUBLE);
    //myMotor->step(600, FORWARD, SINGLE);
    stepper.run();
    long stopTime = millis();
    Serial.print(stopTime - startTime);
    Serial.println("ms");
    delay(1000); 
  //}
}
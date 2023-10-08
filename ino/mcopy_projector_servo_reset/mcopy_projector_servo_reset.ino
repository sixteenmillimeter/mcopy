#include <Servo.h>

Servo servo;
int pos;

void setup() {
  servo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {

  servo.write(90);
  delay(1000);
  //servo.write(60);
  //delay(2000);
}
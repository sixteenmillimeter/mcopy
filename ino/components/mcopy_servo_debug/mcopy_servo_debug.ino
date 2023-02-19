#include <Servo.h>

const int PIN_SERVO = 6;
Servo servo;

/*
----------------------------------------------------
Servo      -      Arduino
           -
Red        -      5V
Black      -      GND
Yellow     -      PWM Pin (9 in this example)

Using TowerPro SG-5010 - default 93
      TowerPro MG-995  - 
as servos for development
----------------------------------------------------
*/

void setup() {
  Serial.begin(57600);
  Serial.flush();

  Servo_init();
}

void loop() {
  delay(1000);
  servo.write(153);
  delay(1000);
  servo.write(93);
}

void Servo_init () {
  servo.attach(PIN_SERVO);
  int angle = servo.read();
  Serial.print("Default angle: ");
  Serial.println(angle);
}

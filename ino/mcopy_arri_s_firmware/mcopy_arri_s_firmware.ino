#include <Adafruit_MotorShield.h>

volatile boolean debug_state = true;
volatile boolean cam_dir = true; 
volatile boolean running = true;

const int stepsPerRevolution = 200;  
const int fullRotation = 3 * stepsPerRevolution;
const int openRotationForward = 300;
const int openRotationBackward = 300;

//CAMERA COMMANDS
const char cmd_camera = 'c';
const char cmd_cam_forward = 'e';
const char cmd_cam_backward = 'f';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_cam_identifier = 'k';

const int serialDelay = 5;

Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 
//Set up for a 200step motor (NEMA 17)
Adafruit_StepperMotor *stepper = AFMS.getStepper(stepsPerRevolution, 2);

void setupMotor () {
	//TWBR = ((F_CPU /400000l) - 16) / 2; // Change the i2c clock to 400KHz
  if (!AFMS.begin()) { // default frequency 1.6KHz
    log("Could not find Motor Shield. Check wiring.");
    while (1);
  }
  
  log("Motor Shield found.");
  stepper->setSpeed(600);
}

void setup() {
  Serial.begin(57600);
  setupMotor();
}

void loop() {
	if (Serial.available()) {
    // read the most recent byte 
    cmd_char = (char)Serial.read();
  }
  if (cmd_char != 'z') {
    cmd(cmd_char);
    cmd_char = 'z';
  }
}

void cmd (char val) {
  if (val == cmd_debug) {
    debug();
  } else if (val == cmd_connect) {
    connect();
  } else if (val == cmd_mcopy_identifier) {
    identify();
  } else if (val == cmd_cam_forward) {
    setDir(true); //explicit
  } else if (val == cmd_cam_backward) {
    setDir(false);
  } else if (val == cmd_camera) {
    cam();
  }
}

void debug () {
  debug_state = true;
  Serial.println(cmd_debug);
  log("debugging enabled");
}

void connect () {
  Serial.println(cmd_connect);
  log("connect()");
}

void identify () {
  Serial.println(cmd_cam_identifier);
  log("identify()");  
}

void setDir (boolean dir) {
  cam_dir = dir;
  if (cam_dir) {
  	Serial.println(cmd_cam_forward);
  	log("setDir = true");
  } else {
  	Serial.println(cmd_cam_backward);
  	log("setDir -> false");
	}
}

void cam () {
	long startTime = millis();
	if (cam_dir) {
		stepper->step(fullRotation, FORWARD, DOUBLE);
		Serial.println(cmd_cam_forward);
    log("cam -> forward");
	} else {
		stepper->step(fullRotation, BACKWARD, DOUBLE);
	  Serial.println(cmd_cam_backward);
    log("cam -> backward");
	}
	log(String(millis() - startTime));
}

void log (String msg) {
	if (debug_state) {
		Serial.println(msg);
	}
}
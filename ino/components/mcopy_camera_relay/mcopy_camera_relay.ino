boolean debug_state = false;

/* ------------------------------------------------
 *  pins
 * ------------------------------------------------*/
//Arduino Uno + relay module

const int PIN_INDICATOR = 13;
const int PIN_CAMERA = 9;

volatile boolean running = false;

unsigned long timer = 0;
unsigned long frame_start = 0;
unsigned long delay_start = 0;

volatile long seq_delay = 42;

const char cmd_camera = 'c';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_cam_identifier = 'k';

const int serialDelay = 5;

void setup() {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);

  Pins_init();
}

void loop() {
  if (Serial.available()) {
    /* read the most recent byte */
    cmd_char = (char)Serial.read();
  }
  if (cmd_char != 'z') {
    cmd(cmd_char);
    cmd_char = 'z';
  }
  timer = millis();
}

void cmd (char val) {
  if (val == cmd_debug) {
    debug();
  } else if (val == cmd_connect) {
    connect();
  } else if (val == cmd_mcopy_identifier) {
    identify();
  } else if (val == cmd_camera) {
    Frame();
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

void Pins_init () {
  pinMode(PIN_CAMERA, OUTPUT);
  pinMode(PIN_INDICATOR, OUTPUT);

  digitalWrite(PIN_CAMERA, HIGH);
  digitalWrite(PIN_INDICATOR, LOW);
}

void Frame () {
  frame_start = millis();
  running = true;

  digitalWrite(PIN_CAMERA, LOW);
  digitalWrite(PIN_INDICATOR, HIGH);
  delay(200);
  digitalWrite(PIN_CAMERA, HIGH);
  delay(600);
  digitalWrite(PIN_INDICATOR, LOW);
  running = false;

  Serial.println(cmd_camera);
  log("Frame completed");
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

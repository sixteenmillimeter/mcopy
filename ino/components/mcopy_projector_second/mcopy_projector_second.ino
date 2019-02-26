boolean debug_state = false;

//const int proj_pin = 5; //relay 4
//const int proj_time = {{proj.time}};
//const int proj_delay = {{proj.delay}};

const int proj_fwd_pin = 9;
const int proj_bwd_pin = 10;
const int proj_micro_pin = 8;

boolean proj_dir = true; 
boolean proj_running = false;

volatile int proj_micro_raw = 0;

const char cmd_projector = 'p';
const char cmd_proj_forward = 'g';
const char cmd_proj_backward = 'h';

const char cmd_debug = 'd';
const char cmd_connect = 'i';
volatile char cmd_char = 'z';
const char cmd_mcopy_identifier = 'm';
const char cmd_proj_identifier = 't'; //projector second

const int serialDelay = 5;

void setup() {
  Serial.begin(57600);
  Serial.flush();
  Serial.setTimeout(serialDelay);
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
}

void cmd (char val) {
  if (val == cmd_debug) {
    debug();
  } else if (val == cmd_connect) {
    connect();
  } else if (val == cmd_mcopy_identifier) {
    identify();
  } else if (val == cmd_projector) {
    proj_start();
  } else if (val == cmd_proj_forward) {
    proj_direction(true);
  } else if (val == cmd_proj_backward) {
    proj_direction(false);
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
  Serial.println(cmd_proj_identifier);
  log("identify()");  
}

void proj_start () {
  if (proj_dir) {
    digitalWrite(proj_fwd_pin, HIGH);
    digitalWrite(proj_bwd_pin, LOW); 
  } else {
    digitalWrite(proj_bwd_pin, HIGH); 
    digitalWrite(proj_fwd_pin, LOW); 
  }
  proj_running = true;
  delay(500); // Let bump pass out of microswitch

  //delay(1300); //TEMPORARY DELAY FOR TESTING TIMING
}

void proj_reading () {
   proj_micro_raw = digitalRead(proj_micro_pin);
    if (proj_micro_raw == 1) {
        //do nothing
    } else if (proj_micro_raw == 0) {
        proj_stop();
    }
    //delay(1); //needed?
}

void proj_stop () {
  digitalWrite(proj_bwd_pin, LOW); 
  digitalWrite(proj_fwd_pin, LOW);
  
  proj_running = false;
  
  Serial.println(cmd_projector);
  log("projector()");
}

void proj_direction (boolean state) {
  proj_dir = state;
  if (state) {
    Serial.println(cmd_proj_forward);
    log("proj_direction -> true");
  } else {
    Serial.println(cmd_proj_backward);
    log("proj_direction -> false");
  }
  //delay(50); //delay after direction change to account for slippage of the belt
}

void log (String msg) {
  if (debug_state) {
    Serial.println(msg);
  }
}

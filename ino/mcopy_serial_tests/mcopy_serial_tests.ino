volatile char cmd_char = 'z';

void setup() {
    Serial.begin(57600);
    Serial.flush();
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
  if (val == 'a') {
    Serial.println("a");//End of action
  }
}


void monitorCam () {

}

void monitorProj () {

}

void momentary (int pin, int pause) {
  digitalWrite(pin, LOW);
  delay(pause); //leave pause to be blocking
  digitalWrite(pin, HIGH);
}

void setDir (int pin, boolean dir) {
  if (d) {
    digitalWrite(pin, HIGH);
  } else {
    digitalWrite(pin, LOW);
  }
}
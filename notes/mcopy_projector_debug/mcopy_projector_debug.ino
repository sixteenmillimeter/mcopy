
const int PROJECTOR_MICROSWITCH = 11;

const int PROJECTOR_FWD = 3;
const int PROJECTOR_BWD = 4; 

const int PROJECTOR_MICROSWITCH_CLOSED = 0;
const int PROJECTOR_MICROSWITCH_OPENED = 1;

volatile long now;
volatile long startTime = 0;
volatile boolean writing = false;

void setup () {
  Serial.begin(57600);
  pins();
  startTime = millis();
}

void loop () {
  now = millis();
  if (now >= startTime + 3000) {
    digitalWrite(PROJECTOR_FWD, HIGH);
    writing = true;
  } else if (now >= startTime + 23000) {
    digitalWrite(PROJECTOR_FWD, LOW);
    writing = false;
  }
  if (writing) {
    Serial.print(now);
    Serial.print(",");
    Serial.println(digitalRead(PROJECTOR_MICROSWITCH));
  }
}

void pins () {
  pinMode(PROJECTOR_MICROSWITCH, INPUT_PULLUP);
  pinMode(PROJECTOR_FWD, OUTPUT);
  pinMode(PROJECTOR_BWD, OUTPUT);

  digitalWrite(PROJECTOR_FWD, LOW);
  digitalWrite(PROJECTOR_BWD, LOW);
}
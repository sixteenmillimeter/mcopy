# mcopy projector firmware

The goal of this firmware is to drive a JK-compatible gate
with two (2) NEMA17 stepper motors. Registration will be tracked
by four (4) IR LED emitters and receivers tracking two (2) 
double-stage rotary encoders.


1. log step index
2. calculate volate
3. analogRead() x 3
4. average readings
5. populate array with average at index

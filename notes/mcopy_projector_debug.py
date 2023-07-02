import serial
import time
import serial.tools.list_ports

ports = serial.tools.list_ports.comports()
port = ''
for p in ports:
    print p
    if "Arduino" in p.description:
        print "This is an Arduino!"
        port = p.device
        break

if p is '':
    print("Arduino is not connected")
    exit(1)

arduino = serial.Serial(port=port, baudrate=57600, timeout=.05)
time.sleep(1)

while arduino.in_waiting:  # Or: while ser.inWaiting():
    print arduino.readline()



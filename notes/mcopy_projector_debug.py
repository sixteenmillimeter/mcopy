import serial
import time
import serial.tools.list_ports

ports = serial.tools.list_ports.comports()
port = ''
for p in ports:
    print(p)
    if "Arduino" in p.description or 'ACM0' in p.description:
        print("This is an Arduino!")
        port = p.device
        break

if port == '':
    print("Arduino is not connected")
    exit(1)

arduino = serial.Serial(port=port, baudrate=57600, timeout=.05)
time.sleep(1)

with open('debug.csv', 'w') as file:
    while True:  # Or: while ser.inWaiting():
        file.write(arduino.readline().decode())



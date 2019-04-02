import processing.serial.*;

String CFG_FILE = "cfg.json";
int BAUD = 56700;

JSONObject cfg;
JSONObject cfgArduino;
JSONObject cmds;

String cameraString = "";
String projectorString = "";

// The serial port:
Serial connectPort;
Serial cameraPort;
Serial projectorPort;

void configure () {
  cfg = loadJSONObject(CFG_FILE);
  cfgArduino = cfg.getJSONObject("arduino");
  cmds = cfgArduino.getJSONObject("cmd");
  BAUD = cfgArduino.getInt("baud");
  println("Using mcopy " + CFG_FILE + " version " + cfg.getString("version"));
}

void connect () {
  String[] ports = Serial.list();
  String[] matches = {};
  String connectCmd = cmds.getString("connect");
  String identifyCmd = cmds.getString("mcopy_identifier");
  boolean connected = false;
  String deviceIdentifier;
  
  //println("Found serial ports:");
  //printArray(ports);
  
  for (int i = 0; i < ports.length; i++) {
    if (ports[i].toLowerCase().indexOf("tty.") == -1) {
      continue;
    }
    if (ports[i].toLowerCase().indexOf("arduino") > -1) {
        matches = append(matches, ports[i]);
    } else if (ports[i].toLowerCase().indexOf("usbserial") > -1) {
        matches = append(matches, ports[i]);
    } else if (ports[i].toLowerCase().indexOf("usbmodem") > -1) {
        matches = append(matches, ports[i]);
    }
  }
  
  println("Found " + matches.length  + " arduino device matches");
  printArray(matches);
  
  for (int i = 0; i < matches.length; i++) {
    println("Connecting to matches["+i+"] "+ matches[i] +"  at baud " + BAUD);
    connectPort = new Serial(this, matches[i], BAUD);
    
    println("Waiting for connection...");
    delay(2000);
    
    println("Sending mcopy connect command " + connectCmd);
    write(connectPort, connectCmd);
    waitFor(connectPort);
    connected = onConnect();
    if (connected) {
      delay(1000);
      println("Sending mcopy identifier command " + identifyCmd);
      connectPort.write(identifyCmd);
      waitFor(connectPort);
      onIdentify(matches[i]);
      delay(1000);
    }
    connectPort.stop();
  } 
  if (!cameraString.equals("")) {
    connectCamera();
  }
  if (!projectorString.equals("")) {
    connectProjector();
  }
    
  onReady();
}

void waitFor (Serial serialPort) {
   int limit = 5000;
   int count = 0;
   while (serialPort.available() == 0 || count >= limit) {
     delay(1);
     count++;
   }
   return;
}

void write (Serial serialPort, String cmd) {
	serialPort.write(cmd);
  return;
}

String read (Serial serialPort) {
  String inBuffer = serialPort.readStringUntil(13);
  if (inBuffer == null) {
    return "";
  }
  serialPort.clear();
  return inBuffer.trim();
}

boolean onConnect () {
    boolean connected = false;
    String res = read(connectPort);
    String connectCmd = cmds.getString("connect");
    if (res.equals(connectCmd)) {
       println("Firmware confirmed. " + res + " == " + connectCmd); 
       connected = true;
    } else {
      println("Device was not confirmed");
    }
    delay(10);
    return connected;
}

/*
projector_identifier
camera_identifier
#mcopy_identifier
light_identifier
projector_light_identifier
projector_camera_light_identifier
projector_camera_identifier
projector_second_identifier
projectors_identifier
camera_second_identifier
*/
boolean onIdentify (String serialString) {
  String res = read(connectPort);
  String device = "";
  boolean identified = true;
  if (!res.equals("")) {
    device = whichDevice(res);
    if (device.equals("projector_identifier")) {
      projectorString = serialString;
    } else if (device.equals("camera_identifier")) {
      cameraString = serialString;
    } else if (device.equals("projector_camera_identifier")) {
      //Oh no...
      cameraString = serialString;
      projectorString = serialString;
    } else {
      identified = false;
    }

  }
  return identified;
}

String whichDevice (String res) {
  String[] identifiers = {};
  String[] keys = (String[]) cmds.keys().toArray(new String[cmds.size()]);
  String id = "";
  
  for (int i = 0; i < keys.length;i++) {
    if (keys[i].indexOf("_identifier") > -1) {
      identifiers = append(identifiers, keys[i]);
    }
  }
  
  for (int i = 0; i < identifiers.length; i++) {
    if ( res.equals( cmds.getString(identifiers[i]) ) ) {
      println("Device identified with " + res + " response as " + identifiers[i]);
      id = identifiers[i];
      break;
    }
  }

  return id;
}

void connectCamera () {
  println("Connecting to " + cameraString + " as camera...");
  cameraPort = new Serial(this, cameraString, BAUD);
  delay(1000);
  println("Camera connected.");
}
void connectProjector () {  
  println("Connecting to " + projectorString + " as projector...");
  projectorPort = new Serial(this, projectorString, BAUD);
  delay(1000);
  println("Projector connected.");
}

void onReady(){
  
}

void setup() {
  configure();
  connect();
  size(640, 360); 
  noStroke();
}

void draw() {
  background(0);
  
}

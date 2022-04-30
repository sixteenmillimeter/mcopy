 import processing.net.*;
 import codeanticode.syphon.*;

Server server;
PImage img;
SyphonClient syphon;

int frameCounter = 0;
int port = 5204;

void setup() {
  size(1920, 1080, P3D);

  syphon = new SyphonClient(this);
  server = new Server(this, port);
  println("Server listening on port " + port);
}

void draw() {
  Client client = server.available();
  JSONObject json;
  String req;
  String res;
  String frameNumber;
  
  background(0);
  
  if (syphon.newFrame()) {
    img = syphon.getImage(img); 
  }
  
  if (img != null) {
    image(img, 0, 0, width, height);
  }
  
  if (client != null) {
    req = client.readString();
    if (req != null) {
      json = new JSONObject();
      json.setInt("frame", frameCounter);
      
      //format number to 000001 for filesystem sorting
      frameNumber = nf(frameCounter, 6);
      //debug request
      //println(client.ip() + "\t" + req);

      println("Capturing frame " + frameNumber + "...");
     
      /////////
      // Place single frame capture code here
      /////////
      delay(100);
      save("frame_" + frameNumber + ".tif");
      delay(100);
     
      println("Captured frame " + frameNumber);
      json.setBoolean("success", true);
     
      res = json.toString();
      //debug response
      //println("res " + res);
      client.write(res + "\n");
      server.disconnect(client);
      frameCounter++;
    }
  }
}
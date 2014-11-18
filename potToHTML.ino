#include <Process.h>
#include <Bridge.h>
Process nodejs;    // Make a new Process for calling Node

int analogValue = 0;
int sensorValue = 0;
String header = "Sensor value: ";
String message = "...";

char sensorString[3];

void setup() {
 // Initialize the Bridge 
 Bridge.begin(); 
 Serial.begin(9600);
 
   // Nothing runs unless Serial Monitor is open!!!
   while (!Serial);
   
  // Launch the js script asynchronously:
  nodejs.runShellCommandAsynchronously("node /mnt/sda1/arduino/node/socketClient.js");
 
  Serial.println("Node process starting");
  delay(5000);
}

void loop() {
  // Get sensor readings
  analogValue = analogRead(A0);
  sensorValue = analogValue/4;
  Serial.println(sensorValue);
  message = String(sensorValue);

  
  //  Write our values to the node Process
  message.toCharArray(sensorString, 3);
    for(int i=0; i < message.length(); i++) {
     nodejs.write(message.charAt(i)); 
    }
    nodejs.write('\n');
    
  // Read anything coming back
  while (nodejs.available()) {
     char c = nodejs.read();
     Serial.print(c); 
    }

}

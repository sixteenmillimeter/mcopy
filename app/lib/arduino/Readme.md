## Classes

<dl>
<dt><a href="#Arduino">Arduino</a></dt>
<dd><p>Class representing the arduino communication features</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#delay_1">delay_1</a></dt>
<dd><p>2023-07-16 Clarification</p>
<p>Previous versions of this script intermingled and even
swapped the usage of the terms &#39;serial&#39; and &#39;device&#39;.
From here on out, the terms will be used as such:</p>
<p>serial - a hardware address of a serial port
device - common name of a type of mcopy device (eg. camera,
projector, light) that is aliased to a serial port</p>
</dd>
</dl>

<a name="Arduino"></a>

## Arduino
Class representing the arduino communication features

**Kind**: global class  

* [Arduino](#Arduino)
    * [.enumerate()](#Arduino+enumerate) ⇒ <code>Promise</code>
    * [.sendAsync(device, cmd)](#Arduino+sendAsync) ⇒ <code>Promise</code>
    * [.send(device, cmd)](#Arduino+send) ⇒ <code>Promise.&lt;(boolean\|string)&gt;</code>
    * [.sendString(device, str)](#Arduino+sendString) ⇒ <code>Promise.&lt;(boolean\|string)&gt;</code>
    * [.stateAsync()](#Arduino+stateAsync)
    * [.state()](#Arduino+state)
    * [.writeAsync(device, str)](#Arduino+writeAsync) ⇒ <code>Promise</code>
    * [.end(serial, data)](#Arduino+end) ⇒ <code>any</code>
    * [.aliasSerial(device, serial)](#Arduino+aliasSerial)
    * [.connect(device, serial, confirm)](#Arduino+connect) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.confirmEnd(data)](#Arduino+confirmEnd)
    * [.verify()](#Arduino+verify) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.distinguish()](#Arduino+distinguish) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.close()](#Arduino+close) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.fakeConnect(serial)](#Arduino+fakeConnect) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.openArduino(device)](#Arduino+openArduino) ⇒ <code>Promise</code>
    * [.closeArduino(device)](#Arduino+closeArduino) ⇒ <code>Promise</code>

<a name="Arduino+enumerate"></a>

### arduino.enumerate() ⇒ <code>Promise</code>
Enumerate all connected devices that might be Arduinos

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise</code> - Resolves after enumerating  
<a name="Arduino+sendAsync"></a>

### arduino.sendAsync(device, cmd) ⇒ <code>Promise</code>
Send a command to an Arduino using async/await

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise</code> - Resolves after sending  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | The Arduino device identifier |
| cmd | <code>string</code> | Single character command to send |

<a name="Arduino+send"></a>

### arduino.send(device, cmd) ⇒ <code>Promise.&lt;(boolean\|string)&gt;</code>
Sends a command to the specified Arduino and waits for a response.
Handles the communication lock to prevent sending multiple commands simultaneously.
Emits an 'arduino_send' event after successfully sending the command.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise.&lt;(boolean\|string)&gt;</code> - Returns 'false' if the communication is locked, otherwise returns the response from the device.  
**Throws**:

- <code>Error</code> Throws an error if the sendAsync method encounters an error.


| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | The Arduino device identifier. |
| cmd | <code>string</code> | The command to be sent to the Arduino. |

<a name="Arduino+sendString"></a>

### arduino.sendString(device, str) ⇒ <code>Promise.&lt;(boolean\|string)&gt;</code>
Sends a string to the specified Arduino.
Handles different types of devices, including fake devices for testing purposes.
Waits for a specified delay before sending the string.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise.&lt;(boolean\|string)&gt;</code> - Returns 'true' if the string is sent successfully, otherwise returns an error message.  
**Throws**:

- <code>Error</code> Throws an error if the writeAsync method encounters an error.


| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | The Arduino device identifier. |
| str | <code>string</code> | The string to be sent to the Arduino. |

<a name="Arduino+stateAsync"></a>

### arduino.stateAsync()
**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
<a name="Arduino+state"></a>

### arduino.state()
**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
<a name="Arduino+writeAsync"></a>

### arduino.writeAsync(device, str) ⇒ <code>Promise</code>
Send a string to an Arduino using async/await

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise</code> - Resolves after sending  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | Arduino identifier |
| str | <code>string</code> | String to send |

<a name="Arduino+end"></a>

### arduino.end(serial, data) ⇒ <code>any</code>
Handles the end of communication with the Arduino.
Calculates the time taken for the communication, executes the callback,
and emits an 'arduino_end' event. Handles errors and stray data received.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>any</code> - The time taken for the communication in milliseconds.  

| Param | Type | Description |
| --- | --- | --- |
| serial | <code>string</code> | The serial address of the Arduino device. |
| data | <code>string</code> | The data received from the Arduino. |

<a name="Arduino+aliasSerial"></a>

### arduino.aliasSerial(device, serial)
Associates an alias with an Arduinos serial address.
Used to map multi-purpose devices onto the same serial connection.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | The serial number of the target Arduino. |
| serial | <code>string</code> | The alias to be associated with the target device. |

<a name="Arduino+connect"></a>

### arduino.connect(device, serial, confirm) ⇒ <code>Promise.&lt;string&gt;</code>
Connects to an Arduino using its serial number.
Sets up the SerialPort instance and path for the device, and handles data communication.
Handles opening the connection and emitting 'arduino_end' or 'confirmEnd' events upon receiving data.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves with the device path if the connection is successful.  
**Throws**:

- <code>Error</code> Rejects with an error message if the connection fails.


| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | The device identifier (common name). |
| serial | <code>string</code> | The serial address of the target Arduino (e.g., COM port on Windows). |
| confirm | <code>function</code> | A callback function to be executed upon receiving confirmation data. |

<a name="Arduino+confirmEnd"></a>

### arduino.confirmEnd(data)
Handles the confirmation data received from an Arduino.
Executes the confirmation callback function if the received data is present in the list of expected values.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The data received from the Arduino. |

<a name="Arduino+verify"></a>

### arduino.verify() ⇒ <code>Promise.&lt;boolean&gt;</code>
Verifies the connection to an Arduino by sending a connect command.
The confirmation callback checks if the received data matches the expected connect command.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Resolves with 'true' if the connection is verified successfully.  
**Throws**:

- <code>Error</code> Rejects with an error message if the connection verification fails.

<a name="Arduino+distinguish"></a>

### arduino.distinguish() ⇒ <code>Promise.&lt;string&gt;</code>
Distinguishes the type of Arduino connected.
Sends a command to the device to identify its type and resolves the promise with the received type.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves with the type of the connected Arduino-based device.  
**Throws**:

- <code>Error</code> Rejects with an error message if the distinguish operation fails.

<a name="Arduino+close"></a>

### arduino.close() ⇒ <code>Promise.&lt;boolean&gt;</code>
Closes the connection to an Arduino.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Resolves with 'true' if the connection is closed successfully.  
**Throws**:

- <code>Error</code> Throws an error if the closeArduino method encounters an error.

<a name="Arduino+fakeConnect"></a>

### arduino.fakeConnect(serial) ⇒ <code>Promise.&lt;boolean&gt;</code>
Establishes a fake connection to an Arduino for testing purposes.
Creates a fake SerialPort instance with custom write and string methods.

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Resolves with 'true' if the fake connection is established successfully.  

| Param | Type | Description |
| --- | --- | --- |
| serial | <code>string</code> | The device identifier of the fake Arduino. |

<a name="Arduino+openArduino"></a>

### arduino.openArduino(device) ⇒ <code>Promise</code>
Connect to an Arduino using async/await

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise</code> - Resolves after opening  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | Arduino identifier |

<a name="Arduino+closeArduino"></a>

### arduino.closeArduino(device) ⇒ <code>Promise</code>
Close a connection to an Arduino using async/await

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise</code> - Resolves after closing  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | Arduino identifier |

<a name="delay_1"></a>

## delay\_1
2023-07-16 Clarification

Previous versions of this script intermingled and even
swapped the usage of the terms 'serial' and 'device'.
From here on out, the terms will be used as such:

serial - a hardware address of a serial port
device - common name of a type of mcopy device (eg. camera,
projector, light) that is aliased to a serial port

**Kind**: global constant  

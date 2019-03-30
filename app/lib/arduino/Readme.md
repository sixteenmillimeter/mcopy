<a name="Arduino"></a>

## Arduino
Class representing the arduino communication features

**Kind**: global class  

* [Arduino](#Arduino)
    * [.enumerate()](#Arduino+enumerate) ⇒ <code>Promise</code>
    * [.sendAsync(device, cmd)](#Arduino+sendAsync) ⇒ <code>Promise</code>
    * [.writeAsync(device, str)](#Arduino+writeAsync) ⇒ <code>Promise</code>
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
| device | <code>string</code> | Arduino identifier |
| cmd | <code>string</code> | Single character command to send |

<a name="Arduino+writeAsync"></a>

### arduino.writeAsync(device, str) ⇒ <code>Promise</code>
Send a string to an Arduino using async/await

**Kind**: instance method of [<code>Arduino</code>](#Arduino)  
**Returns**: <code>Promise</code> - Resolves after sending  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | Arduino identifier |
| str | <code>string</code> | String to send |

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


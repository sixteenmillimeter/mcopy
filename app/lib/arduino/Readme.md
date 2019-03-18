## Classes

<dl>
<dt><a href="#Arduino">Arduino</a></dt>
<dd><p>Class representing the arduino communication features</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#delay">delay(ms)</a> ⇒ <code>Promise</code></dt>
<dd><p>Pause the process for X milliseconds in async/await functions</p>
</dd>
</dl>

<a name="Arduino"></a>

## Arduino
Class representing the arduino communication features

**Kind**: global class  

* [Arduino](#Arduino)
    * [.sendAsync(device, cmd)](#Arduino+sendAsync) ⇒ <code>Promise</code>
    * [.writeAsync(device, str)](#Arduino+writeAsync) ⇒ <code>Promise</code>
    * [.openArduino(device)](#Arduino+openArduino) ⇒ <code>Promise</code>
    * [.closeArduino(device)](#Arduino+closeArduino) ⇒ <code>Promise</code>

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

<a name="delay"></a>

## delay(ms) ⇒ <code>Promise</code>
Pause the process for X milliseconds in async/await functions

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves after wait  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>integer</code> | milliseconds |


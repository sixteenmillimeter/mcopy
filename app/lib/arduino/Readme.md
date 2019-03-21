## Functions

<dl>
<dt><a href="#delay">delay(ms)</a> ⇒ <code>Promise</code></dt>
<dd><p>Pause the process for X milliseconds in async/await functions</p>
</dd>
<dt><a href="#send">send(device, cmd)</a> ⇒ <code>Promise</code></dt>
<dd><p>Send a command to an Arduino using async/await</p>
</dd>
<dt><a href="#write">write(device, str)</a> ⇒ <code>Promise</code></dt>
<dd><p>Send a string to an Arduino using async/await</p>
</dd>
<dt><a href="#open">open(device)</a> ⇒ <code>Promise</code></dt>
<dd><p>Connect to an Arduino using async/await</p>
</dd>
<dt><a href="#close">close(device)</a> ⇒ <code>Promise</code></dt>
<dd><p>Close a connection to an Arduino using async/await</p>
</dd>
</dl>

<a name="delay"></a>

## delay(ms) ⇒ <code>Promise</code>
Pause the process for X milliseconds in async/await functions

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves after wait  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>integer</code> | milliseconds |

<a name="send"></a>

## send(device, cmd) ⇒ <code>Promise</code>
Send a command to an Arduino using async/await

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves after sending  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | Arduino identifier |
| cmd | <code>string</code> | Single character command to send |

<a name="write"></a>

## write(device, str) ⇒ <code>Promise</code>
Send a string to an Arduino using async/await

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves after sending  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | Arduino identifier |
| str | <code>string</code> | String to send |

<a name="open"></a>

## open(device) ⇒ <code>Promise</code>
Connect to an Arduino using async/await

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves after opening  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | Arduino identifier |

<a name="close"></a>

## close(device) ⇒ <code>Promise</code>
Close a connection to an Arduino using async/await

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves after closing  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>string</code> | Arduino identifier |


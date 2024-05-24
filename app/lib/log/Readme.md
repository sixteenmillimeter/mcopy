## Functions

<dl>
<dt><a href="#logFile">logFile()</a> ⇒ <code>string</code></dt>
<dd><p>Determine the location of the log file based on the operating system
and return as an absolute string from os.homedir()</p>
</dd>
<dt><a href="#Log">Log(arg)</a> ⇒ <code>object</code></dt>
<dd><p>Create and return the logger transport based on settings determined in
arguments object</p>
</dd>
</dl>

<a name="logFile"></a>

## logFile() ⇒ <code>string</code>
Determine the location of the log file based on the operating system
and return as an absolute string from os.homedir()

**Kind**: global function  
**Returns**: <code>string</code> - Path to log file  
<a name="Log"></a>

## Log(arg) ⇒ <code>object</code>
Create and return the logger transport based on settings determined in
arguments object

**Kind**: global function  
**Returns**: <code>object</code> - Logger transport  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>object</code> | Arguments from process |


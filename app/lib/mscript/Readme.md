## Classes

<dl>
<dt><a href="#Create new Mscript interpreter">Create new Mscript interpreter</a></dt>
<dd></dd>
<dt><a href="#Mscript">Mscript</a></dt>
<dd><p>class Mscript</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#startsWith">startsWith(str, target, position)</a> ⇒ <code>boolean</code></dt>
<dd><p>startswith function from lodash, do not want the entire lib for this</p>
</dd>
</dl>

<a name="Create new Mscript interpreter"></a>

## Create new Mscript interpreter
**Kind**: global class  
<a name="Mscript"></a>

## Mscript
class Mscript

**Kind**: global class  

* [Mscript](#Mscript)
    * [.clear()](#Mscript+clear)
    * [.interpret(text, callback)](#Mscript+interpret) ⇒ <code>object</code>
    * [.variable(line)](#Mscript+variable)
    * [.variable_replace(line)](#Mscript+variable_replace) ⇒ <code>string</code>
    * [.basic_cmd(line, short)](#Mscript+basic_cmd)
    * [.new_loop(line, fade)](#Mscript+new_loop)
    * [.end_loop(line)](#Mscript+end_loop)
    * [.move_cam(line)](#Mscript+move_cam)
    * [.move_cam2(line)](#Mscript+move_cam2)
    * [.move_proj(line)](#Mscript+move_proj)
    * [.move_proj2(line)](#Mscript+move_proj2)
    * [.set_state(line)](#Mscript+set_state)
    * [.last_loop()](#Mscript+last_loop) ⇒ <code>object</code>
    * [.parent_loop()](#Mscript+parent_loop) ⇒ <code>object</code>
    * [.loop_count()](#Mscript+loop_count) ⇒ <code>integer</code>
    * [.fade(line)](#Mscript+fade)
    * [.fade_count(str)](#Mscript+fade_count)
    * [.fade_start(str)](#Mscript+fade_start) ⇒ <code>array</code>
    * [.fade_end(str)](#Mscript+fade_end) ⇒ <code>array</code>
    * [.fade_rgb(start, end, len, x)](#Mscript+fade_rgb) ⇒ <code>array</code>
    * [.rgb(str)](#Mscript+rgb)
    * [.rgb_str(arr)](#Mscript+rgb_str) ⇒ <code>string</code>
    * [.update(cmd)](#Mscript+update)
    * [.str_to_arr(str, cmd)](#Mscript+str_to_arr) ⇒ <code>array</code>
    * [.light_to_arr(str, cmd)](#Mscript+light_to_arr) ⇒ <code>array</code>
    * [.light_state(Color)](#Mscript+light_state)
    * [.delay(line)](#Mscript+delay)
    * [.alert(line)](#Mscript+alert)
    * [.pause(line)](#Mscript+pause)
    * [.fail(msg)](#Mscript+fail)
    * [.contains(arr, arr2)](#Mscript+contains) ⇒ <code>boolean</code>

<a name="Mscript+clear"></a>

### mscript.clear()
Clear the state of the script

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
<a name="Mscript+interpret"></a>

### mscript.interpret(text, callback) ⇒ <code>object</code>
Main function, accepts multi-line string, parses into lines
and interprets the instructions from the text. Returns an array
of steps to be fed into the mcopy sequence.

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>object</code> - if callback is not provided  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | Mscript text to interpret |
| callback | <code>function</code> | <code></code> | Function to call when string is interpreted |

<a name="Mscript+variable"></a>

### mscript.variable(line)
Interprets variables for complex sequence behavior.
TODO: Fully implement, add test coverage

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing a variable assignment |

<a name="Mscript+variable_replace"></a>

### mscript.variable\_replace(line) ⇒ <code>string</code>
Replace variable with value at time of interpretation
TODO: Implement this please

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>string</code> - New string to be interpreted  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing variable to be replaced with value |

<a name="Mscript+basic_cmd"></a>

### mscript.basic\_cmd(line, short)
Interpret a basic two character command

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line of script to interpret |
| short | <code>string</code> | The short command to use |

<a name="Mscript+new_loop"></a>

### mscript.new\_loop(line, fade)
Start a new loop

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line to evaluate as either loop or fade |
| fade | <code>boolean</code> | Flag as true if fade |

<a name="Mscript+end_loop"></a>

### mscript.end\_loop(line)
Close the most recent loop

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line to interpret |

<a name="Mscript+move_cam"></a>

### mscript.move\_cam(line)
Move camera to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line to interpret with camera move statement |

<a name="Mscript+move_cam2"></a>

### mscript.move\_cam2(line)
Move secondary camera to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line to interpret with camera move statement |

<a name="Mscript+move_proj"></a>

### mscript.move\_proj(line)
Move projector to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing `move` statement to interpret |

<a name="Mscript+move_proj2"></a>

### mscript.move\_proj2(line)
Move projector to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing `move` statement to interpret |

<a name="Mscript+set_state"></a>

### mscript.set\_state(line)
Set the state of either the cam or projector

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | String containing set statement |

<a name="Mscript+last_loop"></a>

### mscript.last\_loop() ⇒ <code>object</code>
Return the last loop

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
<a name="Mscript+parent_loop"></a>

### mscript.parent\_loop() ⇒ <code>object</code>
Return the second-last loop

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>object</code> - Loop array  
<a name="Mscript+loop_count"></a>

### mscript.loop\_count() ⇒ <code>integer</code>
Extract the loop count integer from a LOOP cmd

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>integer</code> - Loop count in string parsed into integer  
<a name="Mscript+fade"></a>

### mscript.fade(line)
Execute a fade of frame length, from color to another color

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing a fade initiator |

<a name="Mscript+fade_count"></a>

### mscript.fade\_count(str)
Extract the fade length integer from a FADE cmd

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Line containing the length of fade in frames |

<a name="Mscript+fade_start"></a>

### mscript.fade\_start(str) ⇒ <code>array</code>
Extract the start color from a string

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>array</code> - Array containing RGB color values  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Line containing the start color value in a fade initiator |

<a name="Mscript+fade_end"></a>

### mscript.fade\_end(str) ⇒ <code>array</code>
Extract the end color from a string

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>array</code> - Array containing RGB color values  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Line containing the end color value in a fade initiator |

<a name="Mscript+fade_rgb"></a>

### mscript.fade\_rgb(start, end, len, x) ⇒ <code>array</code>
Determine the state of a fade at a particular frame in the sequence, x

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>array</code> - Array containing RGB color values  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>array</code> | Color the fade starts at |
| end | <code>array</code> | Color the fade finishes at |
| len | <code>integer</code> | Total length of the fade in frames |
| x | <code>integer</code> | Position of the fade to get color value of |

<a name="Mscript+rgb"></a>

### mscript.rgb(str)
Parse string into array of RGB color values. 0-255 octet.

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String containing only color values as `#,#,#` |

<a name="Mscript+rgb_str"></a>

### mscript.rgb\_str(arr) ⇒ <code>string</code>
Cast RGB color values as string

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>string</code> - String of RGB values  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | Array to join into string |

<a name="Mscript+update"></a>

### mscript.update(cmd)
Increase the state of a specific object, such as the camera/projector,
by the value defined in val.

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>string</code> | String representing command to interpret and update state |

<a name="Mscript+str_to_arr"></a>

### mscript.str\_to\_arr(str, cmd) ⇒ <code>array</code>
Split string on command, turn into array of commands
as long as count variable. Default 1.

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>array</code> - Array containing commands  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String to split |
| cmd | <code>string</code> | String representing command to split at |

<a name="Mscript+light_to_arr"></a>

### mscript.light\_to\_arr(str, cmd) ⇒ <code>array</code>
Split a string on a command to extract data for light array

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>array</code> - An RGB array containing the color values  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String containing light command |
| cmd | <code>string</code> | String representing command |

<a name="Mscript+light_state"></a>

### mscript.light\_state(Color)
Split a string to extract an rgb color value

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| Color | <code>string</code> | string assign to color property |

<a name="Mscript+delay"></a>

### mscript.delay(line)
Interpret a delay command

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | String containing delay command |

<a name="Mscript+alert"></a>

### mscript.alert(line)
Interpret an alert command

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | String containing alert message |

<a name="Mscript+pause"></a>

### mscript.pause(line)
Interpret an pause command

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | String containing alert message |

<a name="Mscript+fail"></a>

### mscript.fail(msg)
Throw an error with specific message

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Error message to print |

<a name="Mscript+contains"></a>

### mscript.contains(arr, arr2) ⇒ <code>boolean</code>
Determine if array contains matching elements of
another array

**Kind**: instance method of [<code>Mscript</code>](#Mscript)  
**Returns**: <code>boolean</code> - Whether arr contains elements in arr2  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | Original array to compare |
| arr2 | <code>Array</code> | Array to compare elements from |

<a name="startsWith"></a>

## startsWith(str, target, position) ⇒ <code>boolean</code>
startswith function from lodash, do not want the entire lib for this

**Kind**: global function  
**Returns**: <code>boolean</code> - True for match, false for no match  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Text to evaluate |
| target | <code>string</code> | Text to compare string against |
| position | <code>integer</code> | Position in the string to make comparison at |


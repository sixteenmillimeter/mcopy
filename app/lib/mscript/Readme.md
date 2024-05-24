<a name="module_lib/mscript"></a>

## lib/mscript

* [lib/mscript](#module_lib/mscript)
    * [~Create new Mscript interpreter](#module_lib/mscript..Create new Mscript interpreter)
    * [~Mscript](#module_lib/mscript..Mscript)
        * [.clear()](#module_lib/mscript..Mscript+clear)
        * [.interpret(text, callback)](#module_lib/mscript..Mscript+interpret) ⇒ <code>object</code>
        * [.variable(line)](#module_lib/mscript..Mscript+variable)
        * [.variable_replace(line)](#module_lib/mscript..Mscript+variable_replace) ⇒ <code>string</code>
        * [.basic_cmd(line, short)](#module_lib/mscript..Mscript+basic_cmd)
        * [.new_loop(line, fade)](#module_lib/mscript..Mscript+new_loop)
        * [.end_loop(line)](#module_lib/mscript..Mscript+end_loop)
        * [.move_cam(line)](#module_lib/mscript..Mscript+move_cam)
        * [.move_cam2(line)](#module_lib/mscript..Mscript+move_cam2)
        * [.move_proj(line)](#module_lib/mscript..Mscript+move_proj)
        * [.move_proj2(line)](#module_lib/mscript..Mscript+move_proj2)
        * [.set_state(line)](#module_lib/mscript..Mscript+set_state)
        * [.last_loop()](#module_lib/mscript..Mscript+last_loop) ⇒ <code>object</code>
        * [.parent_loop()](#module_lib/mscript..Mscript+parent_loop) ⇒ <code>object</code>
        * [.loop_count()](#module_lib/mscript..Mscript+loop_count) ⇒ <code>integer</code>
        * [.fade(line)](#module_lib/mscript..Mscript+fade)
        * [.fade_count(str)](#module_lib/mscript..Mscript+fade_count)
        * [.fade_start(str)](#module_lib/mscript..Mscript+fade_start) ⇒ <code>array</code>
        * [.fade_end(str)](#module_lib/mscript..Mscript+fade_end) ⇒ <code>array</code>
        * [.fade_rgb(start, end, len, x)](#module_lib/mscript..Mscript+fade_rgb) ⇒ <code>array</code>
        * [.rgb(str)](#module_lib/mscript..Mscript+rgb)
        * [.rgb_str(arr)](#module_lib/mscript..Mscript+rgb_str) ⇒ <code>string</code>
        * [.update(cmd)](#module_lib/mscript..Mscript+update)
        * [.str_to_arr(str, cmd)](#module_lib/mscript..Mscript+str_to_arr) ⇒ <code>array</code>
        * [.light_to_arr(str, cmd)](#module_lib/mscript..Mscript+light_to_arr) ⇒ <code>array</code>
        * [.light_state(Color)](#module_lib/mscript..Mscript+light_state)
        * [.delay(line)](#module_lib/mscript..Mscript+delay)
        * [.alert(line)](#module_lib/mscript..Mscript+alert)
        * [.pause(line)](#module_lib/mscript..Mscript+pause)
        * [.fail(msg)](#module_lib/mscript..Mscript+fail)
        * [.contains(arr, arr2)](#module_lib/mscript..Mscript+contains) ⇒ <code>boolean</code>

<a name="module_lib/mscript..Create new Mscript interpreter"></a>

### lib/mscript~Create new Mscript interpreter
**Kind**: inner class of [<code>lib/mscript</code>](#module_lib/mscript)  
<a name="module_lib/mscript..Mscript"></a>

### lib/mscript~Mscript
Class representing the mscript language.

**Kind**: inner class of [<code>lib/mscript</code>](#module_lib/mscript)  

* [~Mscript](#module_lib/mscript..Mscript)
    * [.clear()](#module_lib/mscript..Mscript+clear)
    * [.interpret(text, callback)](#module_lib/mscript..Mscript+interpret) ⇒ <code>object</code>
    * [.variable(line)](#module_lib/mscript..Mscript+variable)
    * [.variable_replace(line)](#module_lib/mscript..Mscript+variable_replace) ⇒ <code>string</code>
    * [.basic_cmd(line, short)](#module_lib/mscript..Mscript+basic_cmd)
    * [.new_loop(line, fade)](#module_lib/mscript..Mscript+new_loop)
    * [.end_loop(line)](#module_lib/mscript..Mscript+end_loop)
    * [.move_cam(line)](#module_lib/mscript..Mscript+move_cam)
    * [.move_cam2(line)](#module_lib/mscript..Mscript+move_cam2)
    * [.move_proj(line)](#module_lib/mscript..Mscript+move_proj)
    * [.move_proj2(line)](#module_lib/mscript..Mscript+move_proj2)
    * [.set_state(line)](#module_lib/mscript..Mscript+set_state)
    * [.last_loop()](#module_lib/mscript..Mscript+last_loop) ⇒ <code>object</code>
    * [.parent_loop()](#module_lib/mscript..Mscript+parent_loop) ⇒ <code>object</code>
    * [.loop_count()](#module_lib/mscript..Mscript+loop_count) ⇒ <code>integer</code>
    * [.fade(line)](#module_lib/mscript..Mscript+fade)
    * [.fade_count(str)](#module_lib/mscript..Mscript+fade_count)
    * [.fade_start(str)](#module_lib/mscript..Mscript+fade_start) ⇒ <code>array</code>
    * [.fade_end(str)](#module_lib/mscript..Mscript+fade_end) ⇒ <code>array</code>
    * [.fade_rgb(start, end, len, x)](#module_lib/mscript..Mscript+fade_rgb) ⇒ <code>array</code>
    * [.rgb(str)](#module_lib/mscript..Mscript+rgb)
    * [.rgb_str(arr)](#module_lib/mscript..Mscript+rgb_str) ⇒ <code>string</code>
    * [.update(cmd)](#module_lib/mscript..Mscript+update)
    * [.str_to_arr(str, cmd)](#module_lib/mscript..Mscript+str_to_arr) ⇒ <code>array</code>
    * [.light_to_arr(str, cmd)](#module_lib/mscript..Mscript+light_to_arr) ⇒ <code>array</code>
    * [.light_state(Color)](#module_lib/mscript..Mscript+light_state)
    * [.delay(line)](#module_lib/mscript..Mscript+delay)
    * [.alert(line)](#module_lib/mscript..Mscript+alert)
    * [.pause(line)](#module_lib/mscript..Mscript+pause)
    * [.fail(msg)](#module_lib/mscript..Mscript+fail)
    * [.contains(arr, arr2)](#module_lib/mscript..Mscript+contains) ⇒ <code>boolean</code>

<a name="module_lib/mscript..Mscript+clear"></a>

#### mscript.clear()
Clear the state of the script

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+interpret"></a>

#### mscript.interpret(text, callback) ⇒ <code>object</code>
Main function, accepts multi-line string, parses into lines
and interprets the instructions from the text. Returns an array
of steps to be fed into the mcopy sequence.

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>object</code> - if callback is not provided  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Mscript text to interpret |
| callback | <code>function</code> | Function to call when string is interpreted |

<a name="module_lib/mscript..Mscript+variable"></a>

#### mscript.variable(line)
Interprets variables for complex sequence behavior.
TODO: Fully implement, add test coverage

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing a variable assignment |

<a name="module_lib/mscript..Mscript+variable_replace"></a>

#### mscript.variable\_replace(line) ⇒ <code>string</code>
Replace variable with value at time of interpretation
TODO: Implement this please

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>string</code> - New string to be interpreted  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing variable to be replaced with value |

<a name="module_lib/mscript..Mscript+basic_cmd"></a>

#### mscript.basic\_cmd(line, short)
Interpret a basic two character command

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line of script to interpret |
| short | <code>string</code> | The short command to use |

<a name="module_lib/mscript..Mscript+new_loop"></a>

#### mscript.new\_loop(line, fade)
Start a new loop

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line to evaluate as either loop or fade |
| fade | <code>boolean</code> | Flag as true if fade |

<a name="module_lib/mscript..Mscript+end_loop"></a>

#### mscript.end\_loop(line)
Close the most recent loop

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line to interpret |

<a name="module_lib/mscript..Mscript+move_cam"></a>

#### mscript.move\_cam(line)
Move camera to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line to interpret with camera move statement |

<a name="module_lib/mscript..Mscript+move_cam2"></a>

#### mscript.move\_cam2(line)
Move secondary camera to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line to interpret with camera move statement |

<a name="module_lib/mscript..Mscript+move_proj"></a>

#### mscript.move\_proj(line)
Move projector to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing `move` statement to interpret |

<a name="module_lib/mscript..Mscript+move_proj2"></a>

#### mscript.move\_proj2(line)
Move projector to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing `move` statement to interpret |

<a name="module_lib/mscript..Mscript+set_state"></a>

#### mscript.set\_state(line)
Set the state of either the cam or projector

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | String containing set statement |

<a name="module_lib/mscript..Mscript+last_loop"></a>

#### mscript.last\_loop() ⇒ <code>object</code>
Return the last loop

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+parent_loop"></a>

#### mscript.parent\_loop() ⇒ <code>object</code>
Return the second-last loop

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>object</code> - Loop array  
<a name="module_lib/mscript..Mscript+loop_count"></a>

#### mscript.loop\_count() ⇒ <code>integer</code>
Extract the loop count integer from a LOOP cmd

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>integer</code> - Loop count in string parsed into integer  
<a name="module_lib/mscript..Mscript+fade"></a>

#### mscript.fade(line)
Execute a fade of frame length, from color to another color

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Line containing a fade initiator |

<a name="module_lib/mscript..Mscript+fade_count"></a>

#### mscript.fade\_count(str)
Extract the fade length integer from a FADE cmd

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Line containing the length of fade in frames |

<a name="module_lib/mscript..Mscript+fade_start"></a>

#### mscript.fade\_start(str) ⇒ <code>array</code>
Extract the start color from a string

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>array</code> - Array containing RGB color values  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Line containing the start color value in a fade initiator |

<a name="module_lib/mscript..Mscript+fade_end"></a>

#### mscript.fade\_end(str) ⇒ <code>array</code>
Extract the end color from a string

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>array</code> - Array containing RGB color values  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Line containing the end color value in a fade initiator |

<a name="module_lib/mscript..Mscript+fade_rgb"></a>

#### mscript.fade\_rgb(start, end, len, x) ⇒ <code>array</code>
Determine the state of a fade at a particular frame in the sequence, x

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>array</code> - Array containing RGB color values  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>array</code> | Color the fade starts at |
| end | <code>array</code> | Color the fade finishes at |
| len | <code>integer</code> | Total length of the fade in frames |
| x | <code>integer</code> | Position of the fade to get color value of |

<a name="module_lib/mscript..Mscript+rgb"></a>

#### mscript.rgb(str)
Parse string into array of RGB color values. 0-255 octet.

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String containing only color values as `#,#,#` |

<a name="module_lib/mscript..Mscript+rgb_str"></a>

#### mscript.rgb\_str(arr) ⇒ <code>string</code>
Cast RGB color values as string

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>string</code> - String of RGB values  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | Array to join into string |

<a name="module_lib/mscript..Mscript+update"></a>

#### mscript.update(cmd)
Increase the state of a specific object, such as the camera/projector,
by the value defined in val.

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>string</code> | String representing command to interpret and update state |

<a name="module_lib/mscript..Mscript+str_to_arr"></a>

#### mscript.str\_to\_arr(str, cmd) ⇒ <code>array</code>
Split string on command, turn into array of commands
as long as count variable. Default 1.

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>array</code> - Array containing commands  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String to split |
| cmd | <code>string</code> | String representing command to split at |

<a name="module_lib/mscript..Mscript+light_to_arr"></a>

#### mscript.light\_to\_arr(str, cmd) ⇒ <code>array</code>
Split a string on a command to extract data for light array

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>array</code> - An RGB array containing the color values  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String containing light command |
| cmd | <code>string</code> | String representing command |

<a name="module_lib/mscript..Mscript+light_state"></a>

#### mscript.light\_state(Color)
Split a string to extract an rgb color value

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| Color | <code>string</code> | string assign to color property |

<a name="module_lib/mscript..Mscript+delay"></a>

#### mscript.delay(line)
Interpret a delay command

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | String containing delay command |

<a name="module_lib/mscript..Mscript+alert"></a>

#### mscript.alert(line)
Interpret an alert command

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | String containing alert message |

<a name="module_lib/mscript..Mscript+pause"></a>

#### mscript.pause(line)
Interpret an pause command

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | String containing alert message |

<a name="module_lib/mscript..Mscript+fail"></a>

#### mscript.fail(msg)
Throw an error with specific message

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Error message to print |

<a name="module_lib/mscript..Mscript+contains"></a>

#### mscript.contains(arr, arr2) ⇒ <code>boolean</code>
Determine if array contains matching elements of
another array

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
**Returns**: <code>boolean</code> - Whether arr contains elements in arr2  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | Original array to compare |
| arr2 | <code>Array</code> | Array to compare elements from |


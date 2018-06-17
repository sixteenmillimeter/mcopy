<a name="module_lib/mscript"></a>

## lib/mscript

* [lib/mscript](#module_lib/mscript)
    * [~Mscript](#module_lib/mscript..Mscript)
        * [.clear()](#module_lib/mscript..Mscript+clear)
        * [.interpret()](#module_lib/mscript..Mscript+interpret)
        * [.basic_cmd()](#module_lib/mscript..Mscript+basic_cmd)
        * [.new_loop()](#module_lib/mscript..Mscript+new_loop)
        * [.end_loop()](#module_lib/mscript..Mscript+end_loop)
        * [.move_cam()](#module_lib/mscript..Mscript+move_cam)
        * [.move_proj()](#module_lib/mscript..Mscript+move_proj)
        * [.set_state()](#module_lib/mscript..Mscript+set_state)
        * [.last_loop()](#module_lib/mscript..Mscript+last_loop)
        * [.parent_loop()](#module_lib/mscript..Mscript+parent_loop)
        * [.loop_count()](#module_lib/mscript..Mscript+loop_count)
        * [.fade()](#module_lib/mscript..Mscript+fade)
        * [.fade_count()](#module_lib/mscript..Mscript+fade_count)
        * [.fade_start()](#module_lib/mscript..Mscript+fade_start)
        * [.fade_end()](#module_lib/mscript..Mscript+fade_end)
        * [.update()](#module_lib/mscript..Mscript+update)
        * [.str_to_arr()](#module_lib/mscript..Mscript+str_to_arr)
        * [.light_to_arr()](#module_lib/mscript..Mscript+light_to_arr)
        * [.light_state()](#module_lib/mscript..Mscript+light_state)
        * [.fail()](#module_lib/mscript..Mscript+fail)

<a name="module_lib/mscript..Mscript"></a>

### lib/mscript~Mscript
class Mscript

**Kind**: inner class of [<code>lib/mscript</code>](#module_lib/mscript)  

* [~Mscript](#module_lib/mscript..Mscript)
    * [.clear()](#module_lib/mscript..Mscript+clear)
    * [.interpret()](#module_lib/mscript..Mscript+interpret)
    * [.basic_cmd()](#module_lib/mscript..Mscript+basic_cmd)
    * [.new_loop()](#module_lib/mscript..Mscript+new_loop)
    * [.end_loop()](#module_lib/mscript..Mscript+end_loop)
    * [.move_cam()](#module_lib/mscript..Mscript+move_cam)
    * [.move_proj()](#module_lib/mscript..Mscript+move_proj)
    * [.set_state()](#module_lib/mscript..Mscript+set_state)
    * [.last_loop()](#module_lib/mscript..Mscript+last_loop)
    * [.parent_loop()](#module_lib/mscript..Mscript+parent_loop)
    * [.loop_count()](#module_lib/mscript..Mscript+loop_count)
    * [.fade()](#module_lib/mscript..Mscript+fade)
    * [.fade_count()](#module_lib/mscript..Mscript+fade_count)
    * [.fade_start()](#module_lib/mscript..Mscript+fade_start)
    * [.fade_end()](#module_lib/mscript..Mscript+fade_end)
    * [.update()](#module_lib/mscript..Mscript+update)
    * [.str_to_arr()](#module_lib/mscript..Mscript+str_to_arr)
    * [.light_to_arr()](#module_lib/mscript..Mscript+light_to_arr)
    * [.light_state()](#module_lib/mscript..Mscript+light_state)
    * [.fail()](#module_lib/mscript..Mscript+fail)

<a name="module_lib/mscript..Mscript+clear"></a>

#### mscript.clear()
Clear the state of the script

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+interpret"></a>

#### mscript.interpret()
Main function, accepts multi-line string, parses into lines
and interprets the instructions from the text. Returns an array
of steps to be fed into the mcopy.

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+basic_cmd"></a>

#### mscript.basic_cmd()
Apply a basic two character command

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+new_loop"></a>

#### mscript.new_loop()
Start a new loop

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+end_loop"></a>

#### mscript.end_loop()
Close the most recent loop

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+move_cam"></a>

#### mscript.move_cam()
Move camera to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+move_proj"></a>

#### mscript.move_proj()
Move projector to explicitly-defined frame

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+set_state"></a>

#### mscript.set_state()
Set the state of either the cam or projector

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+last_loop"></a>

#### mscript.last_loop()
Return the last loop

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+parent_loop"></a>

#### mscript.parent_loop()
Return the second-last loop

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+loop_count"></a>

#### mscript.loop_count()
Extract the loop count integer from a LOOP cmd

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+fade"></a>

#### mscript.fade()
Execute a fade of frame length, from color to another color

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+fade_count"></a>

#### mscript.fade_count()
Extract the fade length integer from a FADE cmd

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+fade_start"></a>

#### mscript.fade_start()
Extract the start color from a string

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+fade_end"></a>

#### mscript.fade_end()
Extract the end color from a string

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+update"></a>

#### mscript.update()
Increase the state of a specific object, such as the camera/projector,
by the value defined in val

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+str_to_arr"></a>

#### mscript.str_to_arr()
Split string on command, extract any integers from string

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+light_to_arr"></a>

#### mscript.light_to_arr()
Split a string on a command to extract data for light array

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+light_state"></a>

#### mscript.light_state()
Split a string to extract an rgb color value

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  
<a name="module_lib/mscript..Mscript+fail"></a>

#### mscript.fail()
Throw an error with specific message

**Kind**: instance method of [<code>Mscript</code>](#module_lib/mscript..Mscript)  

<a name="module_lib/mscript"></a>

## lib/mscript

* [lib/mscript](#module_lib/mscript)
    * [~mscript](#module_lib/mscript..mscript)
        * [.arg(shrt, lng)](#module_lib/mscript..mscript.arg) ⇒ <code>boolean</code>
        * [.arg_pos(shrt, lng)](#module_lib/mscript..mscript.arg_pos) ⇒ <code>boolean</code>
        * [.state_clear()](#module_lib/mscript..mscript.state_clear)
        * [.alts_unique()](#module_lib/mscript..mscript.alts_unique)
        * [.interpret()](#module_lib/mscript..mscript.interpret)
        * [.last_loop()](#module_lib/mscript..mscript.last_loop)
        * [.parent_loop()](#module_lib/mscript..mscript.parent_loop)
        * [.state_update()](#module_lib/mscript..mscript.state_update)
        * [.str_to_arr()](#module_lib/mscript..mscript.str_to_arr)
        * [.light_state()](#module_lib/mscript..mscript.light_state)
        * [.light_to_arr()](#module_lib/mscript..mscript.light_to_arr)
        * [.loop_count()](#module_lib/mscript..mscript.loop_count)
        * [.fail()](#module_lib/mscript..mscript.fail)
        * [.output()](#module_lib/mscript..mscript.output)
        * [.init()](#module_lib/mscript..mscript.init)
        * [.tests()](#module_lib/mscript..mscript.tests)

<a name="module_lib/mscript..mscript"></a>

### lib/mscript~mscript
object mscript

**Kind**: inner constant of [<code>lib/mscript</code>](#module_lib/mscript)  

* [~mscript](#module_lib/mscript..mscript)
    * [.arg(shrt, lng)](#module_lib/mscript..mscript.arg) ⇒ <code>boolean</code>
    * [.arg_pos(shrt, lng)](#module_lib/mscript..mscript.arg_pos) ⇒ <code>boolean</code>
    * [.state_clear()](#module_lib/mscript..mscript.state_clear)
    * [.alts_unique()](#module_lib/mscript..mscript.alts_unique)
    * [.interpret()](#module_lib/mscript..mscript.interpret)
    * [.last_loop()](#module_lib/mscript..mscript.last_loop)
    * [.parent_loop()](#module_lib/mscript..mscript.parent_loop)
    * [.state_update()](#module_lib/mscript..mscript.state_update)
    * [.str_to_arr()](#module_lib/mscript..mscript.str_to_arr)
    * [.light_state()](#module_lib/mscript..mscript.light_state)
    * [.light_to_arr()](#module_lib/mscript..mscript.light_to_arr)
    * [.loop_count()](#module_lib/mscript..mscript.loop_count)
    * [.fail()](#module_lib/mscript..mscript.fail)
    * [.output()](#module_lib/mscript..mscript.output)
    * [.init()](#module_lib/mscript..mscript.init)
    * [.tests()](#module_lib/mscript..mscript.tests)

<a name="module_lib/mscript..mscript.arg"></a>

#### mscript.arg(shrt, lng) ⇒ <code>boolean</code>
Check for the presence of specific arguments in process
argv

**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
**Returns**: <code>boolean</code> - Is flag present  

| Param | Type | Description |
| --- | --- | --- |
| shrt | <code>string</code> | Short version of argument or flag |
| lng | <code>string</code> | Long version of argument or flag |

<a name="module_lib/mscript..mscript.arg_pos"></a>

#### mscript.arg_pos(shrt, lng) ⇒ <code>boolean</code>
Check for the position of specific arguments in process
argv

**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
**Returns**: <code>boolean</code> - Position of arg or flag, for locating input  

| Param | Type | Description |
| --- | --- | --- |
| shrt | <code>string</code> | Short version of argument or flag |
| lng | <code>string</code> | Long version of argument or flag |

<a name="module_lib/mscript..mscript.state_clear"></a>

#### mscript.state_clear()
Clear the state object

**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.alts_unique"></a>

#### mscript.alts_unique()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.interpret"></a>

#### mscript.interpret()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.last_loop"></a>

#### mscript.last_loop()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.parent_loop"></a>

#### mscript.parent_loop()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.state_update"></a>

#### mscript.state_update()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.str_to_arr"></a>

#### mscript.str_to_arr()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.light_state"></a>

#### mscript.light_state()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.light_to_arr"></a>

#### mscript.light_to_arr()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.loop_count"></a>

#### mscript.loop_count()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.fail"></a>

#### mscript.fail()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.output"></a>

#### mscript.output()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.init"></a>

#### mscript.init()
**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  
<a name="module_lib/mscript..mscript.tests"></a>

#### mscript.tests()
Legacy tests. To be deprecated in future releases.

**Kind**: static method of [<code>mscript</code>](#module_lib/mscript..mscript)  

<a name="module_lib/sequencer"></a>

## lib/sequencer

* [lib/sequencer](#module_lib/sequencer)
    * [~Create a new sequencer and assign command and UI as private sub-classes](#module_lib/sequencer..Create a new sequencer and assign command and UI as private sub-classes)
        * [new Create a new sequencer and assign command and UI as private sub-classes(cfg, cmd, ui)](#new_module_lib/sequencer..Create a new sequencer and assign command and UI as private sub-classes_new)
    * [~Sequencer](#module_lib/sequencer..Sequencer)
        * [.cmds(obj)](#module_lib/sequencer..Sequencer+cmds)
        * [.init()](#module_lib/sequencer..Sequencer+init)
        * [.listen()](#module_lib/sequencer..Sequencer+listen)
        * [.listener(event, arg)](#module_lib/sequencer..Sequencer+listener)
        * [.setLoops(count)](#module_lib/sequencer..Sequencer+setLoops)
        * [.setSteps(steps)](#module_lib/sequencer..Sequencer+setSteps)
        * [.unsetSteps(steps)](#module_lib/sequencer..Sequencer+unsetSteps)
        * [.start(arg)](#module_lib/sequencer..Sequencer+start)
        * [.pause()](#module_lib/sequencer..Sequencer+pause)
        * [.stop()](#module_lib/sequencer..Sequencer+stop)
        * [.step(x)](#module_lib/sequencer..Sequencer+step)
        * [.cmdExec(x)](#module_lib/sequencer..Sequencer+cmdExec)

<a name="module_lib/sequencer..Create a new sequencer and assign command and UI as private sub-classes"></a>

### lib/sequencer~Create a new sequencer and assign command and UI as private sub-classes
**Kind**: inner class of [<code>lib/sequencer</code>](#module_lib/sequencer)  
<a name="new_module_lib/sequencer..Create a new sequencer and assign command and UI as private sub-classes_new"></a>

#### new Create a new sequencer and assign command and UI as private sub-classes(cfg, cmd, ui)

| Param | Type | Description |
| --- | --- | --- |
| cfg | <code>object</code> | Configuration object |
| cmd | <code>object</code> | Shared command class |
| ui | <code>object</code> | Electron UI, browser window |

<a name="module_lib/sequencer..Sequencer"></a>

### lib/sequencer~Sequencer
Class representing all sequencer features.

**Kind**: inner class of [<code>lib/sequencer</code>](#module_lib/sequencer)  

* [~Sequencer](#module_lib/sequencer..Sequencer)
    * [.cmds(obj)](#module_lib/sequencer..Sequencer+cmds)
    * [.init()](#module_lib/sequencer..Sequencer+init)
    * [.listen()](#module_lib/sequencer..Sequencer+listen)
    * [.listener(event, arg)](#module_lib/sequencer..Sequencer+listener)
    * [.setLoops(count)](#module_lib/sequencer..Sequencer+setLoops)
    * [.setSteps(steps)](#module_lib/sequencer..Sequencer+setSteps)
    * [.unsetSteps(steps)](#module_lib/sequencer..Sequencer+unsetSteps)
    * [.start(arg)](#module_lib/sequencer..Sequencer+start)
    * [.pause()](#module_lib/sequencer..Sequencer+pause)
    * [.stop()](#module_lib/sequencer..Sequencer+stop)
    * [.step(x)](#module_lib/sequencer..Sequencer+step)
    * [.cmdExec(x)](#module_lib/sequencer..Sequencer+cmdExec)

<a name="module_lib/sequencer..Sequencer+cmds"></a>

#### sequencer.cmds(obj)
Take configuration object and assign all commands as keys
in the internal CMDS object.

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Configuration object |

<a name="module_lib/sequencer..Sequencer+init"></a>

#### sequencer.init()
Initialize the class by requiring ipcMain from electron
and creating logger.

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  
<a name="module_lib/sequencer..Sequencer+listen"></a>

#### sequencer.listen()
Bind ipc listener to channel 'sequencer' or current id of
class.

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  
<a name="module_lib/sequencer..Sequencer+listener"></a>

#### sequencer.listener(event, arg)
Listener callback function. Called whenever ipc
message is sent to channel 'sequencer'.

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | IPC message event |
| arg | <code>object</code> | Arguments provided in message |

<a name="module_lib/sequencer..Sequencer+setLoops"></a>

#### sequencer.setLoops(count)
Sets the value of the loops in the grid sequence
to value sent by UI in ipc message.

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>integer</code> | Number of loops to set grid sequence to |

<a name="module_lib/sequencer..Sequencer+setSteps"></a>

#### sequencer.setSteps(steps)
Sets multiple steps at once

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  

| Param | Type | Description |
| --- | --- | --- |
| steps | <code>array</code> | Array of steps to set or update |

<a name="module_lib/sequencer..Sequencer+unsetSteps"></a>

#### sequencer.unsetSteps(steps)
Resets multiple steps to default 'undefined' state

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  

| Param | Type | Description |
| --- | --- | --- |
| steps | <code>array</code> | Array containing the x location of steps to unset |

<a name="module_lib/sequencer..Sequencer+start"></a>

#### sequencer.start(arg)
Starts a sequence with the existing grid sequence,
or if one is provided in the arg object, starts
that sequence.

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>object</code> | Arguments from ipc message |

<a name="module_lib/sequencer..Sequencer+pause"></a>

#### sequencer.pause()
Pauses sequence from UI.

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  
<a name="module_lib/sequencer..Sequencer+stop"></a>

#### sequencer.stop()
Stops the sequence

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  
<a name="module_lib/sequencer..Sequencer+step"></a>

#### sequencer.step(x)
Execute command @ step x. Wrapper with try catch.

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>integer</code> | Step to execute command at |

<a name="module_lib/sequencer..Sequencer+cmdExec"></a>

#### sequencer.cmdExec(x)
Locate step @ position x and execute the command.

**Kind**: instance method of [<code>Sequencer</code>](#module_lib/sequencer..Sequencer)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>integer</code> | Step to execute command at |


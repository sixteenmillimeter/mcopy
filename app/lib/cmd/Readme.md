<a name="module_lib/cmd"></a>

## lib/cmd

* [lib/cmd](#module_lib/cmd)
    * [~Assign all connected devices and mock devices as private classes.](#module_lib/cmd..Assign all connected devices and mock devices as private classes.)
        * [new Assign all connected devices and mock devices as private classes.(cfg, proj, cam, light, alert, cam2, proj2, capper)](#new_module_lib/cmd..Assign all connected devices and mock devices as private classes._new)
    * [~Commands](#module_lib/cmd..Commands)
        * [.projector_forward()](#module_lib/cmd..Commands+projector_forward) ⇒ <code>integer</code>
        * [.projector_backward()](#module_lib/cmd..Commands+projector_backward) ⇒ <code>integer</code>
        * [.camera_forward(cmd)](#module_lib/cmd..Commands+camera_forward) ⇒ <code>integer</code>
        * [.black_forward()](#module_lib/cmd..Commands+black_forward) ⇒ <code>integer</code>
        * [.camera_backward(cmd)](#module_lib/cmd..Commands+camera_backward) ⇒ <code>integer</code>
        * [.black_backward()](#module_lib/cmd..Commands+black_backward) ⇒ <code>integer</code>
        * [.camera_second_forward(cmd)](#module_lib/cmd..Commands+camera_second_forward) ⇒ <code>integer</code>
        * [.camera_second_backward(cmd)](#module_lib/cmd..Commands+camera_second_backward) ⇒ <code>integer</code>
        * [.cameras_forward(cmd)](#module_lib/cmd..Commands+cameras_forward) ⇒ <code>integer</code>
        * [.cameras_backward(cmd)](#module_lib/cmd..Commands+cameras_backward) ⇒ <code>integer</code>
        * [.camera_forward_camera_second_backward(cmd)](#module_lib/cmd..Commands+camera_forward_camera_second_backward) ⇒ <code>integer</code>
        * [.camera_backward_camera_second_forward(cmd)](#module_lib/cmd..Commands+camera_backward_camera_second_forward) ⇒ <code>integer</code>
        * [.projector_second_forward()](#module_lib/cmd..Commands+projector_second_forward) ⇒ <code>integer</code>
        * [.projector_second_backward()](#module_lib/cmd..Commands+projector_second_backward) ⇒ <code>integer</code>
        * [.projectors_forward()](#module_lib/cmd..Commands+projectors_forward) ⇒ <code>integer</code>
        * [.projectors_backward()](#module_lib/cmd..Commands+projectors_backward) ⇒ <code>integer</code>
        * [.projector_forward_projector_second_backward()](#module_lib/cmd..Commands+projector_forward_projector_second_backward) ⇒ <code>integer</code>
        * [.projector_backward_projector_second_forward()](#module_lib/cmd..Commands+projector_backward_projector_second_forward) ⇒ <code>integer</code>
        * [.alert()](#module_lib/cmd..Commands+alert) ⇒ <code>integer</code>
        * [.pause()](#module_lib/cmd..Commands+pause) ⇒ <code>integer</code>
        * [.camera_exposure()](#module_lib/cmd..Commands+camera_exposure)

<a name="module_lib/cmd..Assign all connected devices and mock devices as private classes."></a>

### lib/cmd~Assign all connected devices and mock devices as private classes.
**Kind**: inner class of [<code>lib/cmd</code>](#module_lib/cmd)  
<a name="new_module_lib/cmd..Assign all connected devices and mock devices as private classes._new"></a>

#### new Assign all connected devices and mock devices as private classes.(cfg, proj, cam, light, alert, cam2, proj2, capper)

| Param | Type | Description |
| --- | --- | --- |
| cfg | <code>object</code> | Configuration object |
| proj | <code>object</code> | Projector 1 |
| cam | <code>object</code> | Camera 1 |
| light | <code>object</code> | Light source |
| alert | <code>object</code> | Alert object |
| cam2 | <code>object</code> | (optional) Camera 2 |
| proj2 | <code>object</code> | (optional) Projector 2 |
| capper | <code>object</code> | Capper object |

<a name="module_lib/cmd..Commands"></a>

### lib/cmd~Commands
Class representing all commands bundled into methods.

**Kind**: inner class of [<code>lib/cmd</code>](#module_lib/cmd)  

* [~Commands](#module_lib/cmd..Commands)
    * [.projector_forward()](#module_lib/cmd..Commands+projector_forward) ⇒ <code>integer</code>
    * [.projector_backward()](#module_lib/cmd..Commands+projector_backward) ⇒ <code>integer</code>
    * [.camera_forward(cmd)](#module_lib/cmd..Commands+camera_forward) ⇒ <code>integer</code>
    * [.black_forward()](#module_lib/cmd..Commands+black_forward) ⇒ <code>integer</code>
    * [.camera_backward(cmd)](#module_lib/cmd..Commands+camera_backward) ⇒ <code>integer</code>
    * [.black_backward()](#module_lib/cmd..Commands+black_backward) ⇒ <code>integer</code>
    * [.camera_second_forward(cmd)](#module_lib/cmd..Commands+camera_second_forward) ⇒ <code>integer</code>
    * [.camera_second_backward(cmd)](#module_lib/cmd..Commands+camera_second_backward) ⇒ <code>integer</code>
    * [.cameras_forward(cmd)](#module_lib/cmd..Commands+cameras_forward) ⇒ <code>integer</code>
    * [.cameras_backward(cmd)](#module_lib/cmd..Commands+cameras_backward) ⇒ <code>integer</code>
    * [.camera_forward_camera_second_backward(cmd)](#module_lib/cmd..Commands+camera_forward_camera_second_backward) ⇒ <code>integer</code>
    * [.camera_backward_camera_second_forward(cmd)](#module_lib/cmd..Commands+camera_backward_camera_second_forward) ⇒ <code>integer</code>
    * [.projector_second_forward()](#module_lib/cmd..Commands+projector_second_forward) ⇒ <code>integer</code>
    * [.projector_second_backward()](#module_lib/cmd..Commands+projector_second_backward) ⇒ <code>integer</code>
    * [.projectors_forward()](#module_lib/cmd..Commands+projectors_forward) ⇒ <code>integer</code>
    * [.projectors_backward()](#module_lib/cmd..Commands+projectors_backward) ⇒ <code>integer</code>
    * [.projector_forward_projector_second_backward()](#module_lib/cmd..Commands+projector_forward_projector_second_backward) ⇒ <code>integer</code>
    * [.projector_backward_projector_second_forward()](#module_lib/cmd..Commands+projector_backward_projector_second_forward) ⇒ <code>integer</code>
    * [.alert()](#module_lib/cmd..Commands+alert) ⇒ <code>integer</code>
    * [.pause()](#module_lib/cmd..Commands+pause) ⇒ <code>integer</code>
    * [.camera_exposure()](#module_lib/cmd..Commands+camera_exposure)

<a name="module_lib/cmd..Commands+projector_forward"></a>

#### commands.projector\_forward() ⇒ <code>integer</code>
Move the projector one frame forward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+projector_backward"></a>

#### commands.projector\_backward() ⇒ <code>integer</code>
Move the projector one frame backward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+camera_forward"></a>

#### commands.camera\_forward(cmd) ⇒ <code>integer</code>
Move the camera one frame forward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>object</code> | Full cmd object |

<a name="module_lib/cmd..Commands+black_forward"></a>

#### commands.black\_forward() ⇒ <code>integer</code>
Move the camera one frame forward with light off

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+camera_backward"></a>

#### commands.camera\_backward(cmd) ⇒ <code>integer</code>
Move the camera one frame backward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>object</code> | Full cmd object |

<a name="module_lib/cmd..Commands+black_backward"></a>

#### commands.black\_backward() ⇒ <code>integer</code>
Move the camera one frame forward, light set to black or off

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+camera_second_forward"></a>

#### commands.camera\_second\_forward(cmd) ⇒ <code>integer</code>
Move the second camera one frame forward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>object</code> | Full cmd object |

<a name="module_lib/cmd..Commands+camera_second_backward"></a>

#### commands.camera\_second\_backward(cmd) ⇒ <code>integer</code>
Move the second camera one frame backward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>object</code> | Full cmd object |

<a name="module_lib/cmd..Commands+cameras_forward"></a>

#### commands.cameras\_forward(cmd) ⇒ <code>integer</code>
Move the both cameras one frame forward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>object</code> | Full cmd object |

<a name="module_lib/cmd..Commands+cameras_backward"></a>

#### commands.cameras\_backward(cmd) ⇒ <code>integer</code>
Move the both cameras one frame backward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>object</code> | Full cmd object |

<a name="module_lib/cmd..Commands+camera_forward_camera_second_backward"></a>

#### commands.camera\_forward\_camera\_second\_backward(cmd) ⇒ <code>integer</code>
Move first camera one frame forward and rewind secondary camera one frame backward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>object</code> | Full cmd object |

<a name="module_lib/cmd..Commands+camera_backward_camera_second_forward"></a>

#### commands.camera\_backward\_camera\_second\_forward(cmd) ⇒ <code>integer</code>
Rewind first camera one frame backward and move secondary camera one frame forward

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>object</code> | Full cmd object |

<a name="module_lib/cmd..Commands+projector_second_forward"></a>

#### commands.projector\_second\_forward() ⇒ <code>integer</code>
Move the secondary projector forward one frame

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+projector_second_backward"></a>

#### commands.projector\_second\_backward() ⇒ <code>integer</code>
Rewind the secondary projector backward one frame

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+projectors_forward"></a>

#### commands.projectors\_forward() ⇒ <code>integer</code>
Move the both projectors forward one frame

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+projectors_backward"></a>

#### commands.projectors\_backward() ⇒ <code>integer</code>
Rewind both projectors backwards one frame

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+projector_forward_projector_second_backward"></a>

#### commands.projector\_forward\_projector\_second\_backward() ⇒ <code>integer</code>
Move the primary projector forward one frame and rewind the secondary projector
one frame backwards.

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+projector_backward_projector_second_forward"></a>

#### commands.projector\_backward\_projector\_second\_forward() ⇒ <code>integer</code>
Rewind the primary projector backwards one frame and move the secondary
projector forward one frame.

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+alert"></a>

#### commands.alert() ⇒ <code>integer</code>
Throws an alert to pause a sequence

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+pause"></a>

#### commands.pause() ⇒ <code>integer</code>
Pauses a sequence for a length of time

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  
**Returns**: <code>integer</code> - Length of action in ms  
<a name="module_lib/cmd..Commands+camera_exposure"></a>

#### commands.camera\_exposure()
Sets the camera exposure (if supported).

**Kind**: instance method of [<code>Commands</code>](#module_lib/cmd..Commands)  

<a name="module_lib/filmout"></a>

## lib/filmout

* [lib/filmout](#module_lib/filmout)
    * [~FilmOut](#module_lib/filmout..FilmOut)
        * [.init()](#module_lib/filmout..FilmOut+init)
        * [.listen()](#module_lib/filmout..FilmOut+listen)
        * [.hash(data)](#module_lib/filmout..FilmOut+hash)
        * [.set(dir)](#module_lib/filmout..FilmOut+set)
        * [.move()](#module_lib/filmout..FilmOut+move) ⇒ <code>number</code>
        * [.start()](#module_lib/filmout..FilmOut+start)
        * [.end()](#module_lib/filmout..FilmOut+end)
        * [.onConnect(evt, arg)](#module_lib/filmout..FilmOut+onConnect) ⇒ <code>boolean</code>
        * [.onPreExport(evt, arg)](#module_lib/filmout..FilmOut+onPreExport) ⇒ <code>any</code>
        * [.isGifAnimated(pathStr)](#module_lib/filmout..FilmOut+isGifAnimated) ⇒ <code>boolean</code>
        * [.stillInfo(pathStr)](#module_lib/filmout..FilmOut+stillInfo) ⇒ <code>object</code>
        * [.dirInfo(images)](#module_lib/filmout..FilmOut+dirInfo) ⇒ <code>object</code>
        * [.dirList(pathStr)](#module_lib/filmout..FilmOut+dirList) ⇒ <code>array</code>
        * [.previewFrame(evt, arg)](#module_lib/filmout..FilmOut+previewFrame)
        * [.preview(evt, arg)](#module_lib/filmout..FilmOut+preview)
        * [.focus()](#module_lib/filmout..FilmOut+focus)
        * [.field()](#module_lib/filmout..FilmOut+field)
        * [.meter()](#module_lib/filmout..FilmOut+meter)
        * [.close()](#module_lib/filmout..FilmOut+close)
        * [.onDisplay()](#module_lib/filmout..FilmOut+onDisplay)

<a name="module_lib/filmout..FilmOut"></a>

### lib/filmout~FilmOut
Class representing all filmout features.

**Kind**: inner class of [<code>lib/filmout</code>](#module_lib/filmout)  

* [~FilmOut](#module_lib/filmout..FilmOut)
    * [.init()](#module_lib/filmout..FilmOut+init)
    * [.listen()](#module_lib/filmout..FilmOut+listen)
    * [.hash(data)](#module_lib/filmout..FilmOut+hash)
    * [.set(dir)](#module_lib/filmout..FilmOut+set)
    * [.move()](#module_lib/filmout..FilmOut+move) ⇒ <code>number</code>
    * [.start()](#module_lib/filmout..FilmOut+start)
    * [.end()](#module_lib/filmout..FilmOut+end)
    * [.onConnect(evt, arg)](#module_lib/filmout..FilmOut+onConnect) ⇒ <code>boolean</code>
    * [.onPreExport(evt, arg)](#module_lib/filmout..FilmOut+onPreExport) ⇒ <code>any</code>
    * [.isGifAnimated(pathStr)](#module_lib/filmout..FilmOut+isGifAnimated) ⇒ <code>boolean</code>
    * [.stillInfo(pathStr)](#module_lib/filmout..FilmOut+stillInfo) ⇒ <code>object</code>
    * [.dirInfo(images)](#module_lib/filmout..FilmOut+dirInfo) ⇒ <code>object</code>
    * [.dirList(pathStr)](#module_lib/filmout..FilmOut+dirList) ⇒ <code>array</code>
    * [.previewFrame(evt, arg)](#module_lib/filmout..FilmOut+previewFrame)
    * [.preview(evt, arg)](#module_lib/filmout..FilmOut+preview)
    * [.focus()](#module_lib/filmout..FilmOut+focus)
    * [.field()](#module_lib/filmout..FilmOut+field)
    * [.meter()](#module_lib/filmout..FilmOut+meter)
    * [.close()](#module_lib/filmout..FilmOut+close)
    * [.onDisplay()](#module_lib/filmout..FilmOut+onDisplay)

<a name="module_lib/filmout..FilmOut+init"></a>

#### filmOut.init()
Async function for requiring log, ipcMain and bind events.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
<a name="module_lib/filmout..FilmOut+listen"></a>

#### filmOut.listen()
**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
<a name="module_lib/filmout..FilmOut+hash"></a>

#### filmOut.hash(data)
Create a hash of a string.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | Data to produce hash of |

<a name="module_lib/filmout..FilmOut+set"></a>

#### filmOut.set(dir)
Sets filmout direction.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>boolean</code> | Direction of filmout |

<a name="module_lib/filmout..FilmOut+move"></a>

#### filmOut.move() ⇒ <code>number</code>
Moves filmout a frame at a time.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
**Returns**: <code>number</code> - Time since start  
<a name="module_lib/filmout..FilmOut+start"></a>

#### filmOut.start()
Begin the process of exporting single frames from the video for display.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
<a name="module_lib/filmout..FilmOut+end"></a>

#### filmOut.end()
Ends the filmout process and closes the display.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
<a name="module_lib/filmout..FilmOut+onConnect"></a>

#### filmOut.onConnect(evt, arg) ⇒ <code>boolean</code>
Use a video file as a film out source on "projector"

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
**Returns**: <code>boolean</code> - Success state  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>object</code> | Original connect event |
| arg | <code>object</code> | Arguments from ipc message |

<a name="module_lib/filmout..FilmOut+onPreExport"></a>

#### filmOut.onPreExport(evt, arg) ⇒ <code>any</code>
Pre-export all frames from video for display.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
**Returns**: <code>any</code> - UI send call  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>object</code> | IPC event |
| arg | <code>object</code> | IPC args |

<a name="module_lib/filmout..FilmOut+isGifAnimated"></a>

#### filmOut.isGifAnimated(pathStr) ⇒ <code>boolean</code>
Return true if gif is animated, false if it is a still

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
**Returns**: <code>boolean</code> - Whether or not gif is animated  

| Param | Type | Description |
| --- | --- | --- |
| pathStr | <code>string</code> | Path to gif to check |

<a name="module_lib/filmout..FilmOut+stillInfo"></a>

#### filmOut.stillInfo(pathStr) ⇒ <code>object</code>
Return information on a still image using the Jimp module

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
**Returns**: <code>object</code> - Info about still from sharp  

| Param | Type | Description |
| --- | --- | --- |
| pathStr | <code>string</code> | Path to gif to check |

<a name="module_lib/filmout..FilmOut+dirInfo"></a>

#### filmOut.dirInfo(images) ⇒ <code>object</code>
Return information on the first still image found in a
directory using the Jimp module.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
**Returns**: <code>object</code> - Info about first image  

| Param | Type | Description |
| --- | --- | --- |
| images | <code>array</code> | List of image paths |

<a name="module_lib/filmout..FilmOut+dirList"></a>

#### filmOut.dirList(pathStr) ⇒ <code>array</code>
Returns a list of images within a directory, filtered
for supported types and sorted.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
**Returns**: <code>array</code> - Array of image paths  

| Param | Type | Description |
| --- | --- | --- |
| pathStr | <code>string</code> | Path to directory |

<a name="module_lib/filmout..FilmOut+previewFrame"></a>

#### filmOut.previewFrame(evt, arg)
Preview a frame from the selected video.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>object</code> | Original event |
| arg | <code>object</code> | Arguments from message |

<a name="module_lib/filmout..FilmOut+preview"></a>

#### filmOut.preview(evt, arg)
Open a single frame in a display window to preview filmout.

**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>object</code> | Original event |
| arg | <code>object</code> | Arguments from message |

<a name="module_lib/filmout..FilmOut+focus"></a>

#### filmOut.focus()
**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
<a name="module_lib/filmout..FilmOut+field"></a>

#### filmOut.field()
**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
<a name="module_lib/filmout..FilmOut+meter"></a>

#### filmOut.meter()
**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
<a name="module_lib/filmout..FilmOut+close"></a>

#### filmOut.close()
**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  
<a name="module_lib/filmout..FilmOut+onDisplay"></a>

#### filmOut.onDisplay()
**Kind**: instance method of [<code>FilmOut</code>](#module_lib/filmout..FilmOut)  

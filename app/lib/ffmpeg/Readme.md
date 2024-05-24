<a name="module_ffmpeg"></a>

## ffmpeg

* [ffmpeg](#module_ffmpeg)
    * [~FFMPEG](#module_ffmpeg..FFMPEG)
        * [.init()](#module_ffmpeg..FFMPEG+init)
        * [.padded_frame(i)](#module_ffmpeg..FFMPEG+padded_frame) ⇒ <code>string</code>
        * [.parseStderr(line)](#module_ffmpeg..FFMPEG+parseStderr)
        * [.frame(state, light)](#module_ffmpeg..FFMPEG+frame) ⇒ <code>string</code>
        * [.frames(video, obj)](#module_ffmpeg..FFMPEG+frames) ⇒ <code>?</code>
        * [.clear(frame)](#module_ffmpeg..FFMPEG+clear) ⇒ <code>boolean</code>
        * [.clearAll()](#module_ffmpeg..FFMPEG+clearAll)
        * [.checkDir()](#module_ffmpeg..FFMPEG+checkDir)
    * [~Creates an ffmpeg class](#module_ffmpeg..Creates an ffmpeg class)
        * [new Creates an ffmpeg class(sys)](#new_module_ffmpeg..Creates an ffmpeg class_new)

<a name="module_ffmpeg..FFMPEG"></a>

### ffmpeg~FFMPEG
**Kind**: inner class of [<code>ffmpeg</code>](#module_ffmpeg)  

* [~FFMPEG](#module_ffmpeg..FFMPEG)
    * [.init()](#module_ffmpeg..FFMPEG+init)
    * [.padded_frame(i)](#module_ffmpeg..FFMPEG+padded_frame) ⇒ <code>string</code>
    * [.parseStderr(line)](#module_ffmpeg..FFMPEG+parseStderr)
    * [.frame(state, light)](#module_ffmpeg..FFMPEG+frame) ⇒ <code>string</code>
    * [.frames(video, obj)](#module_ffmpeg..FFMPEG+frames) ⇒ <code>?</code>
    * [.clear(frame)](#module_ffmpeg..FFMPEG+clear) ⇒ <code>boolean</code>
    * [.clearAll()](#module_ffmpeg..FFMPEG+clearAll)
    * [.checkDir()](#module_ffmpeg..FFMPEG+checkDir)

<a name="module_ffmpeg..FFMPEG+init"></a>

#### ffmpeG.init()
Async method to call async functions from constructor

**Kind**: instance method of [<code>FFMPEG</code>](#module_ffmpeg..FFMPEG)  
<a name="module_ffmpeg..FFMPEG+padded_frame"></a>

#### ffmpeG.padded\_frame(i) ⇒ <code>string</code>
Add padding to a number to 5 places. Return a string.

**Kind**: instance method of [<code>FFMPEG</code>](#module_ffmpeg..FFMPEG)  
**Returns**: <code>string</code> - Padded string  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>integer</code> | Integer to pad |

<a name="module_ffmpeg..FFMPEG+parseStderr"></a>

#### ffmpeG.parseStderr(line)
Parse the stderr output of ffmpeg

**Kind**: instance method of [<code>FFMPEG</code>](#module_ffmpeg..FFMPEG)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Stderr line |

<a name="module_ffmpeg..FFMPEG+frame"></a>

#### ffmpeG.frame(state, light) ⇒ <code>string</code>
Render a single frame from a video or image to a png.

**Kind**: instance method of [<code>FFMPEG</code>](#module_ffmpeg..FFMPEG)  
**Returns**: <code>string</code> - Path of frame  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>object</code> | State object containing file data |
| light | <code>object</code> | Object containing color information for frame |

<a name="module_ffmpeg..FFMPEG+frames"></a>

#### ffmpeG.frames(video, obj) ⇒ <code>?</code>
Render all frames in a video to the temp directory.
Not in use.

**Kind**: instance method of [<code>FFMPEG</code>](#module_ffmpeg..FFMPEG)  

| Param | Type | Description |
| --- | --- | --- |
| video | <code>string</code> | Path to video |
| obj | <code>object</code> | Not sure |

<a name="module_ffmpeg..FFMPEG+clear"></a>

#### ffmpeG.clear(frame) ⇒ <code>boolean</code>
Clears a specific frame from the tmp directory

**Kind**: instance method of [<code>FFMPEG</code>](#module_ffmpeg..FFMPEG)  
**Returns**: <code>boolean</code> - True if successful, false if not  

| Param | Type | Description |
| --- | --- | --- |
| frame | <code>integer</code> | Integer of frame to clear |

<a name="module_ffmpeg..FFMPEG+clearAll"></a>

#### ffmpeG.clearAll()
Deletes all frames in temp directory.

**Kind**: instance method of [<code>FFMPEG</code>](#module_ffmpeg..FFMPEG)  
<a name="module_ffmpeg..FFMPEG+checkDir"></a>

#### ffmpeG.checkDir()
Checks if mcopy temp directory exists. If it doesn't,
creates it.

**Kind**: instance method of [<code>FFMPEG</code>](#module_ffmpeg..FFMPEG)  
<a name="module_ffmpeg..Creates an ffmpeg class"></a>

### ffmpeg~Creates an ffmpeg class
**Kind**: inner class of [<code>ffmpeg</code>](#module_ffmpeg)  
<a name="new_module_ffmpeg..Creates an ffmpeg class_new"></a>

#### new Creates an ffmpeg class(sys)

| Param | Type | Description |
| --- | --- | --- |
| sys | <code>object</code> | System object to be used to get temp directory |


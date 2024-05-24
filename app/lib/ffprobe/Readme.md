<a name="module_lib/ffprobe"></a>

## lib/ffprobe

* [lib/ffprobe](#module_lib/ffprobe)
    * [~FFPROBE](#module_lib/ffprobe..FFPROBE)
        * [.parseFps()](#module_lib/ffprobe..FFPROBE+parseFps)
        * [.info(video)](#module_lib/ffprobe..FFPROBE+info) ⇒ <code>object</code>
        * [.frames(video)](#module_lib/ffprobe..FFPROBE+frames) ⇒ <code>integer</code>

<a name="module_lib/ffprobe..FFPROBE"></a>

### lib/ffprobe~FFPROBE
Class representing all ffprobe features.

**Kind**: inner class of [<code>lib/ffprobe</code>](#module_lib/ffprobe)  

* [~FFPROBE](#module_lib/ffprobe..FFPROBE)
    * [.parseFps()](#module_lib/ffprobe..FFPROBE+parseFps)
    * [.info(video)](#module_lib/ffprobe..FFPROBE+info) ⇒ <code>object</code>
    * [.frames(video)](#module_lib/ffprobe..FFPROBE+frames) ⇒ <code>integer</code>

<a name="module_lib/ffprobe..FFPROBE+parseFps"></a>

#### ffprobE.parseFps()
Parse the fps entry into a float representing the fps of a video

**Kind**: instance method of [<code>FFPROBE</code>](#module_lib/ffprobe..FFPROBE)  
<a name="module_lib/ffprobe..FFPROBE+info"></a>

#### ffprobE.info(video) ⇒ <code>object</code>
Get info on a video in json format. Use for filmout.

**Kind**: instance method of [<code>FFPROBE</code>](#module_lib/ffprobe..FFPROBE)  
**Returns**: <code>object</code> - Video info in an object  

| Param | Type | Description |
| --- | --- | --- |
| video | <code>string</code> | Path to video |

<a name="module_lib/ffprobe..FFPROBE+frames"></a>

#### ffprobE.frames(video) ⇒ <code>integer</code>
Count the number of frames in the video using one of two methods.
The first uses -select_streams and is very fast. The second uses
-count_frames and is VERY slow.

**Kind**: instance method of [<code>FFPROBE</code>](#module_lib/ffprobe..FFPROBE)  
**Returns**: <code>integer</code> - Number of frames in video  

| Param | Type | Description |
| --- | --- | --- |
| video | <code>string</code> | Path to video |


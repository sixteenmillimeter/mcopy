## Functions

<dl>
<dt><a href="#dependencies">dependencies(platform)</a> ⇒ <code>object</code></dt>
<dd><p>Evaluates system dependencies for digital
projector features by executing <code>which</code> on binary.
If they do not exist, log to console</p>
</dd>
<dt><a href="#system">system()</a> ⇒ <code>object</code></dt>
<dd><p>Profile the current system and return an object with
data about the displays and dependencies for the digital
projector feature.</p>
</dd>
</dl>

<a name="dependencies"></a>

## dependencies(platform) ⇒ <code>object</code>
Evaluates system dependencies for digital
projector features by executing `which` on binary.
If they do not exist, log to console

**Kind**: global function  
**Returns**: <code>object</code> - Object containing path to dependency from `which`, if they exist  

| Param | Type | Description |
| --- | --- | --- |
| platform | <code>string</code> | Operating system type |

<a name="system"></a>

## system() ⇒ <code>object</code>
Profile the current system and return an object with
data about the displays and dependencies for the digital
projector feature.

**Kind**: global function  
**Returns**: <code>object</code> - Object containing system information  

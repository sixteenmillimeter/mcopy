<a name="Devices"></a>

## Devices
class representing the device discovery features

**Kind**: global class  

* [Devices](#Devices)
    * [new Devices()](#new_Devices_new)
    * [.init()](#Devices+init)
    * [.listen()](#Devices+listen)
    * [.listener()](#Devices+listener)
    * [.enumerate()](#Devices+enumerate)
    * [.favor()](#Devices+favor)
    * [.distinguish()](#Devices+distinguish)
    * [.fakeProjector()](#Devices+fakeProjector)
    * [.fakeCamera()](#Devices+fakeCamera)
    * [.fakeLight()](#Devices+fakeLight)
    * [.fakeCapper()](#Devices+fakeCapper)
    * [.connectDevice()](#Devices+connectDevice)
    * [.all()](#Devices+all)
    * [.remember()](#Devices+remember)
    * [.ready()](#Devices+ready)

<a name="new_Devices_new"></a>

### new Devices()
Constructor assigns arduino, settings, UI browser window and cam objects
locally to this class for reference.

<a name="Devices+init"></a>

### devices.init()
Initialize the log for "devices". Establish an ipc connection to the UI.
Start listening on that ipc connection.

**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+listen"></a>

### devices.listen()
Listen to the "profile" channel for messages from the UI.

**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+listener"></a>

### devices.listener()
The "profile" channel callback. If a profile is changed, set it in the
local settings object.

**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+enumerate"></a>

### devices.enumerate()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+favor"></a>

### devices.favor()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+distinguish"></a>

### devices.distinguish()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+fakeProjector"></a>

### devices.fakeProjector()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+fakeCamera"></a>

### devices.fakeCamera()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+fakeLight"></a>

### devices.fakeLight()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+fakeCapper"></a>

### devices.fakeCapper()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+connectDevice"></a>

### devices.connectDevice()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+all"></a>

### devices.all()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+remember"></a>

### devices.remember()
**Kind**: instance method of [<code>Devices</code>](#Devices)  
<a name="Devices+ready"></a>

### devices.ready()
**Kind**: instance method of [<code>Devices</code>](#Devices)  

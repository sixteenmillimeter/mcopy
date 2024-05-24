<a name="module_lib/devices"></a>

## lib/devices

* [lib/devices](#module_lib/devices)
    * [~Devices](#module_lib/devices..Devices)
        * [new Devices()](#new_module_lib/devices..Devices_new)
        * [.init()](#module_lib/devices..Devices+init)
        * [.listen()](#module_lib/devices..Devices+listen)
        * [.listener()](#module_lib/devices..Devices+listener)
        * [.enumerate()](#module_lib/devices..Devices+enumerate)
        * [.favor()](#module_lib/devices..Devices+favor)
        * [.distinguish()](#module_lib/devices..Devices+distinguish)
        * [.fakeProjector()](#module_lib/devices..Devices+fakeProjector)
        * [.fakeCamera()](#module_lib/devices..Devices+fakeCamera)
        * [.fakeLight()](#module_lib/devices..Devices+fakeLight)
        * [.fakeCapper()](#module_lib/devices..Devices+fakeCapper)
        * [.connectDevice()](#module_lib/devices..Devices+connectDevice)
        * [.all()](#module_lib/devices..Devices+all)
        * [.remember()](#module_lib/devices..Devices+remember)
        * [.ready()](#module_lib/devices..Devices+ready)

<a name="module_lib/devices..Devices"></a>

### lib/devices~Devices
Class representing the device discovery features.

**Kind**: inner class of [<code>lib/devices</code>](#module_lib/devices)  

* [~Devices](#module_lib/devices..Devices)
    * [new Devices()](#new_module_lib/devices..Devices_new)
    * [.init()](#module_lib/devices..Devices+init)
    * [.listen()](#module_lib/devices..Devices+listen)
    * [.listener()](#module_lib/devices..Devices+listener)
    * [.enumerate()](#module_lib/devices..Devices+enumerate)
    * [.favor()](#module_lib/devices..Devices+favor)
    * [.distinguish()](#module_lib/devices..Devices+distinguish)
    * [.fakeProjector()](#module_lib/devices..Devices+fakeProjector)
    * [.fakeCamera()](#module_lib/devices..Devices+fakeCamera)
    * [.fakeLight()](#module_lib/devices..Devices+fakeLight)
    * [.fakeCapper()](#module_lib/devices..Devices+fakeCapper)
    * [.connectDevice()](#module_lib/devices..Devices+connectDevice)
    * [.all()](#module_lib/devices..Devices+all)
    * [.remember()](#module_lib/devices..Devices+remember)
    * [.ready()](#module_lib/devices..Devices+ready)

<a name="new_module_lib/devices..Devices_new"></a>

#### new Devices()
Constructor assigns arduino, settings, UI browser window and cam objects
locally to this class for reference.

<a name="module_lib/devices..Devices+init"></a>

#### devices.init()
Initialize the log for "devices". Establish an ipc connection to the UI.
Start listening on that ipc connection.

**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+listen"></a>

#### devices.listen()
Listen to the "profile" channel for messages from the UI.

**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+listener"></a>

#### devices.listener()
The "profile" channel callback. If a profile is changed, set it in the
local settings object.

**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+enumerate"></a>

#### devices.enumerate()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+favor"></a>

#### devices.favor()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+distinguish"></a>

#### devices.distinguish()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+fakeProjector"></a>

#### devices.fakeProjector()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+fakeCamera"></a>

#### devices.fakeCamera()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+fakeLight"></a>

#### devices.fakeLight()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+fakeCapper"></a>

#### devices.fakeCapper()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+connectDevice"></a>

#### devices.connectDevice()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+all"></a>

#### devices.all()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+remember"></a>

#### devices.remember()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  
<a name="module_lib/devices..Devices+ready"></a>

#### devices.ready()
**Kind**: instance method of [<code>Devices</code>](#module_lib/devices..Devices)  

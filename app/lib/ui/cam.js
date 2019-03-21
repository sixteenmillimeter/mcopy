const cam = {};

cam.queue = {};
cam.lock = false;
cam.id = 'camera';
cam.init = function () {
	'use strict';
	cam.listen();
};
cam.set = function (dir, callback) {
	'use strict';
	var obj;
	if (cam.lock) {
		return false;
	}
	obj = {
		dir : dir,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(cam.id, obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	cam.queue[obj.id] = obj;
	cam.lock = true;
};

cam.setValue = function (val) {
	'use strict';
	var obj = {
		val: val,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(cam.id, obj);
};
cam.move = function (callback) {
	'use strict';
	var obj;
	if (cam.lock) {
		return false;
	}
	obj = {
		frame : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(cam.id, obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	cam.queue[obj.id] = obj;
	cam.lock = true;
};
cam.end = function (c, id, ms) {
	'use strict';
	if (c === mcopy.cfg.arduino.cmd.cam_forward) {
		mcopy.state.camera.direction = true;
	} else if (c === mcopy.cfg.arduino.cmd.cam_backward) {
		mcopy.state.camera.direction = false;
	} else if (c === mcopy.cfg.arduino.cmd.camera) {
		if (mcopy.state.camera.direction) {
			mcopy.state.camera.pos += 1;
		} else {
			mcopy.state.camera.pos -= 1;
		}
	}
	if (typeof cam.queue[id] !== 'undefined') {
		if (typeof cam.queue[id].callback !== 'undefined') {
			cam.queue[id].callback(ms);
		}
		delete cam.queue[id];
		cam.lock = false;
	}
};
cam.listen = function () {
	'use strict';
	ipcRenderer.on(cam.id, function (event, arg) {
		cam.end(arg.cmd, arg.id, arg.ms);		
		return event.returnValue = true;
	});
};

module.exports = cam;
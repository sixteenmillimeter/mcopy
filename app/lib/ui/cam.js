const cam = {};

cam.queue = {};
cam.lock = false;
cam.id = 'camera';
cam.pos = 0;
cam.dir = true;

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
	if (c === cfg.arduino.cmd.camera_forward) {
		cam.dir = true;
	} else if (c === cfg.arduino.cmd.camera_backward) {
		cam.dir = false;
	} else if (c === cfg.arduino.cmd.camera) {
		if (cam.dir) {
			cam.pos += 1;
		} else {
			cam.pos -= 1;
		}
	}
	gui.counterUpdate('cam', cam.pos)
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

cam.second = {};
cam.second.enabled = false;
cam.second.queue = {};
cam.second.lock = false;
cam.second.id = 'camera_second';
cam.second.pos = 0;
cam.second.dir = true;

cam.second.enable = function () {
	cam.second.enabled = true;
}

cam.second.disable = function () {
	cam.second.enabled = false;
}

module.exports = cam;
const proj = {};

proj.queue = {};
proj.lock = false;
proj.id = 'projector';
proj.dir = true;
proj.pos = 0;

proj.init = function () {
	'use strict';
	proj.listen();
};
proj.set = function (dir, callback) {
	'use strict';
	var obj;
	if (proj.lock) {
		return false;
	}
	obj = {
		dir : dir,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(proj.id, obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock = true;
};
proj.move = function (callback) {
	'use strict';
	var obj;
	if (proj.lock) {
		return false;
	}
	obj = {
		frame : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(proj.id, obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock = true;
};
proj.end = function (c, id, ms) {
	'use strict';
	if (c === cfg.arduino.cmd.projector_forward) {
		proj.dir = true;
	} else if (c === cfg.arduino.cmd.projector_backward) {
		proj.dir = false;
	} else if (c === cfg.arduino.cmd.projector) {
		if (proj.dir) {
			proj.pos += 1;
		} else {
			proj.pos -= 1;
		}
	}
	gui.counterUpdate('proj', proj.pos)
	if (typeof proj.queue[id] !== 'undefined') {
		if (typeof proj.queue[id].callback !== 'undefined') {
			proj.queue[id].callback(ms);
		}
		delete proj.queue[id];
		proj.lock = false;
	}
};
proj.listen = function () {
	'use strict';
	ipcRenderer.on(proj.id, function (event, arg) {
		proj.end(arg.cmd, arg.id, arg.ms);		
		return event.returnValue = true;
	});
};

proj.setValue = function (val) {
	'use strict';
	var obj = {
		val: val,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(proj.id, obj);
};

proj.second = {};
proj.second.queue = {};
proj.second.lock = false;
proj.second.id = 'projector_second';
proj.second.dir = true;
proj.second.pos = 0;

module.exports = proj;
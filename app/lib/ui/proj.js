var proj = {};

proj.queue = {};
proj.lock = false;
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
	ipcRenderer.sendSync('proj', obj);

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
	ipcRenderer.sendSync('proj', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock = true;
};
proj.end = function (c, id, ms) {
	'use strict';
	if (c === mcopy.cfg.arduino.cmd.proj_forward) {
		mcopy.state.projector.direction = true;
	} else if (c === mcopy.cfg.arduino.cmd.proj_backward) {
		mcopy.state.projector.direction = false;
	} else if (c === mcopy.cfg.arduino.cmd.projector) {
		if (mcopy.state.projector.direction) {
			mcopy.state.projector.pos += 1;
		} else {
			mcopy.state.projector.pos -= 1;
		}
	}
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
	ipcRenderer.on('proj', function (event, arg) {
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
	ipcRenderer.sendSync('proj', obj);
}

module.exports = proj;
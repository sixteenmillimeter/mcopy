const proj = {};

proj.queue = {};
proj.lock = false;
proj.lock2 = false;
proj.id = 'projector';
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
proj.set2 = function (dir, callback) {
	'use strict';
	var obj;
	if (proj.lock2) {
		return false;
	}
	obj = {
		dir : dir,
		second : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(proj.id, obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock2 = true;
};
proj.move2 = function (callback) {
	'use strict';
	var obj;
	if (proj2.lock) {
		return false;
	}
	obj = {
		frame : true,
		second : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(proj.id, obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock2 = true;
};
proj.both = function (callback) {
	'use strict';
		var obj;
	if (proj.lock || proj2.lock) {
		return false;
	}
	obj = {
		frame : true,
		both : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(proj.id, obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock = true;
	proj.lock2 = true;
}
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
	//
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

proj.setValue2 = function (val) {
	'use strict';
	var obj = {
		val: val,
		second : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync(proj.id, obj);
};

module.exports = proj;
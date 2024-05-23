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
		id : uuid()
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
		move : true,
		id : uuid()
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
	} else if (c === cfg.arduino.cmd.projectors) {
		if (proj.dir) {
			proj.pos += 1;
		} else {
			proj.pos -= 1;
		}
		if (proj.second.dir) {
			proj.second.pos += 1;
		} else {
			proj.second.pos -= 1;
		}
		gui.counterUpdate('proj2', proj.second.pos);
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
		id : uuid()
	};
	ipcRenderer.sendSync(proj.id, obj);
};

proj.second = {};
proj.second.enabled = false;
proj.second.queue = {};
proj.second.lock = false;
proj.second.id = 'projector_second';
proj.second.dir = true;
proj.second.pos = 0;

proj.second.enable = function () {
	proj.second.enabled = true;
	//ui actions
	$('.proj2').addClass('on');
	$('#counters').addClass('projectors');
	proj.second.init();
}

proj.second.disable = function () {
	proj.second.disabled = true;
	//ui actions
	$('.proj2').removeClass('on');
	$('#counters').removeClass('projectors');
}

proj.second.init = function () {
	'use strict';
	proj.second.listen();
};
proj.second.set = function (dir, callback) {
	'use strict';
	var obj;
	if (proj.second.lock) {
		return false;
	}
	obj = {
		dir : dir,
		id : uuid()
	};
	ipcRenderer.sendSync(proj.second.id, obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.second.queue[obj.id] = obj;
	proj.second.lock = true;
};
proj.second.move = function (callback) {
	'use strict';
	var obj;
	if (proj.second.lock) {
		return false;
	}
	obj = {
		move : true,
		id : uuid()
	};
	ipcRenderer.sendSync(proj.second.id, obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.second.queue[obj.id] = obj;
	proj.second.lock = true;
};
proj.second.end = function (c, id, ms) {
	'use strict';
	if (c === cfg.arduino.cmd.projector_second_forward) {
		proj.second.dir = true;
	} else if (c === cfg.arduino.cmd.projector_second_backward) {
		proj.second.dir = false;
	} else if (c === cfg.arduino.cmd.projector_second) {
		if (proj.second.dir) {
			proj.second.pos += 1;
		} else {
			proj.second.pos -= 1;
		}
	}
	timing.update(c, ms);
	gui.counterUpdate('proj2', proj.second.pos);
	if (typeof proj.second.queue[id] !== 'undefined') {
		if (typeof proj.second.queue[id].callback !== 'undefined') {
			proj.second.queue[id].callback(ms);
		}
		delete proj.second.queue[id];
		proj.second.lock = false;
	}
};
proj.second.listen = function () {
	'use strict';
	ipcRenderer.on(proj.second.id, function (event, arg) {
		proj.second.end(arg.cmd, arg.id, arg.ms);		
		return event.returnValue = true;
	});
};

proj.second.setValue = function (val) {
	'use strict';
	var obj = {
		val: val,
		id : uuid()
	};
	ipcRenderer.sendSync(proj.second.id, obj);
};

module.exports = proj;
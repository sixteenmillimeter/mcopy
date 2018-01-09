var devices = {};

devices.init = function () {
	'use strict';
	devices.listen();
	gui.overlay(true);
	gui.spinner(true);
};
devices.listen = function () {
	'use strict';
	
	ipcRenderer.on('ready', devices.ready);
};
devices.ready = function (event, arg) {
	'use strict';
	let opt;
	gui.spinner(false);
	gui.overlay(false);
	for (let i in arg) {
		opt = $('<option>');
		opt.val(arg[i]);
		opt.text(arg[i]);
		$(`#${i}_device`).empty();
		$(`#${i}_device`).append(opt);
	}
	return event.returnValue = true;
};

module.exports = devices;
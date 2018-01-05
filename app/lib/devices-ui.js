var devices = {};

devices.init = function () {
	'use strict';
	devices.listen();
	gui.overlay(true);
	gui.spinner(true);
};
devices.listen = function () {
	'use strict';
	let opt
	ipcRenderer.on('ready', function (event, arg) {
		opt = $('<option>')
		opt.value = arg.camera
		opt.text = arg.camera
		$('#camera_device').empty()
		$('#camera_device').append(opt)
		console.dir(arg)
		devices.ready();
		return event.returnValue = true;
	});
};
devices.ready = function () {
	'use strict';
	gui.spinner(false);
	gui.overlay(false);
};

module.exports = devices;
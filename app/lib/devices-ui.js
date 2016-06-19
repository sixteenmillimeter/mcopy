var devices = {};

devices.init = function () {
	'use strict';
	devices.listen();
	gui.overlay(true);
	gui.spinner(true);
};
devices.listen = function () {
	'use strict';
	ipcRenderer.on('ready', function (event, arg) {
		//console.log(arg.camera);
		//console.log(arg.projector);
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
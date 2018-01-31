
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
	ipcRenderer.on('intval', devices.intvalCb);
};
devices.ready = function (event, arg) {
	'use strict';
	let opt;
	let devs = [];
	gui.spinner(false);
	gui.overlay(false);
	for (let i in arg) {
		if (arg[i] !== '/dev/fake') {
			devs.push(arg[i]);
		}
		opt = $('<option>');
		opt.val(arg[i]);
		opt.text(arg[i]);
		$(`#${i}_device`).empty();
		$(`#${i}_device`).append(opt);
	}
	if (devs.length > 0) {
		$('#devices').empty();
		for (let i of devs) {
			opt = $('<option>');
			opt.val(i);
			opt.text(i);
			$('#devices').append(opt);
		}
	}
	return event.returnValue = true;
};

devices.intval = function () {
	'use strict';
	const url = $('#intval').val()
	let proceed = false
	let obj = {
		connect: true,
		url : url
	}
	if ( url !== '' && typeof url !== 'undefined') {
		proceed = confirm(`Are you sure you want to connect to INTVAL3 ${url}?`)
	} else {
		alert('Cannot connect to INTVAL3 url as entered.')
	}
	
	if (proceed) {
		gui.overlay(true);
		gui.spinner(true);
		ipcRenderer.send('intval', obj)
	} else {
		$('input[name=camera_type][value=arduino]').prop('checked', 'checked');
	}
};

devices.intvalCb = function (a, b) {
	'use strict';
	console.dir(a);
	console.dir(b);
};

module.exports = devices;
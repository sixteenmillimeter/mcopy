
var devices = {};

devices.init = function () {
	'use strict';
	devices.listen();;
	devices.profiles();
	gui.overlay(true);
	gui.spinner(true, 'Checking for connected devices...');
};
devices.profiles = function () {
	const keys = Object.keys(mcopy.cfg.profiles);
	const elem = $('#profile')
	let opt;
	elem.empty();
	for (let key of keys) {
		opt = $('<option>');
		opt.val(key);
		opt.text(mcopy.cfg.profiles[key].label);
		elem.append(opt);
	}
	elem.on('change', (t) => {
		devices.profile($('#profile').val());
	})
	devices.profile(keys[0]);
};
devices.profile = function (profile) {
	log.info(`Changed configuration profile to "${profile}"`, 'DEVICES', true, true);
	const p = mcopy.cfg.profiles[profile];
	const keys = Object.keys(p);
	for (let key of keys) {
		mcopy.cfg[key] = keys[key]
	}
	ipcRenderer.send('profile', { profile })
};
devices.listen = function () {
	'use strict';
	ipcRenderer.on('ready', devices.ready);
	ipcRenderer.on('intval', devices.intvalCb);
};
devices.ready = function (event, arg) {
	'use strict';
	console.dir(arg)
	let opt;
	let devs = [];
	let notify = 'Connected to ';
	gui.spinner(false);
	gui.overlay(false);
	for (let i in arg) {
		devs.push(arg[i].arduino);
		if (arg[i].arduino && arg[i].arduino !== '/dev/fake') {
			if (notify === 'Connected to ') {
				notify += arg[i].arduino + ' '
			} else {
				notify += `& ${arg[i].arduino}`
			}
		}
		opt = $('<option>');
		opt.val(`ARDUINO_${arg[i].arduino}`);
		opt.text(arg[i].arduino);
		$(`#${i}_device`).empty();
		$(`#${i}_device`).append(opt);
	}
	if (notify !== 'Connected to ') {
		gui.notify('DEVICES', notify)
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
	if (arg && arg.profile) {
		$('#profile').val(arg.profile)
		//devices.profile(arg.profile)
	}
	return event.returnValue = true;
};

devices.intval = function () {
	'use strict';
	const url = $('#intval').val();
	let proceed = false;
	let obj = {
		connect: true,
		url : url
	};
	if ( url !== '' && typeof url !== 'undefined') {
		proceed = confirm(`Are you sure you want to connect to INTVAL3 @ ${url}?`);
	} else {
		alert('Cannot connect to INTVAL3 url as entered.');
	}
	
	if (proceed) {
		gui.overlay(true);
		gui.spinner(true, `Connecting to INTVAL3 @ ${url}`);
		ipcRenderer.send('intval', obj);
	} else {
		$('#camera_type_arduino').prop('checked', 'checked');
		$('#intval').removeClass('active');
	}
};

devices.digitalSelect = function () {
	const elem = $('#digital');
	dialog.showOpenDialog({ 
		properties: [
			'openFile', 
			'openDirectory'
		],
		filters: [
			{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'mpeg', 'mov'] },
			{ name: 'All Files', extensions: ['*'] }
		]
	});
}

devices.digital = function () {
	'use strict';
	const elem = $('#digital');
	let proceed = false;
	let obj = {
		connect: true,
		url : url
	};
	if ( url !== '' && typeof url !== 'undefined') {
		proceed = confirm(`Are you sure you want to`);
	} else {
		alert('Cannot connect')
	}
	
	if (proceed) {
		//gui.overlay(true);
		//gui.spinner(true, `Connecting to`);
		ipcRenderer.send('video', obj)
	} else {
		$('#camera_type_arduino').prop('checked', 'checked');
		$('#intval').removeClass('active');
	}
};

devices.intvalCb = function (evt, args) {
	'use strict';
	let state;
	gui.spinner(false);
	gui.overlay(false);
	if (args.connected && args.connected === true) {
		//success state
		state = JSON.parse(args.state);
		mcopy.state.camera.pos = state.counter;
		mcopy.state.camera.direction = state.frame.dir;
		$('#intval').val(args.url);
		$('#intval').addClass('active');
		$('#camera_type_intval').prop('checked', 'checked');
		gui.notify('DEVICES', `Connected to INTVAL3 @ ${args.url}`)
		gui.updateState()
	} else {
		$('#camera_type_arduino').prop('checked', 'checked');
		$('#intval').removeClass('active');
	}
};

module.exports = devices;
const devices = {};

devices.init = function () {
	'use strict';
	devices.listen();
	devices.profiles();
	gui.overlay(true);
	gui.spinner(true, 'Checking for connected devices...');
};
devices.profiles = function () {
	'use strict';
	const keys = Object.keys(cfg.profiles);
	const elem = $('#profile')
	let opt;
	elem.empty();
	for (let key of keys) {
		opt = $('<option>');
		opt.val(key);
		opt.text(cfg.profiles[key].label);
		elem.append(opt);
	}
	elem.on('change', (t) => {
		devices.profile($('#profile').val());
	});
};
devices.profile = function (profile) {
	'use strict';
	log.info(`Changed configuration profile to "${profile}"`, 'DEVICES', true, true);
	const p = cfg.profiles[profile];
	const keys = Object.keys(p);
	for (let key of keys) {
		cfg[key] = keys[key]
	}
	if (typeof p.light !== 'undefined' && p.light === false) {
		light.disable();
	} else {
		light.enable();
	}
	ipcRenderer.send('profile', { profile })
};
devices.listen = function () {
	'use strict';
	ipcRenderer.on('ready', devices.ready);
	ipcRenderer.on('intval', devices.intvalCb);
	ipcRenderer.on('digital', devices.digitalCb);
};
devices.ready = function (event, arg) {
	'use strict';
	console.dir(arg)
	let opt;
	let devs = [];
	let notify = 'Connected to ';
	let p;
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
		gui.notify('DEVICES', notify);
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
		log.info(`Using configuration profile "${arg.profile}"`, 'DEVICES', true, true);
		p = cfg.profiles[arg.profile];
		if (typeof p.light !== 'undefined' && p.light === false) {
			light.disable();
		} else {
			light.enable();
		}
		//devices.profile(arg.profile)
	}

	seq.set(0, cfg.cmd.camera_forward);
	seq.set(1, cfg.cmd.projector_forward);
	grid.state(0);
	grid.state(1);
	
	if (arg.projector_second) {
		//add second row of projector pads to grid
		proj.second.enable();
	}
	if (arg.camera_second) {
		//add second row of camera pads to grid
		cam.second.enable();
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

devices.intvalCb = function (evt, args) {
	'use strict';
	let state;
	gui.spinner(false);
	gui.overlay(false);
	if (args.connected && args.connected === true) {
		//success state
		state = JSON.parse(args.state);
		cam.pos = state.counter;
		cam.dir = state.frame.dir;
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

devices.digitalSelect = function () {
	'use strict';
	const elem = $('#digital');
	const extensions =  ['mpg', 'mpeg', 'mov', 'mkv', 'avi', 'mp4'];
	dialog.showOpenDialog({
		title : `Select video or image sequence`,
        properties : [`openFile`], // openDirectory, multiSelection, openFile
        defaultPath: 'c:/',
        filters : [
            {
                name: 'All Files',
                extensions: ['*']
            },
        ]
    }, (files) => {
    	let valid = false;
    	console.dir(files)
    	let path = files[0];
    	let displayName;
		if (path && path !== '') {
			for (let ext of extensions) {
				if (path.toLowerCase().indexOf(`.${ext}`) !== -1) {
					valid = true;
				}
			}
			if (!valid) return false;
			log.info(`Selected video ${path.split('/').pop()}`, 'DIGITAL', true);
			elem.attr('data-file', path);
			displayName = path.split('/').pop()
			elem.val(displayName);
			$('#video_file').val(displayName);
		}
    })
}

devices.digital = function () {
	'use strict';
	const elem = $('#digital');
	const path = elem.attr('data-file');
	const fileName = elem.val();
	let proceed = false;
	let obj = {
		path,
		fileName
	}

	if (path && path !== '') {
		proceed = confirm(`Are you sure you want to use ${fileName}?`);
	}
	
	if (proceed) {
		gui.overlay(true);
		gui.spinner(true, `Getting info about ${fileName}`);
		ipcRenderer.send('digital', obj)
	} else {
		$('#projector_type_digital').prop('checked', 'checked');
		$('#digital').removeClass('active');
	}
};

devices.digitalCb = function (evt, args) {
	'use strict';
	let state;
	let color = [255,255,255];
	gui.spinner(false);
	gui.overlay(false);
	if (args.valid && args.valid === true) {
		//success state
		state = JSON.parse(args.state);
		$('#digital').addClass('active');
		$('#projector_type_digital').prop('checked', 'checked');
		gui.notify('DEVICES', `Using video ${state.fileName}`);

		seq.set(0, 'PF');
		grid.state(0);

		seq.set(1, 'CF');
		seq.setLight(1, color);
		grid.state(1);

		if (light.disabled) {
			light.enable();
		}

		$('#seq_loop').val(`${state.frames}`).trigger('change');

		gui.updateState();
	} else {
		$('#projector_type_digital').prop('checked', 'checked');
		$('#digital').removeClass('active');
	}
};

module.exports = devices;
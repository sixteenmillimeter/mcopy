'use strict';

/// <reference path ="jquery.d.ts"/> 

let devices : Devices;

class Devices {
	private id : string = 'devices';
	constructor () {

	}
	init () {
		this.listen();
		this.profiles();
		gui.overlay(true);
		gui.spinner(true, 'Checking for connected devices...');
	}
	listen () {
		ipcRenderer.on('ready', this.ready.bind(this));
		ipcRenderer.on('intval', this.intvalCb.bind(this));
		ipcRenderer.on('processing', this.processingCb.bind(this));
		ipcRenderer.on('error_state', this.errorState.bind(this));
	}

	async ready (event : any, arg : any) {
		log.info("Devices ready");
		let opt : any;
		let devs : any[] = [];
		let notify : string = 'Connected to ';
		let p : any;

		if (typeof arg.camera !== 'undefined' && typeof arg.camera.exposure !== undefined) {
			$('#submit_cam_time').removeClass('hide');
			$('#cam_time').removeAttr('readonly');
		}

		for (let i in arg) {
			devs.push(arg[i].arduino);
			if (arg[i].arduino && arg[i].arduino !== '/dev/fake') {
				if (notify === 'Connected to ') {
					notify += arg[i].arduino + ' ';
				} else {
					notify += `& ${arg[i].arduino}`;
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
		} else {
			gui.notify('DEVICES', 'Connected to mock devices');
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

		if (typeof arg !== 'undefined' && typeof arg.profile !== 'undefined') {
			devices.profile(arg.profile);
		}

		if (typeof arg !== 'undefined' && typeof arg.timing !== 'undefined') {
			timing.restore(arg.timing);
		}
		
		if (arg.projector_second) {
			//add second row of projector pads to grid
			proj.second.enable();
		}
		if (arg.camera_second) {
			//add second row of camera pads to grid
			cam.second.enable();
		}
		if (arg.capper) {
			//add capper features to grid
			capper.enable();
		}

		seq.set(0, cfg.cmd.camera_forward);
		seq.set(1, cfg.cmd.projector_forward);
		grid.state(0);
		grid.state(1);
		seq.stats();

		//@ts-ignore
		await delay(1000);

		try {
			gui.spinner(false);
			gui.overlay(false);
		} catch (err) {
			log.error(err);
		}
		log.info("Got here");
		return event.returnValue = true;
	}

	profiles () {
		const keys : string[] = Object.keys(cfg.profiles);
		const elem : any = $('#profile');
		let opt;
		elem.empty();
		for (let key of keys) {
			opt = $('<option>');
			opt.val(key);
			opt.text(cfg.profiles[key].label);
			elem.append(opt);
		}
		elem.on('change', (t : any) => {
			const val : string = $('#profile').val() as string;
			this.profile(val);
		});
	}

	profile (profile : string) {
		log.info(`Changed configuration profile to "${profile}"`, 'DEVICES', true, true);
		const p : any = cfg.profiles[profile];
		const keys : any[] = Object.keys(p);
		for (let key of keys) {
			cfg[key] = keys[key];
		}
		$('#profile').val(profile);
		timing.reset(p);
		if (typeof p.light !== 'undefined' && p.light === false) {
			light.disable();
		} else {
			light.enable();
		}
		ipcRenderer.send('profile', { profile });
		timing.store();

	}

	intval () {
		const url : string = $('#intval').val() as string;
		let proceed : boolean = false;
		let obj : any = {
			connect: true,
			url
		};

		if ( url !== '' && typeof url !== 'undefined') {
			proceed = confirm(`Are you sure you want to connect to INTVAL3 @ ${url}?`);
		} else {
			alert('Cannot connect to INTVAL3 URL as entered.');
		}
		
		if (proceed) {
			gui.overlay(true);
			gui.spinner(true, `Connecting to INTVAL3 @ ${url}`);
			ipcRenderer.send('intval', obj);
		} else {
			$('#camera_type_arduino').prop('checked', 'checked');
			$('#intval').removeClass('active');
		}
	}


	intvalCb (evt : any, args : any) {
		let state : any;
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
	}

	processing () {
		const url : string = $('#processing').val() as string;
		let proceed : boolean = false;
		let obj : any = {
			url
		};

		if ( url !== '' && typeof url !== 'undefined') {
			proceed = confirm(`Are you sure you want to connect to Processing @ ${url}?`);
		} else {
			alert('Cannot connect to Processing URL as entered.');
		}
		
		if (proceed) {
			gui.overlay(true);
			gui.spinner(true, `Connecting to Processing @ ${url}`);
			ipcRenderer.send('processing', obj);
		} else {
			$('#camera_type_arduino').prop('checked', 'checked');
			$('#processing').removeClass('active');
		}
	}

	processingCb () {
		gui.spinner(false);
		gui.overlay(false);
	}

	errorState () {
		gui.spinner(false);
		gui.overlay(false);
		gui.notify('DEVICES', `Hardware error detected`);
		gui.warn('Error', 'Hardware error detected. Please address before continuing.');
	}
}

devices = new Devices();

module.exports = devices;
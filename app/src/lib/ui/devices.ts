'use strict';

/// <reference path ="jquery.d.ts"/> 

declare var gui : any;
declare var seq : any;
declare var light : any;
declare var cfg : any;
declare var log : any;
declare var w2popup : any;
declare var cam : any;
declare var proj : any;
declare var light : any;
declare var grid : any;
declare var ipcRenderer : any;
declare var dialog : any;

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
	}

	ready (event : any, arg : any) {
		//console.dir(arg)
		let opt : any;
		let devs : any[] = [];
		let notify : string = 'Connected to ';
		let p : any;

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
		} else {
			gui.notify('DEVICES', 'Connected to mock devices')
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
		seq.stats();
		
		if (arg.projector_second) {
			//add second row of projector pads to grid
			proj.second.enable();
		}
		if (arg.camera_second) {
			//add second row of camera pads to grid
			cam.second.enable();
		}
		return event.returnValue = true;
	}

	profiles () {
		const keys : string[] = Object.keys(cfg.profiles);
		const elem : any = $('#profile')
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
			cfg[key] = keys[key]
		}
		if (typeof p.light !== 'undefined' && p.light === false) {
			light.disable();
		} else {
			light.enable();
		}
		ipcRenderer.send('profile', { profile })
	}

	intval () {
		const url : string = $('#intval').val() as string;
		let proceed : boolean = false;
		let obj : any = {
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
}

devices = new Devices();

module.exports = devices;
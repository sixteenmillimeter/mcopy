
var mcopy = {};

var { remote, ipcRenderer } = require('electron'),
	dialog = require('electron').remote.dialog,
	notifier = require('node-notifier'),
	fs = require('fs'),
	uuid = require('uuid'),
	moment = require('moment'),
	humanizeDuration = require('humanize-duration')
	gui = require('./lib/ui'),
	light = require('./lib/ui/light.js'),
	proj = require('./lib/ui/proj.js'),
	cam = require('./lib/ui/cam.js'),
	nav = require('./lib/ui/nav.js'),
	seq = require('./lib/ui/seq.js'),
	cmd = require('./lib/ui/cmd.js'),
	
	log = require('./lib/ui/log.js'),
	devices = require('./lib/ui/devices.js'),
	mscript = require('./lib/mscript');


mcopy.cfg = require('./data/cfg.json')

/******
	State shared by ALL interfaces
*******/
mcopy.state = {
	version : '2.0.0', //use for file compatibility check
	camera : {
		pos : 0,
		direction: true
	}, 
	projector : {
		pos : 0,
		direction: true
	},
	sequence : {
		size : 24,
		arr : ['CF', 'PF'],
		light : ['255,255,255', ''],
		cmd : {
			camera: mcopy.cfg.arduino.cmd.camera,
			projector: mcopy.cfg.arduino.cmd.projector,
			cam_direction: mcopy.cfg.arduino.cmd.cam_direction,
			cam_direction: mcopy.cfg.arduino.cmd.proj_direction
		},
		pads: {
			cam_forward: 'CF',
			proj_forward : 'PF',
			black_forward : 'BF',

			cam_backward: 'CB',
			proj_backward : 'PB',
			black_backward : 'BB',

			light_set : 'L'
		}
	}
};

//mcopy.gui.updateState();

var init = function () {
	'use strict';
	nav.init();
	gui.grid.init();
	gui.mscript.init();
	gui.console.init();
	log.init();	
	devices.init();
	light.init();
	proj.init();
	cam.init();

};
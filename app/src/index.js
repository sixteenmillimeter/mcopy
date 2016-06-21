var remote = require('remote'),
	dialog = require('electron').remote.dialog,
	notifier = require('node-notifier'),
	fs = require('fs'),
	uuid = require('node-uuid'),
	moment = require('moment'),
	humanizeDuration = require('humanize-duration')
	ipcRenderer = require('electron').ipcRenderer,
	mcopy = {},
	light = require('./lib/light-ui.js'),
	proj = require('./lib/proj-ui.js'),
	cam = require('./lib/cam-ui.js'),
	nav = require('./lib/nav-ui.js'),
	seq = require('./lib/seq-ui.js'),
	cmd = require('./lib/cmd-ui.js'),
	gui = require('./lib/gui.js'),
	log = require('./lib/log-ui.js'),
	devices = require('./lib/devices-ui.js'),
	mscript = require('./lib/mscript.js');
//console.log(ipcRenderer.sendSync('light', { 'fuck' : true }) );

mcopy.cfg = JSON.parse(fs.readFileSync('./data/cfg.json'), 'utf8');

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
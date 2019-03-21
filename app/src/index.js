
const mcopy = {};
mcopy.cfg = require('./data/cfg.json');


const { remote, ipcRenderer } = require('electron');
const dialog 	= require('electron').remote.dialog;
const notifier 	= require('node-notifier');
const fs 		= require('fs');
const uuid 		= require('uuid');
const moment 	= require('moment');
const humanizeDuration = require('humanize-duration');
const gui 		= require('./lib/ui');
const light 	= require('./lib/ui/light.js');
const proj 		= require('./lib/ui/proj.js');
const cam 		= require('./lib/ui/cam.js');
const nav 		= require('./lib/ui/nav.js');
const seq 		= require('./lib/ui/seq.js');
const cmd 		= require('./lib/ui/cmd.js');
const log 		= require('./lib/ui/log.js');
const devices 	= require('./lib/ui/devices.js');
const mse 		= require('./lib/ui/mscript.js');
const Mscript 	= require('./lib/mscript');


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
	camera_second : {
		pos : 0,
		direction : true
	},
	projector_second : {
		pos : 0,
		direction : true
	}
	sequence : {
		size : 24,
		arr : ['CF', 'PF'],
		light : ['255,255,255', ''],
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

function init () {
	'use strict';
	nav.init();
	gui.grid.init();
	mse.mscript.init();
	mse.console.init();
	log.init();	
	devices.init();
	light.init();
	proj.init();
	cam.init();
};
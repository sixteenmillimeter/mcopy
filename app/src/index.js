const mcopy = {};

const { remote, ipcRenderer } = require('electron');
const dialog 	= require('electron').remote.dialog;
const notifier 	= require('node-notifier');
const fs 		= require('fs');
const uuid 		= require('uuid');
const moment 	= require('moment');
const humanizeDuration = require('humanize-duration');
const PACKAGE 	= require('./package.json');
const cfg 		= require('./data/cfg.json');
const gui 		= require('./lib/ui');
const grid		= require('./lib/ui/grid.js');
const light 	= require('./lib/ui/light.js');
const proj 		= require('./lib/ui/proj.js');
const cam 		= require('./lib/ui/cam.js');
const nav 		= require('./lib/ui/nav.js');
const seq 		= require('./lib/ui/seq.js');
const cmd 		= require('./lib/ui/cmd.js');
const devices 	= require('./lib/ui/devices.js');
const mse 		= require('./lib/ui/mscript.js');
const Mscript 	= require('./lib/mscript');
let log;


/******
	State shared by ALL interfaces
*******/
mcopy.state = {
	version : PACKAGE.version, //use for file compatibility check
	sequence : {
		pads: {
			//gaaaaaaaaah
			cam_forward: 'CF',
			proj_forward : 'PF',
			black_forward : 'BF',

			cam_backward: 'CB',
			proj_backward : 'PB',
			black_backward : 'BB',

			light_set : 'L',

			cam2_forward : 'C2F',
			cam2_backward : 'C2B',

			cams_forward : 'CCF',
			cams_forward : 'CCB',

			cam_forward_cam2_backward : 'CFCB',
			cam_backward_cam2_forward : 'CBCF',

			proj2_forward : 'P2F',
			proj2_backward : 'P2B',

			projs_forward : 'PPF',
			projs_backward : 'PPB',

			proj_forward_proj2_backward : 'PFPB',
			proj_backward_proj2_forward : 'PBPF'

		}
	}
};
//

async function init () {
	'use strict';

	log = await require('log')({})

	nav.init();
	grid.init();
	mse.mscript.init();
	mse.console.init();

	devices.init();
	light.init();
	proj.init();
	cam.init();
	seq.init();
};
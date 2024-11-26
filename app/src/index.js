const mcopy = {};

const remote = require('@electron/remote');
const { ipcRenderer } = require('electron');
const { dialog } = remote;
const notifier 	= require('node-notifier');
const fs 		= require('fs');
const uuid 		= require('uuid').v4;
const moment 	= require('moment');
const path 		= require('path');
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
const filmout 	= require('./lib/ui/filmout.js');
const mse 		= require('./lib/ui/mscript.js');
const capper    = require('./lib/ui/capper.js');
const timing    = require('./lib/ui/timing.js');
const Mscript 	= require('./lib/mscript');
const { delay }	= require('./lib/delay');
const alertObj  = require('./lib/ui/alert.js');
const gamecontroller       = require('./lib/ui/gamecontroller.js');
const { Log }   = require('./lib/log');

let log;

/******
	State shared by ALL interfaces
*******/
mcopy.state = {
	version : PACKAGE.version //use for file compatibility check
};
//

async function init () {
	'use strict';

	log = await Log({ label : 'ui' })

	nav.init();
	gui.init();
	grid.init();
	mse.mscript.init();
	mse.console.init();

	devices.init();
	filmout.init();
	light.init();
	proj.init();
	cam.init();
	seq.init();
	capper.init();
	alertObj.init();
	timing.init();
	gamecontroller.init(seq, cmd, cam, proj);
};
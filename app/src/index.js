const mcopy = {};

const { remote, ipcRenderer } = require('electron');
const dialog 	= require('electron').remote.dialog;
const notifier 	= require('node-notifier');
const fs 		= require('fs');
const uuid 		= require('uuid').v4;
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
const filmout 	= require('./lib/ui/filmout.js');
const mse 		= require('./lib/ui/mscript.js');
const Mscript 	= require('./lib/mscript');
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

	log = await require('log')({})

	nav.init();
	grid.init();
	mse.mscript.init();
	mse.console.init();

	devices.init();
	//filmout.init();
	light.init();
	proj.init();
	cam.init();
	seq.init();
};
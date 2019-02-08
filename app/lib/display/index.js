'use strict';

const path = require('path');
const { BrowserWindow } = require('electron');

const exec = require('exec');
const spawn = require('spawn');
const delay = require('delay');

let wv;
let cp;
let system = {};
let digitalWindow;

let TMPDIR;

class WebView {
	constructor() {

	}
	async open () {
		digitalWindow = new BrowserWindow({
			webPreferences: {
      			nodeIntegration: true,
      			allowRunningInsecureContent: false,
      			'unsafe-eval' : false
    		},
			width: 800, 
			height: 600,
			minWidth : 800,
			minHeight : 600//,
			//icon: path.join(__dirname, '../../assets/icons/icon.png')
		});
		digitalWindow.loadURL('file://' + __dirname + '../../../display.html');
		if (process.argv.indexOf('-d') !== -1 || process.argv.indexOf('--dev') !== -1) {
			digitalWindow.webContents.openDevTools();
		}
		digitalWindow.on('closed', () => {
			digitalWindow = null
		});
	}
	async fullScreen () {
		return digitalWindow.setFullScreen(true);
	}
	async setImage (src) {
		return digitalWindow.webContents.send('display', { src });
	}
	async setMeter () {
		return digitalWindow.webContents.send('display', { meter : true });
	}
	async setGrid () {
		return digitalWindow.webContents.send('display', { grid : true });
	}
	async close () {
		if (digitalWindow) {
			digitalWindow.close();
		}
		return true
	}
	async move () {

	}
}

function padded_frame (i) {
	let len = (i + '').length;
	let str = i + '';
	for (let x = 0; x < 5 - len; x++) {
		str = '0' + str;
	}
	return str;
}

async function display_eog (src) {
	//timeout 3 eog --fullscreen ${src}
	cp = spawn('eog', ['--fullscreen', src]);
}


async function display_wv (src) {
	await wv.open();
	await wv.fullScreen();
	await delay(200);
	await wv.setImage(src);
}

async function end () {
	if (system.platform !== 'nix') {
		await wv.close();
	} else {
		cp.kill()
	}
}

async function start (frame) {
	let padded = padded_frame(frame);
	let ext = 'tif';
	let tmppath;

	if (system.platform !== 'nix') {
		ext = 'png';
	}

	tmppath = path.join(TMPDIR, `export-${padded}.${ext}`);

	if (system.platform !== 'nix') {
		display_wv(tmppath);
	} else {
		display_eog(tmppath);
	}
}

module.exports = function (sys) {
	system = sys;
	TMPDIR = path.join(system.tmp, 'intval_go_node');

	if (system.platform !== 'nix') {
		wv = new WebView();
	} else {
		//child process
	}
	
	return {
		start,
		end
	}
}
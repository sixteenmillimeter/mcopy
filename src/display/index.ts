'use strict';

/**
 * @module display
 * Provides features for displaying a full screen display of images for the digital module.
 **/

import spawn = require('spawn');
import { join as pathJoin } from 'path';
import { delay } from 'delay';
import { exec } from 'exec';

const { BrowserWindow } = require('electron');

function padded_frame (i : number) {
	let len = (i + '').length;
	let str = i + '';
	for (let x = 0; x < 5 - len; x++) {
		str = '0' + str;
	}
	return str;
}

class WebView {
	private digitalWindow : any;
	public opened : boolean = false;
	public showing : boolean = false;
	private platform : string;
	public display : any;

	constructor (platform : string, display : any) {
		const prefs : any = {
			webPreferences: {
      			nodeIntegration: true,
      			allowRunningInsecureContent: false
    		},
			width: 800, 
			height: 600,
			minWidth : 800,
			minHeight : 600//,
			//icon: path.join(__dirname, '../../assets/icons/icon.png')
		}
		if (!display.primary) {
			prefs.x = display.x + 50;
			prefs.y = display.y + 50;
		}
		this.digitalWindow = new BrowserWindow(prefs);
		this.digitalWindow.loadURL('file://' + __dirname + '../../../display.html');
		if (process.argv.indexOf('-d') !== -1 || process.argv.indexOf('--dev') !== -1) {
			this.digitalWindow.webContents.openDevTools();
		}
		this.digitalWindow.on('closed', () => {
			this.digitalWindow = null;
			this.close();
		});
		//this.digitalWindow.hide();
		this.platform = platform;
		this.display = display;
	}
	async open () {
		this.digitalWindow.show();
		this.showing = true;
		this.opened = true;
		await this.digitalWindow.setFullScreen(true);
		await delay(300);
		if (this.platform === 'osx') {
			await delay(300); //give macs an extra 300ms to open fullscreen
		}
	}
	async show (src : string) {
		if (!this.digitalWindow) {
			console.warn(`Cannot show "${src}" because window does not exist`);
			return false;
		}
		try {
			this.digitalWindow.webContents.send('display', { src });
		} catch (err) {
			console.error(err);
		}
		this.showing = true;
		await delay(200);
		return true;
	}
	async focus () {
		if (!this.digitalWindow) {
			console.warn(`Cannot show focus screen because window does not exist`);
			return false;
		}
		await delay(500);
		try {
			this.digitalWindow.webContents.send('focus', { focus : true });
		} catch (err) {
			console.error(err);
		}
	}
	async field () {
		if (!this.digitalWindow) {
			console.warn(`Cannot show field guide because window does not exist`);
			return false;
		}
		await delay(500);
		try {
			this.digitalWindow.webContents.send('field', { field : true });
		} catch (err) {
			console.error(err);
		}
	}
	async meter () {
		if (!this.digitalWindow) {
			console.warn(`Cannot show meter screen because window does not exist`);
			return false;
		}
		await delay(500);
		try {
			this.digitalWindow.webContents.send('meter', { meter : true });
		} catch (err) {
			console.error(err);
		}
	}
	hide () {
		if (this.digitalWindow) {
			this.digitalWindow.hide();
		}
		this.showing = false;
		return true;
	}
	close () {
		this.hide();
		if (this.digitalWindow) {
			this.digitalWindow.close();
			this.digitalWindow = null;
		}
		this.opened = false;
		this.showing = false;
		return true
	}
}

class EOG {
	private cp : any;
	constructor () {

	}

	public open () {
		this.hide();
	}

	public async show (src :  string) {
		//timeout 3 eog --fullscreen ${src}
		this.cp = spawn('eog', ['--fullscreen', src]);
		await delay(200)
		return true
	}

	public hide () {
		if (this.cp) {
			this.cp.kill();
			this.cp = null;
		}
	}
	public close () {
		this.hide();
	}
} 

class Display {
	private platform : string;
	private displays : any[];
	private display : any;
	private tmpdir : string;
	private wv : WebView;
	private eog : EOG;

	constructor (sys : any) {
		this.platform = sys.platform;
		this.displays = sys.displays;
		this.tmpdir = pathJoin(sys.tmp, 'mcopy_digital');
		this.display = this.displays.find((display : any) => {
			if (display.primary) return true;
		})
	}
	public async open () {
		if (this.wv && this.wv.display && this.wv.display.id !== this.display.id) {
			this.wv.close();
		}
		if (!this.wv || !this.wv.opened) {
			this.wv = new WebView(this.platform, this.display);
			await this.wv.open();
		}
	}
	public async show (frame : number) {
		let padded : string = padded_frame(frame);
		let ext : string = 'png';
		let tmppath : string;

		tmppath = pathJoin(this.tmpdir, `export-${padded}.${ext}`);

		await this.wv.show(tmppath);
	}
	public async showPath (pathStr : string) {
		return await this.wv.show(pathStr);
	}
	public hide () {

	}
	public async close () {
		return await this.wv.close()
	}
	public async focus () {
		return await this.wv.focus();
	}
	public async field () {
		return await this.wv.field();
	}
	public async meter () {
		return await this.wv.meter();
	}
	public change (id : any) {
		this.display = this.displays.find((display : any) => {
			if (display.id == id) return true;
		});
	}
}

module.exports = function (sys : any) {
	return new Display(sys)
}
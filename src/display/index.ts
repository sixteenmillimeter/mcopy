'use strict';

/**
 * @module display
 * Provides features for displaying a full screen display of images for the digital module.
 **/

import { join as pathJoin, normalize as pathNormalize } from 'path';
import { format as urlFormat } from 'url';
import { delay } from 'delay';
import { Log } from 'log';
import type { Logger } from 'winston';
import { BrowserWindow } from 'electron';

class WebView {
	private digitalWindow : any;
	public opened : boolean = false;
	public showing : boolean = false;
	private platform : string;
	public display : any; //needs type
	private loadWait : any = {};
	private ipc : any;
	private log : Logger;

	constructor (platform : string, display : any) {
		const prefs : any = {
			webPreferences: {
      			nodeIntegration: true,
      			allowRunningInsecureContent: false,
      			enableRemoteModule: true,
      			contextIsolation: false
    		},
			width: 800, 
			height: 600,
			minWidth : 800,
			minHeight : 600//,
			//icon: path.join(__dirname, '../../assets/icons/icon.png')
		}
		const pagePath : string = pathNormalize(pathJoin(__dirname, '../../display.html'))
		const pageUrl  : string = urlFormat({
			pathname : pagePath,
			protocol : 'file:'
		});

		this.init();
		if (!display.primary) {
			prefs.x = display.x + 50;
			prefs.y = display.y + 50;
		}
		this.digitalWindow = new BrowserWindow(prefs);
		require('@electron/remote/main').enable(this.digitalWindow.webContents)
		this.digitalWindow.loadURL(pageUrl);
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

		this.ipc = require('electron').ipcMain;

		this.ipc.on('display_load', this.onLoad.bind(this));
	}
	async init () {
		this.log = await Log({ label : 'devices' })
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
		const normalSrc : string =  pathNormalize(pathJoin(src));
		if (!this.digitalWindow) {
			this.log.warn(`Cannot show "${src}" because window does not exist`)
			return false;
		}
		try {
			this.digitalWindow.webContents.send('display', { src : normalSrc });
		} catch (err) {
			this.log.error(err);
		}
		this.showing = true;

		return new Promise(function (resolve : Function) {
			this.loadWait[src] = resolve;
		}.bind(this));
	}

	onLoad (evt : Event, arg : any) {
		if (this.loadWait[arg.src]) {
			this.loadWait[arg.src]();
			delete this.loadWait[arg.src];
		}
	}
	async focus () {
		if (!this.digitalWindow) {
			this.log.warn(`Cannot show focus screen because window does not exist`);
			return false;
		}
		await delay(500);
		try {
			this.digitalWindow.webContents.send('focus', { focus : true });
		} catch (err) {
			this.log.error(err);
		}
	}
	async field (ratio : number) {
		if (!this.digitalWindow) {
			this.log.warn(`Cannot show field guide because window does not exist`);
			return false;
		}
		await delay(500);
		try {
			this.digitalWindow.webContents.send('field', { field : true, ratio });
		} catch (err) {
			this.log.error(err);
		}
	}
	async meter () {
		if (!this.digitalWindow) {
			this.log.warn(`Cannot show meter screen because window does not exist`);
			return false;
		}
		await delay(500);
		try {
			this.digitalWindow.webContents.send('meter', { meter : true });
		} catch (err) {
			this.log.error(err);
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

export class Display {
	private platform : string;
	private displays : any[];
	private display : any;
	private tmpdir : string;
	private wv : WebView;

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
	public async show (src : string) {
		await this.wv.show(src);
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
	public async field ( ratio : number) {
		return await this.wv.field(ratio);
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
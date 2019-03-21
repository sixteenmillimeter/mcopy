'use strict';

import delay = require('delay');
import Log = require('log');

class Digital {
	public state : any = {
		frame : 0,
		frames : 0,
		path : null,
		fileName : null,
		info : {},
		dir : true,
		enabled : false
	};
	private display : any;
	private ffmpeg : any;
	private ffprobe : any;
	private light : any;
	private ipc : any;
	private ui : any;
	private log : any;
	/**
	 *
	 **/
	constructor (display : any, ffmpeg : any, ffprobe : any, ui : any, light : any) {
		this.display = display;
		this.ffmpeg = ffmpeg;
		this.ffprobe = ffprobe;
		this.ui = ui;
		this.light = light;
		this.init();
	}
	/**
	 *
	 **/
	private async init () {
		this.log = await Log({ label : 'digital'});
		this.ipc = require('electron').ipcMain;
		this.listen();
	}
	/**
	 *
	 **/
	 private listen () {
	 	this.ipc.on('digital', this.connectDigital.bind(this));
	 }
	/**
	 *
	 **/
	public set (dir : boolean) {
		this.state.dir = dir;
	}
	/**
	 *
	 **/
	public async move () {
		let start : number = +new Date();
		if (this.state.dir) {
			this.state.frame++;
		} else {
			this.state.frame--;
		}
		if (this.state.frame < 1) {
			this.state.frame = 1;
		}
		return (+new Date()) - start;
	}
	 /**
	 *
	 **/
	async start () {
		try {
			await this.ffmpeg.clearAll();
		} catch (err) {
			console.error(err);
			throw err;
		}
		
		try {
			await this.ffmpeg.frame(this.state, this.light.state);
		} catch (err) {
			console.error(err);
			throw err;
		}

		this.display.start(this.state.frame);
		await delay(20);
	}
	 /**
	 *
	 **/
	private async end () {
		await delay(20);
		this.display.end();
	}
	/**
	 * Use a file as the "digital" source on "projector"
	 *
	 **/
	async connectDigital (evt : any, arg : any) {
		let info;
		let frames = 0;

		try {
			info = await this.ffprobe.info(arg.path);
		} catch (err) {
			//this.log.error(err, 'DIGITAL', true, true);
			this.state.enabled = false;
			await this.ui.send('digital', { valid : false });
			return false;
		}
		try {
			frames = await this.ffprobe.frames(arg.path);
		} catch (err) {
			this.log.error(err, 'DIGITAL', true, true);
			this.state.enabled = false;
			await this.ui.send('digital', { valid : false });
			return false;
		}

		this.state.frame = 0;
		this.state.path = arg.path;
		this.state.fileName = arg.fileName;
		this.state.frames = frames;
		this.state.info = info;

		this.log.info(`Opened ${this.state.fileName}`, 'DIGITAL', true, true);
		this.log.info(`Frames : ${frames}`, 'DIGITAL', true, true);
		this.state.enabled = true;
		return await this.ui.send('digital', { valid : true, state : JSON.stringify(this.state) });
	}
}

module.exports = (display : any, ffmpeg : any, ffprobe : any, ui : any, light : any) => {
	return new Digital(display, ffmpeg, ffprobe, ui, light);
}
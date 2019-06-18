'use strict';

import { delay } from 'delay';

class FilmOut {
	private id : string = 'filmout';
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
		const Log = require('log');
		this.log = await Log({ label : this.id });
		this.ipc = require('electron').ipcMain;
		this.listen();
	}
	/**
	 *
	 **/
	 private listen () {
	 	this.ipc.on(this.id, this.onConnect.bind(this));
	 	this.ipc.on('focus', this.focus.bind(this));
	 	this.ipc.on('field', this.field.bind(this));
	 	this.ipc.on('meter', this.meter.bind(this));
	 	this.ipc.on('filmout_close', this.close.bind(this));
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
		await this.display.show(this.state.frame);
		await delay(20);
	}
	 /**
	 *
	 **/
	private async end () {
		await delay(20);
		this.display.hide();
	}
	/**
	 * Use a video file as a film out source on "projector"
	 *
	 **/
	async onConnect (evt : any, arg : any) {
		let info;
		let frames = 0;

		try {
			info = await this.ffprobe.info(arg.path);
		} catch (err) {
			//this.log.error(err, 'FILMOUT', true, true);
			this.state.enabled = false;
			await this.ui.send(this.id, { valid : false });
			return false;
		}
		try {
			frames = await this.ffprobe.frames(arg.path);
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
			this.state.enabled = false;
			await this.ui.send(this.id, { valid : false });
			return false;
		}

		this.state.frame = 0;
		this.state.path = arg.path;
		this.state.fileName = arg.fileName;
		this.state.frames = frames;
		this.state.info = info;

		this.log.info(`Opened ${this.state.fileName}`, 'FILMOUT', true, true);
		this.log.info(`Frames : ${frames}`, 'FILMOUT', true, true);
		this.state.enabled = true;
		return await this.ui.send(this.id, { valid : true, state : JSON.stringify(this.state) });
	}
	async focus (evt : any, arg : any) {
		try {
			await this.display.open();
			await this.display.focus();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
	}
	async field (evt : any, arg : any) {
		try {
			await this.display.open();
			await this.display.field();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
	}
	async meter (evt : any, arg : any) {
		try {
			await this.display.open();
			await this.display.meter();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
	}
	async close (evt : any, arg : any) {
		try {
			await this.display.hide();
			await this.display.close();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
	}
}

module.exports = (display : any, ffmpeg : any, ffprobe : any, ui : any, light : any) => {
	return new FilmOut(display, ffmpeg, ffprobe, ui, light);
}

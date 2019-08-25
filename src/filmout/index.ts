'use strict';

import sharp from 'sharp';
import { default as  animated } from 'animated-gif-detector';
import { extname } from 'path';
import { readFile } from 'fs-extra';
import { delay } from 'delay';

/**
 * @module FilmOut
 **/

class FilmOut {
	private id : string = 'filmout';
	private videoExtensions : string[] =  ['.mpg', '.mpeg', '.mov', '.mkv', '.avi', '.mp4']; 
	private stillExtensions : string[] = ['.tif', '.tiff', '.png', '.jpg', '.jpeg', '.bmp'];
	private gifExtension : string = '.gif';
	public state : any = {
		frame : 0,
		frames : 0,
		still : false,
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
	 * @constructor
	 * Builds FilmOut class with display, ffmpeg, ffprobe, ui and light as internal properties.
	 *
	 * @param {object} display Display object for showing frames
	 * @param {object} ffmpeg  FFMPEG wrapper
	 * @param {object} ffprobe FFPROBE wrapper for file info
	 * @param {object} ui      Electron ui object
	 * @param {object} light   Light device object
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
	 * Async function for requiring log, ipcMain and bind events.
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
	 	this.ipc.on('preview', this.preview.bind(this));
	 	this.ipc.on('preview_frame', this.previewFrame.bind(this));
	 	this.ipc.on('display', this.onDisplay.bind(this));
	 }
	/**
	 * Sets filmout direction.
	 *
	 * @param {boolean} dir  Direction of filmout
	 **/
	public set (dir : boolean) {
		this.state.dir = dir;
	}
	/**
	 * Moves filmout a frame at a time.
	 **/
	public async move () {
		let start : number = +new Date();
		if (this.state.still) {
			return false;
		}
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
	 * Begin the process of exporting single frames from the video for display.
	 **/
	async start () {
		try {
			await this.ffmpeg.clearAll();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
			throw err;
		}
		
		try {
			await this.ffmpeg.frame(this.state, this.light.state);
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
			throw err;
		}
		await this.display.show(this.state.frame);
		await delay(20);
	}
	/**
	 * Ends the filmout process and closes the display.
	 **/
	private async end () {
		await delay(20);
		this.display.hide();
	}
	/**
	 * Use a video file as a film out source on "projector"
	 *
	 * @param {object} evt Original connect event
	 * @param {object} arg Arguments from ipc message
	 **/
	async onConnect (evt : any, arg : any) {
		let frames : number = 0;
		let isAnimated : boolean = false;
		let info : any;
		let ext : string;

		ext = extname(arg.fileName.toLowerCase());

		//console.dir(arg)
		//console.log(ext)

		if (ext === this.gifExtension) {
			try {
				isAnimated = await this.isGifAnimated(arg.path);
			} catch (err) {
				this.log.error(err, 'FILMOUT', true, true);
				await this.ui.send(this.id, { valid : false });
				return false;
			}
			this.state.still = !isAnimated;
		} else if (this.stillExtensions.indexOf(ext) !== -1) {
			this.state.still = true;
		} else if (this.videoExtensions.indexOf(ext) !== -1) {
			this.state.still = false;
		} else {
			this.log.error(`File is not of a valid file type`, 'FILMOUT', true, true);
			return false;
		}

		if (this.state.still) {
			try {
				info = await this.stillInfo(arg.path);
			} catch (err) {
				this.log.error(err, 'FILMOUT', true, true);
				this.state.enabled = false;
				await this.ui.send(this.id, { valid : false });
				return false;
			}
			frames = 1;
		} else {
			try {
				info = await this.ffprobe.info(arg.path);
			} catch (err) {
				this.log.error(err, 'FILMOUT', true, true);
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
		}
		//console.dir(info)
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
	/**
	 * Return true if gif is animated, false if it is a still
	 *
	 * @param {string} pathStr Path to gif to check
	 *
	 * @returns {boolean} Whether or not gif is animated
	 **/
	async isGifAnimated (pathStr : string) {
		let gifBuffer : Buffer;
		try {
			gifBuffer = await readFile(pathStr);
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
			return false;
		}
		return animated(gifBuffer);
	}
	/**
	 * Return information on a still image using the sharp module
	 *
	 * @param {string} pathStr Path to gif to check
	 *
	 * @returns {object} Info about still from sharp
	 **/
	async stillInfo (pathStr : string) {
		return sharp(pathStr).metadata();
	}
	/**
	 * Preview a frame from the selected video.
	 *
	 * @param {object} evt Original event
	 * @param {object} arg Arguments from message
	 **/
	async previewFrame (evt : any, arg : any) {
		const state : any = JSON.parse(JSON.stringify(this.state));
		let path : string;

		state.frame = arg.frame;

		try {
			path = await this.ffmpeg.frame(state, { color : [255, 255, 255] });
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);;
			throw err;
		}
		this.ui.send('preview_frame', { path, frame : arg.frame })
	}
	/**
	 * 
	 *
	 * @param {object} evt Original event
	 * @param {object} arg Arguments from message
	 **/
	async preview (evt : any, arg : any) {
		const state : any = JSON.parse(JSON.stringify(this.state));
		let path : string;

		state.frame = arg.frame;

		this.log.info(`Previewing frame ${state.frame} of ${state.fileName}`);
		try {
			path = await this.ffmpeg.frame(state, { color : [255, 255, 255] });
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
			throw err;
		}

		try {
			await this.display.open();
			await this.display.show(arg.frame);
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
	}
	/**
	 *
	 **/
	async focus (evt : any, arg : any) {
		this.log.info(`Showing focus screen`);
		try {
			await this.display.open();
			await this.display.focus();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
	}
	/**
	 *
	 **/
	async field (evt : any, arg : any) {
		this.log.info(`Showing field guide screen`);
		try {
			await this.display.open();
			await this.display.field();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
	}
	/**
	 *
	 **/
	async meter (evt : any, arg : any) {
		this.log.info(`Showing meter screen`);
		try {
			await this.display.open();
			await this.display.meter();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
	}
	/**
	 *
	 **/
	async close (evt : any, arg : any) {
		try {
			await this.display.hide();
			await this.display.close();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
	}
	/**
	 *
	 **/
	onDisplay (evt : any, arg : any) {
		this.display.change(arg.display);
		this.log.info(`Changing the display to ${arg.display}`);
	}
}

module.exports = (display : any, ffmpeg : any, ffprobe : any, ui : any, light : any) => {
	return new FilmOut(display, ffmpeg, ffprobe, ui, light);
}

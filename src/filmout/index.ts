'use strict';

import { default as  animated } from 'animated-gif-detector';
import { extname, join } from 'path';
import { readFile, lstat, readdir } from 'fs-extra';
import { delay } from 'delay';
import { createHash } from 'crypto';
import Jimp from 'jimp';
import Frame from 'frame';

/**
 * @module FilmOut
 **/

class FilmOut {
	private id : string = 'filmout';
	private videoExtensions : string[] =  ['.mpg', '.mpeg', '.mov', '.mkv', '.avi', '.mp4']; 
	private stillExtensions : string[] = ['.tif', '.tiff', '.png', '.jpg', '.jpeg', '.bmp'];
	private sequenceExtensions : string[] = ['.png', '.jpg', '.jpeg'];
	private gifExtension : string = '.gif';
	public state : any = {
		frame : 0,
		frames : 0,
		still : false,
		path : null,
		fileName : null,
		directory : false,
		info : {},
		dir : true,
		enabled : false,
		files : []
	};
	private display : any;
	private ffmpeg : any;
	private ffprobe : any;
	private light : any;
	private ipc : any;
	private ui : any;
	private log : any;
	private server : any;
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
	constructor (display : any, server : any, ffmpeg : any, ffprobe : any, ui : any, light : any) {
		this.display = display;
		this.server = server;
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
		this.ipc.on('pre_export', this.onPreExport.bind(this));

		this.ffmpeg.onProgress = (obj : any) => {
			this.ui.send('pre_export_progress', { progress: obj });
		}

	 }
	 /**
	  * Create a hash of a string.
	  * 
	  * @param {string} data Data to produce hash of
	  */
	 private hash (data : string) {
		return createHash('sha1').update(data).digest('hex');
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
	 * 
	 * @returns {number} Time since start
	 **/
	public async move () : Promise<number> {
		let start : number = +new Date();
		if (this.state.still) {
			return -1;
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
		let path;	

		try {
			path = await this.ffmpeg.frame(this.state, this.light.state);
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
			throw err;
		}

		if (this.server.displayImage(path)) {
			await delay(20)
			return
		}

		await this.display.show(path);
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
	 *
	 * @returns {boolean} Success state
	 **/
	async onConnect (evt : any, arg : any) : Promise<boolean> {
		let frames : number = 0;
		let isAnimated : boolean = false;
		let info : any;
		let ext : string;
		let stats : any;
		let frameList : string[];

		try {
			stats = await lstat(arg.path);
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
			return false;
		}

		ext = extname(arg.fileName.toLowerCase());

		if (stats.isDirectory()) {
			this.state.directory = true;
			this.state.still = false;
		} else if (ext === this.gifExtension) {
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
			this.state.directory = false;
		} else if (this.videoExtensions.indexOf(ext) !== -1) {
			this.state.still = false;
			this.state.directory = false;
		} else {
			this.log.error(`File is not of a valid file type`, 'FILMOUT', true, true);
			return false;
		}

		try {
			await this.ffmpeg.clearAll();
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
			throw err;
		}

		if (this.state.directory) {
			try {
				frameList = await this.dirList(arg.path);
			} catch (err) {
				this.log.error(err, 'FILMOUT', true, true);
				this.state.enabled = false;
				await this.ui.send(this.id, { valid : false });
				return false;
			}

			try {
				info = await this.dirInfo(frameList);
			} catch (err) {
				this.log.error(err, 'FILMOUT', true, true);
				this.state.enabled = false;
				await this.ui.send(this.id, { valid : false });
				return false;
			}
			frames = frameList.length;
			this.state.files = frameList;
		} else if (this.state.still) {
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

		this.state.frame = 0;
		this.state.path = arg.path;
		this.state.fileName = arg.fileName;
		this.state.frames = frames;
		this.state.info = info;
		this.state.hash = this.hash(arg.path);

		if (info.fps) {
			this.state.fps = info.fps;
		} else {
			this.state.fps = 24; //default
		}

		if (info.seconds) {
			this.state.seconds = info.seconds;
		} else if (info.fps && frames) {
			this.state.seconds = frames / info.fps;
		} else if (this.state.directory) {
			this.state.seconds = frames / 24;
		}

		this.log.info(`Opened ${this.state.fileName}`, 'FILMOUT', true, true);
		this.log.info(`Frames : ${frames}`, 'FILMOUT', true, true);
		this.state.enabled = true;
		await this.ui.send(this.id, { valid : true, state : JSON.stringify(this.state) });
		return true;
	}

	/**
	 * Pre-export all frames from video for display.
	 * 
	 * @param {object} evt IPC event
	 * @param {object} arg IPC args
	 *
	 * @returns {any} UI send call
	 */
	async onPreExport (evt : Event, arg : any) : Promise<any> {
		if (!this.state.path) {
			return await this.ui.send('pre_export', { complete : false, err : 'No file to pre export.' });
		}

		try {
			await this.ffmpeg.frames(this.state);
		} catch (err) {
			return await this.ui.send('pre_export', { complete : false, err });
		}

		return await this.ui.send('pre_export', { complete : true });
	}

	/**
	 * Return true if gif is animated, false if it is a still
	 *
	 * @param {string} pathStr Path to gif to check
	 *
	 * @returns {boolean} Whether or not gif is animated
	 **/
	async isGifAnimated (pathStr : string) : Promise<boolean> {
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
	 * Return information on a still image using the Jimp module
	 *
	 * @param {string} pathStr Path to gif to check
	 *
	 * @returns {object} Info about still from sharp
	 **/
	async stillInfo (pathStr : string) : Promise<any> {
		let info : any;

		try {
			info = await Frame.info(pathStr);
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}
		
		return info;
	}

	/**
	 * Return information on the first still image found in a
	 * directory using the Jimp module.
	 *
	 * @param {array} images List of image paths
	 *
	 * @returns {object} Info about first image
	 **/
	async dirInfo (images : string[]) : Promise<any> {
		let info : any;

		try {
			info = await this.stillInfo(images[0]);
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}

		return info;
	}

	/**
	 * Returns a list of images within a directory, filtered
	 * for supported types and sorted.
	 *
	 * @param {string} pathStr Path to directory
	 *
	 * @returns {array} Array of image paths
	 **/
	async dirList (pathStr : string) : Promise<string[]> {
		let frameList : string[] = [];
		try {
			frameList = await readdir(pathStr)
		} catch (err) {
			this.log.error(err, 'FILMOUT', true, true);
		}

		frameList = frameList.filter((fileName : string) => {
			let ext : string = extname(fileName);
			if (this.sequenceExtensions.indexOf(ext) !== -1) {
				return true;
			}
			return false;
		});

		frameList.sort();

		frameList = frameList.map((fileName : string) => {
			return join(pathStr, fileName);
		});

		return frameList;
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
			this.log.error(err, 'FILMOUT', true, true);
			throw err;
		}

		this.ui.send('preview_frame', { path, frame : arg.frame })
	}
	/**
	 * Open a single frame in a display window to preview filmout.
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
			if (await this.server.displayImage(path)) {
				return
			}
			await this.display.open();
			await this.display.show(path);
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
			if (await this.server.cmdAll('focus')) {
				return
			}
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
		const ratio : number = arg.ratio;
		this.log.info(`Showing field guide screen`);
		try {
			if (await this.server.cmdAll('field', { ratio })) {
				return
			}
			await this.display.open();
			await this.display.field(ratio);
			
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
			if (await this.server.cmdAll('meter')) {
				return
			}
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
			if (await this.server.cmdAll('blank')) {
				return
			}
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

module.exports = (display : any, server : any, ffmpeg : any, ffprobe : any, ui : any, light : any) => {
	return new FilmOut(display, server, ffmpeg, ffprobe, ui, light);
}

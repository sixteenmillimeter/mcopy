'use strict';

/** @module ffmpeg **/

import { join } from 'path';
import { exists, mkdir, readdir, unlink } from 'fs-extra';
import { exec } from 'exec';

interface FilmoutState {
	frame : number;
	path : string;
	hash : string;
	info : any;
}

/** @class FFMPEG **/

class FFMPEG {
	private bin : string;
	private convert : string;
	private log : any;
	private id : string = 'ffmpeg';
	private TMPDIR : string;

	/**
	 * @constructor
	 * Creates an ffmpeg class
	 *
	 * @param {object} sys System object to be used to get temp directory
	 **/
	constructor (sys : any) {
		this.bin = sys.deps.ffmpeg;
		this.convert = sys.deps.convert;
		this.TMPDIR = join(sys.tmp, 'mcopy_digital');
		this.init();
	}
	/**
	 * Async method to call async functions from constructor
	 **/
	async init () {
		const Log = require('log');
		this.log = await Log({ label : this.id });
		await this.checkDir();
	}
	/**
	 * Add padding to a number to 5 places. Return a string.
	 *
	 * @param {integer} i Integer to pad
	 *
	 * @returns {string} Padded string
	 **/

	private padded_frame (i : number) {
		let len = (i + '').length;
		let str = i + '';
		for (let x = 0; x < 8 - len; x++) {
			str = '0' + str;
		}
		return str;
	}

	/**
	 * Render a single frame from a video or image to a png.
	 *
	 * @param {object} state State object containing file data
	 * @param {object} light Object containing color information for frame
	 *
	 * @returns {string} Path of frame
	 **/
	public async frame (state : FilmoutState, light : any) {
		const frameNum : number = state.frame;
		const video : string = state.path;
		const w : number = state.info.width;
		const h : number = state.info.height;
		const padded : string = this.padded_frame(frameNum);
		let ext : string = 'png';
		//let rgb : any[] = light.color;
		let tmpoutput : string;
		let cmd : string;
		let output : any;
		//let cmd2 : string;
		//let output2 : any;
		let fileExists = false;

		let scale : string = '';
		if (w && h) {
			scale = `,scale=${w}:${h}`;
		}

		tmpoutput = join(this.TMPDIR, `${state.hash}-export-${padded}.${ext}`);

		try {
			fileExists = await exists(tmpoutput);
		} catch (err) {
			//
		}

		if (fileExists) {
			this.log.info(`File ${tmpoutput} exists`);
			return tmpoutput;
		}

		//rgb = rgb.map((e : string) => {
		//	return parseInt(e);
		//});
		
		//
		cmd = `${this.bin} -y -i "${video}" -vf "select='gte(n\\,${frameNum})'${scale}" -vframes 1 -compression_algo raw -pix_fmt rgb24 -crf 0 "${tmpoutput}"`;
		//cmd2 = `${this.convert} "${tmpoutput}" -resize ${w}x${h} -size ${w}x${h} xc:"rgb(${rgb[0]},${rgb[1]},${rgb[2]})" +swap -compose Darken -composite "${tmpoutput}"`;

		//ffmpeg -i "${video}" -ss 00:00:07.000 -vframes 1 "export-${time}.jpg"
		//ffmpeg -i "${video}" -compression_algo raw -pix_fmt rgb24 "export-%05d.tiff"
		//-vf "select=gte(n\,${frame})" -compression_algo raw -pix_fmt rgb24 "export-${padded}.png"

		try {
			this.log.info(cmd);
			output = await exec(cmd);
		} catch (err) {
			this.log.error(err);
		}
		if (output && output.stdout) this.log.info(`"${output.stdout}"`);

		/*if (this.convert && (rgb[0] !== 255 || rgb[1] !== 255 || rgb[2] !== 255)) {
			try {
				this.log.info(cmd2);
				output2 = await exec(cmd2);
			} catch (err) {
				this.log.error(err);
			}
		}
		
		if (output2 && output2.stdout) this.log.info(`"${output2.stdout}"`);*/
		return tmpoutput;
	}

	/**
	 * Render all frames in a video to the temp directory.
	 * Not in use.
	 *
	 * @param {string} video Path to video
	 * @param {object} obj Not sure
	 *
	 * @returns {?}
	 **/
	public async frames (state : FilmoutState) {
		const video : string = state.path;
		const w : number = state.info.width;
		const h : number = state.info.height;
		const tmppath : string = this.TMPDIR;
		let ext : string = 'png';
		let tmpoutput : string = join(tmppath, `${state.hash}-export-%08d.${ext}`);
		let cmd : string;
		let output : any;
		let scale : string = '';

		if (w && h) {
			scale = `scale=${w}:${h}`;
		}
		
		cmd = `${this.bin} -y -i "${video}" -vf "${scale}" -compression_algo raw -pix_fmt rgb24 -crf 0 "${tmpoutput}"`;

		try {
			await mkdir(tmppath);
		} catch (err) {
			this.log.error(err);
		}

		//ffmpeg -i "${video}" -compression_algo raw -pix_fmt rgb24 "${tmpoutput}"

		try {
			this.log.info(cmd);
			output = await exec(cmd);
		} catch (err) {
			this.log.error(err);
			throw err;
		}
		
		return true;
	}

	/**
	 * Clears a specific frame from the tmp directory
	 *
	 * @param {integer} frame Integer of frame to clear
	 * 
	 * @returns {boolean} True if successful, false if not
	 **/
	public async clear (state : any) {
		const padded : string = this.padded_frame(state.frame);
		let ext : string = 'png';
		let tmppath : string;
		let fileExists : boolean;

		tmppath = join(this.TMPDIR, `${state.hash}-export-${padded}.${ext}`);

		try {
			fileExists = await exists(tmppath);
		} catch (err) {
			this.log.error(err);
		}

		if (!fileExists) return false;

		try {
			await unlink(tmppath);
			this.log.info(`Cleared frame ${tmppath}`);
		} catch (err) {
			this.log.error(err);
		}

		return true;
	}

	/**
	 * Deletes all frames in temp directory.
	 *
	 **/
	public async clearAll () {
		const tmppath : string = this.TMPDIR;
		let files : any;
		try {
			files = await readdir(tmppath);
		} catch (err) {
			this.log.error(err);
		}
		files = files.filter((file : string) => {
			if (file.indexOf('-export-') !== -1) {
				return true;
			}
			return false;
		});
		if (files) {
			files.forEach(async (file : string, index : any) => {
				try {
					await unlink(join(tmppath, file));
				} catch (err) {
					this.log.error(err);
				}
			});
		}
	}

	/**
	 * Checks if mcopy temp directory exists. If it doesn't,
	 * creates it.
	 **/
	private async checkDir () {
		let fileExists : boolean;
		try {
			fileExists = await exists(this.TMPDIR);
		} catch (err) {
			this.log.error('Error checking for tmp dir', err);
		}

		if (!fileExists) {
			try {
				await mkdir(this.TMPDIR);
				this.log.info(`Created tmpdir ${this.TMPDIR}`);
			} catch (err) {
				this.log.error('Error creating tmp dir', err);
			}
		}
		try {
			await this.clearAll();
		} catch (err) {
			this.log.error(err);
		}
	}
}


module.exports = (sys : any) => {
	return new FFMPEG(sys);
}
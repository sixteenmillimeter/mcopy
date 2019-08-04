'use strict';

import uuid from 'uuid/v4';
import { join } from 'path';
import { exists, mkdir, readdir, unlink } from 'fs-extra';
import { exec } from 'exec';
//const spawn = require('spawn');
import { exit } from 'exit';

let system : any = {};
let TMPDIR : string;

function padded_frame (i : number) {
	let len = (i + '').length;
	let str = i + '';
	for (let x = 0; x < 5 - len; x++) {
		str = '0' + str;
	}
	return str;
}

async function frame (state : any, light : any) {
	const frameNum : number = state.frame
	const video : string = state.path
	const w : number = state.info.width
	const h : number = state.info.height
	const padded : string = padded_frame(frameNum)
	let ext : string = 'tif'
	let rgb : any[] = light.color;
	let tmpoutput : string;
	let cmd : string;
	let output : any;
	let cmd2 : string;
	let output2 : any;

	let scale : string = '';
	if (w && h) {
		scale = `,scale=${w}:${h}`;
	}

	//console.dir(state)

	//if (system.platform !== 'nix') {
		ext = 'png';
	//}

	tmpoutput = join(TMPDIR, `export-${padded}.${ext}`);

	rgb = rgb.map((e : string) => {
		return parseInt(e);
	});
//
	cmd = `ffmpeg -y -i "${video}" -vf "select='gte(n\\,${frameNum})'${scale}" -vframes 1 -compression_algo raw -pix_fmt rgb24 "${tmpoutput}"`;
	cmd2 = `convert "${tmpoutput}" -resize ${w}x${h} -size ${w}x${h} xc:"rgb(${rgb[0]},${rgb[1]},${rgb[2]})" +swap -compose Darken -composite "${tmpoutput}"`;

	//ffmpeg -i "${video}" -ss 00:00:07.000 -vframes 1 "export-${time}.jpg"
	//ffmpeg -i "${video}" -compression_algo raw -pix_fmt rgb24 "export-%05d.tiff"
	//-vf "select=gte(n\,${frame})" -compression_algo raw -pix_fmt rgb24 "export-${padded}.png"

	try {
		console.log(cmd);
		output = await exec(cmd);
	} catch (err) {
		console.error(err);
	}
	if (output && output.stdout) console.log(`"${output.stdout}"`);

	if (rgb[0] !== 255 || rgb[1] !== 255 || rgb[2] !== 255) {
		try {
			console.log(cmd2);
			output2 = await exec(cmd2);
		} catch (err) {
			console.error(err);
		}
	}
	
	if (output2 && output2.stdout) console.log(`"${output2.stdout}"`);
	return tmpoutput
}

async function frames (video : string, obj : any) {
	let tmppath = TMPDIR;
	let ext = 'tif';
	let tmpoutput;

	//if (system.platform !== 'nix') {
		ext = 'png';
	//}

	tmpoutput = join(tmppath, `export-%05d.${ext}`);
	try {
		await mkdir(tmppath);
	} catch (err) {
		console.error(err);
	}

	//ffmpeg -i "${video}" -compression_algo raw -pix_fmt rgb24 "${tmpoutput}"
}

async function clear (frame : number) {
	let padded = padded_frame(frame);
	let ext = 'tif';
	let tmppath;
	let tmpoutput;
	let cmd;
	let fileExists;

	//if (system.platform !== 'nix') {
		ext = 'png';
	//}

	tmppath = join(TMPDIR, `export-${padded}.${ext}`);

	try {
		fileExists = await exists(tmppath);
	} catch (err) {
		console.error(err);
	}

	if (!exists) return false;

	try {
		await unlink(tmppath);
		console.log(`Cleared frame ${tmppath}`);
	} catch (err) {
		console.error(err);
	}

	return true;
}

async function clearAll () {
	let tmppath = TMPDIR;
	let files;
	try {
		files = await readdir(tmppath);
	} catch (err) {
		console.error(err);
	}
	if (files) {
		files.forEach(async (file : string, index : any) => {
			try {
				await unlink(join(tmppath, file));
			} catch (err) {
				console.error(err);
			}
		});
	}
}

async function checkDir () {
	let fileExists;
	try {
		fileExists = await exists(TMPDIR);
	} catch (err) {
		console.error('Error checking for tmp dir', err);
	}

	if (!fileExists) {
		try {
			await mkdir(TMPDIR);
			console.log(`Created tmpdir ${TMPDIR}`);
		} catch (err) {
			console.error('Error creating tmp dir', err);
		}
	}
	try {
		await clearAll();
	} catch (err) {
		console.error(err);
	}
}

module.exports = (sys : any) => {
	system = sys;
	TMPDIR = join(system.tmp, 'mcopy_digital');

	checkDir();

	return {
		frames,
		frame,
		clear,
		clearAll
	}
}
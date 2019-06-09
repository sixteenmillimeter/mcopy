'use strict';

import * as fs from 'fs-extra';
import * as exec from'exec';
//const spawn = require('spawn');
//const exit = require('exit');

let system = {};

async function info (video : string) {
	let cmd = `ffprobe -v quiet -print_format json -show_format -show_streams "${video}"`
	let exists;
	let raw;
	let json;
	let vid;

	try {
		exists = await fs.exists(video);
	} catch (err) {
		return exit(err, 5);
	}
	if (!exists) {
		//return exit(`File ${video} does not exist`, 6);
		console.error(new Error(`File ${video} does not exist`));
		return false
	}
	
	try {
		console.log(cmd);
		raw = await exec(cmd);
	} catch (err) {
		//return exit(err, 7);
		console.error(err);
		return false
	}

	try {
		json = JSON.parse(raw.stdout);
	} catch (err) {
		return raw.stdout;
	}

	if (json && json.streams) {
		vid = json.streams.find((stream : any) => {
			if (stream.width && stream.height) return stream;
		});
	}

	if (vid) {
		json.width = vid.width;
		json.height = vid.height;
	}

	return json;
}

async function frames (video : string) {
	let cmd = `ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 "${video}"`;
	let exists;
	let raw;
	let frames;

	try {
		exists = await fs.exists(video);
	} catch (err) {
		//return exit(err, 5);
		console.error(err);
		return false
	}
	if (!exists) {
		//return exit(`File ${video} does not exist`, 6);
		console.error(new Error(`File ${video} does not exist`));
		return false;
	}
	
	try {
		console.log(cmd);
		raw = await exec(cmd);
	} catch (err) {
		console.error(err);
		return false;
	}

	try {
		frames = parseInt(raw.stdout)
	} catch (err) {
		return raw.stdout;
	}

	return frames;
}

function map (obj : any) {
	console.dir(obj);
}

module.exports = (sys : any) => {
	system = sys;
	return {
		info,
		frames
	}
}

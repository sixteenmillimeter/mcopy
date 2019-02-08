'use strict';

const fs = require('fs-extra');

const exec = require('exec');
//const spawn = require('spawn');
const exit = require('exit');

let system = {};

async function info (video) {
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
		return exit(`File ${video} does not exist`, 6);
	}
	try {
		raw = await exec(cmd);
	} catch (err) {
		return exit(err, 7);
	}
	try {
		json = JSON.parse(raw);
	} catch (err) {
		return raw;
	}

	if (json && json.streams) {
		vid = json.streams.find(stream => {
			if (stream.width && stream.height) return stream;
		});
	}

	if (vid) {
		json.width = vid.width;
		json.height = vid.height;
	}

	return json;
}

async function frames (video) {
	let cmd = `ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 "${video}"`;
	let exists;
	let raw;
	let frames;

	try {
		exists = await fs.exists(video);
	} catch (err) {
		return exit(err, 5);
	}
	if (!exists) {
		return exit(`File ${video} does not exist`, 6);
	}

	try {
		raw = await exec(cmd);
	} catch (err) {
		console.error(err);
	}

	try {
		frames = parseInt(raw)
	} catch (err) {
		return raw;
	}

	return frames;
}

function map (obj) {
	console.dir(obj);
}

module.exports = (sys) => {
	system = sys;
	return {
		info,
		frames
	}
}

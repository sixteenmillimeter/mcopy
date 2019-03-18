'use strict';

const uuid = require('uuid').v4;
const path = require('path');
const fs = require('fs-extra');

const exec = require('exec');
//const spawn = require('spawn');
const exit = require('exit');

let system = {};
let TMPDIR;

function padded_frame (i) {
	let len = (i + '').length;
	let str = i + '';
	for (let x = 0; x < 5 - len; x++) {
		str = '0' + str;
	}
	return str;
}

async function frame (state, light) {
	let frame = state.frame
	let video = state.path
	let w = state.info.width
	let h = state.info.height
	let padded = padded_frame(frame)
	let ext = 'tif'
	let rgb = light.color;
	let tmpoutput
	let cmd
	let output
	let cmd2
	let output2

	if (system.platform !== 'nix') {
		ext = 'png'
	}

	rgb = rgb.map(e => {
		return parseInt(e);
	});

	tmpoutput = path.join(TMPDIR, `export-${padded}.${ext}`);

	cmd = `ffmpeg -y -i "${video}" -vf "select='gte(n\\,${frame})',scale=${w}:${h}" -vframes 1 -compression_algo raw -pix_fmt rgb24 "${tmpoutput}"`;
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
}

async function frames (video, obj) {
	let tmppath = TMPDIR;
	let ext = 'tif';
	let tmpoutput;

	if (system.platform !== 'nix') {
		ext = 'png';
	}

	tmpoutput = path.join(tmppath, `export-%05d.${ext}`);
	try {
		await fs.mkdir(tmppath)
	} catch (Err) {
		console.error(err);
	}

	//ffmpeg -i "${video}" -compression_algo raw -pix_fmt rgb24 "${tmpoutput}"
}

async function clear (frame) {
	let padded = padded_frame(frame);
	let ext = 'tif';
	let tmppath;
	let tmpoutput;
	let cmd;
	let exists;

	if (system.platform !== 'nix') {
		ext = 'png';
	}

	tmppath = path.join(TMPDIR, `export-${padded}.${ext}`);

	try {
		exists = await fs.exists(tmppath);
	} catch (err) {
		console.error(err);
	}

	if (!exists) return false;

	try {
		await fs.unlink(tmppath);
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
		files = await fs.readdir(tmppath);
	} catch (err) {
		console.error(err);
	}
	if (files) {
		files.forEach(async (file, index) => {
			try {
				await fs.unlink(path.join(tmppath, file));
			} catch (err) {
				console.error(err);
			}
		});
	}
}

async function checkDir () {
	let exists;
	try {
		exists = await fs.exists(TMPDIR);
	} catch (err) {
		console.error('Error checking for tmp dir', err);
	}

	if (!exists) {
		try {
			await fs.mkdir(TMPDIR);
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

module.exports = (sys) => {
	system = sys;
	TMPDIR = path.join(system.tmp, 'mcopy_digital');

	checkDir();

	return {
		frames,
		frame,
		clear,
		clearAll
	}
}
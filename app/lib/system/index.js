'use strict';

const os = require('os');
const electron = require('electron');

const exec = require('exec');
//const spawn = require('spawn');
//const exit = require('exit');

/**
 * Evaluates system dependencies for digital
 * projector features by executing processes with
 * --help flag. If they do not exist, log to console
 * 
 * @param {string} platform  Operating system type
 **/

async function dependencies (platform) {
	let obj = {};

	try {
		await exec('ffmpeg -h');
		obj.ffmpeg = 'ffmpeg';
	} catch (err) {
		//return exit('ffmpeg is not installed', 3);
		return console.error('ffmpeg is not installed', err);
	}
	//if linux
	if (platform === 'nix') {
		try {
			await exec('eog -h');
			obj.eog = 'eog';
		} catch (err) {
			//return exit('eog is not installed', 4);
			return console.error('eog is not installed', err);
		}
	}

	return obj;
}

/**
 * Profile the current system and return an object with
 * data about the displays and dependencies for the digital
 * projector feature.
 *
 * @returns {object} Object containing system information
 */ 
async function system () {
	const obj = {};
	let displays = electron.screen.getAllDisplays();
	let platform;

	try {
		obj.tmp = os.tmpdir();
	} catch (err) {
		obj.tmp = '/tmp'
	}

	platform = os.type();

	if (platform === 'Darwin') {
		obj.platform = 'osx';
	} else if (platform === 'Windows_NT') {
		obj.platform = 'win';
	} else {
		obj.platform = 'nix';
	}

	obj.displays = displays.map(obj => {
		return {
			width : obj.workArea.width,
			height : obj.workArea.height,
			x : obj.bounds.x,
			y : obj.bounds.y
		}
	});

	obj.deps = await dependencies(obj.platform);

	return obj;
}

module.exports = system;
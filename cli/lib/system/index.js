'use strict';

const os = require('os');
const si = require('systeminformation');
//private
const exec = require('exec');
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
 * 
 *
 * @returns {array} Array of objects containing displays and relative positions
 */ 
function getDisplays () {
	let displays = electron.screen.getAllDisplays();
	return displays.map(obj => {
		return {
			width : obj.workArea.width,
			height : obj.workArea.height,
			x : obj.bounds.x,
			y : obj.bounds.y
		}
	});

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

	obj.displays = getDisplays()
	obj.deps = await dependencies(obj.platform);

	return obj;
}

module.exports = system;
'use strict';

import { tmpdir, type } from 'os';
import { screen } from 'electron';
import type { Display as ElectronDisplay, WebContents } from 'electron';
import { exec } from 'exec';
import type { ExecOutput } from 'exec';

interface Dependencies {
	ffmpeg? : string,
	ffprobe? : string,
	eog? : string
}

interface Display {
	name : string,
	id : number,
	width : number,
	height : number,
	x : number,
	y : number,
	scale : number,
	primary : boolean
}

interface System {
	deps : Dependencies,
	displays : Display[],
	tmp : string,
	platform : string
}

/**
 * Evaluates system dependencies for digital
 * projector features by executing `which` on binary.
 * If they do not exist, log to console
 * 
 * @param {string} platform  Operating system type
 * 
 * @returns {object} Object containing path to dependency from `which`, if they exist
 **/
async function dependencies (platform : string ) : Promise<Dependencies>  {
	let obj : Dependencies = {};
	let ffmpeg : string = require('ffmpeg-static');
	let ffprobe : any = require('ffprobe-static');
	let ffoutput : ExecOutput;
	//let imoutput : ExecOutput;
	let eogoutput : ExecOutput;

	obj.ffmpeg = ffmpeg/*.replace(
	    'app.asar',
	    'app.asar.unpacked'
	);*/
	obj.ffprobe = ffprobe.path/*.replace(
	    'app.asar',
	    'app.asar.unpacked'
	);*/

	try {
		//imoutput = await exec('which convert');
	} catch (err) {
		console.error('imagemagick is not installed', err);
	}

	/*if (!imoutput || imoutput.stdout.trim() === '') {
		console.error('imagemagick is not installed');
	} else {
		obj.convert = imoutput.stdout.trim();
	}*/

	//if linux
	if (platform === 'nix') {
		try {
			eogoutput = await exec('which eog');
		} catch (err) {
			console.error('eog is not installed', err);
		}
		if (!eogoutput || eogoutput.stdout.trim() === '') {
			console.error('eog is not installed');
		} else {
			obj.eog = eogoutput.stdout.trim();
		}
	}

	return obj;
}

function displayMap (obj : ElectronDisplay) : Display{
	const sm : Display = {
		name : null,
		id : obj.id,
		width : obj.size.width,
		height : obj.size.height,
		x : obj.bounds.x,
		y : obj.bounds.y,
		scale : obj.scaleFactor,
		primary : (obj.bounds.x === 0 && obj.bounds.y === 0)
	};
	const primary : string = sm.primary ? ' (Primary)' : '' 
	sm.name = `${sm.width}x${sm.height}${primary}`;
	return sm;
}

function displaySort (a : any, b : any) : number{
	if (a.primary) {
		return -1
	} else if (b.primary) {
		return 1
	}
	return 0
}

async function displays () : Promise<Display[]> {
	const electronDisplays : ElectronDisplay[] = screen.getAllDisplays();
	const displays : Display[] = electronDisplays.map(displayMap);
	displays.sort(displaySort);
	return displays;
}

/**
 * Profile the current system and return an object with
 * data about the displays and dependencies for the digital
 * projector feature.
 *
 * @returns {object} Object containing system information
 */ 
export async function system (ui : any) : Promise<System> {
	const obj : System = {
		deps : null,
		displays : null,
		platform : null,
		tmp : null
	};
	let platform : string;

	try {
		obj.tmp = tmpdir();
	} catch (err) {
		obj.tmp = '/tmp'
	}

	platform = type();

	if (platform === 'Darwin') {
		obj.platform = 'osx';
	} else if (platform === 'Windows_NT') {
		obj.platform = 'win';
	} else {
		obj.platform = 'nix';
	}

	obj.displays = await displays()
	obj.deps = await dependencies(obj.platform);

	setTimeout(() => {
		ui.send('system', obj);
	}, 3000);

	return obj;
}

module.exports = { system };

export type { System, Display, Dependencies };
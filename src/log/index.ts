'use strict'

import { Logger, transports } from 'winston';
import { join } from 'path';
import { mkdir, exists } from 'fs-extra';
import { homedir } from 'os';

const logTime = 'MM/DD/YY-HH:mm:ss'
let transport : any

/**
 * Determine the location of the log file based on the operating system
 * and return as an absolute string from os.homedir()
 *
 * @returns {string} Path to log file
 **/
async function logFile () {
	const homeDir : string = homedir();
	const linuxDir : string = `/.config/mcopy/`;
	const macDir : string = `/Library/Logs/mcopy/`;
	const winDir : string = `/AppData/Roaming/mcopy/`;
	let logPath : string = join(homeDir, linuxDir);
	let dirExists : boolean;

	if (process.platform === 'darwin') {
		logPath = join(homeDir, macDir);
	} else if (process.platform === 'win32') {
		logPath = join(homeDir, winDir);
	}
	dirExists = await exists(logPath);
	if (!dirExists) {
		await mkdir(logPath);
	}
	return join(logPath, 'mcopy.log');
}
/**
 * Create and return the logger transport based on settings determined in
 * arguments object
 *
 * @param {object} arg  	Arguments from process
 *
 * @returns {object} Logger transport
 **/
module.exports = async function (arg : any) {
	let consoleFormat : any = {
		colorize : true
	}
	let fileFormat : any = {
		filename : await logFile(),
		json : true
	}
	if (arg && arg.quiet) {
		transport = {
			info : function () { return false },
			warn : function () { return false },
			error : function () { return false }
		}
	} else {
		if (arg && arg.label) {
			consoleFormat.label = arg.label;
			fileFormat.label = arg.label;
		}
		transport = new (Logger)({
			transports: [
				new (transports.Console)(consoleFormat),
				new (transports.File)(fileFormat)
			]
		})
	}
	return transport
}
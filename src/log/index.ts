'use strict'

const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, colorize, simple, json } = format
const path = require('path')
const fs = require('fs-extra')
const os = require('os')

const logTime = 'MM/DD/YY-HH:mm:ss'
let transport : any

/**
 * Determine the location of the log file based on the operating system
 * and return as an absolute string from os.homedir()
 *
 * @returns {string} Path to log file
 **/
async function logFile () {
	
	const homeDir : string = os.homedir();
	const linuxDir : string = `/.config/mcopy/`;
	const macDir : string = `/Library/Logs/mcopy/`;
	const winDir : string = `/AppData/Roaming/mcopy/`;
	let logPath : string = path.join(homeDir, linuxDir);
	let exists : boolean;

	if (process.platform === 'darwin') {
		logPath = path.join(homeDir, macDir);
	} else if (process.platform === 'win32') {
		logPath = path.join(homeDir, winDir);
	}
	exists = await fs.exists(logPath);
	if (!exists) {
		await fs.mkdir(logPath);
	}
	return path.join(logPath, 'mcopy.log');
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
	let format;
	if (arg && arg.quiet) {
		transport = {
			info : function () {},
			warn : function () {},
			error : function () {}
		}
	} else {
		if (arg && arg.label) {
			format = combine(
				label({ label : arg.label }),
				//timestamp(),
				colorize(),
				simple()
			);
		} else {
			format = combine(
				//timestamp(),
				colorize(),
				simple()
			);
		}
		transport = createLogger({
			transports: [
				new (transports.Console)({
					format
				}),
				new (transports.File)({ 
					filename: await logFile(),
					format : combine(
						label({ label : arg.label }),
						//timestamp(),
						json()
					)
				})
			]
		})
	}
	return transport
}
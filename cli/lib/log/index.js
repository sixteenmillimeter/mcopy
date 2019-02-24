'use strict'

const winston = require('winston')
const path = require('path')
const fs = require('fs-extra')
const os = require('os')

const log = {}

log.file = function () {
	let logPath = path.join(os.homedir(), `/.config/mcopy-cli/`)
	if (process.platform === 'darwin') {
		logPath = path.join(os.homedir(), `/Library/Logs/mcopy-cli/`)
	} else if (process.platform === 'win32') {
		logPath = path.join(os.homedir(), `/AppData/Roaming/mcopy-cli/`)
	}
	if (!fs.existsSync(logPath)) {
		fs.mkdirSync(logPath)
	}
	return path.join(logPath, 'mcopy-cli.log')
}

log.time = 'MM/DD/YY-HH:mm:ss'

module.exports = function (arg) {
	if (arg.quiet) {
		log.transport = {
			info : function () {},
			warn : function () {},
			error : function () {}
		}
	} else {
		log.transport = winston.createLogger({
			transports: [
				new (winston.transports.Console)({
					format: winston.format.simple()
				}),
				new (winston.transports.File)({ 
					filename: log.file() 
				})
			]
		})
	}
	return log.transport
}
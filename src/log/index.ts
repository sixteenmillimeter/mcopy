'use strict'

const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const path = require('path')
const fs = require('fs-extra')
const os = require('os')

const logTime = 'MM/DD/YY-HH:mm:ss'
let transport : any

async function logFile () {
	let exists : boolean
	let logPath : string = path.join(os.homedir(), `/.config/mcopy-cli/`)
	if (process.platform === 'darwin') {
		logPath = path.join(os.homedir(), `/Library/Logs/mcopy-cli/`)
	} else if (process.platform === 'win32') {
		logPath = path.join(os.homedir(), `/AppData/Roaming/mcopy-cli/`)
	}
	exists = await fs.exists(logPath)
	if (!exists) {
		await fs.mkdir(logPath)
	}
	return path.join(logPath, 'mcopy-cli.log')
}

module.exports = async function (arg : any) {
	if (arg.quiet) {
		transport = {
			info : function () {},
			warn : function () {},
			error : function () {}
		}
	} else {
		transport = createLogger({
			transports: [
				new (transports.Console)({
					format: combine(
						format.colorize(),
						format.simple()
					)
				}),
				new (transports.File)({ 
					filename: await logFile() 
				})
			]
		})
	}
	return transport
}
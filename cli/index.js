'use strict'

const program = require('commander')
const uuid = require('uuid')
const moment = require('moment')
const events = require('events')
const ee = new events.EventEmitter()

const cfg = require('../app/data/cfg.json')
const pkg = require('./package.json')

const delay = require('delay')
const exit = require('exit')
const intval = require('intval')
const arduino = require('arduino')(cfg, ee)
const Mscript = require('mscript')
const mscript = new Mscript()

const dev = require('device')
let log
let readline

let devices

async function command () {
	return new Promise ((resolve, reject) => {
		return readline.question(`Input:`, (str) => {
			log.info(str)
			console.dir(mscript.interpret(str))

			//interpret string
			//readline.close()
			return resolve(true)
		})
	})
}

async function live () {
	readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	})
	log.info('Starting live control mode')
	while (true) {
		try {
			await command()
		} catch (err) {
			log.error('Error executing command', err)
		}
	}
}

function parsePattern () {

}

async function main (arg) {
	log = require('log')(arg)

	log.info('mcopy-cli')

	try {
		devices = await arduino.enumerate()
	} catch (err) {
		log.error('Error enumerating devices')
		log.error(err)
	}

	if (!devices ||devices.length > 1) {
		return exit('No devices found', 1)
	}

	await dev.all(devices)

	if (arg.pattern) {

	}

	if (arg.live) {
		try {
			await live()
		} catch (err) {
			log.error('Error running in live control mode', err)
		}
	}
}

program
  .version(pkg.version)
  .option('-l, --live', 'Live control mode')
  .option('-f, --frames', 'Number of frames to capture with camera')
  .option('-p, --pattern', 'Pattern of sequence to be repeated')
  .option('-i, --intval', 'URL of intval3')
  .option('-m, --mscript', 'Execute an mscript file')
  .option('-q, --quiet', 'Suppresses all log messages')
  .parse(process.argv)

main(program)
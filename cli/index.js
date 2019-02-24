'use strict'

const program = require('commander')
const uuid = require('uuid')
const moment = require('moment')

const delay = require('delay')
const intval = require('intval')
const arduino = require('arduino')
const Mscript = require('mscript')
const mscript = new Mscript()

const dev = require('device')
let log
let readline

const cfg = require('../app/data/cfg.json')
const pkg = require('./package.json')

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
			log.error('Error executing command')
		}
	}
}

async function main (arg) {
	log = require('log')(arg)
	log.info('mcopy-cli')
	await live()
}

program
  .version(pkg.version)
  .option('-l, --live', 'Live control mode')
  .option('-f, --frames', 'Number of frames to capture with camera')
  .option('-p, --pattern', 'Pattern of sequence to be repeated')
  .option('-m, --mscript', 'Execute an mscript file')
  .option('-q, --quiet', 'Suppresses all log messages')
  .parse(process.argv)

main(program)
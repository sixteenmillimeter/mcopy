'use strict';

const req = require('request');

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline('');
const newlineRe = new RegExp('\n', 'g');
const returnRe = new RegExp('\r', 'g');

const exec = require('exec');
const delay = require('delay');

let system = {};
let INTVAL;

async function capture_intval () {
	let framePath = `${INTVAL}/frame`;
	let res;
	try{
		res = await req(framePath);
	} catch (err) {
		return exit('Error triggering frame', 8);
	}
	if (res) {
		console.log(res);
	}
	return true;
}

async function capture_serial () {

}

async function capture () {
	
}

module.exports = (sys) => {
	system = sys;
	return capture;
}
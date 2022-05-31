'use strict'

//import Log = require('log');
import { delay }  from 'delay';

const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const exec = require('child_process').exec

const parser : any = new Readline('')
const newlineRe : RegExp = new RegExp('\n', 'g')
const returnRe : RegExp = new RegExp('\r', 'g')

let eventEmitter : any
let cfg : any
let arduino : any

const KNOWN : string[] = [
	'/dev/tty.usbmodem1a161', 
	'/dev/tty.usbserial-A800f8dk', 
	'/dev/tty.usbserial-A900cebm', 
	'/dev/tty.usbmodem1a131',
	'/dev/tty.usbserial-a900f6de',
	'/dev/tty.usbmodem1a141',
	'/dev/ttyACM0',
	'COM3'
]

/**
 * Class representing the arduino communication features
 **/ 

class Arduino {

	private log : any;
	private path : any = {};
	private known : string[] = KNOWN;
	private alias : any = {};
	private serial : any = { connect : {}, projector : {}, camera : {}, light : {} };
	private baud : number = 57600;
	private queue : any = {};
	private timer : number = 0;
	private lock : boolean = false;
	private locks : any = {};
	private confirmExec : any;
	private errorState : Function;

	constructor (errorState : Function) {
		this.errorState = errorState;
		this.init()
	}

	async init () {
		const Log = require('log');
		this.log = await Log({ label : 'arduino' });
	}

	/**
	 * Enumerate all connected devices that might be Arduinos
	 *
	 * @returns {Promise} Resolves after enumerating
	 **/
	async enumerate () {
		let ports : any[]
		let matches : string[] = []
		try {
			ports = await SerialPort.list()
		} catch (err) {
			throw err
		}
		this.log.info('Available ports:')
		this.log.info(ports.map((port : any) => { return port.path }).join(','))
		ports.forEach((port : any) => {
			if (this.known.indexOf(port.path) !== -1) {
				matches.push(port.path)
			} else if ((port.manufacturer + '').toLowerCase().indexOf('arduino') !== -1) {
				matches.push(port.path)
			} else if ((port.path + '').toLowerCase().indexOf('usbserial') !== -1) {
				matches.push(port.path)
			} else if ((port.path + '').toLowerCase().indexOf('usbmodem') !== -1) {
				matches.push(port.path)
			} else if ((port.path + '').toLowerCase().indexOf('ttyusb') !== -1) {
				matches.push(port.path)
			}
		})
		if (matches.length === 0) {
			throw new Error('No USB devices found')
		} else if (matches.length > 0) {
			return matches
		}
	}

	/**
	 * Send a command to an Arduino using async/await
	 *
	 * @param  {string}  device 	Arduino identifier
	 * @param  {string}  cmd 		Single character command to send
	 *
	 * @returns {Promise} Resolves after sending
	 **/
	async sendAsync (device : string, cmd : string) {
		return new Promise ((resolve, reject) => {
			this.queue[cmd] = (ms : number) => {
				return resolve(ms)
			}
			return this.serial[device].write(cmd, (err : any, results : any) => {
				if (err) {
					//console.error(err)
					return reject(err)
				}
				//
			})
		})
	}

	async send (serial : string, cmd : string) {
		const device : any = this.alias[serial]
		let results : any
		//console.log(`${cmd} -> ${serial}`)
		if (this.locks[serial]) {
			return false
		}
		this.timer = new Date().getTime()
		this.locks[serial] = true
		await delay(cfg.arduino.serialDelay)
		try {
			results = await this.sendAsync(device, cmd)
		} catch (e) {
			return console.error(e)
		}
		this.locks[serial] = false
		
		await eventEmitter.emit('arduino_send', cmd)
		return results
	}

	async string (serial : string, str : string) {
		const device : any = this.alias[serial]
		let writeSuccess : any
		await delay(cfg.arduino.serialDelay)
		if (typeof this.serial[device].fake !== 'undefined'
			&& this.serial[device].fake) {
			return this.serial[device].string(str)
		} else {
			try {
				writeSuccess = await this.writeAsync(device, str)
			} catch (e) {
				return console.error(e)
			}
			return writeSuccess
		}
	}

	/**
	 * Send a string to an Arduino using async/await
	 *
	 * @param  {string}  device 	Arduino identifier
	 * @param  {string}  str		String to send
	 *
	 * @returns {Promise} Resolves after sending
	 **/
	async writeAsync (device : string, str : string) {
		return new Promise ((resolve, reject) => {
			this.serial[device].write(str, function (err : any, results : any) {
				if (err) { 
					return reject(err)
				}
				return resolve(results)
			})
		})
	}

	end (serial : string, data : string) {
		const end : number = new Date().getTime();
		const ms : number = end - this.timer;
		let complete : any;
		//console.log(`${serial} -> ${data}`);
		if (this.queue[data] !== undefined) {
			this.locks[serial] = false; 
			complete = this.queue[data](ms); //execute callback
			eventEmitter.emit('arduino_end', data);
			delete this.queue[data];
		} else if (data === 'E') {
			//error state
			//stop sequence
			//throw error in ui
		} else {
			//console.log('Received stray "' + data + '"'); //silent to user
		}
		return ms;
	}

	aliasSerial (serial : string, device : string) {
		//this.log.info(`Making "${serial}" an alias of ${device}`);
		this.alias[serial] = device;
	}

	async connect (serial : string, device : string, confirm : any) {
		return new Promise(async (resolve, reject) => {
			let connectSuccess : any
			this.path[serial] = device;
			this.alias[serial] = device;
			this.serial[device] = new SerialPort(this.path[serial], {
				autoOpen : false,
				baudRate: cfg.arduino.baud,
				parser: parser
			})
			this.locks[device] = false
			try {
				connectSuccess = await this.openArduino(device) 
			} catch (e) {
				console.error('failed to open: ' + e)
				return reject(e)
			}
			//console.log(`Opened connection with ${this.path[serial]} as ${serial}`);
			if (!confirm) {
				this.serial[device].on('data', async (data : Buffer) => {
					let d = data.toString('utf8')
					d = d.replace(newlineRe, '').replace(returnRe, '')
					return this.end(serial, d)
				})
			} else {
				this.serial[device].on('data', async (data : Buffer) => {
					let d = data.toString('utf8')
					d = d.replace(newlineRe, '').replace(returnRe, '')
					return await this.confirmEnd(d)
				})
			}
			return resolve(this.path[serial])
		})
	}

	confirmEnd (data : string) {
		//console.dir(data)
		if (   data === cfg.arduino.cmd.connect
			|| data === cfg.arduino.cmd.projector_identifier
			|| data === cfg.arduino.cmd.camera_identifier
			|| data === cfg.arduino.cmd.light_identifier
			|| data === cfg.arduino.cmd.projector_light_identifier
			|| data === cfg.arduino.cmd.projector_camera_light_identifier
			|| data === cfg.arduino.cmd.projector_camera_identifier

			|| data === cfg.arduino.cmd.projector_second_identifier
			|| data === cfg.arduino.cmd.projectors_identifier
			|| data === cfg.arduino.cmd.projector_second_forward
			|| data === cfg.arduino.cmd.projector_second_backward
			|| data === cfg.arduino.cmd.projector_second
			|| data === cfg.arduino.cmd.projectors

			|| data === cfg.arduino.cmd.camera_second_identifier
			|| data === cfg.arduino.cmd.cameras_identifier
			|| data === cfg.arduino.cmd.camera_second_forward
			|| data === cfg.arduino.cmd.camera_second_backward
			|| data === cfg.arduino.cmd.camera_second
			|| data === cfg.arduino.cmd.cameras
			|| data === cfg.arduino.cmd.camera_capper_identifier
			|| data === cfg.arduino.cmd.camera_capper_projector_identifier
			|| data === cfg.arduino.cmd.camera_capper_projectors_identifier) {

			this.confirmExec(null, data);
			this.confirmExec = {};
		}
	}

	async verify () {
		return new Promise(async (resolve, reject) => {
			const device : any = this.alias['connect']
			let writeSuccess : any
			this.confirmExec = function (err : any, data : string) {
				if (data === cfg.arduino.cmd.connect) {
					return resolve(true)
				} else {
					return reject('Wrong data returned')
				}
			}
			
			await delay(cfg.arduino.serialDelay)

			try {
				writeSuccess = await this.sendAsync(device, cfg.arduino.cmd.connect)
			} catch (e) {
				return reject(e)
			}
			return resolve(writeSuccess)
		})
	}

	async distinguish () {
		return new Promise(async (resolve, reject) => {
			const device : any = this.alias['connect']
			let writeSuccess : any
			let type : string
			this.confirmExec = function (err : any, data : string) {
				if (data === cfg.arduino.cmd.projector_identifier) {
					type = 'projector'
				} else if (data === cfg.arduino.cmd.camera_identifier) {
					type = 'camera'
				} else if (data === cfg.arduino.cmd.light_identifier) {
					type = 'light'
				} else if (data === cfg.arduino.cmd.projector_light_identifier) {
					type = 'projector,light'
				} else if (data === cfg.arduino.cmd.projector_camera_light_identifier) {
					type = 'projector,camera,light'
				} else if (data === cfg.arduino.cmd.projector_camera_identifier) {
					type = 'projector,camera'
				} else if (data === cfg.arduino.cmd.projector_second_identifier) {
					type = 'projector_second'
				} else if (data === cfg.arduino.cmd.projectors_identifier) {
					type = 'projector,projector_second'
				} else if (data === cfg.arduino.cmd.camera_second_identifier) {
					type = 'camera_second'
				} else if (data === cfg.arduino.cmd.cameras_identifier) {
					type = 'camera,camera_second'
				} else if (data === cfg.arduino.cmd.camera_projectors_identifier) {
					type = 'camera,projector,projector_second'
				} else if (data === cfg.arduino.cmd.cameras_projector_identifier) {
					type = 'camera,camera_second,projector'
				} else if (data === cfg.arduino.cmd.cameras_projectors_identifier) {
					type = 'camera,camera_second,projector,projector_second'
				} else if (data === cfg.arduino.cmd.camera_capper_identifier) {
					type = 'camera,capper'
				} else if (data === cfg.arduino.cmd.camera_capper_projector_identifier) {
					type = 'camera,capper,projector'
				} else if (data === cfg.arduino.cmd.camera_capper_projectors_identifier) {
					type = 'camera,capper,projector,projector_second'
				}
				return resolve(type)
			}
			await delay(cfg.arduino.serialDelay)
			try {
				writeSuccess = await this.sendAsync(device, cfg.arduino.cmd.mcopy_identifier)
			} catch (e) {
				return reject(e)
			}
		})
	}

	async close () {
		const device = this.alias['connect']
		let closeSuccess
		try {
			closeSuccess = await this.closeArduino(device)
		} catch (e) {
			throw e;
		}
		return closeSuccess
	};

	async fakeConnect (serial : string) {
		const device : string = '/dev/fake'
		this.alias[serial] = device
		this.serial[device] = {
			write : async function (cmd : string, cb : any) {
				const t : any = {
					c : cfg.arduino.cam.time + cfg.arduino.cam.delay,
					p : cfg.arduino.proj.time + cfg.arduino.proj.delay
				}
				let timeout : number = t[cmd]
				if (typeof timeout === 'undefined') timeout = 10
				arduino.timer = +new Date()

				await delay(timeout)
				
				arduino.end(serial, cmd)
				return cb()

			}, 
			string : async function (str : string) {
				//do nothing
				return true
			},
			fake : true
		};
		//console.log('Connected to fake arduino! Not real! Does not exist!');
		return true
	}

	/**
	 * Connect to an Arduino using async/await
	 *
	 * @param  {string}  device 	Arduino identifier
	 *
	 * @returns {Promise} Resolves after opening
	 **/
	async openArduino (device : string) {
		return new Promise((resolve, reject) => {
			return this.serial[device].open((err : any) => {
				if (err) {
					return reject(err)
				}
				return resolve(true)
			})
		})
	}

	/**
	 * Close a connection to an Arduino using async/await
	 *
	 * @param  {string}  device 	Arduino identifier
	 *
	 * @returns {Promise} Resolves after closing
	 **/
	async closeArduino (device : string) {
		return new Promise((resolve : any, reject : any) => {
			return this.serial[device].close((err : any) => {
				if (err) {
					return reject(err)
				}
				return resolve(true)
			})
		})
	}
}

if (typeof module !== 'undefined' && module.parent) {
	module.exports = function (c : any, ee : any, errorState : Function) {
		eventEmitter = ee
		cfg = c
		arduino = new Arduino(errorState)
		return arduino
	}
}
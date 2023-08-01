'use strict'

/**
 * 2023-07-16 Clarification
 * 
 * Previous versions of this script intermingled and even
 * swapped the usage of the terms 'serial' and 'device'.
 * From here on out, the terms will be used as such:
 * 
 * serial - a hardware address of a serial port
 * device - common name of a type of mcopy device (eg. camera,
 * projector, light) that is aliased to a serial port
 * 
 **/

//import Log = require('log');
import { delay }  from 'delay';

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const exec = require('child_process').exec

const parser : any = new ReadlineParser({ delimiter: '\r\n' })
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
	private serial : any = {};
	private hasState : any = {};
	private baud : number = 57600;
	private queue : any = {};
	private timer : number = 0;
	private locks : any = {};
	private confirmExec : any;
	private errorState : Function;

	public stateStr : any = {};

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
	public async enumerate () : Promise<string[]>{
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
	private async sendAsync (device : string, cmd : string) : Promise<number> {
		return new Promise ((resolve, reject) => {
			this.log.info(`sendAsync ${cmd} -> ${device}`)
			this.queue[cmd] = (ms : number) => {
				return resolve(ms)
			}
			this.log.info(`Device: ${device}`)
			return this.serial[this.alias[device]].write(cmd, (err : any, results : any) => {
				if (err) {
					//this.log.error(err)
					return reject(err)
				}
			})
		})
	}

	/**
	 * 
	 **/
	public async send (device : string, cmd : string) : Promise<any> {
		const serial : any = this.alias[device]
		let ms : number
		this.log.info(`send ${cmd} -> ${device}`)
		if (this.isLocked(serial)) {
			this.log.warn(`send Serial ${serial} is locked`)
			return null
		}
		this.timer = new Date().getTime()
		this.lock(serial)
		await delay(cfg.arduino.serialDelay)
		try {
			ms = await this.sendAsync(device, cmd)
		} catch (e) {
			return this.log.error(e)
		}
		this.unlock(serial)
		
		await eventEmitter.emit('arduino_send', cmd)
		return ms
	}

	/**
	 * 
	 **/
	public async sendString (device : string, str : string) : Promise<any> {
		let writeSuccess : any
		await delay(cfg.arduino.serialDelay)
		if (typeof this.serial[this.alias[device]].fake !== 'undefined'
			&& this.serial[this.alias[device]].fake) {
			return this.serial[this.alias[device]].string(str)
		} else {
			this.log.info(`sendString ${str} -> ${device}`)
			try {
				writeSuccess = await this.writeAsync(device, str)
			} catch (e) {
				return this.log.error(e)
			}
			this.unlock(this.alias[device])
			return writeSuccess
		}
	}

	/**
	 * 
	 **/
	private async stateAsync (device : string, confirm : boolean = false) : Promise<string> {
		const cmd : string = cfg.arduino.cmd.state
		const serial : string = confirm ? this.alias['connect'] : this.alias[device]
		return new Promise ((resolve, reject) => {
			this.queue[cmd] = (state : string) => {
				this.stateStr[device] = state
				if (confirm) {
					this.hasState[device] = true
					this.log.info(`Device ${device} supports state [${state}]`)
				}
				return resolve(state)
			}
			if (confirm) {
				setTimeout(function () {
					if (typeof this.queue[cmd] !== 'undefined') {
						delete this.queue[cmd]
						this.hasState[device] = false
						this.log.info(`Device ${device} does not support state`)
						return resolve(null)
					}
				}.bind(this), 1000)
			}
			this.log.info(`stateAsync ${cmd} -> ${device}`)
			return this.serial[serial].write(cmd, (err : any, results : any) => {
				if (err) {
					//this.log.error(err)
					return reject(err)
				}
			})
		})
	}

	/**
	 * 
	 **/
	public async state (device : string, confirm : boolean = false) : Promise<string>{
		const serial : string = confirm ? this.alias['connect'] : this.alias[device]
		let results : string

		if (this.isLocked(serial)) {
			this.log.warn(`state Serial ${serial} is locked`)
			return null
		}
		this.timer = new Date().getTime()
		this.lock(serial)

		await delay(cfg.arduino.serialDelay)

		try {
			results = await this.stateAsync(device, confirm)
		} catch (e) {
			return this.log.error(e)
		}
		this.unlock(serial)
		
		await eventEmitter.emit('arduino_state', cfg.arduino.cmd.state)
		return results
	}

	/**
	 * Send a string to an Arduino using async/await
	 *
	 * @param  {string}  device 	Arduino identifier
	 * @param  {string}  str		String to send
	 *
	 * @returns {Promise} Resolves after sending
	 **/
	private async writeAsync (device : string, str : string) : Promise<any> {
		return new Promise ((resolve, reject) => {
			this.serial[this.alias[device]].write(str, function (err : any, results : any) {
				if (err) { 
					return reject(err)
				}
				return resolve(results)
			})
		})
	}

	/**
	 * 
	 **/
	private end (serial : string, data : string) : any {
		const end : number = new Date().getTime()
		const ms : number = end - this.timer
		let complete : any
		//this.log.info(`end ${serial} -> ${data}`)
		if (this.queue[data] !== undefined) {
			this.unlock(serial)
			complete = this.queue[data](ms) //execute callback
			eventEmitter.emit('arduino_end', data)
			delete this.queue[data]
		} else if (data[0] === cfg.arduino.cmd.state) {
			//this.log.info(`end serial -> ${serial}`)
			this.unlock(serial)
			complete = this.queue[cfg.arduino.cmd.state](data)
			eventEmitter.emit('arduino_end', data)
			delete this.queue[cfg.arduino.cmd.state]
			return data
		} else if (data[0] === cfg.arduino.cmd.error) {
			this.log.error(`Received error from device ${serial}`)
			this.unlock(serial)
			//error state
			//stop sequence
			//throw error in ui
		} else {
			//this.log.info('Received stray "' + data + '"') //silent to user
		}
		return ms
	}

	public aliasSerial (device : string, serial : string) {
		//this.log.info(`Making "${serial}" an alias of ${device}`)
		this.alias[device] = serial;
	}

	public async connect (device : string, serial : string, confirm : any) : Promise<any> {
		//this.log.info(`connect device ${device}`)
		//this.log.info(`connect serial ${serial}`)
		return new Promise(async (resolve, reject) => {
			let connectSuccess : any
			this.path[device] = serial
			this.aliasSerial(device, serial)
			this.serial[serial] = new SerialPort({
				path : serial,
				autoOpen : false,
				baudRate: cfg.arduino.baud,
				parser
			})
			this.unlock(serial)
			try {
				connectSuccess = await this.openArduino(device) 
			} catch (e) {
				this.log.error('failed to open: ' + e)
				return reject(e)
			}
			this.log.info(`Opened connection with ${this.path[device]} as ${device}`)
			if (!confirm) {
				this.serial[this.alias[device]].on('data', async (data : Buffer) => {
					let d = data.toString('utf8')
					d = d.replace(newlineRe, '').replace(returnRe, '')
					return this.end(serial, d)
				})
			} else {
				this.serial[this.alias[device]].on('data', async (data : Buffer) => {
					let d = data.toString('utf8')
					d = d.replace(newlineRe, '').replace(returnRe, '')
					return await this.confirmEnd(d)
				})
			}

			return resolve(this.path[serial])
		})
	}

	private confirmEnd (data : string) {
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

			|| data === cfg.arduino.cmd.capper_identifier
			|| data === cfg.arduino.cmd.camera_capper_identifier
			|| data === cfg.arduino.cmd.camera_capper_projector_identifier
			|| data === cfg.arduino.cmd.camera_capper_projectors_identifier) {

			this.confirmExec(null, data)
			this.confirmExec = {}
			this.unlock(this.alias['connect'])
		} else if (data[0] === cfg.arduino.cmd.state) {
			this.queue[cfg.arduino.cmd.state](data)
			delete this.queue[cfg.arduino.cmd.state]
			this.unlock(this.alias['connect'])
		}
	}

	public async verify () {
		return new Promise(async (resolve, reject) => {
			const device : string = 'connect'
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

	public async distinguish () {
		return new Promise(async (resolve, reject) => {
			const device : string = 'connect'
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
				} else if (data === cfg.arduino.cmd.capper_identifier) {
					type = 'capper'
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
				this.log.info(writeSuccess)
			} catch (e) {
				return reject(e)
			}
		})
	}

	public async close () {
		const device : string = 'connect'
		let closeSuccess : boolean
		try {
			closeSuccess = await this.closeArduino(device)
		} catch (e) {
			throw e
		}
		return closeSuccess
	}

	public async fakeConnect (device : string) {
		const serial : string = '/dev/fake'
		this.aliasSerial(device, serial)
		this.serial[serial] = {
			write : async function (cmd : string, cb : any) {
				const t : any = {
					c : cfg.arduino.cam.time + cfg.arduino.cam.delay,
					p : cfg.arduino.proj.time + cfg.arduino.proj.delay,
					A : 180,
					B : 180
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
		}
		//this.log.info('Connected to fake arduino! Not real! Does not exist!')
		return true
	}

	/**
	 * Connect to an Arduino using async/await
	 *
	 * @param  {string}  device 	Arduino identifier
	 *
	 * @returns {Promise} Resolves after opening
	 **/
	private async openArduino (device : string) : Promise<boolean>  {
		return new Promise((resolve, reject) => {
			return this.serial[this.alias[device]].open((err : any) => {
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
	private async closeArduino (device : string) : Promise<boolean> {
		return new Promise((resolve : any, reject : any) => {
			return this.serial[this.alias[device]].close((err : any) => {
				if (err) {
					return reject(err)
				}
				return resolve(true)
			})
		})
	}

	private lock (serial : string) {
		//this.log.info(`Locked serial ${serial}`)
		this.locks[serial] = true
	}

	private unlock (serial : string) {
		//this.log.info(`Unlocked serial ${serial}`)
		this.locks[serial] = false
	}

	private isLocked (serial : string) {
		return typeof this.locks[serial] !== 'undefined' && this.locks[serial] === true
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
'use strict'

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
 * Pause the process for X milliseconds in async/await functions
 *
 * @param  {integer}  ms 	milliseconds
 *
 * @returns {Promise} Resolves after wait
 **/
async function delay (ms : number) {
	return new Promise(resolve => {
		return setTimeout(resolve, ms)
	})
}

/**
 * Class representing the arduino communication features
 **/ 

class Arduino {

	path : any = {}
	known : string[] = KNOWN
	alias : any = {}
	serial : any = { connect : {}, projector : {}, camera : {}, light : {} }
	baud : number = 57600
	queue : any = {}
	timer : number = 0
	lock : boolean = false
	locks : any = {}
	confirmExec : any

	constructor () {
		
	}
	async enumerate () {
		return new Promise( (resolve, reject) => {
			return SerialPort.list((err : any, ports : any[]) => {
				let matches : string[] = []
				if (err) {
					return reject(err)
				}
				ports.forEach((port : any) => {
					if (this.known.indexOf(port.comName) !== -1) {
						matches.push(port.comName)
					} else if ((port.manufacturer + '').toLowerCase().indexOf('arduino') !== -1) {
						matches.push(port.comName)
					} else if ((port.comName + '').toLowerCase().indexOf('usbserial') !== -1) {
						matches.push(port.comName)
					} else if ((port.comName + '').toLowerCase().indexOf('usbmodem') !== -1) {
						matches.push(port.comName)
					}
				})
				if (matches.length === 0) {
					return reject('No USB devices found');
				} else if (matches.length > 0) {
					return resolve(matches)
				}
			})
		})
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
		if (this.locks[serial]) {
			return false
		}
		this.locks[serial] = true
		await delay(cfg.arduino.serialDelay)
		try {
			results = await this.sendAsync(device, cmd)
		} catch (e) {
			return console.error(e)
		}
		this.locks[serial] = false
		this.timer = new Date().getTime()
		return await eventEmitter.emit('arduino_send', cmd)
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
				//console.log('sent: ' + str)
				return resolve(results)
			})
		})
	}

	end (serial : string, data : string) {
		const end = new Date().getTime()
		const ms = end - this.timer
		let complete
		if (this.queue[data] !== undefined) {
			this.locks[serial] = false; 
			//console.log('Command ' + data + ' took ' + ms + 'ms');
			complete = this.queue[data](ms) //execute callback
			eventEmitter.emit('arduino_end', data)
			delete this.queue[data]
		} else {
			//console.log('Received stray "' + data + '"'); //silent to user
		}
		return complete
	}

	aliasSerial (serial : string, device : string) {
		console.log(`Making "${serial}" an alias of ${device}`)
		this.alias[serial] = device
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
			console.log(`Opened connection with ${this.path[serial]} as ${serial}`);
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
		if (data === cfg.arduino.cmd.connect
			|| data === cfg.arduino.cmd.proj_identifier
			|| data === cfg.arduino.cmd.cam_identifier
			|| data === cfg.arduino.cmd.light_identifier
			|| data === cfg.arduino.cmd.proj_light_identifier
			|| data === cfg.arduino.cmd.proj_cam_light_identifier
			|| data === cfg.arduino.cmd.proj_cam_identifier ) {
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
				if (data === cfg.arduino.cmd.proj_identifier) {
					type = 'projector'
				} else if (data === cfg.arduino.cmd.cam_identifier) {
					type = 'camera'
				} else if (data === cfg.arduino.cmd.light_identifier) {
					type = 'light'
				} else if (data === cfg.arduino.cmd.proj_light_identifier) {
					type = 'projector,light'
				} else if (data === cfg.arduino.cmd.proj_cam_light_identifier) {
					type = 'projector,camera,light'
				} else if (data === cfg.arduino.cmd.proj_cam_identifier) {
					type = 'projector,camera'
				} else if (data === cfg.ardino.cmd.proj_second_identifier) {
					type = 'projector_second'
				}
				return resolve(type)
			}
			await delay(cfg.arduino.serialDelay)
			try {
				writeSuccess = await this.sendAsync(device, cfg.arduino.cmd.mcopy_identifier)
			} catch (e) {
				console.error(e)
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
			return console.error(e)
		}
		return closeSuccess
	};

	async fakeConnect (serial : string) {
		//console.log('Connecting to fake arduino...');
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
	module.exports = function (c : any, ee : any) {
		eventEmitter = ee
		cfg = c
		arduino = new Arduino()
		return arduino
	}
}
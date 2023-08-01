'use strict';

import { delay } from 'delay';
import Log = require('log');

/**
 * class representing the device discovery features
 *
 *
 **/

class Devices {

	public settings : any;
	public connected : any = {}

	private arduino : Arduino;
	private log : any;
	private ui : any;
	private ipc : any;
	private mainWindow : any;
	private cam : any;

	/**
	 * Constructor assigns arduino, settings, UI browser window and cam objects
	 * locally to this class for reference.
	 **/
	constructor (arduino : Arduino, settings : any, mainWindow : any, cam : any) {
		this.arduino = arduino;
		this.settings = settings;
		this.mainWindow = mainWindow;
		this.ui = this.mainWindow.webContents
		this.cam = cam;
		this.init();
	}
	/**
	 * Initialize the log for "devices". Establish an ipc connection to the UI.
	 * Start listening on that ipc connection.
	 **/
	private async init () {
		this.log = await Log({ label : 'devices' })
		this.ipc = require('electron').ipcMain;
		this.listen();
	}
	/**
	 * Listen to the "profile" channel for messages from the UI.
	 **/
	private listen () {
		this.ipc.on('profile', this.listener.bind(this));
	}
	/**
	 * The "profile" channel callback. If a profile is changed, set it in the
	 * local settings object.
	 **/
	private listener (event : any, arg : any){
		if (typeof arg.profile !== 'undefined') {
			this.log.info(`Saving profile ${arg.profile}`, 'SETTINGS', false, false);
			this.settings.update('profile', arg.profile);
			this.settings.save();
		}
		if (typeof arg.timing !== 'undefined') {
			this.log.info(`Saving timing info`, 'SETTINGS', false, false);
			this.settings.update('timing', arg.timing);
			this.settings.save();
		}
	}
	/**
	 * 
	 **/
	public async enumerate () {
		let serials : string[];
		try{
			serials = await this.arduino.enumerate();
		} catch (err) {
			this.log.warn(err, 'SERIAL', false, true);
			await delay(1000);
			return this.all([]);
		}
		this.log.info(`Found ${serials.length} USB devices`, 'SERIAL', true, true);
		serials = this.favor(serials);
		return await this.all(serials);
	}
	/**
	 * 
	 **/
	private favor (serials : string[]) {
		const past = this.settings.state.devices.filter((device : Device) => {
			if (device.serial) {
				return device;
			}
		}).map((device : Device) => {
			return device.serial;
		})
		if (past.length === 0) {
			return serials;
		}
		serials.sort((a : any, b : any) => {
			if (past.indexOf(a) !== -1 && past.indexOf(b) === -1) {
				return 1;
			} else if (past.indexOf(a) === -1 && past.indexOf(b) !== -1) {
				return -1;
			}
			return 0;
		})
		return serials;
	}
	/**
	 * 
	 **/
	private async distinguish (serial : string) {
		let connectSuccess : any
		let verifySuccess : any
		let device : any

		//this.log.info(`distinguish() ${serial}`)
		try {
			connectSuccess = await this.arduino.connect('connect', serial, true)
		} catch (err) {
			this.log.error('Error connecting', err)
			return null
		}
		
		await delay(2000)

		try {
			verifySuccess = await this.arduino.verify()
		} catch (err) {
			this.log.error('Error verifying device', err)
			return null
		}

		this.log.info(`Verified ${serial} as mcopy device`, 'SERIAL', true, true)

		await delay(1000)

		try {
			device = await this.arduino.distinguish()
		} catch (err) {
			this.log.error('Error distinguishing device', err)
			return null
		}

		this.remember('arduino', device, serial)
		this.log.info(`Determined ${device} to be ${device}`, 'SERIAL', true, true)


		await delay(100)
		
		try {
			await this.arduino.state(device, true)
		} catch (err) {
			this.log.error('Error checking state capability', err)
		}

		return device
	}
	/**
	 * 
	 **/
	private async fakeProjector () {
		this.connected.projector = '/dev/fake'
		try {
			await this.arduino.fakeConnect('projector')
		} catch (err) {
			console.error(err)
			this.log.error(`Error connecting to fake PRONECTOR device`, 'SERIAL', true, true)
			return false
		}
		this.log.info('Connected to fake PROJECTOR device', 'SERIAL', true, true)
		return true
	}
	/**
	 * 
	 **/
	private async fakeCamera () {
		this.connected.camera = '/dev/fake'
		try {
			await this.arduino.fakeConnect('camera')
		} catch (err) {
			console.error(err)
			this.log.error(`Error connecting to fake CAMERA device`, 'SERIAL', true, true)
			return false
		}
		this.log.info('Connected to fake CAMERA device', 'SERIAL', true, true)
		return true
	}
	/**
	 * 
	 **/
	private async fakeLight () {
		this.connected.light = '/dev/fake'
		try {
			await this.arduino.fakeConnect('light')
		} catch (err) {
			console.error(err)
			this.log.error(`Error connecting to fake LIGHT device`, 'SERIAL', true, true)
			return false
		}
		this.log.info('Connected to fake LIGHT device', 'SERIAL', true, true)
		return true
	}

	/**
	 * 
	 **/
	private async fakeCapper () {
		this.connected.capper = '/dev/fake'
		try {
			await this.arduino.fakeConnect('capper')
		} catch (err) {
			console.error(err)
			this.log.error(`Error connecting to fake CAPPER device`, 'SERIAL', true, true)
			return false
		}
		this.log.info('Connected to fake CAPPER device', 'SERIAL', true, true)
		return true
	}
	/**
	 * 
	 **/
	private async connectDevice (device : string, serial : string) {
		let closeSuccess : any;
		let connectSuccess : any;
		try  {
			closeSuccess = await this.arduino.close()
		} catch (err) {
			this.log.error('Error closing arduino connection', err)
			return false
		}
		if (device === 'projector') {
			this.connected.projector = serial
			try {
				connectSuccess = await this.arduino.connect('projector', serial, false)
			} catch (err) {
				this.log.error('Error connecting to projector', err)
				return false
			}
			this.log.info(`Connected to ${device} as PROJECTOR`, 'SERIAL', true, true)
		} else if (device === 'camera') {
			this.connected.camera = serial
			try {
				connectSuccess = await this.arduino.connect('camera', serial, false)
			} catch (err) {
				this.log.error('Error connecting to camera', err)
				return false
			}
			this.log.info(`Connected to ${device} as CAMERA`, 'SERIAL', true, true)
		} else if (device === 'light') {
			this.connected.light = serial
			try {
				connectSuccess = await this.arduino.connect('light', serial, false)
			} catch (err) {
				this.log.error('Error connecting to light', err)
				return false
			}
			this.log.info(`Connected to ${device} as LIGHT`, 'SERIAL', true, true)
		} else if (device === 'projector,light') {
			this.connected.projector = serial
			this.connected.light = serial
			this.arduino.aliasSerial('light', serial)
			try{
				connectSuccess = await this.arduino.connect('projector', serial, false)
			} catch (err) {
				this.log.error('Error connecting to projector and light', err)
				return false
			}
			this.log.info(`Connected to ${device} as PROJECTOR + LIGHT`, 'SERIAL', true, true)
			
		} else if (device === 'projector,camera,light') {
			this.connected.projector = serial
			this.connected.camera = serial
			this.connected.light = serial
			this.arduino.aliasSerial('camera', serial)
			this.arduino.aliasSerial('light', serial)
			try {
				connectSuccess = await this.arduino.connect('projector', serial, false)
			} catch (err) {
				this.log.error('Error connecting to projector, camera and light', err)
				return false
			}	
			this.log.info(`Connected to ${device} as PROJECTOR + CAMERA + LIGHT`, 'SERIAL', true, true)

		} else if (device === 'projector,camera') {
			this.connected.projector = serial
			this.connected.camera = serial
			this.arduino.aliasSerial('camera', serial)
			try {
				connectSuccess = await this.arduino.connect('projector', serial, false)
			} catch (err) {
				this.log.error('Error connecting to projector and camera', err)
				return false
			}
			this.log.info(`Connected to ${device} as PROJECTOR + CAMERA`, 'SERIAL', true, true)
		} else if (device === 'projector_second') {
			this.connected.projector_second = serial
			try {
				connectSuccess = await this.arduino.connect('projector_second', serial, false)
			} catch (err) {
				this.log.error('Error connecting to secondary projector', err)
				return false
			}
			this.log.info(`Connected to ${device} as PROJECTOR_SECOND`, 'SERIAL', true, true)
		} else if (device === 'projector,projector_second') {
			this.connected.projector = serial
			this.connected.projector_second = serial
			this.arduino.aliasSerial('projector_second', serial)
			try {
				connectSuccess = await this.arduino.connect('projector', serial, false)
			} catch (err) {
				this.log.error('Error connecting to projector and secondary projector', err)
				return false
			}
		} else if (device === 'camera_second') {
			this.connected.camera_second = serial
			try {
				connectSuccess = await this.arduino.connect('camera_second', serial, false)
			} catch (err) {
				console.error(err)
				return false
			}
		} else if (device === 'camera,camera_second') {
			this.connected.camera = serial
			this.connected.camera_second = serial
			this.arduino.aliasSerial('camera_second', serial)
			try {
				connectSuccess = await this.arduino.connect('camera', serial, false)
			} catch (err) {
				this.log.error('Error connecting to camera, camera_secondary and projector', err)
				return false
			}
		} else if (device === 'camera,projector,projector_second') {
			this.connected.camera = serial
			this.connected.projector = serial
			this.connected.projector_second = serial
			this.arduino.aliasSerial('projector', serial)
			this.arduino.aliasSerial('projector_second', serial)
			try {
				connectSuccess = await this.arduino.connect('camera', serial, false)
			} catch (err) {
				this.log.error('Error connecting to camera, projector and projector_second', err)
				return false
			}
		} else if (device === 'camera,camera_second,projector') {
			this.connected.camera = serial
			this.connected.camera_second = serial
			this.connected.projector = serial
			this.arduino.aliasSerial('camera_second', serial)
			this.arduino.aliasSerial('projector', serial)
			
			try {
				connectSuccess = await this.arduino.connect('camera', serial, false)
			} catch (err) {
				this.log.error('Error connecting to camera, camera_second and projector', err)
				return false
			}
		} else if (device === 'camera,camera_second,projector,projector_second') {
			this.connected.camera = serial
			this.connected.camera_second = serial
			this.connected.projector = serial
			this.connected.projector_second = serial
			this.arduino.aliasSerial('camera_second', serial)
			this.arduino.aliasSerial('projector', serial)
			this.arduino.aliasSerial('projector_second', serial)
			
			try {
				connectSuccess = await this.arduino.connect('camera', serial, false)
			} catch (err) {
				this.log.error('Error connecting to camera, camera_second, projector and projector_second', err)
				return false
			}
		} else if (device === 'capper') {
			this.connected.capper = serial
			try {
				connectSuccess = await this.arduino.connect('capper', serial, false)
			} catch (err) {
				this.log.error('Error connecting capper', err)
				return false
			}
		} else if (device === 'camera,capper') {
			this.connected.camera = serial
			this.connected.capper = serial
			this.arduino.aliasSerial('capper', serial)
			try {
				connectSuccess = await this.arduino.connect('camera', serial, false)
			} catch (err) {
				this.log.error('Error connecting to camera and capper', err)
				return false
			}
		} else if (device === 'camera,capper,projector') {
			this.connected.camera = serial
			this.connected.capper = serial
			this.connected.projector = serial
			this.arduino.aliasSerial('capper', serial)
			this.arduino.aliasSerial('projector', serial)

			try {
				connectSuccess = await this.arduino.connect('camera', serial, false)
			} catch (err) {
				this.log.error('Error connecting to camera, capper and projector', err)
				return false
			}
		} else if (device === 'camera,capper,projector,projector_second') {
			this.connected.camera = serial
			this.connected.capper = serial
			this.connected.projector = serial
			this.connected.projector_second = serial
			this.arduino.aliasSerial('capper', serial)
			this.arduino.aliasSerial('projector', serial)
			this.arduino.aliasSerial('projector_second', serial)
			try {
				connectSuccess = await this.arduino.connect('camera', serial, false)
			} catch (err) {
				this.log.error('Error connecting to camera, capper, projector and projector_second', err)
				return false
			}
		}
		return connectSuccess
	}
	/**
	 * 
	 **/
	//Cases for 1 or 2 arduinos connected
	private async all (serials : string[]) {
		let c : any = {}
		let p : any = {}
		let l : any = {}
		let device : string;
		let d : any
		let cs : any = {}
		let ps : any = {}
		let capper : any = {}
		let checklist : any[] = []
		let exposure : number
		let parts : string[]

		this.connected = {
			projector : false,
			camera : false,
			light : false,
			projector_second : false,
			capper : false
		}

		for (let serial of serials) {
			try {
				device = await this.distinguish(serial)
			} catch (err) {
				this.log.error('Error distinguishing device', err)
				throw err
			}

			try {
				await this.connectDevice(device, serial)
			} catch (err) {
				this.log.error('Error connecting to device', err)
				throw err
			}
		}

		//done checking devices

		if (!this.connected.projector) {
			await this.fakeProjector()
		} else if (this.arduino.hasState['projector']) {
			p.state = true
		}
		p.arduino = this.connected.projector

		if (!this.connected.camera) {
			await this.fakeCamera()
		} else if (this.arduino.hasState['camera']) {
			if (device.indexOf('camera') !== -1) {
				parts = this.arduino.stateStr[device].split('G')
				if (parts.length > 1) {
					parts = parts[1].split('H')
					exposure = parseInt(parts[0])
					if (!isNaN(exposure)) {
						this.log.info(`Timing for [${device}] = ${exposure}`)
						this.ui.send('timing', { c : 'c', ms : exposure })
					}
				}
			}
			c.state = true
			c.exposure = true
		}
		c.arduino = this.connected.camera

		if (!this.connected.light) {
			await this.fakeLight()
		}
		l.arduino = this.connected.light

		if (this.connected.camera_second) {
			cs.arduino = this.connected.camera_second
		}

		if (this.connected.projector_second) {
			ps.arduino = this.connected.projector_second
		}

		if (this.connected.capper) {
			capper.arduino = this.connected.capper
		}

		if (this.settings.state.camera && this.settings.state.camera.intval) {
			c.intval = this.settings.state.camera.intval

		}
		//console.dir(this.arduino.alias);
		//console.dir(this.arduino.serial);
		return this.ready(p, c, l, cs, ps, capper)
	}
	/**
	 * 
	 **/
	private remember (device: string, serial : string, type : string) {
		let deviceEntry : any;
		const match = this.settings.state.devices.filter((dev : any) => {
			if (dev[device] && dev[device] === serial) {
				return dev
			}
		})
		if (match.length === 0) {
			deviceEntry = {
				device,
				serial
			}
			this.settings.state.devices.push(deviceEntry)
			this.settings.update('devices', this.settings.state.devices)
			this.settings.save()
		}
	}
	/**
	 * 
	 **/
	private ready (projector : any, camera : any, light : any, camera_second : any, projector_second : any, capper : any) {
		let args : any = { 
			camera, 
			projector, 
			light, 
			profile: this.settings.state.profile
		}
		if (this.settings.state.timing) {
			args.timing = this.settings.state.timing
		}

		if (projector_second && projector_second.arduino) {
			args.projector_second = projector_second
			this.settings.update('projector_second', projector_second)
			this.mainWindow.setSize(800, 800)
		}
		
		if (camera_second && camera_second.arduino) {
			args.camera_second = camera_second
			this.settings.update('camera_second', camera_second)
			if (projector_second && projector_second.arduino) {
				this.mainWindow.setSize(900, 800)
			} else {
				this.mainWindow.setSize(800, 800)
			}
		}

		if (capper && capper.arduino) {
			args.capper = capper
			this.mainWindow.setSize(800, 800)
			this.settings.update('capper', capper)
		}

		this.settings.update('camera', camera)
		this.settings.update('projector', projector)
		this.settings.update('light', light)
		

		this.settings.save()

		this.ui.send('ready', args)
		
		return true
	}

	/**
	 * 
	 **/

}

module.exports = function (arduino : Arduino, settings : any, mainWindow : any, cam : any) {
	return new Devices(arduino, settings, mainWindow, cam)
}
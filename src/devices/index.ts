'use strict';

import delay = require('delay');
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
	 * 
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
	 * 
	 **/
	private async init () {
		this.log = await Log({ label : 'devices' })
		this.ipc = require('electron').ipcMain;
		this.listen()
	}
	/**
	 * 
	 **/
	private listen () {
		this.ipc.on('profile', this.listener.bind(this));
	}
	/**
	 * 
	 **/
	private listener (event : any, arg : any){
		this.log.info(`Saving profile ${arg.profile}`, 'SETTINGS', false, false);
		this.settings.update('profile', arg.profile);
		this.settings.save();
	}
	/**
	 * 
	 **/
	public async enumerate () {
		let devices : Device[];
		try{
			devices = await this.arduino.enumerate();
		} catch (err) {
			this.log.warn(err, 'SERIAL', false, true);
			await delay(1000);
			return this.all([]);
		}
		this.log.info(`Found ${devices.length} USB devices`, 'SERIAL', true, true);
		devices = this.favor(devices);
		return await this.all(devices);
	}
	/**
	 * 
	 **/
	private favor (devices : Device[]) {
		const past = this.settings.state.devices.filter((device : Device) => {
			if (device.arduino) {
				return device;
			}
		}).map((device : Device) => {
			return device.arduino;
		})
		if (past.length === 0) {
			return devices;
		}
		devices.sort((a : any, b : any) => {
			if (past.indexOf(a) !== -1 && past.indexOf(b) === -1) {
				return 1;
			} else if (past.indexOf(a) === -1 && past.indexOf(b) !== -1) {
				return -1;
			}
			return 0;
		})
		return devices;
	}
	/**
	 * 
	 **/
	private async distinguish (device : Device) {
		let connectSuccess : any;
		let verifySuccess : any;
		let type : any;

		try {
			connectSuccess = await this.arduino.connect('connect', device, true)
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

		this.log.info(`Verified ${device} as mcopy device`, 'SERIAL', true, true)

		await delay(1000)

		try {
			type = await this.arduino.distinguish()
		} catch (err) {
			this.log.error('Error distinguishing device', err)
			return null
		}

		this.remember('arduino', device, type)
		this.log.info(`Determined ${device} to be ${type}`, 'SERIAL', true, true)
		
		return type
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
	private async connectDevice (device : Device, type : any) {
		let closeSuccess : any;
		let connectSuccess : any;
		try  {
			closeSuccess = await this.arduino.close()
		} catch (err) {
			this.log.error('Error closing arduino connection', err)
			return false
		}
		if (type === 'projector') {
			this.connected.projector = device
			try {
				connectSuccess = await this.arduino.connect('projector', device, false)
			} catch (err) {
				this.log.error('Error connecting to projector', err)
				return false
			}
			this.log.info(`Connected to ${device} as PROJECTOR`, 'SERIAL', true, true)
		} else if (type === 'camera') {
			this.connected.camera = device
			try {
				connectSuccess = await this.arduino.connect('camera', device, false)
			} catch (err) {
				this.log.error('Error connecting to camera', err)
				return false
			}
			this.log.info(`Connected to ${device} as CAMERA`, 'SERIAL', true, true)
		} else if (type === 'light') {
			this.connected.light = device
			try {
				connectSuccess = await this.arduino.connect('light', device, false)
			} catch (err) {
				this.log.error('Error connecting to light', err)
				return false
			}
			this.log.info(`Connected to ${device} as LIGHT`, 'SERIAL', true, true)
		} else if (type === 'projector,light') {
			this.connected.projector = device
			this.connected.light = device
			this.arduino.aliasSerial('light', device)
			try{
				connectSuccess = await this.arduino.connect('projector', device, false)
			} catch (err) {
				this.log.error('Error connecting to projector and light', err)
				return false
			}
			this.log.info(`Connected to ${device} as PROJECTOR + LIGHT`, 'SERIAL', true, true)
			
		} else if (type === 'projector,camera,light') {
			this.connected.projector = device
			this.connected.camera = device
			this.connected.light = device
			this.arduino.aliasSerial('camera', device)
			this.arduino.aliasSerial('light', device)
			try {
				connectSuccess = await this.arduino.connect('projector', device, false)
			} catch (err) {
				this.log.error('Error connecting to projector, camera and light', err)
				return false
			}	
			this.log.info(`Connected to ${device} as PROJECTOR + CAMERA + LIGHT`, 'SERIAL', true, true)

		} else if (type === 'projector,camera') {
			this.connected.projector = device
			this.connected.camera = device
			this.arduino.aliasSerial('camera', device)
			try {
				connectSuccess = await this.arduino.connect('projector', device, false)
			} catch (err) {
				this.log.error('Error connecting to projector and camera', err)
				return false
			}
			this.log.info(`Connected to ${device} as PROJECTOR + CAMERA`, 'SERIAL', true, true)
		} else if (type === 'projector_second') {
			this.connected.projector_second = device
			try {
				connectSuccess = await this.arduino.connect('projector_second', device, false)
			} catch (err) {
				this.log.error('Error connecting to secondary projector', err)
				return false
			}
			this.log.info(`Connected to ${device} as PROJECTOR_SECOND`, 'SERIAL', true, true)
		} else if (type === 'projector,projector_second') {
			this.connected.projector = device
			this.connected.projector_second = device
			this.arduino.aliasSerial('projector_second', device)
			try {
				connectSuccess = await this.arduino.connect('projector', device, false)
			} catch (err) {
				this.log.error('Error connecting to projector and secondary projector', err)
				return false
			}
		} else if (type === 'camera_second') {
			this.connected.camera_second = device
			try {
				connectSuccess = await this.arduino.connect('camera_second', device, false)
			} catch (err) {
				console.error(err)
				return false
			}
		} else if (type === 'camera,camera_second') {
			this.connected.camera = device
			this.connected.camera_second = device
			this.arduino.aliasSerial('camera_second', device)
			try {
				connectSuccess = await this.arduino.connect('camera', device, false)
			} catch (err) {
				this.log.error('Error connecting to camera, camera_secondary and projector', err)
				return false
			}
		} else if ('camera,projector,projector_second') {
			this.connected.camera = device
			this.connected.projector = device
			this.connected.projector_second = device
			this.arduino.aliasSerial('projector', device)
			this.arduino.aliasSerial('projector_second', device)
			try {
				connectSuccess = await this.arduino.connect('camera', device, false)
			} catch (err) {
				this.log.error('Error connecting to camera, projector and projector_second', err)
				return false
			}
		} else if ('camera,camera_second,projector') {
			this.connected.camera = device
			this.connected.camera_second = device
			this.connected.projector = device
			this.arduino.aliasSerial('camera_second', device)
			this.arduino.aliasSerial('projector', device)
			
			try {
				connectSuccess = await this.arduino.connect('camera', device, false)
			} catch (err) {
				this.log.error('Error connecting to camera, camera_second and projector', err)
				return false
			}
		} else if ('camera,camera_second,projector,projector_second') {
			this.connected.camera = device
			this.connected.camera_second = device
			this.connected.projector = device
			this.connected.projector_second = device
			this.arduino.aliasSerial('camera_second', device)
			this.arduino.aliasSerial('projector', device)
			this.arduino.aliasSerial('projector_second', device)
			
			try {
				connectSuccess = await this.arduino.connect('camera', device, false)
			} catch (err) {
				this.log.error('Error connecting to camera, camera_second, projector and projector_second', err)
				return false
			}
		}
		return connectSuccess
	}
	 /**
	 * 
	 **/
	//Cases for 1 or 2 arduinos connected
	private async all (devices : Device[]) {
		let c : any = {}
		let p : any = {}
		let l : any = {}
		let type : string;
		let d : any
		let cs : any = {}
		let ps : any = {}
		let checklist : any[] = []

		this.connected = {
			projector : false,
			camera : false,
			light : false,
			projector_second : false
		}

		for (let device of devices) {
			try {
				type = await this.distinguish(device)
			} catch (err) {
				this.log.error('Error distinguishing device', err)
				throw err
			}

			try {
				await this.connectDevice(device, type)
			} catch (err) {
				this.log.error('Error connecting to device', err)
				throw err
			}
		}

		//done checking devices

		if (!this.connected.projector) {
			await this.fakeProjector()
		}
		p.arduino = this.connected.projector

		if (!this.connected.camera) {
			await this.fakeCamera()
		}
		c.arduino = this.connected.camera

		if (!this.connected.light) {
			await this.fakeLight()
		}
		l.arduino = this.connected.light

		if (this.connected.camera_second) {
			cs = { arduino : this.connected.camera_second }
		}

		if (this.connected.projector_second) {
			ps = { arduino : this.connected.projector_second }
		}


		if (this.settings.state.camera && this.settings.state.camera.intval) {
			c.intval = this.settings.state.camera.intval

		}

		return this.ready(p, c, l, cs, ps)
	}
	 /**
	 * 
	 **/
	private remember (which : string, device : any, type : string) {
		let deviceEntry : any;
		const match = this.settings.state.devices.filter((dev : any) => {
			if (dev[which] && dev[which] === device) {
				return dev
			}
		})
		if (match.length === 0) {
			deviceEntry = {
				type : type
			}
			deviceEntry[which] = device
			this.settings.state.devices.push(deviceEntry)
			this.settings.update('devices', this.settings.state.devices)
			this.settings.save()
		}
	};
	 /**
	 * 
	 **/
	private ready (projector : any, camera : any, light : any, camera_second : any, projector_second : any) {
		let args : any = { 
			camera, 
			projector, 
			light, 
			profile: this.settings.state.profile 
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

		this.settings.update('camera', camera)
		this.settings.update('projector', projector)
		this.settings.update('light', light)
		this.settings.save()

		this.ui.send('ready', args)
		
		return true
	};

	 /**
	 * 
	 **/

}

module.exports = function (arduino : Arduino, settings : any, mainWindow : any, cam : any) {
	return new Devices(arduino, settings, mainWindow, cam)
}
'use strict'

let arduino
const log = require('log')({quiet : false})
const dev = {}

dev.init = function () {
	dev.listen()
}

dev.listen = function () {
	ipcMain.on('profile', (event, arg) => {
		log.info(`Saving profile ${arg.profile}`, 'SETTINGS', false, false)
		settings.update('profile', arg.profile)
		settings.save()
	})
}

dev.enumerate = async function () {
	let devices
	try{
		devices = await arduino.enumerate()
	} catch (err) {
		log.info(err, 'SERIAL', false, true)
		await delay(1000)
		return dev.all([])
	}
	log.info(`Found ${devices.length} USB devices`, 'SERIAL', true, true)
	devices = dev.favor(devices)
	return await dev.all(devices)
}

dev.favor = function (devices) {
	const past = mcopy.settings.devices.filter(device => {
		if (device.arduino) {
			return device
		}
	}).map(device => {
		return device.arduino
	})
	if (past.length === 0) {
		return devices
	}
	devices.sort((a, b) => {
		if (past.indexOf(a) !== -1 && past.indexOf(b) === -1) {
			return 1
		} else if (past.indexOf(a) === -1 && past.indexOf(b) !== -1) {
			return -1
		}
		return 0
	})
	return devices
}

dev.distinguish = async function (device) {
	let connectSuccess
	let verifySuccess
	let type

	try {
		connectSuccess = await arduino.connect('connect', device, true)
	} catch (err) {
		console.error(err)
		return null
	}
	
	await delay(2000)

	try {
		verifySuccess = await arduino.verify()
	} catch (err) {
		console.error(err)
		return null
	}

	log.info(`Verified ${device} as mcopy device`, 'SERIAL', true, true)

	await delay(1000)

	try {
		type = await arduino.distinguish()
	} catch (err) {
		console.error(err)
		return null
	}

	dev.remember('arduino', device, type)
	log.info(`Determined ${device} to be ${type}`, 'SERIAL', true, true)
	
	return type
}

dev.fakeProjector = async function () {
	dev.connected.projector = '/dev/fake'
	try {
		await arduino.fakeConnect('projector')
	} catch (err) {
		console.error(err)
		log.error(`Error connecting to fake PRONECTOR device`, 'SERIAL', true, true)
		return false
	}
	log.info('Connected to fake PROJECTOR device', 'SERIAL', true, true)
	return true
}
dev.fakeCamera = async function () {
	dev.connected.camera = '/dev/fake'
	try {
		await arduino.fakeConnect('camera')
	} catch (err) {
		console.error(err)
		log.error(`Error connecting to fake CAMERA device`, 'SERIAL', true, true)
		return false
	}
	log.info('Connected to fake CAMERA device', 'SERIAL', true, true)
	return true
}
dev.fakeLight = async function () {
	dev.connected.light = '/dev/fake'
	try {
		await arduino.fakeConnect('light')
	} catch (err) {
		console.error(err)
		log.error(`Error connecting to fake LIGHT device`, 'SERIAL', true, true)
		return false
	}
	log.info('Connected to fake LIGHT device', 'SERIAL', true, true)
	return true
}

dev.connectDevice = async function (device, type) {
	let closeSuccess
	let connectSuccess
	try  {
		closeSuccess = await arduino.close()
	} catch (err) {
		console.error(err)
		return false
	}
	if (type === 'projector') {
		dev.connected.projector = device
		try {
			connectSuccess = await arduino.connect('projector', device, false)
		} catch (err) {
			console.error(err)
			return false
		}
		log.info(`Connected to ${device} as PROJECTOR`, 'SERIAL', true, true)
	} else if (type === 'camera') {
		dev.connected.camera = device
		try {
			connectSuccess = await arduino.connect('camera', device, false)
		} catch (err) {
			console.error(err)
			return false
		}
		log.info(`Connected to ${device} as CAMERA`, 'SERIAL', true, true)
	} else if (type === 'light') {
		dev.connected.light = device
		try {
			connectSuccess = await arduino.connect('light', device, false)
		} catch (err) {
			console.error(err)
			return false
		}
		log.info(`Connected to ${device} as LIGHT`, 'SERIAL', true, true)
	} else if (type === 'projector,light') {
		dev.connected.projector = device
		dev.connected.light = device
		arduino.alias('light', device)
		try{
			connectSuccess = await arduino.connect('projector', device, false)
		} catch (err) {
			console.error(err)
			return false
		}
		log.info(`Connected to ${device} as PROJECTOR + LIGHT`, 'SERIAL', true, true)
		
	} else if (type === 'projector,camera,light') {
		dev.connected.projector = device
		dev.connected.camera = device
		dev.connected.light = device
		arduino.alias('camera', device)
		arduino.alias('light', device)
		try {
			connectSuccess = await arduino.connect('projector', device, false)
		} catch (err) {
			console.error(err)
			return false
		}	
		log.info(`Connected to ${device} as PROJECTOR + CAMERA + LIGHT`, 'SERIAL', true, true)

	} else if (type === 'projector,camera') {
		dev.connected.projector = device
		dev.connected.camera = device
		arduino.alias('camera', device)
		try {
			connectSuccess = await arduino.connect('projector', device, false)
		} catch (err) {
			console.error(err)
			return false
		}
		log.info(`Connected to ${device} as PROJECTOR`, 'SERIAL', true, true)
	}
	return connectSuccess
}

//Cases for 1 or 2 arduinos connected
dev.all = async function (devices) {
	let c = {}
	let p = {}
	let l = {}
	let type
	let d


	dev.connected = {
		projector : false,
		camera : false,
		light : false
	}

	let checklist = []

	for (let device of devices) {
		try {
			type = await dev.distinguish(device)
		} catch (err) {
			console.error(err)
			return reject(err)
		}

		try {
			await dev.connectDevice(device, type)
		} catch (err) {
			console.error(err)
			return reject(err)
		}
	}

	//done checking devices

	if (!dev.connected.projector) {
		await dev.fakeProjector()
	}
	p.arduino = dev.connected.projector
	if (!dev.connected.camera) {
		await dev.fakeCamera()
	}
	c.arduino = dev.connected.camera

	if (mcopy.settings.camera.intval) {
		c.intval = mcopy.settings.camera.intval
		await delay(1000)
		await cam.connectIntval(null, { connect : true,  url : c.intval })
	}

	if (!dev.connected.light) {
		await dev.fakeLight()
	}

	l.arduino = dev.connected.light

	return dev.ready(p, c, l)
}

dev.remember = function (which, device, type) {
	let deviceEntry
	const match = mcopy.settings.devices.filter(dev => {
		if (dev[which] && dev[which] === device) {
			return dev
		}
	})
	if (match.length === 0) {
		deviceEntry = {
			type : type
		}
		deviceEntry[which] = device
		mcopy.settings.devices.push(deviceEntry)
		settings.update('devices', mcopy.settings.devices)
		settings.save()
	}
};

dev.ready = function (projector, camera, light) {
	mainWindow.webContents.send('ready', { 
		camera, 
		projector, 
		light, 
		profile: mcopy.settings.profile 
	})
	settings.update('camera', camera)
	settings.update('projector', projector)
	settings.update('light', light)
	settings.save()
	return true
};

module.exports = function (a) {
	arduino = a
	return dev
}
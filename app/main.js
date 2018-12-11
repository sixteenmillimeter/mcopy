/* jshint esversion: 6, asi: true, strict: true*/
/* global require, setTimeout, process, console*/

'use strict'

const electron = require('electron')
const { Menu, MenuItem, ipcMain, BrowserWindow, app } = electron
const fs = require('fs')
const os = require('os')
const winston = require('winston')
const moment = require('moment')
const uuid = require('uuid')
const events = require('events')
const async = require('async')
const path = require('path')
//const digital = require('./lib/digital')
const ee = new events.EventEmitter()
//const capture = require('./lib/capture')(ee)
const settings = require('./lib/settings')

const Server = require('./lib/server')
const Intval = require('./lib/intval')

const mcopy = {}
const log = {}
const proj = {}
const cam = {}
const light = {}
const dev = {}

let mainWindow
let mscript
let arduino
let intval
let projector
let camera
let server
let menu

async function delay (ms) {
	return new Promise(resolve => {
		return setTimeout(resolve, ms)
	})
}

mcopy.cfg = require('./data/cfg.json')
mcopy.settings = {}

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
		awaitcam.connectIntval(null, { connect : true,  url : c.intval })
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

var createMenu = function () {
	const template = require('./data/menu.json')
	menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
}

var createWindow = function () {
	mainWindow = new BrowserWindow({
		width: 800, 
		height: 600,
		minWidth : 800,
		minHeight : 600,
		icon: path.join(__dirname, 'assets/icons/icon.png')
	})
	mainWindow.loadURL('file://' + __dirname + '/index.html')
	if (process.argv.indexOf('-d') !== -1 || process.argv.indexOf('--dev') !== -1) {
		mainWindow.webContents.openDevTools()
	}
	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

light.init = function () {
	light.listen()
}
light.listen = function () {
	ipcMain.on('light', async (event, arg) => {
		try {
			await light.set(arg.rgb, arg.id)
		}catch (err) {
			console.error(err)
			return reject(err)
		}
		event.returnValue = true
	})
}
light.set = async function (rgb, id) {
	const str = rgb.join(',');
	let ms
	try {
		ms = arduino.send('light', mcopy.cfg.arduino.cmd.light)
	} catch (err) {
		console.error(err)
	}
	await delay(1)
	try {
		arduino.string('light', str)
	} catch (err) {
		console.error(err)
	}
	await delay(1)
	await ms
	return await light.end(rgb, id, ms)
}
light.end = async function (rgb, id, ms) {
	log.info('Light set to ' + rgb.join(','), 'LIGHT', true, true)
	return await mainWindow.webContents.send('light', { rgb: rgb, id : id, ms: ms })
}

proj.state = {
	dir : true //default dir
}
proj.init = function () {
	proj.listen()
}
proj.set = async function (dir, id) {
	let cmd
	let ms
	if (dir) {
		cmd = mcopy.cfg.arduino.cmd.proj_forward
	} else {
		cmd = mcopy.cfg.arduino.cmd.proj_backward
	}
	proj.state.dir = dir
	try {
		ms = await arduino.send('projector', cmd)
	} catch (err) {
		console.error(err)
	}
	return await proj.end(cmd, id, ms)
}
proj.move = async function (frame, id) {
	const cmd = mcopy.cfg.arduino.cmd.projector
	let ms
	try {
		ms = await arduino.send('projector', cmd)
	} catch (err) {
		console.error(err)
	}
	return await proj.end(mcopy.cfg.arduino.cmd.projector, id, ms)
}
proj.listen = function () {
	ipcMain.on('proj', async (event, arg) => {
		if (typeof arg.dir !== 'undefined') {
			try {
				await proj.set(arg.dir, arg.id)
			} catch (err) {
				console.error(err)
			}
		} else if (typeof arg.frame !== 'undefined') {
			try {
				await proj.move(arg.frame, arg.id)
			} catch (err) {
				console.error(err)
			}
		}
		event.returnValue = true
	})
}
proj.end = async function (cmd, id, ms) {
	let message = ''
	if (cmd === mcopy.cfg.arduino.cmd.proj_forward) {
		message = 'Projector set to FORWARD'
	} else if (cmd === mcopy.cfg.arduino.cmd.proj_backward) {
		message = 'Projector set to BACKWARD'
	} else if (cmd === mcopy.cfg.arduino.cmd.projector) {
		message = 'Projector '
		if (proj.state.dir) {
			message += 'ADVANCED'
		} else {
			message += 'REWOUND'
		}
		message += ' 1 frame'
	}
	log.info(message, 'PROJECTOR', true, true)
	return await mainWindow.webContents.send('proj', {cmd: cmd, id : id, ms: ms})
}

cam.intval = null
cam.state = {
	dir : true //default dir
}
cam.init = function () {
	cam.listen()
}
cam.set = async function (dir, id) {
	let cmd
	let ms
	if (dir) {
		cmd = mcopy.cfg.arduino.cmd.cam_forward
	} else {
		cmd = mcopy.cfg.arduino.cmd.cam_backward
	}
	cam.state.dir = dir

	if (cam.intval) {
		try {
			ms = await cam.intval.setDir(dir)
		} catch (err) {
			console.error(err)
		}
	} else {
		try {
			ms = await arduino.send('camera', cmd)
		} catch (err) {
			console.error(err)
		}
	}
	return await cam.end(cmd, id, ms)
}

cam.move = async function (frame, id) {
	const cmd = mcopy.cfg.arduino.cmd.camera
	let ms
	if (cam.intval) {

		ms = await cam.intval.move()
	} else { 
		ms = await arduino.send('camera', cmd)
	}
	log.info('Camera move time', { ms })
	return cam.end(cmd, id, ms)
}

cam.exposure = function (exposure, id) {
	let cmd = 'E'
	cam.intval.setDir('camera', exposure, ms => {
		cam.end(cmd, id, ms)
	})
}

cam.connectIntval = async function (event, arg) {
	return new Promise((resolve, reject) => {
		if (arg.connect) {
			cam.intval = new Intval(arg.url)
			cam.intval.connect((err, ms, state) => {
				if (err) {
					mainWindow.webContents.send('intval', { connected : false })
					log.info(`Cannot connect to ${arg.url}`, 'INTVAL', true, true)
					cam.intval = null
					delete cam.intval
				} else {
					mainWindow.webContents.send('intval', { connected : true, url : arg.url, state : state })
					log.info(`Connected to INTVAL3 @ ${arg.url}`, 'INTVAL', true, true)
					settings.update('camera', { intval : arg.url })
					settings.save()
					dev.remember('intval', arg.url, 'camera')
				}
				return resolve(true)
			})
		} else if (arg.disconnect) {
			cam.intval = null
			return resolve(false)
		}
	})

}

cam.listen = function () {
	ipcMain.on('cam', async (event, arg) => {
		if (typeof arg.dir !== 'undefined') {
			try {
				await cam.set(arg.dir, arg.id)
			} catch (err) {
				console.error(err)
			}
		} else if (typeof arg.frame !== 'undefined') {
			try {
				await cam.move(arg.frame, arg.id)
			} catch (err) {
				console.error(err)
			}
		}
		event.returnValue = true
	})
	ipcMain.on('intval', cam.connectIntval)
}
cam.end = async function (cmd, id, ms) {
	var message = ''
	if (cmd === mcopy.cfg.arduino.cmd.cam_forward) {
		message = 'Camera set to FORWARD'
	} else if (cmd === mcopy.cfg.arduino.cmd.cam_backward) {
		message = 'Camera set to BACKWARD'
	} else if (cmd === mcopy.cfg.arduino.cmd.camera) {
		message = 'Camera '
		if (cam.state.dir) {
			message += 'ADVANCED'
		} else {
			message += 'REWOUND'
		}
		message += ' 1 frame'
	}
	log.info(message, 'CAMERA', true, true)
	mainWindow.webContents.send('cam', {cmd: cmd, id : id, ms: ms})
};

log.file = function () {
	let logPath = path.join(os.homedir(), `/.config/mcopy/`)
	if (process.platform === 'darwin') {
		logPath = path.join(os.homedir(), `/Library/Logs/mcopy/`)
	} else if (process.platform === 'win32') {
		logPath = path.join(os.homedir(), `/AppData/Roaming/mcopy/`)
	}
	if (!fs.existsSync(logPath)) {
		fs.mkdirSync(logPath)
	}
	return path.join(logPath, 'mcopy.log')
}
log.time = 'MM/DD/YY-HH:mm:ss'
log.transport = winston.createLogger({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: log.file() })
	]
})
log.init = function () {
	log.listen()
}
log.display = function (obj) {
	mainWindow.webContents.send('log', obj)
}
log.listen = function () {
	ipcMain.on('log', (event, arg) => {
		log.transport.info('renderer', arg)
		event.returnValue = true
	})
}
log.info = function (action, service, status, display) {
	var obj = {
		time : moment().format(log.time),
		action : action,
		service : service,
		status : status
	}
	log.transport.info('main', obj)
	if (display) {
		log.display(obj)
	}
}
/*
var transfer = {}

transfer.init = function () {
	transfer.listen()
};
transfer.listen = function () {
	ipcMain.on('transfer', (event, arg) => {
		let res = '';
		//also turn on and off
		if (arg.action === 'enable') {
			capture.active = true
			res = capture.active
		} else if (arg.action === 'disable') {
			capture.active = false
			res = capture.active
		} else if (arg.action === 'start') {
			capture.start()
		} else if (arg.action === 'end') {
			res = capture.end()
		}
		event.returnValue = res
	})
}
*/
var init = async function () {

	createWindow()
	createMenu()
	log.init()
	light.init()
	proj.init()
	cam.init()
	dev.init()


	//transfer.init()
	//capture.init()

	arduino = require('./lib/arduino')(mcopy.cfg, ee)
	mscript = require('./lib/mscript')
	

	settings.restore()
	mcopy.settings = settings.all()

	await delay(2000)
	await dev.enumerate()
}

app.on('ready', init)

app.on('window-all-closed', () => {
	//if (process.platform !== 'darwin') {
		app.quit();
	//}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

mcopy.relaunch = function () {
	app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
	app.exit(0)
}

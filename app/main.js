/* jshint esversion: 6, asi: true, strict: true*/
/* global require, setTimeout, process, console*/

'use strict'

const electron = require('electron')
const { Menu, MenuItem, ipcMain, BrowserWindow, app } = electron
const fs = require('fs')
const os = require('os')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf, colorize, prettyPrint, simple } = format
const moment = require('moment')
const uuid = require('uuid')
const events = require('events')
const path = require('path')

const ee = new events.EventEmitter()
const settings = require('settings')
const system = require('system')
const Server = require('server')
const Intval = require('intval')
const delay = require('delay')

//Objects
const mcopy = {}
const log = {}
const dev = {}

let SYSTEM;
let mainWindow;
let mscript;
let arduino;
let server;
let menu;
let display;
let ffmpeg;
let ffprobe;
let cam;
let proj;
let light;
let dig;

mcopy.cfg = require('./data/cfg.json')
mcopy.settings = {}

/**
 * 
 *
 *
 **/

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
		arduino.aliasSerial('light', device)
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
		arduino.aliasSerial('camera', device)
		arduino.aliasSerial('light', device)
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
		arduino.aliasSerial('camera', device)
		try {
			connectSuccess = await arduino.connect('projector', device, false)
		} catch (err) {
			console.error(err)
			return false
		}
		log.info(`Connected to ${device} as PROJECTOR`, 'SERIAL', true, true)
	} else if (type === 'projector_second') {
		dev.connected.projector_second = device
		arduino.aliasSerial('projector_second', device)
		try {
			connectSuccess = await arduino.connect('projector_second', device, false)
		} catch (err) {
			console.error(err)
			return false
		}
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
	let s = {}


	dev.connected = {
		projector : false,
		camera : false,
		light : false,
		projector_second : false
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

	if (dev.connected.projector_second) {
		s = dev.connected.projector_second
	}

	return dev.ready(p, c, l, s)
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

dev.ready = function (projector, camera, light, projector_second) {
	let args = { 
		camera, 
		projector, 
		light, 
		profile: mcopy.settings.profile 
	}
	if (projector_second && projector_second.arduino) {
		args.projector_second = projector_second
	}
	mainWindow.webContents.send('ready', args)
	settings.update('camera', camera)
	settings.update('projector', projector)
	settings.update('light', light)
	if (projector_second && projector_second.arduino) {
		settings.update('projector_second', projector_second)
		mainWindow.setSize(800, 800)
	}
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

const seq = {};
seq.init = function () {
	seq.listen();
}

seq.listen = function () {
	ipcMain.on('seq', async (evt, arg) => {
		if (arg.action === 'stop' && proj.digital) {
			display.end()
		}
	})
}

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
log.formatter = (options) => {
	console.dir(options)
	return options.timestamp() +' ['+ options.level.toUpperCase() +'] '+ (undefined !== options.message ? options.message : '') +
     (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
}
log.transport = createLogger({
	transports: [
		new (transports.Console)({
			level: 'info',
			json : false,
            format : combine(
		        timestamp(),
				colorize(),
				simple()
		    )
        }),
		new (transports.File)({ 
			filename: log.file()
		})
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
		log.transport.info(`[renderer] action=${arg.action} service=${arg.service} status=${arg.status}`)
		event.returnValue = true
	})
}
log.info = function (action, service, status, display) {
	var obj = {
		action : action,
		service : service,
		status : status
	}
	log.transport.info(`[main] action=${action} service=${service} status=${status}`)
	if (display) {
		log.display(obj)
	}
}

var init = async function () {

	try {
		SYSTEM = await system()
	} catch (err) {
		console.error(err)
	}

	createWindow()
	createMenu()

	await settings.restore()
	mcopy.settings = await settings.all()

	log.init()

	dev.init()
	seq.init()

	display = require('display')(SYSTEM)
	ffmpeg = require('ffmpeg')(SYSTEM)
	ffprobe = require('ffprobe')(SYSTEM)
	arduino = require('arduino')(mcopy.cfg, ee)
	mscript = require('mscript')

	dig = require('digital')(display, ffmpeg, ffprobe)
	cam = require('cam')(arduino, mcopy.cfg, mainWindow.webContents, dig)
	proj = require('proj')(arduino, mcopy.cfg, mainWindow.webContents, dig)
	light = require('light')(arduino, mcopy.cfg, mainWindow.webContents)
	//dev
	//cmd
	//seq

	await delay(2000)
	try {
		await dev.enumerate()
	} catch (err) {
		console.error(err)
	}
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
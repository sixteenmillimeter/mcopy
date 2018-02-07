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

//console.log(process.version)

mcopy.cfg = require('./data/cfg.json')
mcopy.settings = {}

dev.init = function () {
	dev.listen()
}

dev.listen = function () {
	ipcMain.on('profile', (event, arg) => {
		console.log(`Saving profile ${arg.profile}`)
		settings.update('profile', arg.profile)
		settings.save()
	})
}

dev.enumerate = function (err, devices) {
	if (err) {
		log.info(err, 'SERIAL', false, true)
		setTimeout(() =>{
			dev.all([])
		}, 1000)
	} else {
		log.info(`Found ${devices.length} USB devices`, 'SERIAL', true, true)
		devices = dev.favor(devices)
		dev.all(devices)
	}
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

dev.distinguish = function (device, callback) {
	var connectCb = function (err, device) {
		if (err) {
			return console.error(err)
		}
		setTimeout(function () {
			arduino.verify(verifyCb)
		}, 2000);
	},
	verifyCb = function (err, success) {
		if (err) {
			return console.error(err)
		}
		log.info(`Verified ${device} as mcopy device`, 'SERIAL', true, true)

		setTimeout(function () {
			arduino.distinguish(distinguishCb);
		}, 1000);
	},
	distinguishCb = function (err, type) {
		if (err) {
			return console.error(err)
		}
		dev.remember('arduino', device, type)

		log.info(`Determined ${device} to be ${type}`, 'SERIAL', true, true)
		if (callback) { callback(err, type); }
	}
	arduino.connect('connect', device, true, connectCb)
};

//Cases for 1 or 2 arduinos connected
dev.all = function (devices) {
	const connected = {
		projector : false,
		camera : false,
		light : false
	}

	let checklist = []
	var fakeProjector = function () {
		connected.projector = '/dev/fake'
		arduino.fakeConnect('projector', () => {
			log.info('Connected to fake PROJECTOR device', 'SERIAL', true, true)
			
		})
	}
	var fakeCamera = function () {
		connected.camera = '/dev/fake'
		arduino.fakeConnect('camera', () => {
			log.info('Connected to fake CAMERA device', 'SERIAL', true, true)
		})
	}
	var fakeLight = function () {
		connected.light = '/dev/fake'
		arduino.fakeConnect('light', () => {
			log.info('Connected to fake LIGHT device', 'SERIAL', true, true)
			
		})
	}
	var distinguishCb = function (device, type, cb) {
		arduino.close(() => {
			if (type === 'projector') {
				connected.projector = device
				arduino.connect('projector', device, false, () => {
					log.info(`Connected to ${device} as PROJECTOR`, 'SERIAL', true, true)
					cb()
				})
			} else if (type === 'camera') {
				connected.camera = device
				arduino.connect('camera', device, false, () => {
					log.info(`Connected to ${device} as CAMERA`, 'SERIAL', true, true)
					cb()
				})
			} else if (type === 'light') {
				connected.light = device
				arduino.connect('light', device, false, () => {
					log.info(`Connected to ${device} as LIGHT`, 'SERIAL', true, true)
					cb()
				})
			} else if (type === 'projector,light') {
				connected.projector = device
				connected.light = device
				arduino.connect('projector', device, false, () => {
					log.info(`Connected to ${device} as PROJECTOR + LIGHT`, 'SERIAL', true, true)
					cb()
				})
				arduino.alias('light', device)
			} else if (type === 'projector,camera,light') {
				connected.projector = device
				connected.camera = device
				connected.light = device
				arduino.connect('projector', device, false, () => {
					log.info(`Connected to ${device} as PROJECTOR + CAMERA + LIGHT`, 'SERIAL', true, true)
					cb()
				})
				arduino.alias('camera', device)
				arduino.alias('light', device)
			} else if (type === 'projector,camera') {
				connected.projector = device
				connected.camera = device
				arduino.connect('projector', device, false, () => {
					log.info(`Connected to ${device} as PROJECTOR`, 'SERIAL', true, true)
					cb()
				})
				arduino.alias('camera', device)
			} else {
				cb()
			}
		})
	}

	checklist = devices.map(device => {
		return next => {
			dev.distinguish(device, (err, type) => {
				if (err) {
					console.error(err)
					return next()
				}
				distinguishCb(device, type, next)
			})
		}
	})

	async.series(checklist, () => {
		//done checking devices

		let c = {}
		let p = {}
		let l = {}

		if (!connected.projector) {
			fakeProjector()
		}
		p.arduino = connected.projector
		if (!connected.camera) {
			fakeCamera()
		}
		c.arduino = connected.camera

		if (mcopy.settings.camera.intval) {
			c.intval = mcopy.settings.camera.intval
			console.dir(mcopy.settings.camera)
			setTimeout(() => {
				cam.connectIntval(null, { connect : true,  url : c.intval })
			}, 1000)
		}

		if (!connected.light) {
			fakeLight()
		}
		l.arduino = connected.light

		dev.ready(p, c, l)
	})
};

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
		camera: camera, 
		projector: projector, 
		light: light, 
		profile: mcopy.settings.profile 
	})
	settings.update('camera', camera)
	settings.update('projector', projector)
	settings.update('light', light)
	settings.save()
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
		minHeight : 600
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
	ipcMain.on('light', (event, arg) => {
		light.set(arg.rgb, arg.id)
		event.returnValue = true
	})
}
light.set = function (rgb, id) {
	var str = rgb.join(',');
	arduino.send('light', mcopy.cfg.arduino.cmd.light, (ms) => {
		light.end(rgb, id, ms)
	})
	arduino.string('light', str)
}
light.end = function (rgb, id, ms) {
	log.info('Light set to ' + rgb.join(','), 'LIGHT', true, true)
	mainWindow.webContents.send('light', {rgb: rgb, id : id, ms: ms})
}

proj.state = {
	dir : true //default dir
}
proj.init = function () {
	proj.listen()
}
proj.set = function (dir, id) {
	var cmd
	if (dir) {
		cmd = mcopy.cfg.arduino.cmd.proj_forward
	} else {
		cmd = mcopy.cfg.arduino.cmd.proj_backward
	}
	proj.state.dir = dir
	arduino.send('projector', cmd, (ms) => {
		proj.end(cmd, id, ms)
	})
}
proj.move = function (frame, id) {
	arduino.send('projector', mcopy.cfg.arduino.cmd.projector, (ms) => {
		proj.end(mcopy.cfg.arduino.cmd.projector, id, ms)
	})
}
proj.listen = function () {
	ipcMain.on('proj', (event, arg) => {
		if (typeof arg.dir !== 'undefined') {
			proj.set(arg.dir, arg.id)
		} else if (typeof arg.frame !== 'undefined') {
			proj.move(arg.frame, arg.id)
		}
		event.returnValue = true
	})
}
proj.end = function (cmd, id, ms) {
	var message = ''
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
	mainWindow.webContents.send('proj', {cmd: cmd, id : id, ms: ms})
}

cam.intval = null
cam.state = {
	dir : true //default dir
}
cam.init = function () {
	cam.listen()
}
cam.set = function (dir, id) {
	let cmd
	if (dir) {
		cmd = mcopy.cfg.arduino.cmd.cam_forward
	} else {
		cmd = mcopy.cfg.arduino.cmd.cam_backward
	}
	cam.state.dir = dir

	if (cam.intval) {
		cam.intval.setDir(dir, ms => {
			cam.end(cmd, id, ms)
		})
	} else {
		arduino.send('camera', cmd, ms => {
			cam.end(cmd, id, ms)
		})
	}
}

cam.move = function (frame, id) {
	let cmd = mcopy.cfg.arduino.cmd.camera
	if (cam.intval) {
		cam.intval.move(ms => {
			cam.end(cmd, id, ms)
		})
	} else { 
		arduino.send('camera', cmd, ms => {
			cam.end(cmd, id, ms)
		})
	}
}

cam.exposure = function (exposure, id) {
	let cmd = 'E'
	cam.intval.setDir('camera', exposure, ms => {
		cam.end(cmd, id, ms)
	})
}

cam.connectIntval = function (event, arg) {
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
		})
	} else if (arg.disconnect) {
		cam.intval = null
	}
}

cam.listen = function () {
	ipcMain.on('cam', (event, arg) => {
		if (typeof arg.dir !== 'undefined') {
			cam.set(arg.dir, arg.id)
		} else if (typeof arg.frame !== 'undefined') {
			cam.move(arg.frame, arg.id)
		}
		event.returnValue = true
	})
	ipcMain.on('intval', cam.connectIntval)
}
cam.end = function (cmd, id, ms) {
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
log.transport = new (winston.Logger)({
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
var init = function () {

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

	setTimeout( () => {
		arduino.enumerate(dev.enumerate)
	}, 1000)
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

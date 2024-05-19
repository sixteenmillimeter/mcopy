/* jshint esversion: 6, asi: true, strict: true*/
/* global require, setTimeout, process, console*/

'use strict'

//process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const electron = require('electron')
const { Menu, BrowserWindow, app } = electron
const { EventEmitter } = require('events')
const { join } = require('path')

require('@electron/remote/main').initialize()

const ee = new EventEmitter()
const settings = require('settings')
const system = require('system')
const { delay } = require('delay')
const { Log } =  require('log')

//Objects
const mcopy = {}

let SYSTEM
let log
let mainWindow
let arduino
let menu
let display
let ffmpeg
let ffprobe
let cam
let cam2
let proj
let proj2
let light
let filmout
let dev
let cmd
let seq
let capper
let alert
let server

const cfg = require('./data/cfg.json')

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
		icon: join(__dirname, 'assets/icons/icon.png'),
		skipTaskbar: true,
    	toolbar: false,	
		webPreferences : {
			nodeIntegration : true,
			enableRemoteModule: true,
			contextIsolation : false
		}
	})

	mainWindow.loadURL('file://' + __dirname + '/index.html')
	if (process.argv.indexOf('-d') !== -1 || process.argv.indexOf('--dev') !== -1) {
		mainWindow.webContents.openDevTools()
	} else {
		mainWindow.setMenu(null)
		mainWindow.setAutoHideMenuBar(true) 
	}
	mainWindow.on('closed', () => {
		mainWindow = null
	})
	require('@electron/remote/main').enable(mainWindow.webContents)
}

var errorState = function () {
	if (seq && seq.running) {
		//pause sequence if running
		seq.pause();
	}
	mainWindow.webContents.send('error_state', { stop : true });
}

var init = async function () {
	log = await Log({ label : 'mcopy' })

	createWindow()
	createMenu()

	try {
		SYSTEM = await system(mainWindow.webContents)
	} catch (err) {
		console.error(err)
	}

	await settings.restore()

	display = require('display')(SYSTEM)
	ffmpeg = require('ffmpeg')(SYSTEM)
	ffprobe = require('ffprobe')(SYSTEM)
	arduino = require('arduino')(cfg, ee, errorState)

	dev = require('devices')(arduino, settings, mainWindow)
	server = require('server')(mainWindow.webContents)
	light = require('light')(arduino, cfg, mainWindow.webContents)
	filmout = require('filmout')(display, server, ffmpeg, ffprobe, mainWindow.webContents, light)
	cam = require('cam')(arduino, cfg, mainWindow.webContents, filmout)
	proj = require('proj')(arduino, cfg, mainWindow.webContents, filmout)
	alert = require('alert')(mainWindow.webContents)

	try {
		await dev.enumerate()
	} catch (err) {
		log.error('Error enumerating connected devices', err)
	}

	if (dev && dev.connected && dev.connected.camera_second) {
		cam2 = require('cam')(arduino, cfg, mainWindow.webContents, filmout, true)
	}

	if (dev && dev.connected && dev.connected.projector_second) {
		proj2 = require('proj')(arduino, cfg, mainWindow.webContents, filmout, true)
	}
	if (dev && dev.connected && dev.connected.capper) {
		capper = require('capper')(arduino, cfg, mainWindow.webContents, filmout, true)
	}
	
	cmd = require('cmd')(cfg, proj, cam, light, alert, cam2, proj2, capper)
	seq = require('sequencer')(cfg, cmd, mainWindow.webContents)
}

app.on('ready', init)

app.on('window-all-closed', () => {
	app.quit()
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
});

mcopy.relaunch = function () {
	app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
	app.exit(0)
}
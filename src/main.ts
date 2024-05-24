import { Menu, BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron'
import { EventEmitter } from 'events'
import { join } from 'path'
import { Settings } from 'settings'
import { system } from 'system'
import type { System } from 'system'
import { delay } from 'delay'
import { Log } from 'log'
import type { Logger } from 'winston'
import { Arduino } from 'arduino'
import { Camera } from 'cam'
import { Projector } from 'proj'
import { Light } from 'light'
import { Capper } from 'capper'
import { Alert } from 'alert'
import { Display } from 'display'
import { FilmOut } from 'filmout'
import { FFMPEG } from 'ffmpeg'
import { FFPROBE } from 'ffprobe'
import { Devices } from 'devices'
import { Commands } from 'cmd'
import { Sequencer } from 'sequencer'
import { Server } from 'server'

require('@electron/remote/main').initialize()

const ee : EventEmitter = new EventEmitter()

//Objects
const mcopy : any = {}

let SYSTEM : System 
let settings : Settings
let log : Logger
let mainWindow : BrowserWindow
let arduino : Arduino
let menu
let display : Display
let ffmpeg : FFMPEG
let ffprobe : FFPROBE
let cam : Camera
let cam2 : Camera 
let proj : Projector
let proj2 : Projector
let light : Light
let filmout : FilmOut
let dev : Devices
let cmd : Commands
let seq : Sequencer
let capper : Capper
let alert : Alert
let server : Server

const cfg : any = require('./data/cfg.json')

var createMenu = function () {
	const template = require('./data/menu.json')
	menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
}

var createWindow = function () {
	const windowOptions : BrowserWindowConstructorOptions = {
		width: 800, 
		height: 600,
		minWidth : 800,
		minHeight : 600,
		icon: join(__dirname, 'assets/icons/icon.png'),
		skipTaskbar: true,
    	//toolbar: false,	
		webPreferences : {
			nodeIntegration : true,
			//enableRemoteModule: true,
			contextIsolation : false
		}
	};
	mainWindow = new BrowserWindow(windowOptions)

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
	if (seq && seq.isRunning()) {
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

	settings = new Settings()
	await settings.restore()

	display = new Display(SYSTEM)
	ffmpeg = new FFMPEG(SYSTEM)
	ffprobe = new FFPROBE(SYSTEM)
	arduino = new Arduino(cfg, ee, errorState)

	dev = new Devices(arduino, settings, mainWindow)
	server = new Server(mainWindow.webContents)
	light = new Light(arduino, cfg, mainWindow.webContents)
	filmout = new FilmOut(display, server, ffmpeg, ffprobe, mainWindow.webContents, light)
	cam = new Camera(arduino, cfg, mainWindow.webContents, filmout)
	proj = new Projector(arduino, cfg, mainWindow.webContents, filmout)
	alert = new Alert(mainWindow.webContents)

	try {
		await dev.enumerate()
	} catch (err) {
		log.error('Error enumerating connected devices', err)
	}

	if (dev && dev.connected && dev.connected.camera_second) {
		cam2 = new Camera(arduino, cfg, mainWindow.webContents, filmout, true)
	}

	if (dev && dev.connected && dev.connected.projector_second) {
		proj2 = new Projector(arduino, cfg, mainWindow.webContents, filmout, true)
	}
	if (dev && dev.connected && dev.connected.capper) {
		capper = new Capper(arduino, cfg, mainWindow.webContents, filmout)
	}
	
	cmd = new Commands(cfg, proj, cam, light, alert, cam2, proj2, capper)
	seq = new Sequencer(cfg, cmd, mainWindow.webContents)
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
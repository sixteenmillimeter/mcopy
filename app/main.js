'use strict';
const electron = require('electron'),
	fs = require('fs'),
	Menu = require('menu'),
	ipcMain = require('electron').ipcMain,
	app = electron.app,
	BrowserWindow = electron.BrowserWindow,
	uuid = require('node-uuid'),
	serialport = require('serialport'),
	SerialPort = serialport.SerialPort,
	mcopy = {};

let mainWindow;

var init = function () {
	mcopy.cfg = JSON.parse(fs.readFileSync('./cfg.json', 'utf8'));
	createWindow();
};

var createMenu = function () {

};

var createWindow = function () {
	mainWindow = new BrowserWindow({width: 800, height: 600});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}

app.on('ready', init);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on('light', function(event, arg) {
	//
	event.returnValue = true;
});

/******
	Arduino handlers
*******/
mcopy.arduino = {
	path : '',
	known: [
		'/dev/tty.usbmodem1a161', 
		'/dev/tty.usbserial-A800f8dk', 
		'/dev/tty.usbserial-A900cebm', 
		'/dev/tty.usbmodem1a131',
		'/dev/tty.usbserial-a900f6de',
		'/dev/tty.usbmodem1a141'
	],
	serial : {},
	baud : 57600,
	queue : {},
	timer : 0,
	lock : false
};
mcopy.arduino.init = function (callback) {
	mcopy.log('Searching for devices...');
	var cmd = 'ls /dev/tty.*';
	exec(cmd, function (e, std) {
		var devices = std.split('\n'),
			matches = [];
		devices.pop();
		for (var i = 0; i < devices.length; i++) {
			if (devices[i].indexOf('usbserial') !== -1
				||devices[i].indexOf('usbmodem') !== -1){
				matches.push(devices[i]);
			}
		}
		if (matches.length === 0) {
			mcopy.log('No devices found.');
			mcopy.gui.spinner(false);
			mcopy.gui.overlay(true);
			if (callback) { callback(false); }
		} else if (matches.length > 0) {
			mcopy.log('Found ' + matches[0]);
			mcopy.arduino.path = matches[0];
			//once connected to the arduino
			//start user interface
			if (callback) { callback(true); }
		}
	});
};
//commands which respond to a sent char
mcopy.arduino.send = function (cmd, res) {
	if (!mcopy.arduino.lock) {
		mcopy.arduino.lock = true;
		mcopy.arduino.queue[cmd] = res;
		setTimeout(function () {
			mcopy.arduino.serial.write(cmd, function (err, results) {
				if (err) { mcopy.log(err, 0); }
				mcopy.arduino.lock = false;
				mcopy.arduino.timer = new Date().getTime();
			});
		}, mcopy.cfg.arduino.serialDelay);
	}
};
//with same over serial when done
mcopy.arduino.end = function (data) {
	var end = new Date().getTime(),
		ms = end - mcopy.arduino.timer;
	if (mcopy.arduino.queue[data] !== undefined) {
		mcopy.arduino.lock = false;
		mcopy.log('Command ' + data + ' took ' + ms + 'ms');
		mcopy.arduino.queue[data](ms);

		mcopy.arduino.queue = {};
	} else {
		//console.log('Received stray "' + data + '" from ' + mcopy.arduino.path); //silent to user
	}
};
mcopy.arduino.connect = function (callback) {
	mcopy.log('Connecting to ' + mcopy.arduino.path + '...');
	mcopy.state.arduino = mcopy.arduino.path;
	mcopy.arduino.serial = new SerialPort(mcopy.arduino.path, {
	  baudrate: mcopy.cfg.arduino.baud,
	  parser: sp.parsers.readline("\n")
	});
	mcopy.arduino.serial.open(function (error) {
		if ( error ) {
			return mcopy.log('failed to open: '+ error, 0);
		} else {
			mcopy.log('Opened connection with ' + mcopy.arduino.path);
			mcopy.arduino.serial.on('data', function (data) {
				data = data.replace('\r', '');
				mcopy.arduino.end(data);
			});
			setTimeout(function () {
				mcopy.log('Verifying firmware...');
				mcopy.arduino.send(mcopy.cfg.arduino.cmd.connect, function () {
					mcopy.log('Firmware verified');
					mcopy.log('Optical printer ready!');
					if (callback) { callback(); }
				});
			}, 2000);
		}
	});
};

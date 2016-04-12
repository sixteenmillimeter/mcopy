var electron = require('electron'),
	fs = require('fs'),
	Menu = require('menu'),
	ipcMain = require('electron').ipcMain,
	app = electron.app,
	BrowserWindow = electron.BrowserWindow,
	uuid = require('node-uuid'),
	mcopy = {};

mcopy.cfg = JSON.parse(fs.readFileSync('./cfg.json', 'utf8'));
mcopy.arduino = require('./lib/mcopy-arduino.js')(mcopy.cfg);

var mainWindow;

var init = function () {
	createWindow();
	mcopy.arduino.init(function (success) {
		if (success) {
			mcopy.arduino.connect(function () {
				//
			});
		}
	});
};

var createMenu = function () {

};

var createWindow = function () {
	mainWindow = new BrowserWindow({width: 800, height: 600});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	//mainWindow.webContents.openDevTools();
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

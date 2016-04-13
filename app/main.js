var electron = require('electron'),
	fs = require('fs'),
	Menu = require('menu'),
	ipcMain = require('electron').ipcMain,
	app = electron.app,
	BrowserWindow = electron.BrowserWindow,
	uuid = require('node-uuid'),
	winston = require('winston'),
	moment = require('moment'),
	mcopy = {};

mcopy.cfg = JSON.parse(fs.readFileSync('./cfg.json', 'utf8'));
mcopy.arduino = require('./lib/mcopy-arduino.js')(mcopy.cfg);

var mainWindow;

var init = function () {
	'use strict';
	createWindow();
	log.init();
	setTimeout(function () {
		mcopy.arduino.init(function (err, device) {
			if (err) {
				log.info(err, 'SERIAL', false, true);
			} else {
				log.info('Found device ' + device, 'SERIAL', true, true);
				mcopy.arduino.connect(function () {
					log.info('Connected to device ' + device, 'SERIAL', true, true);
				});
			}
		});
	}, 1000);
};

var createMenu = function () {

};

var createWindow = function () {
	'use strict';
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
	light.set(arg);
	event.returnValue = true;
});

var light = {};

light.set = function (obj) {
	'use strict';
	var str = obj.rgb.join(',');
	mcopy.arduino.send(mcopy.cfg.arduino.cmd.light, function () {
		log.info('Light set to ' + str, 'LIGHT', true, true);
	});
	mcopy.arduino.string(str);
};

var log = {};
log.time = 'MM/DD/YY-HH:mm:ss';
log.transport = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: './logs/mcopy.log' })
	]
});
log.init = function () {
	'use strict';
	log.listen();
};
log.display = function (obj) {
	'use strict';
	mainWindow.webContents.send('log', obj);
};
log.listen = function () {
	'use strict';
	ipcMain.on('log', function (event, arg) {
		log.transport.info('renderer', arg);
		event.returnValue = true;
	});
};
log.info = function (action, service, status, display) {
	'use strict';
	var obj = {
		time : moment().format(log.time),
		action : action,
		service : service,
		status : status
	};
	log.transport.info('main', obj);
	if (display) {
		log.display(obj);
	}
};
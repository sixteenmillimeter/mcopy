
var electron = require('electron'),
	fs = require('fs'),
	Menu = require('menu'),
	MenuItem = require('menu-item'),
	ipcMain = require('electron').ipcMain,
	app = electron.app,
	winston = require('winston'),
	moment = require('moment'),
	BrowserWindow = electron.BrowserWindow,
	uuid = require('uuid'),
	Q = require('q'),
	events = require('events'),
	ee = new events.EventEmitter(),
	mcopy = {},
	mainWindow,
	mscript,
	arduino,
	projector,
	camera,
	capture = require('./lib/capture-report.js')(ee),
	log = {};

	console.log(process.version);

mcopy.cfg = {};
mcopy.cfgFile = './data/cfg.json';
mcopy.cfgInit = function () {
	'use strict';
	if (!fs.existsSync(mcopy.cfgFile)) {
		console.log('Using default configuration...');
		fs.writeFileSync(mcopy.cfgFile, fs.readFileSync('./data/cfg.json.default'));
	}
	mcopy.cfg = JSON.parse(fs.readFileSync(mcopy.cfgFile, 'utf8'));
};
mcopy.cfgStore = function () {
	'use strict';
	var data = JSON.stringify(mcopy.cfg);
	fs.writeFileSync(mcopy.cfgFile, data, 'utf8');
};

var enumerateDevices = function (err, devices) {
	'use strict';
	if (err) {
		log.info(err, 'SERIAL', false, true);
		arduino.fakeConnect('projector', function () {
			log.info('Connected to fake PROJECTOR device', 'SERIAL', true, true);
		});
		arduino.fakeConnect('camera', function () {
			log.info('Connected to fake CAMERA device', 'SERIAL', true, true);
		});
		devicesReady('fake', 'fake');
	} else {
		log.info('Found ' + devices.length + ' USB devices', 'SERIAL', true, true);
		distinguishDevices(devices);
	}
};

var distinguishDevice = function (device, callback) {
	'use strict';
	var connectCb = function (err, device) {
		if (err) {
			return console.error(err);
		}
		setTimeout(function () {
			arduino.verify(verifyCb);
		}, 2000);
	},
	verifyCb = function (err, success) {
		if (err) {
			return console.error(err);
		}
		setTimeout(function () {
			arduino.distinguish(distinguishCb);
		}, 1000);
	},
	distinguishCb = function (err, type) {
		if (err) {
			return console.error(err);
		}
		if (callback) { callback(err, type); }
	}
	arduino.connect('connect', device, true, connectCb);
};

//Cases for 1 or 2 arduinos connected
var distinguishDevices = function (devices) {
	'use strict';
	var distinguishOne = function (err, type) {
		arduino.close(function () {
			if (type === 'projector') {
				arduino.connect('projector', devices[0], false, function () {
					log.info('Connected to ' + devices[0] + ' as PROJECTOR', 'SERIAL', true, true);
				});
				if (devices.length === 1) {
					arduino.fakeConnect('camera', function () {
						log.info('Connected to fake CAMERA device', 'SERIAL', true, true);
						devicesReady(devices[0], 'fake');
					});
				}
			} else if (type === 'camera') {
				arduino.connect('camera', devices[0], false, function () {
					log.info('Connected to ' + devices[0] + ' as CAMERA', 'SERIAL', true, true);
				});
				if (devices.length === 1) {
					arduino.fakeConnect('projector', function () {
						log.info('Connected to fake PROJECTOR device', 'SERIAL', true, true);
						devicesReady('fake', devices[0]);
					});
				}
			}
			if (devices.length > 1) {
				distinguishDevice(devices[1], distinguishTwo);
			}
		});
	},
	distinguishTwo = function (err, type) {
		arduino.close(function () {
			if (type === 'projector') {
				arduino.connect('projector', devices[1], false, function () {
					log.info('Connected to ' + devices[1] + ' as PROJECTOR', 'SERIAL', true, true);
					devicesReady(devices[1], devices[0]);
				});
			} else if (type === 'camera') {
				arduino.connect('camera', devices[1], false, function () {
					log.info('Connected to ' + devices[1] + ' as CAMERA', 'SERIAL', true, true);
					devicesReady(devices[0], devices[1]);
				});
			}
		});
	};
	distinguishDevice(devices[0], distinguishOne);
};

var devicesReady = function (camera, projector) {
	'use strict';
	mainWindow.webContents.send('ready', {camera: camera, projector: projector });
};

var createMenu = function () {
	var template = [
	  {
	    label: 'mcopy',
	    submenu: [
	      {
	        label: 'About mcopy',
	        selector: 'orderFrontStandardAboutPanel:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Services',
	        submenu: []
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Hide mcopy',
	        accelerator: 'Command+H',
	        selector: 'hide:'
	      },
	      {
	        label: 'Hide Others',
	        accelerator: 'Command+Shift+H',
	        selector: 'hideOtherApplications:'
	      },
	      {
	        label: 'Show All',
	        selector: 'unhideAllApplications:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Quit',
	        accelerator: 'Command+Q',
	        selector: 'terminate:'
	      },
	    ]
	  },
	  {
	    label: 'Edit',
	    submenu: [
	      {
	        label: 'Undo',
	        accelerator: 'Command+Z',
	        selector: 'undo:'
	      },
	      {
	        label: 'Redo',
	        accelerator: 'Shift+Command+Z',
	        selector: 'redo:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Cut',
	        accelerator: 'Command+X',
	        selector: 'cut:'
	      },
	      {
	        label: 'Copy',
	        accelerator: 'Command+C',
	        selector: 'copy:'
	      },
	      {
	        label: 'Paste',
	        accelerator: 'Command+V',
	        selector: 'paste:'
	      },
	      {
	        label: 'Select All',
	        accelerator: 'Command+A',
	        selector: 'selectAll:'
	      }
	    ]
	  },
	  {
	    label: 'View',
	    submenu: [
	      {
	        label: 'Reload',
	        accelerator: 'Command+R',
	        click: function() { getCurrentWindow().reload(); }
	      },
	      {
	        label: 'Toggle DevTools',
	        accelerator: 'Alt+Command+I',
	        click: function() { getCurrentWindow().toggleDevTools(); }
	      },
	    ]
	  },
	  {
	    label: 'Window',
	    submenu: [
	      {
	        label: 'Minimize',
	        accelerator: 'Command+M',
	        selector: 'performMiniaturize:'
	      },
	      {
	        label: 'Close',
	        accelerator: 'Command+W',
	        selector: 'performClose:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Bring All to Front',
	        selector: 'arrangeInFront:'
	      }
	    ]
	  },
	  {
	    label: 'Help',
	    submenu: []
	  }
	];

	menu = Menu.buildFromTemplate(template);

	Menu.setApplicationMenu(menu);
};

var createWindow = function () {
	'use strict';
	mainWindow = new BrowserWindow({
		width: 800, 
		height: 600,
		minWidth : 800,
		minHeight : 600
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	//mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}

var light = {};
light.init = function () {
	'use strict';
	light.listen();
};
light.listen = function () {
	'use strict';
	ipcMain.on('light', function(event, arg) {
		light.set(arg.rgb, arg.id);
		event.returnValue = true;
	});
};
light.set = function (rgb, id) {
	'use strict';
	var str = rgb.join(',');
	arduino.send('projector', mcopy.cfg.arduino.cmd.light, function (ms) {
		light.end(rgb, id, ms);
	});
	arduino.string('projector', str);
};
light.end = function (rgb, id, ms) {
	'use strict';
	log.info('Light set to ' + rgb.join(','), 'LIGHT', true, true);
	mainWindow.webContents.send('light', {rgb: rgb, id : id, ms: ms});
};

var proj = {};
proj.state = {
	dir : true //default dir
};
proj.init = function () {
	'use strict';
	proj.listen();
};
proj.set = function (dir, id) {
	'use strict';
	var cmd;
	if (dir) {
		cmd = mcopy.cfg.arduino.cmd.proj_forward;
	} else {
		cmd = mcopy.cfg.arduino.cmd.proj_backward;
	}
	proj.state.dir = dir;
	arduino.send('projector', cmd, function (ms) {
		proj.end(cmd, id, ms);
	});
};
proj.move = function (frame, id) {
	'use strict';
	arduino.send('projector', mcopy.cfg.arduino.cmd.projector, function (ms) {
		proj.end(mcopy.cfg.arduino.cmd.projector, id, ms);
	});
};
proj.listen = function () {
	'use strict';
	ipcMain.on('proj', function (event, arg) {
		if (typeof arg.dir !== 'undefined') {
			proj.set(arg.dir, arg.id);
		} else if (typeof arg.frame !== 'undefined') {
			proj.move(arg.frame, arg.id);
		}
		event.returnValue = true;
	});
};
proj.end = function (cmd, id, ms) {
	'use strict';
	var message = '';
	if (cmd === mcopy.cfg.arduino.cmd.proj_forward) {
		message = 'Projector set to FORWARD';
	} else if (cmd === mcopy.cfg.arduino.cmd.proj_backward) {
		message = 'Projector set to BACKWARD';
	} else if (cmd === mcopy.cfg.arduino.cmd.projector) {
		message = 'Projector ';
		if (proj.state.dir) {
			message += 'ADVANCED';
		} else {
			message += 'REWOUND'
		}
		message += ' 1 frame';
	}
	log.info(message, 'PROJECTOR', true, true);
	mainWindow.webContents.send('proj', {cmd: cmd, id : id, ms: ms});
};

var cam = {};
cam.state = {
	dir : true //default dir
};
cam.init = function () {
	'use strict';
	cam.listen();
};
cam.set = function (dir, id) {
	'use strict';
	var cmd;
	if (dir) {
		cmd = mcopy.cfg.arduino.cmd.cam_forward;
	} else {
		cmd = mcopy.cfg.arduino.cmd.cam_backward;
	}
	cam.state.dir = dir;
	arduino.send('camera', cmd, function (ms) {
		cam.end(cmd, id, ms);
	});
};
cam.move = function (frame, id) {
	'use strict';
	arduino.send('camera', mcopy.cfg.arduino.cmd.camera, function (ms) {
		cam.end(mcopy.cfg.arduino.cmd.camera, id, ms);
	});
};
cam.listen = function () {
	'use strict';
	ipcMain.on('cam', function (event, arg) {
		if (typeof arg.dir !== 'undefined') {
			cam.set(arg.dir, arg.id);
		} else if (typeof arg.frame !== 'undefined') {
			cam.move(arg.frame, arg.id);
		}
		event.returnValue = true;
	});
};
cam.end = function (cmd, id, ms) {
	'use strict';
	var message = '';
	if (cmd === mcopy.cfg.arduino.cmd.cam_forward) {
		message = 'Camera set to FORWARD';
	} else if (cmd === mcopy.cfg.arduino.cmd.cam_backward) {
		message = 'Camera set to BACKWARD';
	} else if (cmd === mcopy.cfg.arduino.cmd.camera) {
		message = 'Camera ';
		if (cam.state.dir) {
			message += 'ADVANCED';
		} else {
			message += 'REWOUND'
		}
		message += ' 1 frame';
	}
	log.info(message, 'CAMERA', true, true);
	mainWindow.webContents.send('cam', {cmd: cmd, id : id, ms: ms});
};

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

var transfer = {};

transfer.init = function () {
	'use strict';
	transfer.listen();
};
transfer.listen = function () {
	'use strict';
	ipcMain.on('transfer', function (event, arg) {
		var res = '';
		//also turn on and off
		if (arg.action === 'enable') {
			capture.active = true;
			res = capture.active;
		} else if (arg.action === 'disable') {
			capture.active = false;
			res = capture.active;
		} else if (arg.action === 'start') {
			capture.start();
		} else if (arg.action === 'end') {
			res = capture.end();
		}
		event.returnValue = res;
	});
};

var init = function () {
	'use strict';
	mcopy.cfgInit();
	createWindow();
	//createMenu();
	log.init();
	light.init();
	proj.init();
	cam.init();

	transfer.init();
	capture.init();

	arduino = require('./lib/mcopy-arduino.js')(mcopy.cfg, ee);
	mscript = require('./lib/mscript.js');

	setTimeout(function () {
		arduino.enumerate(enumerateDevices);
	}, 1000);
};

app.on('ready', init);

app.on('window-all-closed', function () {
	//if (process.platform !== 'darwin') {
		app.quit();
	//}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});

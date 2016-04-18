var electron = require('electron'),
	fs = require('fs'),
	Menu = require('menu'),
	MenuItem = require('menu-item'),
	notifier = require('node-notifier'),
	ipcMain = require('electron').ipcMain,
	app = electron.app,
	BrowserWindow = electron.BrowserWindow,
	uuid = require('node-uuid'),
	winston = require('winston'),
	moment = require('moment'),
	Q = require('q'),
	mcopy = {},
	arduino;

mcopy.cfg = {};
mcopy.cfgFile = './data/cfg.json';
mcopy.cfgInit = function () {
	if (!fs.existsSync(mcopy.cfgFile)) {
		console.log('Using default configuration...');
		fs.writeFileSync(mcopy.cfgFile, fs.readFileSync('./data/cfg.json.default'));
	}
	mcopy.cfg = JSON.parse(fs.readFileSync(mcopy.cfgFile, 'utf8'));
};
mcopy.cfgStore = function () {
	var data = JSON.stringify(mcopy.cfg);
	fs.writeFileSync(mcopy.cfgFile, data, 'utf8');
};

var mainWindow;

var init = function () {
	'use strict';
	mcopy.cfgInit();
	createWindow();
	//createMenu();
	log.init();
	light.init();
	proj.init();
	cam.init();

	arduino = require('./lib/mcopy-arduino.js')(mcopy.cfg);
	setTimeout(function () {
		arduino.init(function (err, device) {
			if (err) {
				log.info(err, 'SERIAL', false, true);
				arduino.fakeConnect(function () {
					log.info('Connected to fake USB device', 'SERIAL', true, true);
				});
			} else {
				log.info('Found device ' + device, 'SERIAL', true, true);
				arduino.connect(function () {
					log.info('Connected to device ' + device, 'SERIAL', true, true);
				});
			}
		});
	}, 1000);
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
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}

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
	arduino.send(mcopy.cfg.arduino.cmd.light, function () {
		light.end(rgb, id);
	});
	arduino.string(str);
};
light.end = function (rgb, id) {
	'use strict';
	log.info('Light set to ' + rgb.join(','), 'LIGHT', true, true);
	mainWindow.webContents.send('light', {rgb: rgb, id : id});
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
	arduino.send(cmd, function (ms) {
		proj.end(cmd, id, ms);
	});
};
proj.move = function (frame, id) {
	'use strict';
	arduino.send(mcopy.cfg.arduino.cmd.projector, function (ms) {
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
	log.info(message, 'PROJ', true, true);
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
	arduino.send(cmd, function (ms) {
		cam.end(cmd, id, ms);
	});
};
cam.move = function (frame, id) {
	'use strict';
	arduino.send(mcopy.cfg.arduino.cmd.camera, function (ms) {
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
	log.info(message, 'CAM', true, true);
	mainWindow.webContents.send('cam', {cmd: cmd, id : id, ms: ms});
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
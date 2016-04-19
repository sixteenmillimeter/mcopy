var serialport = require('serialport'),
	SerialPort = serialport.SerialPort,
	exec = require('child_process').exec,
	mcopy = {};

/******
	Arduino handlers
*******/
mcopy.arduino = {
	path : {},
	known: [
		'/dev/tty.usbmodem1a161', 
		'/dev/tty.usbserial-A800f8dk', 
		'/dev/tty.usbserial-A900cebm', 
		'/dev/tty.usbmodem1a131',
		'/dev/tty.usbserial-a900f6de',
		'/dev/tty.usbmodem1a141'
	],
	serial : {
		connect : {},
		projector : {},
		camera : {}
	},
	baud : 57600,
	queue : {},
	timer : 0,
	lock : false
};
mcopy.arduino.enumerate = function (callback) {
	'use strict';
	console.log('Searching for devices...');
	var cmd = 'ls /dev/tty.*';
	exec(cmd, function (e, std) {
		var devices = std.split('\n'),
			matches = [];
		if (e) { return callback(e); }
		devices.pop();
		for (var i = 0; i < devices.length; i++) {
			if (devices[i].indexOf('usbserial') !== -1
				||devices[i].indexOf('usbmodem') !== -1){
				matches.push(devices[i]);
			}
		}
		if (matches.length === 0) {
			if (callback) { callback('No USB devices found'); }
		} else if (matches.length > 0) {
			if (callback) { callback(null, matches); }
		}
	});
};
//commands which respond to a sent char
mcopy.arduino.send = function (serial, cmd, res) {
	'use strict';
	if (!mcopy.arduino.lock) {
		mcopy.arduino.lock = true;
		mcopy.arduino.queue[cmd] = res;
		setTimeout(function () {
			mcopy.arduino.serial[serial].write(cmd, function (err, results) {
				if (err) { console.log(err); }
				mcopy.arduino.lock = false;
				mcopy.arduino.timer = new Date().getTime();
			});
		}, mcopy.cfg.arduino.serialDelay);
	}
};
//send strings, after char triggers firmware to accept
mcopy.arduino.string = function (serial, str) {
	'use strict';
	setTimeout(function () {
		if (typeof mcopy.arduino.serial[serial].fake !== 'undefined'
			&& mcopy.arduino.serial[serial].fake) {
			mcopy.arduino.serial[serial].string(str);
		} else {
			mcopy.arduino.serial[serial].write(str, function (err, results) {
				if (err) { console.log(err); }
				//console.log('sent: ' + str);
			});
		}
	}, mcopy.cfg.arduino.serialDelay);
};
//respond with same char over serial when done
mcopy.arduino.end = function (data) {
	'use strict';
	var end = new Date().getTime(),
		ms = end - mcopy.arduino.timer;
	if (mcopy.arduino.queue[data] !== undefined) {
		mcopy.arduino.lock = false;
		console.log('Command ' + data + ' took ' + ms + 'ms');
		mcopy.arduino.queue[data](ms); //execute callback
		delete mcopy.arduino.queue[data];
	} else {
		console.log('Received stray "' + data + '"'); //silent to user
	}
};
mcopy.arduino.connect = function (serial, device, confirm, callback) {
	'use strict';
	mcopy.arduino.path[serial] = device;
	mcopy.arduino.serial[serial] = new SerialPort(mcopy.arduino.path[serial], {
		baudrate: mcopy.cfg.arduino.baud,
		parser: serialport.parsers.readline("\n")
	}, false);
	mcopy.arduino.serial[serial].open(function (error) {
		if (error) {
			if (callback) { callback(error); }
			return console.log('failed to open: '+ error);
		} else {
			console.log('Opened connection with ' + mcopy.arduino.path[serial]);
			if (!confirm) {
				mcopy.arduino.serial[serial].on('data', function (data) {
					data = data.replace('\r', '');
					mcopy.arduino.end(data);
				});
			} else {
				mcopy.arduino.serial[serial].on('data', function (data) {
					data = data.replace('\r', '');
					mcopy.arduino.confirmEnd(data);
				});
			}
			if (callback) { 
				callback(null, mcopy.arduino.path[serial]); 
			}
		}
	});
};

mcopy.arduino.confirmExec = {};
mcopy.arduino.confirmEnd = function (data) {
	'use strict';
	if (data === mcopy.cfg.arduino.cmd.connect
		|| data === mcopy.cfg.arduino.cmd.proj_identifier
		|| data === mcopy.cfg.arduino.cmd.cam_identifier) {
		mcopy.arduino.confirmExec(null, data);
		mcopy.arduino.confirmExec = {};
	}
};
mcopy.arduino.verify = function (callback) {
	'use strict';
	mcopy.arduino.confirmExec = function (err, data) {
		if (data === mcopy.cfg.arduino.cmd.connect) {
			callback(null, true);
		}
	};
	setTimeout(function () {
		mcopy.arduino.serial['connect'].write(mcopy.cfg.arduino.cmd.connect, function (err, results) {
			if (err) { 
				return console.log(err); 
			}
		});
	}, mcopy.cfg.arduino.serialDelay);
};
mcopy.arduino.distinguish = function (callback) {
	'use strict';
	mcopy.arduino.confirmExec = function (err, data) {
		if (data === mcopy.cfg.arduino.cmd.proj_identifier) {
			callback(null, 'projector');
		} else if (data === mcopy.cfg.arduino.cmd.cam_identifier) {
			callback(null, 'camera');
		}
	};
	setTimeout(function () {
		mcopy.arduino.serial['connect'].write(mcopy.cfg.arduino.cmd.mcopy_identifier, function (err, results) {
			if (err) { 
				return console.log(err); 
			}
		});
	}, mcopy.cfg.arduino.serialDelay);
};

mcopy.arduino.close = function (callback) {
	'use strict';
	mcopy.arduino.serial['connect'].close(function (err) {
		if (callback) {
			callback(err);
		}
	});
};

mcopy.arduino.fakeConnect = function (serial, callback) {
	console.log('Connecting to fake arduino...');
	mcopy.arduino.serial[serial] = {
		write : function (cmd, res) {
			var t = {
					c : mcopy.cfg.arduino.cam.time + mcopy.cfg.arduino.cam.delay,
					p : mcopy.cfg.arduino.proj.time + mcopy.cfg.arduino.proj.delay
				},
				timeout = t[cmd];
				if (typeof timeout === 'undefined') timeout = 10;
				mcopy.arduino.timer = +new Date();
				setTimeout(function () {
					mcopy.arduino.end(cmd);
				}, timeout);
		}, 
		string : function (str) {
			//do nothing
			return true;
		},
		fake : true
	};
	console.log('Connected to fake arduino! Not real! Doesn\'t exist!');
	if (callback) callback();
};

if (typeof module !== 'undefined' && module.parent) {
	module.exports = function (cfg) {
		mcopy.cfg = cfg;
		return mcopy.arduino;
	}
}
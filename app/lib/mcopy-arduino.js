var serialport = require('serialport'),
	SerialPort = serialport.SerialPort,
	exec = require('child_process').exec,
	mcopy = {};

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
	'use strict';
	console.log('Searching for devices...');
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
			console.log('No devices found.');
			if (callback) { callback(false); }
		} else if (matches.length > 0) {
			console.log('Found ' + matches[0]);
			mcopy.arduino.path = matches[0];
			//once connected to the arduino
			//start user interface
			if (callback) { callback(true); }
		}
	});
};
//commands which respond to a sent char
mcopy.arduino.send = function (cmd, res) {
	'use strict';
	if (!mcopy.arduino.lock) {
		mcopy.arduino.lock = true;
		mcopy.arduino.queue[cmd] = res;
		setTimeout(function () {
			mcopy.arduino.serial.write(cmd, function (err, results) {
				if (err) { console.log(err); }
				mcopy.arduino.lock = false;
				mcopy.arduino.timer = new Date().getTime();
			});
		}, mcopy.cfg.arduino.serialDelay);
	}
};
//send strings, after char triggers firmware to accept
mcopy.arduino.string = function (str) {
	'use strict';
	setTimeout(function () {
		mcopy.arduino.serial.write(str, function (err, results) {
			if (err) { console.log(err); }
			//console.log('sent: ' + str);
		});
	}, mcopy.cfg.arduino.serialDelay);
};
//with same over serial when done
mcopy.arduino.end = function (data) {
	'use strict';
	var end = new Date().getTime(),
		ms = end - mcopy.arduino.timer;
	if (mcopy.arduino.queue[data] !== undefined) {
		mcopy.arduino.lock = false;
		console.log('Command ' + data + ' took ' + ms + 'ms');
		mcopy.arduino.queue[data](ms);
		delete mcopy.arduino.queue[data]; //add timestamp?
	} else {
		console.log('Received stray "' + data + '" from ' + mcopy.arduino.path); //silent to user
	}
};
mcopy.arduino.connect = function (callback) {
	'use strict';
	console.log('Connecting to ' + mcopy.arduino.path + '...');
	mcopy.arduino.serial = new SerialPort(mcopy.arduino.path, {
	  baudrate: mcopy.cfg.arduino.baud,
	  parser: serialport.parsers.readline("\n")
	}, false);
	mcopy.arduino.serial.open(function (error) {
		if (error) {
			return console.log('failed to open: '+ error);
		} else {
			console.log('Opened connection with ' + mcopy.arduino.path);
			mcopy.arduino.serial.on('data', function (data) {
				data = data.replace('\r', '');
				mcopy.arduino.end(data);
			});
			setTimeout(function () {
				console.log('Verifying firmware...');
				mcopy.arduino.send(mcopy.cfg.arduino.cmd.connect, function () {
					console.log('Firmware verified');
					console.log('Optical printer ready!');
					if (callback) { callback(); }
				});
			}, 2000);
		}
	});
};

if (typeof module !== 'undefined' && module.parent) {
	module.exports = function (cfg) {
		mcopy.cfg = cfg;
		return mcopy.arduino;
	}
}
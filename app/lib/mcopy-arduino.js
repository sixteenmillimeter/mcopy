'use strict'

const SerialPort = require('serialport')
const exec = require('child_process').exec
let eventEmitter

const mcopy = {}

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
		'/dev/tty.usbmodem1a141',
		'/dev/ttyACM0'
	],
	alias : {

	},
	serial : {
		connect : {},
		projector : {},
		camera : {},
		light : {}
	},
	baud : 57600,
	queue : {},
	timer : 0,
	lock : false
}

mcopy.arduino.enumerate = function (callback) {
	let matches = []
	SerialPort.list((err, ports) => {
		ports.forEach(port => {
			if (mcopy.arduino.known.indexOf(port.comName) !== -1) {
				matches.push(port.comName)
			} else if ((port.manufacturer + '').toLowerCase().indexOf('arduino') !== -1) {
				matches.push(port.comName)
			}
		})
		if (matches.length === 0) {
			if (callback) { callback('No USB devices found'); }
		} else if (matches.length > 0) {
			if (callback) { callback(null, matches); }
		}
	})
}

//commands which respond to a sent char
mcopy.arduino.send = function (serial, cmd, res) {
	const device = mcopy.arduino.alias[serial]
	if (!mcopy.arduino.lock) {
		mcopy.arduino.lock = true
		mcopy.arduino.queue[cmd] = res
		setTimeout(() => {
			mcopy.arduino.serial[device].write(cmd, (err, results) => {
				if (err) { console.log(err) }
				mcopy.arduino.lock = false
				mcopy.arduino.timer = new Date().getTime()
			})
		}, mcopy.cfg.arduino.serialDelay)
		eventEmitter.emit('arduino_send', cmd)
	}
};
//send strings, after char triggers firmware to accept
mcopy.arduino.string = function (serial, str) {
	const device = mcopy.arduino.alias[serial]
	setTimeout(function () {
		if (typeof mcopy.arduino.serial[device].fake !== 'undefined'
			&& mcopy.arduino.serial[device].fake) {
			mcopy.arduino.serial[device].string(str);
		} else {
			mcopy.arduino.serial[device].write(str, function (err, results) {
				if (err) { console.log(err); }
				//console.log('sent: ' + str);
			});
		}
	}, mcopy.cfg.arduino.serialDelay);
};
//respond with same char over serial when done
mcopy.arduino.end = function (data) {
	var end = new Date().getTime(),
		ms = end - mcopy.arduino.timer;
	if (mcopy.arduino.queue[data] !== undefined) {
		mcopy.arduino.lock = false;
		//console.log('Command ' + data + ' took ' + ms + 'ms');
		mcopy.arduino.queue[data](ms); //execute callback
		eventEmitter.emit('arduino_end', data);
		delete mcopy.arduino.queue[data];
	} else {
		console.log('Received stray "' + data + '"'); //silent to user
	}
};
mcopy.arduino.alias = function (serial, device) {
	console.log(`Making "${serial}" an alias of ${device}`)
	mcopy.arduino.alias[serial] = device
}
mcopy.arduino.connect = function (serial, device, confirm, callback) {
	mcopy.arduino.path[serial] = device;
	mcopy.arduino.alias[serial] = device;
	mcopy.arduino.serial[device] = new SerialPort(mcopy.arduino.path[serial], {
		autoOpen : false,
		baudrate: mcopy.cfg.arduino.baud,
		parser: SerialPort.parsers.readline("\n")
	});
	mcopy.arduino.serial[device].open(error => {
		if (error) {
			if (callback) { callback(error); }
			return console.log('failed to open: '+ error);
		} else {
			console.log(`Opened connection with ${mcopy.arduino.path[serial]} as ${serial}`);
			if (!confirm) {
				mcopy.arduino.serial[device].on('data', data => {
					data = data.replace('\r', '')
					mcopy.arduino.end(data)
				})
			} else {
				mcopy.arduino.serial[device].on('data', data => {
					data = data.replace('\r', '')
					mcopy.arduino.confirmEnd(data)
				})
			}
			if (callback) { 
				callback(null, mcopy.arduino.path[serial])
			}
		}
	});
};

mcopy.arduino.confirmExec = {};
mcopy.arduino.confirmEnd = function (data) {
	if (data === mcopy.cfg.arduino.cmd.connect
		|| data === mcopy.cfg.arduino.cmd.proj_identifier
		|| data === mcopy.cfg.arduino.cmd.cam_identifier
		|| data === mcopy.cfg.arduino.cmd.light_identifier
		|| data === mcopy.cfg.arduino.cmd.proj_light_identifier
		|| data === mcopy.cfg.arduino.cmd.proj_cam_light_identifier
		|| data === mcopy.cfg.arduino.cmd.proj_cam_identifier ) {
		mcopy.arduino.confirmExec(null, data);
		mcopy.arduino.confirmExec = {};
	}
};
mcopy.arduino.verify = function (callback) {
	const device = mcopy.arduino.alias['connect']
	mcopy.arduino.confirmExec = function (err, data) {
		if (data === mcopy.cfg.arduino.cmd.connect) {
			callback(null, true);
		}
	};
	setTimeout(function () {
		mcopy.arduino.serial[device].write(mcopy.cfg.arduino.cmd.connect, (err, results) => {
			if (err) { 
				return console.log(err); 
			}
		});
	}, mcopy.cfg.arduino.serialDelay);
};
mcopy.arduino.distinguish = function (callback) {
	const device = mcopy.arduino.alias['connect']
	mcopy.arduino.confirmExec = function (err, data) {
		if (data === mcopy.cfg.arduino.cmd.proj_identifier) {
			callback(null, 'projector');
		} else if (data === mcopy.cfg.arduino.cmd.cam_identifier) {
			callback(null, 'camera');
		} else if (data === mcopy.cfg.arduino.cmd.light_identifier) {
			callback(null, 'light')
		} else if (data === mcopy.cfg.arduino.cmd.proj_light_identifier) {
			callback(null, 'projector,light')
		} else if (data === mcopy.cfg.arduino.cmd.proj_cam_light_identifier) {
			callback(null, 'projector,camera,light')
		} else if (data === mcopy.cfg.arduino.cmd.proj_cam_identifier) {
			callback(null, 'projector,camera')
		}
	}
	setTimeout(function () {
		mcopy.arduino.serial[device].write(mcopy.cfg.arduino.cmd.mcopy_identifier, function (err, results) {
			if (err) { 
				return console.log(err); 
			}
		});
	}, mcopy.cfg.arduino.serialDelay);
}

mcopy.arduino.close = function (callback) {
	let device = mcopy.arduino.alias['connect']
	mcopy.arduino.serial[device].close((err) => {
		if (callback) {
			callback(err)
		}
	});
};

mcopy.arduino.fakeConnect = function (serial, callback) {
	//console.log('Connecting to fake arduino...');
	const device = '/dev/fake'
	mcopy.arduino.alias[serial] = device
	mcopy.arduino.serial[device] = {
		write : function (cmd, res) {
			var t = {
					c : mcopy.cfg.arduino.cam.time + mcopy.cfg.arduino.cam.delay,
					p : mcopy.cfg.arduino.proj.time + mcopy.cfg.arduino.proj.delay
				},
				timeout = t[cmd];
				if (typeof timeout === 'undefined') timeout = 10;
				mcopy.arduino.timer = +new Date();
				setTimeout(() => {
					mcopy.arduino.end(cmd)
				}, timeout)
		}, 
		string : function (str) {
			//do nothing
			return true
		},
		fake : true
	};
	//console.log('Connected to fake arduino! Not real! Doesn\'t exist!');
	if (callback) callback()
}

if (typeof module !== 'undefined' && module.parent) {
	module.exports = function (cfg, ee) {
		eventEmitter = ee
		mcopy.cfg = cfg
		return mcopy.arduino
	}
}
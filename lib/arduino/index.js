'use strict';
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const exec = require('child_process').exec;
const parser = new Readline('');
const newlineRe = new RegExp('\n', 'g');
const returnRe = new RegExp('\r', 'g');
let eventEmitter;
let cfg;
/**
 * Pause the process for X milliseconds in async/await functions
 *
 * @param  {integer}  ms 	milliseconds
 *
 * @returns {Promise} Resolves after wait
 **/
async function delay(ms) {
    return new Promise(resolve => {
        return setTimeout(resolve, ms);
    });
}
/**
 * Send a command to an Arduino using async/await
 *
 * @param  {string}  device 	Arduino identifier
 * @param  {string}  cmd 		Single character command to send
 *
 * @returns {Promise} Resolves after sending
 **/
async function send(device, cmd) {
    return new Promise((resolve, reject) => {
        arduino.queue[cmd] = (ms) => {
            return resolve(ms);
        };
        return arduino.serial[device].write(cmd, (err, results) => {
            if (err) {
                //console.error(err)
                return reject(err);
            }
            //
        });
    });
}
/**
 * Send a string to an Arduino using async/await
 *
 * @param  {string}  device 	Arduino identifier
 * @param  {string}  str		String to send
 *
 * @returns {Promise} Resolves after sending
 **/
async function write(device, str) {
    return new Promise((resolve, reject) => {
        arduino.serial[device].write(str, function (err, results) {
            if (err) {
                return reject(err);
            }
            //console.log('sent: ' + str)
            return resolve(results);
        });
    });
}
/**
 * Connect to an Arduino using async/await
 *
 * @param  {string}  device 	Arduino identifier
 *
 * @returns {Promise} Resolves after opening
 **/
async function openArduino(device) {
    return new Promise((resolve, reject) => {
        return arduino.serial[device].open(error => {
            if (error) {
                return reject(error);
            }
            return resolve(true);
        });
    });
}
/**
 * Close a connection to an Arduino using async/await
 *
 * @param  {string}  device 	Arduino identifier
 *
 * @returns {Promise} Resolves after closing
 **/
async function closeArduino(device) {
    return new Promise((resolve, reject) => {
        return arduino.serial[device].close((err) => {
            if (err) {
                return reject(err);
            }
            return resolve(true);
        });
    });
}
/******
    Arduino handlers
*******/
const arduino = {
    path: {},
    known: [
        '/dev/tty.usbmodem1a161',
        '/dev/tty.usbserial-A800f8dk',
        '/dev/tty.usbserial-A900cebm',
        '/dev/tty.usbmodem1a131',
        '/dev/tty.usbserial-a900f6de',
        '/dev/tty.usbmodem1a141',
        '/dev/ttyACM0',
        'COM3'
    ],
    alias: {},
    serial: {
        connect: {},
        projector: {},
        camera: {},
        light: {}
    },
    baud: 57600,
    queue: {},
    timer: 0,
    lock: false,
    locks: {}
};
arduino.enumerate = async function () {
    return new Promise((resolve, reject) => {
        return SerialPort.list((err, ports) => {
            let matches = [];
            if (err) {
                return reject(err);
            }
            ports.forEach(port => {
                if (arduino.known.indexOf(port.comName) !== -1) {
                    matches.push(port.comName);
                }
                else if ((port.manufacturer + '').toLowerCase().indexOf('arduino') !== -1) {
                    matches.push(port.comName);
                }
                else if ((port.comName + '').toLowerCase().indexOf('usbserial') !== -1) {
                    matches.push(port.comName);
                }
                else if ((port.comName + '').toLowerCase().indexOf('usbmodem') !== -1) {
                    matches.push(port.comName);
                }
            });
            if (matches.length === 0) {
                return reject('No USB devices found');
            }
            else if (matches.length > 0) {
                return resolve(matches);
            }
        });
    });
};
//commands which respond to a sent char
arduino.send = async function (serial, cmd, res) {
    const device = arduino.alias[serial];
    let results;
    if (arduino.locks[serial]) {
        return false;
    }
    arduino.locks[serial] = true;
    await delay(cfg.arduino.serialDelay);
    try {
        results = await send(device, cmd);
    }
    catch (e) {
        return console.error(e);
    }
    arduino.locks[serial] = false;
    arduino.timer = new Date().getTime();
    return await eventEmitter.emit('arduino_send', cmd);
};
//send strings, after char triggers firmware to accept
arduino.string = async function (serial, str) {
    const device = arduino.alias[serial];
    let writeSuccess;
    await delay(cfg.arduino.serialDelay);
    if (typeof arduino.serial[device].fake !== 'undefined'
        && arduino.serial[device].fake) {
        return arduino.serial[device].string(str);
    }
    else {
        try {
            writeSuccess = await write(device, str);
        }
        catch (e) {
            return console.error(e);
        }
        return writeSuccess;
    }
};
//respond with same char over serial when done
arduino.end = async function (serial, data) {
    const end = new Date().getTime();
    const ms = end - arduino.timer;
    let complete;
    if (arduino.queue[data] !== undefined) {
        arduino.locks[serial] = false;
        //console.log('Command ' + data + ' took ' + ms + 'ms');
        complete = arduino.queue[data](ms); //execute callback
        eventEmitter.emit('arduino_end', data);
        delete arduino.queue[data];
    }
    else {
        //console.log('Received stray "' + data + '"'); //silent to user
    }
    return complete;
};
arduino.alias = function (serial, device) {
    console.log(`Making "${serial}" an alias of ${device}`);
    arduino.alias[serial] = device;
};
arduino.connect = async function (serial, device, confirm) {
    return new Promise(async (resolve, reject) => {
        let connectSuccess;
        arduino.path[serial] = device;
        arduino.alias[serial] = device;
        arduino.serial[device] = new SerialPort(arduino.path[serial], {
            autoOpen: false,
            baudRate: cfg.arduino.baud,
            parser: parser
        });
        arduino.locks[device] = false;
        try {
            connectSuccess = await openArduino(device);
        }
        catch (e) {
            console.error('failed to open: ' + e);
            return reject(e);
        }
        console.log(`Opened connection with ${arduino.path[serial]} as ${serial}`);
        if (!confirm) {
            arduino.serial[device].on('data', async (data) => {
                let d = data.toString('utf8');
                d = d.replace(newlineRe, '').replace(returnRe, '');
                return await arduino.end(serial, d);
            });
        }
        else {
            arduino.serial[device].on('data', async (data) => {
                let d = data.toString('utf8');
                d = d.replace(newlineRe, '').replace(returnRe, '');
                return await arduino.confirmEnd(d);
            });
        }
        return resolve(arduino.path[serial]);
    });
};
arduino.confirmExec = {};
arduino.confirmEnd = function (data) {
    //console.dir(data)
    if (data === cfg.arduino.cmd.connect
        || data === cfg.arduino.cmd.proj_identifier
        || data === cfg.arduino.cmd.cam_identifier
        || data === cfg.arduino.cmd.light_identifier
        || data === cfg.arduino.cmd.proj_light_identifier
        || data === cfg.arduino.cmd.proj_cam_light_identifier
        || data === cfg.arduino.cmd.proj_cam_identifier) {
        arduino.confirmExec(null, data);
        arduino.confirmExec = {};
    }
};
arduino.verify = async function () {
    return new Promise(async (resolve, reject) => {
        const device = arduino.alias['connect'];
        let writeSuccess;
        arduino.confirmExec = function (err, data) {
            if (data === cfg.arduino.cmd.connect) {
                return resolve(true);
            }
            else {
                return reject('Wrong data returned');
            }
        };
        await delay(cfg.arduino.serialDelay);
        try {
            writeSuccess = await send(device, cfg.arduino.cmd.connect);
        }
        catch (e) {
            return reject(e);
        }
        return resolve(writeSuccess);
    });
};
arduino.distinguish = async function () {
    return new Promise(async (resolve, reject) => {
        const device = arduino.alias['connect'];
        let writeSuccess;
        let type;
        arduino.confirmExec = function (err, data) {
            if (data === cfg.arduino.cmd.proj_identifier) {
                type = 'projector';
            }
            else if (data === cfg.arduino.cmd.cam_identifier) {
                type = 'camera';
            }
            else if (data === cfg.arduino.cmd.light_identifier) {
                type = 'light';
            }
            else if (data === cfg.arduino.cmd.proj_light_identifier) {
                type = 'projector,light';
            }
            else if (data === cfg.arduino.cmd.proj_cam_light_identifier) {
                type = 'projector,camera,light';
            }
            else if (data === cfg.arduino.cmd.proj_cam_identifier) {
                type = 'projector,camera';
            }
            else if (data === cfg.ardino.cmd.proj_second_identifier) {
                type = 'projector_second';
            }
            return resolve(type);
        };
        await delay(cfg.arduino.serialDelay);
        try {
            writeSuccess = await send(device, cfg.arduino.cmd.mcopy_identifier);
        }
        catch (e) {
            console.error(e);
            return reject(e);
        }
    });
};
arduino.close = async function (callback) {
    const device = arduino.alias['connect'];
    let closeSuccess;
    try {
        closeSuccess = await closeArduino(device);
    }
    catch (e) {
        return console.error(e);
    }
    return closeSuccess;
};
arduino.fakeConnect = async function (serial) {
    //console.log('Connecting to fake arduino...');
    const device = '/dev/fake';
    arduino.alias[serial] = device;
    arduino.serial[device] = {
        write: function (cmd, cb) {
            const t = {
                c: cfg.arduino.cam.time + cfg.arduino.cam.delay,
                p: cfg.arduino.proj.time + cfg.arduino.proj.delay
            };
            let timeout = t[cmd];
            let end;
            if (typeof timeout === 'undefined')
                timeout = 10;
            arduino.timer = +new Date();
            setTimeout(() => {
                arduino.end(serial, cmd);
                return cb();
            }, timeout);
        },
        string: async function (str) {
            //do nothing
            return true;
        },
        fake: true
    };
    //console.log('Connected to fake arduino! Not real! Doesn\'t exist!');
    return true;
};
if (typeof module !== 'undefined' && module.parent) {
    module.exports = function (c, ee) {
        eventEmitter = ee;
        cfg = c;
        return arduino;
    };
}
//# sourceMappingURL=index.js.map
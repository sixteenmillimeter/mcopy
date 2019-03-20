'use strict';
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const exec = require('child_process').exec;
const parser = new Readline('');
const newlineRe = new RegExp('\n', 'g');
const returnRe = new RegExp('\r', 'g');
let eventEmitter;
let cfg;
let arduino;
const KNOWN = [
    '/dev/tty.usbmodem1a161',
    '/dev/tty.usbserial-A800f8dk',
    '/dev/tty.usbserial-A900cebm',
    '/dev/tty.usbmodem1a131',
    '/dev/tty.usbserial-a900f6de',
    '/dev/tty.usbmodem1a141',
    '/dev/ttyACM0',
    'COM3'
];
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
 * Class representing the arduino communication features
 **/
class Arduino {
    constructor() {
        this.path = {};
        this.known = KNOWN;
        this.alias = {};
        this.serial = { connect: {}, projector: {}, camera: {}, light: {} };
        this.baud = 57600;
        this.queue = {};
        this.timer = 0;
        this.lock = false;
        this.locks = {};
    }
    async enumerate() {
        return new Promise((resolve, reject) => {
            return SerialPort.list((err, ports) => {
                let matches = [];
                if (err) {
                    return reject(err);
                }
                ports.forEach((port) => {
                    if (this.known.indexOf(port.comName) !== -1) {
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
    }
    /**
     * Send a command to an Arduino using async/await
     *
     * @param  {string}  device 	Arduino identifier
     * @param  {string}  cmd 		Single character command to send
     *
     * @returns {Promise} Resolves after sending
     **/
    async sendAsync(device, cmd) {
        return new Promise((resolve, reject) => {
            this.queue[cmd] = (ms) => {
                return resolve(ms);
            };
            return this.serial[device].write(cmd, (err, results) => {
                if (err) {
                    //console.error(err)
                    return reject(err);
                }
                //
            });
        });
    }
    async send(serial, cmd) {
        const device = this.alias[serial];
        let results;
        if (this.locks[serial]) {
            return false;
        }
        this.locks[serial] = true;
        await delay(cfg.arduino.serialDelay);
        try {
            results = await this.sendAsync(device, cmd);
        }
        catch (e) {
            return console.error(e);
        }
        this.locks[serial] = false;
        this.timer = new Date().getTime();
        return await eventEmitter.emit('arduino_send', cmd);
    }
    async string(serial, str) {
        const device = this.alias[serial];
        let writeSuccess;
        await delay(cfg.arduino.serialDelay);
        if (typeof this.serial[device].fake !== 'undefined'
            && this.serial[device].fake) {
            return this.serial[device].string(str);
        }
        else {
            try {
                writeSuccess = await this.writeAsync(device, str);
            }
            catch (e) {
                return console.error(e);
            }
            return writeSuccess;
        }
    }
    /**
     * Send a string to an Arduino using async/await
     *
     * @param  {string}  device 	Arduino identifier
     * @param  {string}  str		String to send
     *
     * @returns {Promise} Resolves after sending
     **/
    async writeAsync(device, str) {
        return new Promise((resolve, reject) => {
            this.serial[device].write(str, function (err, results) {
                if (err) {
                    return reject(err);
                }
                //console.log('sent: ' + str)
                return resolve(results);
            });
        });
    }
    end(serial, data) {
        const end = new Date().getTime();
        const ms = end - this.timer;
        let complete;
        if (this.queue[data] !== undefined) {
            this.locks[serial] = false;
            //console.log('Command ' + data + ' took ' + ms + 'ms');
            complete = this.queue[data](ms); //execute callback
            eventEmitter.emit('arduino_end', data);
            delete this.queue[data];
        }
        else {
            //console.log('Received stray "' + data + '"'); //silent to user
        }
        return complete;
    }
    aliasSerial(serial, device) {
        console.log(`Making "${serial}" an alias of ${device}`);
        this.alias[serial] = device;
    }
    async connect(serial, device, confirm) {
        return new Promise(async (resolve, reject) => {
            let connectSuccess;
            this.path[serial] = device;
            this.alias[serial] = device;
            this.serial[device] = new SerialPort(this.path[serial], {
                autoOpen: false,
                baudRate: cfg.arduino.baud,
                parser: parser
            });
            this.locks[device] = false;
            try {
                connectSuccess = await this.openArduino(device);
            }
            catch (e) {
                console.error('failed to open: ' + e);
                return reject(e);
            }
            console.log(`Opened connection with ${this.path[serial]} as ${serial}`);
            if (!confirm) {
                this.serial[device].on('data', async (data) => {
                    let d = data.toString('utf8');
                    d = d.replace(newlineRe, '').replace(returnRe, '');
                    return this.end(serial, d);
                });
            }
            else {
                this.serial[device].on('data', async (data) => {
                    let d = data.toString('utf8');
                    d = d.replace(newlineRe, '').replace(returnRe, '');
                    return await this.confirmEnd(d);
                });
            }
            return resolve(this.path[serial]);
        });
    }
    confirmEnd(data) {
        //console.dir(data)
        if (data === cfg.arduino.cmd.connect
            || data === cfg.arduino.cmd.proj_identifier
            || data === cfg.arduino.cmd.cam_identifier
            || data === cfg.arduino.cmd.light_identifier
            || data === cfg.arduino.cmd.proj_light_identifier
            || data === cfg.arduino.cmd.proj_cam_light_identifier
            || data === cfg.arduino.cmd.proj_cam_identifier
            || data === cfg.arduino.cmd.proj_second_identifier
            || data === cfg.arduino.cmd.proj_dual_identifier
            || data === cfg.arduino.cmd.proj_second_forward
            || data === cfg.arduino.cmd.proj_second_backward
            || data === cfg.arduino.cmd.projector_second
            || data === cfg.arduino.cmd.projectors
            || data === cfg.arduino.cmd.cam_second_identifier
            || data === cfg.arduino.cmd.cam_dual_identifier
            || data === cfg.arduino.cmd.cam_second_forward
            || data === cfg.arduino.cmd.cam_second_backward
            || data === cfg.arduino.cmd.camera_second
            || data === cfg.arduino.cmd.cameras) {
            this.confirmExec(null, data);
            this.confirmExec = {};
        }
    }
    async verify() {
        return new Promise(async (resolve, reject) => {
            const device = this.alias['connect'];
            let writeSuccess;
            this.confirmExec = function (err, data) {
                if (data === cfg.arduino.cmd.connect) {
                    return resolve(true);
                }
                else {
                    return reject('Wrong data returned');
                }
            };
            await delay(cfg.arduino.serialDelay);
            try {
                writeSuccess = await this.sendAsync(device, cfg.arduino.cmd.connect);
            }
            catch (e) {
                return reject(e);
            }
            return resolve(writeSuccess);
        });
    }
    async distinguish() {
        return new Promise(async (resolve, reject) => {
            const device = this.alias['connect'];
            let writeSuccess;
            let type;
            this.confirmExec = function (err, data) {
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
                else if (data === cfg.ardino.cmd.proj_dual_identifier) {
                    type = 'projector,projector_second';
                }
                else if (data === cfg.ardino.cmd.cam_second_identifier) {
                    type = 'camera_second';
                }
                else if (data === cfg.ardino.cmd.cam_dual_identifier) {
                    type = 'camera,camera_second';
                }
                //camera,projector,projector_second
                //camera,camera_second,projector
                //camera,camera_second,projector,projector_second
                return resolve(type);
            };
            await delay(cfg.arduino.serialDelay);
            try {
                writeSuccess = await this.sendAsync(device, cfg.arduino.cmd.mcopy_identifier);
            }
            catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    }
    async close() {
        const device = this.alias['connect'];
        let closeSuccess;
        try {
            closeSuccess = await this.closeArduino(device);
        }
        catch (e) {
            return console.error(e);
        }
        return closeSuccess;
    }
    ;
    async fakeConnect(serial) {
        //console.log('Connecting to fake arduino...');
        const device = '/dev/fake';
        this.alias[serial] = device;
        this.serial[device] = {
            write: async function (cmd, cb) {
                const t = {
                    c: cfg.arduino.cam.time + cfg.arduino.cam.delay,
                    p: cfg.arduino.proj.time + cfg.arduino.proj.delay
                };
                let timeout = t[cmd];
                if (typeof timeout === 'undefined')
                    timeout = 10;
                arduino.timer = +new Date();
                await delay(timeout);
                arduino.end(serial, cmd);
                return cb();
            },
            string: async function (str) {
                //do nothing
                return true;
            },
            fake: true
        };
        //console.log('Connected to fake arduino! Not real! Does not exist!');
        return true;
    }
    /**
     * Connect to an Arduino using async/await
     *
     * @param  {string}  device 	Arduino identifier
     *
     * @returns {Promise} Resolves after opening
     **/
    async openArduino(device) {
        return new Promise((resolve, reject) => {
            return this.serial[device].open((err) => {
                if (err) {
                    return reject(err);
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
    async closeArduino(device) {
        return new Promise((resolve, reject) => {
            return this.serial[device].close((err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    }
}
if (typeof module !== 'undefined' && module.parent) {
    module.exports = function (c, ee) {
        eventEmitter = ee;
        cfg = c;
        arduino = new Arduino();
        return arduino;
    };
}
//# sourceMappingURL=index.js.map
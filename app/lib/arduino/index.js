'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 2023-07-16 Clarification
 *
 * Previous versions of this script intermingled and even
 * swapped the usage of the terms 'serial' and 'device'.
 * From here on out, the terms will be used as such:
 *
 * serial - a hardware address of a serial port
 * device - common name of a type of mcopy device (eg. camera,
 * projector, light) that is aliased to a serial port
 *
 **/
//import Log = require('log');
const delay_1 = require("delay");
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const exec = require('child_process').exec;
const parser = new ReadlineParser({ delimiter: '\r\n' });
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
 * Class representing the arduino communication features
 **/
class Arduino {
    constructor(errorState) {
        this.path = {};
        this.known = KNOWN;
        this.alias = {};
        this.serial = {};
        this.hasState = {};
        this.baud = 57600;
        this.queue = {};
        this.timer = 0;
        this.locks = {};
        this.stateStr = {};
        this.errorState = errorState;
        this.init();
    }
    async init() {
        const Log = require('log');
        this.log = await Log({ label: 'arduino' });
    }
    /**
     * Enumerate all connected devices that might be Arduinos
     *
     * @returns {Promise} Resolves after enumerating
     **/
    async enumerate() {
        let ports;
        let matches = [];
        try {
            ports = await SerialPort.list();
        }
        catch (err) {
            throw err;
        }
        this.log.info('Available ports:');
        this.log.info(ports.map((port) => { return port.path; }).join(','));
        ports.forEach((port) => {
            if (this.known.indexOf(port.path) !== -1) {
                matches.push(port.path);
            }
            else if ((port.manufacturer + '').toLowerCase().indexOf('arduino') !== -1) {
                matches.push(port.path);
            }
            else if ((port.path + '').toLowerCase().indexOf('usbserial') !== -1) {
                matches.push(port.path);
            }
            else if ((port.path + '').toLowerCase().indexOf('usbmodem') !== -1) {
                matches.push(port.path);
            }
            else if ((port.path + '').toLowerCase().indexOf('ttyusb') !== -1) {
                matches.push(port.path);
            }
        });
        if (matches.length === 0) {
            throw new Error('No USB devices found');
        }
        else if (matches.length > 0) {
            return matches;
        }
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
            this.log.info(`sendAsync ${cmd} -> ${device}`);
            this.queue[cmd] = (ms) => {
                return resolve(ms);
            };
            this.log.info(`Device: ${device}`);
            return this.serial[this.alias[device]].write(cmd, (err, results) => {
                if (err) {
                    //this.log.error(err)
                    return reject(err);
                }
            });
        });
    }
    /**
     *
     **/
    async send(device, cmd) {
        const serial = this.alias[device];
        let ms;
        this.log.info(`send ${cmd} -> ${device}`);
        if (this.isLocked(serial)) {
            this.log.warn(`send Serial ${serial} is locked`);
            return null;
        }
        this.timer = new Date().getTime();
        this.lock(serial);
        await delay_1.delay(cfg.arduino.serialDelay);
        try {
            ms = await this.sendAsync(device, cmd);
        }
        catch (e) {
            return this.log.error(e);
        }
        this.unlock(serial);
        await eventEmitter.emit('arduino_send', cmd);
        return ms;
    }
    /**
     *
     **/
    async sendString(device, str) {
        let writeSuccess;
        await delay_1.delay(cfg.arduino.serialDelay);
        if (typeof this.serial[this.alias[device]].fake !== 'undefined'
            && this.serial[this.alias[device]].fake) {
            return this.serial[this.alias[device]].string(str);
        }
        else {
            this.log.info(`sendString ${str} -> ${device}`);
            try {
                writeSuccess = await this.writeAsync(device, str);
            }
            catch (e) {
                return this.log.error(e);
            }
            this.unlock(this.alias[device]);
            return writeSuccess;
        }
    }
    /**
     *
     **/
    async stateAsync(device, confirm = false) {
        const cmd = cfg.arduino.cmd.state;
        const serial = confirm ? this.alias['connect'] : this.alias[device];
        return new Promise((resolve, reject) => {
            this.queue[cmd] = (state) => {
                this.stateStr[device] = state;
                if (confirm) {
                    this.hasState[device] = true;
                    this.log.info(`Device ${device} supports state [${state}]`);
                }
                return resolve(state);
            };
            if (confirm) {
                setTimeout(function () {
                    if (typeof this.queue[cmd] !== 'undefined') {
                        delete this.queue[cmd];
                        this.hasState[device] = false;
                        this.log.info(`Device ${device} does not support state`);
                        return resolve(null);
                    }
                }.bind(this), 1000);
            }
            this.log.info(`stateAsync ${cmd} -> ${device}`);
            return this.serial[serial].write(cmd, (err, results) => {
                if (err) {
                    //this.log.error(err)
                    return reject(err);
                }
            });
        });
    }
    /**
     *
     **/
    async state(device, confirm = false) {
        const serial = confirm ? this.alias['connect'] : this.alias[device];
        let results;
        if (this.isLocked(serial)) {
            this.log.warn(`state Serial ${serial} is locked`);
            return null;
        }
        this.timer = new Date().getTime();
        this.lock(serial);
        await delay_1.delay(cfg.arduino.serialDelay);
        try {
            results = await this.stateAsync(device, confirm);
        }
        catch (e) {
            return this.log.error(e);
        }
        this.unlock(serial);
        await eventEmitter.emit('arduino_state', cfg.arduino.cmd.state);
        return results;
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
            this.serial[this.alias[device]].write(str, function (err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
    /**
     *
     **/
    end(serial, data) {
        const end = new Date().getTime();
        const ms = end - this.timer;
        let complete;
        //this.log.info(`end ${serial} -> ${data}`)
        if (this.queue[data] !== undefined) {
            this.unlock(serial);
            complete = this.queue[data](ms); //execute callback
            eventEmitter.emit('arduino_end', data);
            delete this.queue[data];
        }
        else if (data[0] === cfg.arduino.cmd.state) {
            //this.log.info(`end serial -> ${serial}`)
            this.unlock(serial);
            complete = this.queue[cfg.arduino.cmd.state](data);
            eventEmitter.emit('arduino_end', data);
            delete this.queue[cfg.arduino.cmd.state];
            return data;
        }
        else if (data[0] === cfg.arduino.cmd.error) {
            this.log.error(`Received error from device ${serial}`);
            this.unlock(serial);
            //error state
            //stop sequence
            //throw error in ui
        }
        else {
            //this.log.info('Received stray "' + data + '"') //silent to user
        }
        return ms;
    }
    aliasSerial(device, serial) {
        //this.log.info(`Making "${serial}" an alias of ${device}`)
        this.alias[device] = serial;
    }
    async connect(device, serial, confirm) {
        //this.log.info(`connect device ${device}`)
        //this.log.info(`connect serial ${serial}`)
        return new Promise(async (resolve, reject) => {
            let connectSuccess;
            this.path[device] = serial;
            this.aliasSerial(device, serial);
            this.serial[serial] = new SerialPort({
                path: serial,
                autoOpen: false,
                baudRate: cfg.arduino.baud,
                parser
            });
            this.unlock(serial);
            try {
                connectSuccess = await this.openArduino(device);
            }
            catch (e) {
                this.log.error('failed to open: ' + e);
                return reject(e);
            }
            this.log.info(`Opened connection with ${this.path[device]} as ${device}`);
            if (!confirm) {
                this.serial[this.alias[device]].on('data', async (data) => {
                    let d = data.toString('utf8');
                    d = d.replace(newlineRe, '').replace(returnRe, '');
                    return this.end(serial, d);
                });
            }
            else {
                this.serial[this.alias[device]].on('data', async (data) => {
                    let d = data.toString('utf8');
                    d = d.replace(newlineRe, '').replace(returnRe, '');
                    return await this.confirmEnd(d);
                });
            }
            return resolve(this.path[serial]);
        });
    }
    confirmEnd(data) {
        if (data === cfg.arduino.cmd.connect
            || data === cfg.arduino.cmd.projector_identifier
            || data === cfg.arduino.cmd.camera_identifier
            || data === cfg.arduino.cmd.light_identifier
            || data === cfg.arduino.cmd.projector_light_identifier
            || data === cfg.arduino.cmd.projector_camera_light_identifier
            || data === cfg.arduino.cmd.projector_camera_identifier
            || data === cfg.arduino.cmd.projector_second_identifier
            || data === cfg.arduino.cmd.projectors_identifier
            || data === cfg.arduino.cmd.projector_second_forward
            || data === cfg.arduino.cmd.projector_second_backward
            || data === cfg.arduino.cmd.projector_second
            || data === cfg.arduino.cmd.projectors
            || data === cfg.arduino.cmd.camera_second_identifier
            || data === cfg.arduino.cmd.cameras_identifier
            || data === cfg.arduino.cmd.camera_second_forward
            || data === cfg.arduino.cmd.camera_second_backward
            || data === cfg.arduino.cmd.camera_second
            || data === cfg.arduino.cmd.cameras
            || data === cfg.arduino.cmd.capper_identifier
            || data === cfg.arduino.cmd.camera_capper_identifier
            || data === cfg.arduino.cmd.camera_capper_projector_identifier
            || data === cfg.arduino.cmd.camera_capper_projectors_identifier) {
            this.confirmExec(null, data);
            this.confirmExec = {};
            this.unlock(this.alias['connect']);
        }
        else if (data[0] === cfg.arduino.cmd.state) {
            this.queue[cfg.arduino.cmd.state](data);
            delete this.queue[cfg.arduino.cmd.state];
            this.unlock(this.alias['connect']);
        }
    }
    async verify() {
        return new Promise(async (resolve, reject) => {
            const device = 'connect';
            let writeSuccess;
            this.confirmExec = function (err, data) {
                if (data === cfg.arduino.cmd.connect) {
                    return resolve(true);
                }
                else {
                    return reject('Wrong data returned');
                }
            };
            await delay_1.delay(cfg.arduino.serialDelay);
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
            const device = 'connect';
            let writeSuccess;
            let type;
            this.confirmExec = function (err, data) {
                if (data === cfg.arduino.cmd.projector_identifier) {
                    type = 'projector';
                }
                else if (data === cfg.arduino.cmd.camera_identifier) {
                    type = 'camera';
                }
                else if (data === cfg.arduino.cmd.light_identifier) {
                    type = 'light';
                }
                else if (data === cfg.arduino.cmd.projector_light_identifier) {
                    type = 'projector,light';
                }
                else if (data === cfg.arduino.cmd.projector_camera_light_identifier) {
                    type = 'projector,camera,light';
                }
                else if (data === cfg.arduino.cmd.projector_camera_identifier) {
                    type = 'projector,camera';
                }
                else if (data === cfg.arduino.cmd.projector_second_identifier) {
                    type = 'projector_second';
                }
                else if (data === cfg.arduino.cmd.projectors_identifier) {
                    type = 'projector,projector_second';
                }
                else if (data === cfg.arduino.cmd.camera_second_identifier) {
                    type = 'camera_second';
                }
                else if (data === cfg.arduino.cmd.cameras_identifier) {
                    type = 'camera,camera_second';
                }
                else if (data === cfg.arduino.cmd.camera_projectors_identifier) {
                    type = 'camera,projector,projector_second';
                }
                else if (data === cfg.arduino.cmd.cameras_projector_identifier) {
                    type = 'camera,camera_second,projector';
                }
                else if (data === cfg.arduino.cmd.cameras_projectors_identifier) {
                    type = 'camera,camera_second,projector,projector_second';
                }
                else if (data === cfg.arduino.cmd.capper_identifier) {
                    type = 'capper';
                }
                else if (data === cfg.arduino.cmd.camera_capper_identifier) {
                    type = 'camera,capper';
                }
                else if (data === cfg.arduino.cmd.camera_capper_projector_identifier) {
                    type = 'camera,capper,projector';
                }
                else if (data === cfg.arduino.cmd.camera_capper_projectors_identifier) {
                    type = 'camera,capper,projector,projector_second';
                }
                return resolve(type);
            };
            await delay_1.delay(cfg.arduino.serialDelay);
            try {
                writeSuccess = await this.sendAsync(device, cfg.arduino.cmd.mcopy_identifier);
                this.log.info(writeSuccess);
            }
            catch (e) {
                return reject(e);
            }
        });
    }
    async close() {
        const device = 'connect';
        let closeSuccess;
        try {
            closeSuccess = await this.closeArduino(device);
        }
        catch (e) {
            throw e;
        }
        return closeSuccess;
    }
    async fakeConnect(device) {
        const serial = '/dev/fake';
        this.aliasSerial(device, serial);
        this.serial[serial] = {
            write: async function (cmd, cb) {
                const t = {
                    c: cfg.arduino.cam.time + cfg.arduino.cam.delay,
                    p: cfg.arduino.proj.time + cfg.arduino.proj.delay,
                    A: 180,
                    B: 180
                };
                let timeout = t[cmd];
                if (typeof timeout === 'undefined')
                    timeout = 10;
                arduino.timer = +new Date();
                await delay_1.delay(timeout);
                arduino.end(serial, cmd);
                return cb();
            },
            string: async function (str) {
                //do nothing
                return true;
            },
            fake: true
        };
        //this.log.info('Connected to fake arduino! Not real! Does not exist!')
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
            return this.serial[this.alias[device]].open((err) => {
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
            return this.serial[this.alias[device]].close((err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    }
    lock(serial) {
        //this.log.info(`Locked serial ${serial}`)
        this.locks[serial] = true;
    }
    unlock(serial) {
        //this.log.info(`Unlocked serial ${serial}`)
        this.locks[serial] = false;
    }
    isLocked(serial) {
        return typeof this.locks[serial] !== 'undefined' && this.locks[serial] === true;
    }
}
if (typeof module !== 'undefined' && module.parent) {
    module.exports = function (c, ee, errorState) {
        eventEmitter = ee;
        cfg = c;
        arduino = new Arduino(errorState);
        return arduino;
    };
}
//# sourceMappingURL=index.js.map
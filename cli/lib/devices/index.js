'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const delay = require("delay");
const Log = require("log");
/**
 * class representing the device discovery features
 *
 *
 **/
class Devices {
    /**
     *
     **/
    constructor(arduino, settings, mainWindow, cam) {
        this.connected = {};
        this.arduino = arduino;
        this.settings = settings;
        this.mainWindow = mainWindow;
        this.ui = this.mainWindow.webContents;
        this.cam = cam;
        this.init();
    }
    /**
     *
     **/
    async init() {
        this.log = await Log({ label: 'devices' });
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    /**
     *
     **/
    listen() {
        this.ipc.on('profile', this.listener.bind(this));
    }
    /**
     *
     **/
    listener(event, arg) {
        this.log.info(`Saving profile ${arg.profile}`, 'SETTINGS', false, false);
        this.settings.update('profile', arg.profile);
        this.settings.save();
    }
    /**
     *
     **/
    async enumerate() {
        let devices;
        try {
            devices = await this.arduino.enumerate();
        }
        catch (err) {
            this.log.warn(err, 'SERIAL', false, true);
            await delay(1000);
            return this.all([]);
        }
        this.log.info(`Found ${devices.length} USB devices`, 'SERIAL', true, true);
        devices = this.favor(devices);
        return await this.all(devices);
    }
    /**
     *
     **/
    favor(devices) {
        const past = this.settings.state.devices.filter((device) => {
            if (device.arduino) {
                return device;
            }
        }).map((device) => {
            return device.arduino;
        });
        if (past.length === 0) {
            return devices;
        }
        devices.sort((a, b) => {
            if (past.indexOf(a) !== -1 && past.indexOf(b) === -1) {
                return 1;
            }
            else if (past.indexOf(a) === -1 && past.indexOf(b) !== -1) {
                return -1;
            }
            return 0;
        });
        return devices;
    }
    /**
     *
     **/
    async distinguish(device) {
        let connectSuccess;
        let verifySuccess;
        let type;
        try {
            connectSuccess = await this.arduino.connect('connect', device, true);
        }
        catch (err) {
            this.log.error('Error connecting', err);
            return null;
        }
        await delay(2000);
        try {
            verifySuccess = await this.arduino.verify();
        }
        catch (err) {
            this.log.error('Error verifying device', err);
            return null;
        }
        this.log.info(`Verified ${device} as mcopy device`, 'SERIAL', true, true);
        await delay(1000);
        try {
            type = await this.arduino.distinguish();
        }
        catch (err) {
            this.log.error('Error distinguishing device', err);
            return null;
        }
        this.remember('arduino', device, type);
        this.log.info(`Determined ${device} to be ${type}`, 'SERIAL', true, true);
        return type;
    }
    /**
     *
     **/
    async fakeProjector() {
        this.connected.projector = '/dev/fake';
        try {
            await this.arduino.fakeConnect('projector');
        }
        catch (err) {
            console.error(err);
            this.log.error(`Error connecting to fake PRONECTOR device`, 'SERIAL', true, true);
            return false;
        }
        this.log.info('Connected to fake PROJECTOR device', 'SERIAL', true, true);
        return true;
    }
    /**
 *
 **/
    async fakeCamera() {
        this.connected.camera = '/dev/fake';
        try {
            await this.arduino.fakeConnect('camera');
        }
        catch (err) {
            console.error(err);
            this.log.error(`Error connecting to fake CAMERA device`, 'SERIAL', true, true);
            return false;
        }
        this.log.info('Connected to fake CAMERA device', 'SERIAL', true, true);
        return true;
    }
    /**
     *
     **/
    async fakeLight() {
        this.connected.light = '/dev/fake';
        try {
            await this.arduino.fakeConnect('light');
        }
        catch (err) {
            console.error(err);
            this.log.error(`Error connecting to fake LIGHT device`, 'SERIAL', true, true);
            return false;
        }
        this.log.info('Connected to fake LIGHT device', 'SERIAL', true, true);
        return true;
    }
    /**
    *
    **/
    async connectDevice(device, type) {
        let closeSuccess;
        let connectSuccess;
        try {
            closeSuccess = await this.arduino.close();
        }
        catch (err) {
            this.log.error('Error closing arduino connection', err);
            return false;
        }
        if (type === 'projector') {
            this.connected.projector = device;
            try {
                connectSuccess = await this.arduino.connect('projector', device, false);
            }
            catch (err) {
                this.log.error('Error connecting to projector', err);
                return false;
            }
            this.log.info(`Connected to ${device} as PROJECTOR`, 'SERIAL', true, true);
        }
        else if (type === 'camera') {
            this.connected.camera = device;
            try {
                connectSuccess = await this.arduino.connect('camera', device, false);
            }
            catch (err) {
                this.log.error('Error connecting to camera', err);
                return false;
            }
            this.log.info(`Connected to ${device} as CAMERA`, 'SERIAL', true, true);
        }
        else if (type === 'light') {
            this.connected.light = device;
            try {
                connectSuccess = await this.arduino.connect('light', device, false);
            }
            catch (err) {
                this.log.error('Error connecting to light', err);
                return false;
            }
            this.log.info(`Connected to ${device} as LIGHT`, 'SERIAL', true, true);
        }
        else if (type === 'projector,light') {
            this.connected.projector = device;
            this.connected.light = device;
            this.arduino.aliasSerial('light', device);
            try {
                connectSuccess = await this.arduino.connect('projector', device, false);
            }
            catch (err) {
                this.log.error('Error connecting to projector and light', err);
                return false;
            }
            this.log.info(`Connected to ${device} as PROJECTOR + LIGHT`, 'SERIAL', true, true);
        }
        else if (type === 'projector,camera,light') {
            this.connected.projector = device;
            this.connected.camera = device;
            this.connected.light = device;
            this.arduino.aliasSerial('camera', device);
            this.arduino.aliasSerial('light', device);
            try {
                connectSuccess = await this.arduino.connect('projector', device, false);
            }
            catch (err) {
                this.log.error('Error connecting to projector, camera and light', err);
                return false;
            }
            this.log.info(`Connected to ${device} as PROJECTOR + CAMERA + LIGHT`, 'SERIAL', true, true);
        }
        else if (type === 'projector,camera') {
            this.connected.projector = device;
            this.connected.camera = device;
            this.arduino.aliasSerial('camera', device);
            try {
                connectSuccess = await this.arduino.connect('projector', device, false);
            }
            catch (err) {
                this.log.error('Error connecting to projector and camera', err);
                return false;
            }
            this.log.info(`Connected to ${device} as PROJECTOR + CAMERA`, 'SERIAL', true, true);
        }
        else if (type === 'projector_second') {
            this.connected.projector_second = device;
            this.arduino.aliasSerial('projector_second', device);
            try {
                connectSuccess = await this.arduino.connect('projector_second', device, false);
            }
            catch (err) {
                this.log.error('Error connecting to secondary projector', err);
                return false;
            }
            this.log.info(`Connected to ${device} as PROJECTOR_SECOND`, 'SERIAL', true, true);
        }
        else if (type === 'projector,projector_second') {
            /*this.connected.projector_second = device
            this.arduino.aliasSerial('projector_second', device)
            try {
                connectSuccess = await this.arduino.connect('projector_second', device, false)
            } catch (err) {
                console.error(err)
                return false
            }*/
        }
        else if (type === 'camera_second') {
            /*this.connected.projector_second = device
            this.arduino.aliasSerial('projector_second', device)
            try {
                connectSuccess = await this.arduino.connect('projector_second', device, false)
            } catch (err) {
                console.error(err)
                return false
            }*/
        }
        else if (type === 'camera,camera_second') {
            /*this.connected.projector_second = device
            this.arduino.aliasSerial('projector_second', device)
            try {
                connectSuccess = await this.arduino.connect('projector_second', device, false)
            } catch (err) {
                console.error(err)
                return false
            }*/
        }
        return connectSuccess;
    }
    /**
    *
    **/
    //Cases for 1 or 2 arduinos connected
    async all(devices) {
        let c = {};
        let p = {};
        let l = {};
        let type;
        let d;
        let s = {};
        let checklist = [];
        this.connected = {
            projector: false,
            camera: false,
            light: false,
            projector_second: false
        };
        for (let device of devices) {
            try {
                type = await this.distinguish(device);
            }
            catch (err) {
                this.log.error('Error distinguishing device', err);
                throw err;
            }
            try {
                await this.connectDevice(device, type);
            }
            catch (err) {
                this.log.error('Error connecting to device', err);
                throw err;
            }
        }
        //done checking devices
        if (!this.connected.projector) {
            await this.fakeProjector();
        }
        p.arduino = this.connected.projector;
        if (!this.connected.camera) {
            await this.fakeCamera();
        }
        c.arduino = this.connected.camera;
        if (this.settings.state.camera && this.settings.state.camera.intval) {
            c.intval = this.settings.camera.intval;
            await delay(1000);
            await this.cam.connectIntval(null, { connect: true, url: c.intval });
        }
        if (!this.connected.light) {
            await this.fakeLight();
        }
        l.arduino = this.connected.light;
        if (this.connected.projector_second) {
            s = this.connected.projector_second;
        }
        return this.ready(p, c, l, s);
    }
    /**
    *
    **/
    remember(which, device, type) {
        let deviceEntry;
        const match = this.settings.state.devices.filter((dev) => {
            if (dev[which] && dev[which] === device) {
                return dev;
            }
        });
        if (match.length === 0) {
            deviceEntry = {
                type: type
            };
            deviceEntry[which] = device;
            this.settings.state.devices.push(deviceEntry);
            this.settings.update('devices', this.settings.state.devices);
            this.settings.save();
        }
    }
    ;
    /**
    *
    **/
    ready(projector, camera, light, projector_second) {
        let args = {
            camera,
            projector,
            light,
            profile: this.settings.profile
        };
        if (projector_second && projector_second.arduino) {
            args.projector_second = projector_second;
        }
        this.ui.send('ready', args);
        this.settings.update('camera', camera);
        this.settings.update('projector', projector);
        this.settings.update('light', light);
        if (projector_second && projector_second.arduino) {
            this.settings.update('projector_second', projector_second);
            this.mainWindow.setSize(800, 800);
        }
        this.settings.save();
        return true;
    }
    ;
}
module.exports = function (arduino, settings, mainWindow, cam) {
    return new Devices(arduino, settings, mainWindow, cam);
};
//# sourceMappingURL=index.js.map
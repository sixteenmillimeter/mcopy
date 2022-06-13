'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const intval_1 = require("intval");
const processing_1 = require("processing");
/** class representing camera functions **/
class Camera {
    /**
     *
     **/
    constructor(arduino, cfg, ui, filmout, second = false) {
        this.state = {
            pos: 0,
            dir: true,
            capepr: false
        };
        this.arduino = null;
        this.intval = null;
        this.processing = null;
        this.id = 'camera';
        this.arduino = arduino;
        this.cfg = cfg;
        this.ui = ui;
        this.filmout = filmout;
        if (second)
            this.id += '_second';
        this.init();
    }
    /**
     *
     **/
    async init() {
        const Log = require('log');
        this.log = await Log({ label: this.id });
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    /**
     *
     **/
    listen() {
        this.ipc.on(this.id, this.listener.bind(this));
        this.ipc.on('intval', this.connectIntval.bind(this));
        this.ipc.on('processing', this.connectProcessing.bind(this));
    }
    /**
     *
     **/
    async set(dir, id) {
        let cmd;
        let ms;
        if (dir) {
            cmd = this.cfg.arduino.cmd[`${this.id}_forward`];
        }
        else {
            cmd = this.cfg.arduino.cmd[`${this.id}_backward`];
        }
        this.state.dir = dir;
        if (this.processing) {
            try {
                ms = await this.processing.setDir(dir);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else if (this.intval) {
            try {
                ms = await this.intval.setDir(dir);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else {
            try {
                ms = await this.arduino.send(this.id, cmd);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        return await this.end(cmd, id, ms);
    }
    /**
     *
     **/
    async cap(state, id) {
        let cmd;
        let ms;
        if (state) {
            cmd = this.cfg.arduino.cmd[`${this.id}_forward`];
        }
        else {
            cmd = this.cfg.arduino.cmd[`${this.id}_backward`];
        }
        this.state.capper = state;
        try {
            ms = await this.arduino.send(this.id, cmd);
        }
        catch (err) {
            this.log.error(err);
        }
        return await this.end(cmd, id, ms);
    }
    /**
     *
     **/
    async move(frame, id) {
        const cmd = this.cfg.arduino.cmd[this.id];
        let ms;
        if (this.filmout.state.enabled) {
            await this.filmout.start();
        }
        if (this.processing) {
            try {
                ms = await this.processing.move();
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else if (this.intval) {
            try {
                ms = await this.intval.move();
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else {
            try {
                ms = await this.arduino.send(this.id, cmd);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        if (this.filmout.state.enabled) {
            //await delay(100 * 1000);
            await this.filmout.end();
        }
        //this.log.info('Camera move time', { ms });
        return this.end(cmd, id, ms);
    }
    async both(frame, id) {
        const cmd = this.cfg.arduino.cmd[id];
        let ms;
        try {
            ms = await this.arduino.send(this.id, cmd);
        }
        catch (err) {
            this.log.error(`Error moving ${this.id}`, err);
        }
        //this.log.info('Cameras move time', { ms });
        return await this.end(cmd, id, ms);
    }
    /**
     *
     **/
    exposure(exposure, id) {
        let cmd = 'E';
        this.intval.setExposure(this.id, exposure, (ms) => {
            this.end(cmd, id, ms);
        });
    }
    /**
     *
     **/
    async connectIntval(event, arg) {
        return new Promise((resolve, reject) => {
            if (arg.connect) {
                this.intval = new intval_1.Intval(arg.url);
                this.processing = null;
                this.intval.connect((err, ms, state) => {
                    if (err) {
                        this.ui.send('intval', { connected: false });
                        this.log.info(`Cannot connect to ${arg.url}`, 'INTVAL');
                        this.intval = null;
                    }
                    else {
                        this.ui.send('intval', { connected: true, url: arg.url, state: state });
                        this.log.info(`Connected to INTVAL3 @ ${arg.url}`, 'INTVAL');
                    }
                    return resolve(true);
                });
            }
            else if (arg.disconnect) {
                this.intval = null;
                return resolve(false);
            }
        });
    }
    /**
     *
     **/
    async connectProcessing(event, arg) {
        return new Promise((resolve, reject) => {
            this.processing = new processing_1.Processing(arg.url);
            this.intval = null;
            this.ui.send('processing', { connected: true, url: arg.url });
            return resolve(true);
        });
    }
    /**
     *
     **/
    async listener(event, arg) {
        if (typeof arg.dir !== 'undefined') {
            try {
                await this.set(arg.dir, arg.id);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else if (typeof arg.frame !== 'undefined') {
            try {
                await this.move(arg.frame, arg.id);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else if (typeof arg.val !== 'undefined') {
            this.state.pos = arg.val;
        }
        else if (typeof arg.capper !== 'undefined') {
            try {
                await this.cap(arg.capper, arg.id);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        event.returnValue = true;
    }
    /**
     *
     **/
    async end(cmd, id, ms) {
        let message = '';
        if (cmd === this.cfg.arduino.cmd.camera_forward) {
            message = 'Camera set to FORWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.camera_backward) {
            message = 'Camera set to BACKWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.camera_second_forward) {
            message = 'Camera second set to FORWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.camera_second_backward) {
            message = 'Camera second set to BACKWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.camera) {
            message = 'Camera ';
            if (this.state.dir) {
                message += 'ADVANCED';
            }
            else {
                message += 'REWOUND';
            }
            message += ' 1 frame';
        }
        else if (cmd === this.cfg.arduino.cmd.camera_second) {
            message = 'Camera second ';
            if (this.state.dir) {
                message += 'ADVANCED';
            }
            else {
                message += 'REWOUND';
            }
            message += ' 1 frame';
        }
        else if (cmd === this.cfg.arduino.cmd.camerass) {
            message += 'Cameras both MOVED 1 frame each';
        }
        message += ` ${ms}ms`;
        this.log.info(message);
        this.ui.send(this.id, { cmd: cmd, id: id, ms: ms });
    }
}
module.exports = function (arduino, cfg, ui, filmout, second) {
    return new Camera(arduino, cfg, ui, filmout, second);
};
//# sourceMappingURL=index.js.map
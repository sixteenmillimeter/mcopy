'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Intval = require("intval");
/** class representing camera functions **/
class Camera {
    /**
     *
     **/
    constructor(arduino, cfg, ui) {
        this.state = { dir: true, digital: false };
        this.arduino = null;
        this.intval = null;
        this.arduino = arduino;
        this.cfg = cfg;
        this.ui = ui;
        this.init();
    }
    /**
     *
     **/
    async init() {
        this.log = await require('log')({ label: 'cam' });
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    /**
     *
     **/
    listen() {
        this.ipc.on('cam', this.listener.bind(this));
        this.ipc.on('intval', this.connectIntval.bind(this));
    }
    /**
     *
     **/
    async set(dir, id) {
        let cmd;
        let ms;
        if (dir) {
            cmd = this.cfg.arduino.cmd.cam_forward;
        }
        else {
            cmd = this.cfg.arduino.cmd.cam_backward;
        }
        this.state.dir = dir;
        if (this.intval) {
            try {
                ms = await this.intval.setDir(dir);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else {
            try {
                ms = await this.arduino.send('camera', cmd);
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
    async move(frame, id) {
        const cmd = this.cfg.arduino.cmd.camera;
        let ms;
        //if (this.state.digital) {
        //await this.dig.start()
        //}
        if (this.intval) {
            try {
                ms = await this.intval.move();
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else {
            try {
                ms = await this.arduino.send('camera', cmd);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        //if (this.state.digital) {
        //	await this.dig.end()
        //}
        this.log.info('Camera move time', { ms });
        return this.end(cmd, id, ms);
    }
    /**
     *
     **/
    exposure(exposure, id) {
        let cmd = 'E';
        this.intval.setExposure('camera', exposure, (ms) => {
            this.end(cmd, id, ms);
        });
    }
    /**
     *
     **/
    async connectIntval(event, arg) {
        return new Promise((resolve, reject) => {
            if (arg.connect) {
                this.intval = new Intval(arg.url);
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
    async listener(event, arg) {
        if (typeof arg.dir !== 'undefined') {
            try {
                await this.set(arg.dir, arg.id);
            }
            catch (err) {
                console.trace();
                this.log.error(err);
            }
        }
        else if (typeof arg.frame !== 'undefined') {
            try {
                await this.move(arg.frame, arg.id);
            }
            catch (err) {
                console.trace();
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
        if (cmd === this.cfg.arduino.cmd.cam_forward) {
            message = 'Camera set to FORWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.cam_backward) {
            message = 'Camera set to BACKWARD';
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
        this.log.info(message, 'CAMERA', true, true);
        this.ui.send('cam', { cmd: cmd, id: id, ms: ms });
    }
    ;
}
module.exports = function (arduino, cfg, ui) {
    return new Camera(arduino, cfg, ui);
};
//# sourceMappingURL=index.js.map
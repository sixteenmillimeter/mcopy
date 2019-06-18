"use strict";
/** class representing the Projector features **/
Object.defineProperty(exports, "__esModule", { value: true });
const Log = require("log");
class Projector {
    /**
     *
     **/
    constructor(arduino, cfg, ui, filmout, second = false) {
        this.state = {
            pos: 0,
            dir: true
        };
        this.arduino = null;
        this.id = 'projector';
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
        this.log = await Log({ label: this.id });
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    /**
     *
     **/
    listen() {
        this.ipc.on(this.id, this.listener.bind(this));
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
        if (this.filmout.state.enabled) {
            this.filmout.set(dir);
        }
        else {
            try {
                ms = await this.arduino.send(this.id, cmd);
            }
            catch (err) {
                this.log.error(`Error setting ${this.id} direction`, err);
            }
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
            try {
                ms = await this.filmout.move();
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
                this.log.error(`Error moving ${this.id}`, err);
            }
        }
        //this.log.info('Projector move time', { ms });
        return await this.end(cmd, id, ms);
    }
    async both(frame, id) {
        const cmd = this.cfg.arduino.cmd[this.id + 's'];
        let ms;
        try {
            ms = await this.arduino.send(this.id, cmd);
        }
        catch (err) {
            this.log.error(`Error moving ${this.id}`, err);
        }
        //this.log.info('Projectors move time', { ms });
        return await this.end(cmd, id, ms);
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
            this.filmout.state.frame = arg.val;
        }
        event.returnValue = true;
    }
    /**
     *
     **/
    async end(cmd, id, ms) {
        let message = '';
        if (cmd === this.cfg.arduino.cmd.projector_forward) {
            message = 'Projector set to FORWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.projector_backward) {
            message = 'Projector set to BACKWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.projector_second_forward) {
            message = 'Projector second set to FORWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.projector_second_backward) {
            message = 'Projector second set to BACKWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.projector) {
            message = 'Projector ';
            if (this.state.dir) {
                message += 'ADVANCED';
            }
            else {
                message += 'REWOUND';
            }
            message += ' 1 frame';
        }
        else if (cmd === this.cfg.arduino.cmd.projector_second) {
            message = 'Projector second ';
            if (this.state.dir) {
                message += 'ADVANCED';
            }
            else {
                message += 'REWOUND';
            }
            message += ' 1 frame';
        }
        else if (cmd === this.cfg.arduino.cmd.projectors) {
            message += 'Projectors both MOVED 1 frame each';
        }
        message += ` ${ms}ms`;
        this.log.info(message, 'PROJECTOR');
        return await this.ui.send(this.id, { cmd: cmd, id: id, ms: ms });
    }
}
module.exports = function (arduino, cfg, ui, filmout, second) {
    return new Projector(arduino, cfg, ui, filmout, second);
};
//# sourceMappingURL=index.js.map
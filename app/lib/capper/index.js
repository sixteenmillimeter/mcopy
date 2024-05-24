'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capper = void 0;
const electron_1 = require("electron");
const log_1 = require("log");
/** class representing capper functions **/
class Capper {
    /**
     *
     **/
    constructor(arduino, cfg, ui, filmout) {
        this.state = {
            capper: false
        };
        this.arduino = null;
        this.ipc = electron_1.ipcMain;
        this.id = 'capper';
        this.arduino = arduino;
        this.cfg = cfg;
        this.ui = ui;
        this.filmout = filmout;
        this.init();
    }
    /**
     *
     **/
    async init() {
        this.log = await (0, log_1.Log)({ label: this.id });
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
    async capper(state, id) {
        let cmd;
        let ms;
        if (state) {
            cmd = this.cfg.arduino.cmd[`${this.id}_on`];
        }
        else {
            cmd = this.cfg.arduino.cmd[`${this.id}_off`];
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
    async listener(event, arg) {
        if (typeof arg.state !== 'undefined') {
            try {
                await this.capper(arg.state, arg.id);
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
        if (cmd === this.cfg.arduino.cmd.capper_on) {
            message = 'Capper set to ON';
        }
        else if (cmd === this.cfg.arduino.cmd.capper_off) {
            message = 'Capper set to OFF';
        }
        message += ` ${ms}ms`;
        this.log.info(message);
        await this.ui.send(this.id, { cmd: cmd, id: id, ms: ms });
        return ms;
    }
}
exports.Capper = Capper;
module.exports = { Capper };
//# sourceMappingURL=index.js.map
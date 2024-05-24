'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = void 0;
const electron_1 = require("electron");
const delay_1 = require("delay");
const log_1 = require("log");
class Light {
    /**
     *
     **/
    constructor(arduino, cfg, ui) {
        this.state = { color: [0, 0, 0] };
        this.ipc = electron_1.ipcMain;
        this.enabled = true;
        this.id = 'light';
        this.arduino = arduino;
        this.cfg = cfg;
        this.ui = ui;
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
        this.ipc.handle(this.id, this.listener.bind(this));
    }
    /**
     *
     **/
    async listener(event, arg) {
        if (typeof arg.rgb !== 'undefined') {
            try {
                await this.set(arg.rgb, arg.id, true);
            }
            catch (err) {
                this.log.error('Error setting light', err);
            }
        }
        else if (typeof arg.enable !== 'undefined') {
            this.enabled = true;
        }
        else if (typeof arg.disable !== 'undefined') {
            this.enabled = false;
        }
    }
    /**
     *
     **/
    async set(rgb, id, on = true) {
        const str = rgb.join(',');
        let ms;
        this.state.color = rgb;
        try {
            ms = await this.arduino.send(this.id, this.cfg.arduino.cmd.light);
        }
        catch (err) {
            this.log.error('Error sending light command', err);
        }
        await (0, delay_1.delay)(1);
        try {
            ms += await this.arduino.sendString(this.id, str);
        }
        catch (err) {
            this.log.error('Error sending light string', err);
        }
        await (0, delay_1.delay)(1);
        ms += 2;
        await this.end(rgb, id, ms);
        return ms;
    }
    /**
     *
     **/
    async end(rgb, id, ms) {
        let res;
        this.log.info(`Light set to ${rgb.join(',')}`, 'LIGHT', true, true);
        try {
            res = await this.ui.send(this.id, { rgb, id, ms });
        }
        catch (err) {
            this.log.error(`Error ending light`, err);
            throw err;
        }
        return res;
    }
}
exports.Light = Light;
module.exports = { Light };
//# sourceMappingURL=index.js.map
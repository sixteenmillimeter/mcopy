'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const delay_1 = require("delay");
const Log = require("log");
class Light {
    /**
     *
     **/
    constructor(arduino, cfg, ui) {
        this.state = { color: [0, 0, 0] };
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
        this.log = await Log({ label: this.id });
        this.ipc = require('electron').ipcMain;
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
        return true;
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
            this.arduino.sendString(this.id, str);
        }
        catch (err) {
            this.log.error('Error sending light string', err);
        }
        await (0, delay_1.delay)(1);
        await ms;
        return await this.end(rgb, id, ms);
    }
    /**
     *
     **/
    async end(rgb, id, ms) {
        let res;
        //console.trace()
        this.log.info(`Light set to ${rgb.join(',')}`, 'LIGHT', true, true);
        try {
            //console.dir({ rgb, id, ms })
            res = await this.ui.send(this.id, { rgb, id, ms });
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        return res;
    }
}
module.exports = function (arduino, cfg, ui) {
    return new Light(arduino, cfg, ui);
};
//# sourceMappingURL=index.js.map
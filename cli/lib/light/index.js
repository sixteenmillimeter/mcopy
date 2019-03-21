'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const delay = require("delay");
class Light {
    /**
     *
     **/
    constructor(arduino, cfg, ui) {
        this.state = { color: [0, 0, 0] };
        this.arduino = arduino;
        this.cfg = cfg;
        this.ui = ui;
        this.init();
    }
    /**
     *
     **/
    async init() {
        this.log = await require('log')({});
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    /**
     *
     **/
    listen() {
        this.ipc.on('light', this.listener.bind(this));
    }
    /**
     *
     **/
    async listener(event, arg) {
        try {
            await this.set(arg.rgb, arg.id, true);
        }
        catch (err) {
            this.log.error('Error setting light', err);
        }
        event.returnValue = true;
    }
    /**
     *
     **/
    async set(rgb, id, on) {
        const str = rgb.join(',');
        let ms;
        this.state.color = rgb;
        try {
            ms = this.arduino.send('light', this.cfg.arduino.cmd.light);
        }
        catch (err) {
            this.log.error('Error sending light command', err);
        }
        await delay(1);
        try {
            this.arduino.string('light', str);
        }
        catch (err) {
            this.log.error('Error sending light string', err);
        }
        await delay(1);
        await ms;
        return await this.end(rgb, id, ms);
    }
    /**
     *
     **/
    async end(rgb, id, ms) {
        this.log.info(`Light set to ${rgb.join(',')}`, 'LIGHT', true, true);
        return await this.ui.send('light', { rgb: rgb, id: id, ms: ms });
    }
}
module.exports = function (arduino, cfg, ui) {
    return new Light(arduino, cfg, ui);
};
//# sourceMappingURL=index.js.map
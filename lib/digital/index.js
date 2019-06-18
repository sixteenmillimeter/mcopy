'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const delay_1 = require("delay");
class Digital {
    /**
     *
     **/
    constructor(display, ffmpeg, ffprobe, ui, light) {
        this.state = {
            frame: 0,
            frames: 0,
            path: null,
            fileName: null,
            info: {},
            dir: true,
            enabled: false
        };
        this.display = display;
        this.ffmpeg = ffmpeg;
        this.ffprobe = ffprobe;
        this.ui = ui;
        this.light = light;
        this.init();
    }
    /**
     *
     **/
    async init() {
        const Log = require('log');
        this.log = await Log({ label: 'digital' });
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    /**
     *
     **/
    listen() {
        this.ipc.on('digital', this.connectDigital.bind(this));
        this.ipc.on('focus', this.focus.bind(this));
    }
    /**
     *
     **/
    set(dir) {
        this.state.dir = dir;
    }
    /**
     *
     **/
    async move() {
        let start = +new Date();
        if (this.state.dir) {
            this.state.frame++;
        }
        else {
            this.state.frame--;
        }
        if (this.state.frame < 1) {
            this.state.frame = 1;
        }
        return (+new Date()) - start;
    }
    /**
    *
    **/
    async start() {
        try {
            await this.ffmpeg.clearAll();
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        try {
            await this.ffmpeg.frame(this.state, this.light.state);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        await this.display.show(this.state.frame);
        await delay_1.delay(20);
    }
    /**
    *
    **/
    async end() {
        await delay_1.delay(20);
        this.display.hide();
    }
    /**
     * Use a file as the "digital" source on "projector"
     *
     **/
    async connectDigital(evt, arg) {
        let info;
        let frames = 0;
        try {
            info = await this.ffprobe.info(arg.path);
        }
        catch (err) {
            //this.log.error(err, 'DIGITAL', true, true);
            this.state.enabled = false;
            await this.ui.send('digital', { valid: false });
            return false;
        }
        try {
            frames = await this.ffprobe.frames(arg.path);
        }
        catch (err) {
            this.log.error(err, 'DIGITAL', true, true);
            this.state.enabled = false;
            await this.ui.send('digital', { valid: false });
            return false;
        }
        this.state.frame = 0;
        this.state.path = arg.path;
        this.state.fileName = arg.fileName;
        this.state.frames = frames;
        this.state.info = info;
        this.log.info(`Opened ${this.state.fileName}`, 'DIGITAL', true, true);
        this.log.info(`Frames : ${frames}`, 'DIGITAL', true, true);
        this.state.enabled = true;
        return await this.ui.send('digital', { valid: true, state: JSON.stringify(this.state) });
    }
    async focus() {
    }
}
module.exports = (display, ffmpeg, ffprobe, ui, light) => {
    return new Digital(display, ffmpeg, ffprobe, ui, light);
};
//# sourceMappingURL=index.js.map
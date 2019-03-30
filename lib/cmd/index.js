'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const delay = require("delay");
class Commands {
    constructor(cfg, proj, cam, light) {
        this.cfg = cfg;
        this.proj = proj;
        this.cam = cam;
        this.light = light;
        this.ipc = require('electron').ipcMain;
    }
    /**
     * Move the projector one frame forward
     **/
    async projector_forward() {
        let ms;
        try {
            if (!this.proj.state.dir) {
                await delay(this.cfg.arduino.serialDelay);
                await this.proj.set(true);
            }
            await delay(this.cfg.arduino.serialDelay);
            ms = await this.proj.move();
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the projector one frame backward
     **/
    async projector_backward() {
        let ms;
        try {
            if (this.proj.state.dir) {
                await delay(this.cfg.arduino.serialDelay);
                await this.proj.set(false);
            }
            await delay(this.cfg.arduino.serialDelay);
            ms = await this.proj.move();
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the camera one frame forward
     *
     * @param {array} 	 rgb 	   Color to set light for frame
     **/
    async camera_forward(rgb = [255, 255, 255]) {
        const off = [0, 0, 0];
        let ms;
        try {
            if (!this.cam.state.dir) {
                await delay(this.cfg.arduino.serialDelay);
                await this.cam.set(true);
            }
            await delay(this.cfg.arduino.serialDelay);
            await this.light.set(rgb);
            await delay(this.cfg.arduino.serialDelay);
            ms = await this.cam.move();
            await delay(this.cfg.arduino.serialDelay);
            await this.light.set(off);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the camera one frame forwardwith light off
     **/
    async black_forward() {
        const off = [0, 0, 0];
        let ms;
        try {
            if (!this.cam.state.dir) {
                await delay(this.cfg.arduino.serialDelay);
                await this.cam.set(true);
            }
            await delay(this.cfg.arduino.serialDelay);
            await this.light.set(off); //make sure set to off
            await delay(this.cfg.arduino.serialDelay);
            ms = await this.cam.move();
            await delay(this.cfg.arduino.serialDelay);
            await this.light.set(off);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the camera one frame backward
     *
     * @param {array} 	 rgb 	   Color to set light for frame
     **/
    async camera_backward(rgb = [255, 255, 255]) {
        const off = [0, 0, 0];
        let ms;
        try {
            if (this.cam.state.dir) {
                await delay(this.cfg.arduino.serialDelay);
                await this.cam.set(false);
            }
            await delay(this.cfg.arduino.serialDelay);
            await this.light.set(rgb);
            await delay(this.cfg.arduino.serialDelay);
            ms = await this.cam.move();
            await delay(this.cfg.arduino.serialDelay);
            await this.light.set(off);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the camera one frame forward, light set to black or off
     *
     **/
    async black_backward() {
        const off = [0, 0, 0];
        let ms;
        try {
            if (this.cam.state.dir) {
                await delay(this.cfg.arduino.serialDelay);
                await this.cam.set(false);
            }
            await delay(this.cfg.arduino.serialDelay);
            await this.light.set(off); //make sure set to off
            await delay(this.cfg.arduino.serialDelay);
            ms = await this.cam.move();
            await delay(this.cfg.arduino.serialDelay);
            await this.light.set(off);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
}
module.exports = function (cfg, proj, cam, light) {
    return new Commands(cfg, proj, cam, light);
};
//# sourceMappingURL=index.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const delay_1 = require("delay");
class Commands {
    /**
     * @constructor
     * Assign all connected devices and mock devices as private classes.
     *
     * @param {object} cfg Configuration object
     * @param {object} proj Projector 1
     * @param {object} cam  Camera 1
     * @param {object} light Light source
     * @param {object} alert Alert object
     * @param {object} cam2 (optional) Camera 2
     * @param {object} proj2 (optional) Projector 2
     * @param {object} capper Capper object
     *
     **/
    constructor(cfg, proj, cam, light, alert, cam2 = null, proj2 = null, capper = null) {
        this.cfg = cfg;
        this.proj = proj;
        this.cam = cam;
        this.light = light;
        this.alertObj = alert;
        if (cam2 !== null)
            this.cam2 = cam2;
        if (proj2 !== null)
            this.proj2 = proj2;
        if (capper !== null)
            this.capper = capper;
        this.ipc = require('electron').ipcMain;
    }
    /**
     * Move the projector one frame forward
     *
     * @returns {integer} Length of action in ms
     **/
    async projector_forward() {
        let ms;
        try {
            if (!this.proj.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj.set(true);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            ms = await this.proj.move();
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the projector one frame backward
     *
     * @returns {integer} Length of action in ms
     **/
    async projector_backward() {
        let ms;
        try {
            if (this.proj.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj.set(false);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
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
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    async camera_forward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let rgb = [255, 255, 255];
        let ms;
        try {
            if (!this.cam.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam.set(true);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(rgb, id);
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            ms = await this.cam.move();
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the camera one frame forward with light off
     *
     * @returns {integer} Length of action in ms
     **/
    async black_forward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let ms = 0;
        try {
            if (!this.cam.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam.set(true);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            if (this.capper) {
                ms += await this.capper.capper(true, id);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id); //make sure set to off
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            ms += await this.cam.move();
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
            if (this.capper) {
                ms += await this.capper.capper(false, id);
            }
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the camera one frame backward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    async camera_backward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let rgb = [255, 255, 255];
        let ms;
        try {
            if (this.cam.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam.set(false);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(rgb, id);
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            ms = await this.cam.move();
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the camera one frame forward, light set to black or off
     *
     * @returns {integer} Length of action in ms
     **/
    async black_backward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let ms = 0;
        try {
            if (this.cam.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam.set(false);
            }
            if (this.capper) {
                ms += await this.capper.capper(true, id);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id); //make sure set to off
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            ms += await this.cam.move();
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
            if (this.capper) {
                ms += await this.capper.capper(false, id);
            }
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the second camera one frame forward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    async camera_second_forward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let rgb = [255, 255, 255];
        let ms;
        try {
            if (!this.cam2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam2.set(true);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(rgb, id);
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            ms = await this.cam2.move();
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the second camera one frame backward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    async camera_second_backward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let rgb = [255, 255, 255];
        let ms;
        try {
            if (this.cam2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam2.set(false);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(rgb, id);
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            ms = await this.cam2.move();
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the both cameras one frame forward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    async cameras_forward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let rgb = [255, 255, 255];
        let both;
        let ms;
        try {
            if (!this.cam.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam.set(true);
            }
            if (!this.cam2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam2.set(true);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(rgb, id);
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            if (this.cam && this.cam2 && this.cam.arduino.alias.camera === this.cam.arduino.alias.camera_second) {
                ms = await this.cam.both();
            }
            else {
                this.cam.move();
                this.cam2.move();
                both = [await this.cam.move, await this.cam2.move];
                ms = Math.max(...both);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the both cameras one frame backward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    async cameras_backward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let rgb = [255, 255, 255];
        let both;
        let ms;
        try {
            if (this.cam.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam.set(false);
            }
            if (this.cam2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam2.set(false);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(rgb, id);
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            if (this.cam && this.cam2 && this.cam.arduino.alias.camera === this.cam.arduino.alias.camera_second) {
                ms = await this.cam.both();
            }
            else {
                this.cam.move();
                this.cam2.move();
                both = [await this.cam.move, await this.cam2.move];
                ms = Math.max(...both);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move first camera one frame forward and rewind secondary camera one frame backward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    async camera_forward_camera_second_backward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let rgb = [255, 255, 255];
        let both;
        let ms;
        try {
            if (!this.cam.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam.set(true);
            }
            if (this.cam2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam2.set(false);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(rgb, id);
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            if (this.cam && this.cam2 && this.cam.arduino.alias.camera === this.cam.arduino.alias.camera_second) {
                ms = await this.cam.both();
            }
            else {
                this.cam.move();
                this.cam2.move();
                both = [await this.cam.move, await this.cam2.move];
                ms = Math.max(...both);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Rewind first camera one frame backward and move secondary camera one frame forward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    async camera_backward_camera_second_forward() {
        const id = (0, uuid_1.v4)();
        const off = [0, 0, 0];
        let rgb = [255, 255, 255];
        let both;
        let ms;
        try {
            if (this.cam.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam.set(false);
            }
            if (!this.cam2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.cam2.set(true);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(rgb, id);
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            if (this.cam && this.cam2 && this.cam.arduino.alias.camera === this.cam.arduino.alias.camera_second) {
                ms = await this.cam.both();
            }
            else {
                this.cam.move();
                this.cam.move();
                both = [await this.cam.move, await this.proj2.move];
                ms = Math.max(...both);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            await this.light.set(off, id);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the secondary projector forward one frame
     *
     * @returns {integer} Length of action in ms
     **/
    async projector_second_forward() {
        let ms;
        try {
            if (!this.proj2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj2.set(true);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            ms = await this.proj2.move();
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Rewind the secondary projector backward one frame
     *
     * @returns {integer} Length of action in ms
     **/
    async projector_second_backward() {
        let ms;
        try {
            if (this.proj2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj2.set(false);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            ms = await this.proj2.move();
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the both projectors forward one frame
     *
     * @returns {integer} Length of action in ms
     **/
    async projectors_forward() {
        let both;
        let ms;
        try {
            if (!this.proj.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj.set(true);
            }
            if (!this.proj2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj2.set(true);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            if (this.proj && this.proj2 && this.proj.arduino.alias.projector === this.proj.arduino.alias.projector_second) {
                ms = await this.proj.both();
            }
            else {
                this.proj.move();
                this.proj2.move();
                both = [await this.proj.move, await this.proj2.move];
                ms = Math.max(...both);
            }
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Rewind both projectors backwards one frame
     *
     * @returns {integer} Length of action in ms
     **/
    async projectors_backward() {
        let both;
        let ms;
        try {
            if (this.proj.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj.set(false);
            }
            if (this.proj2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj2.set(false);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            //run one projector without await?
            if (this.proj && this.proj2 && this.proj.arduino.alias.projector === this.proj.arduino.alias.projector_second) {
                ms = await this.proj.both();
            }
            else {
                this.proj.move();
                this.proj2.move();
                both = [await this.proj.move, await this.proj2.move];
                ms = Math.max(...both);
            }
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Move the primary projector forward one frame and rewind the secondary projector
     * one frame backwards.
     *
     * @returns {integer} Length of action in ms
     **/
    async projector_forward_projector_second_backward() {
        let both;
        let ms;
        try {
            if (!this.proj.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj.set(true);
            }
            if (this.proj2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj2.set(false);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            //run one projector without await?
            if (this.proj && this.proj2 && this.proj.arduino.alias.projector === this.proj.arduino.alias.projector_second) {
                ms = await this.proj.both();
            }
            else {
                this.proj.move();
                this.proj2.move();
                both = [await this.proj.move, await this.proj2.move];
                ms = Math.max(...both);
            }
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Rewind the primary projector backwards one frame and move the secondary
     * projector forward one frame.
     *
     * @returns {integer} Length of action in ms
     **/
    async projector_backward_projector_second_forward() {
        let both;
        let ms;
        try {
            if (this.proj.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj.set(false);
            }
            if (!this.proj2.state.dir) {
                await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
                await this.proj2.set(true);
            }
            await (0, delay_1.delay)(this.cfg.arduino.serialDelay);
            //run one projector without await?
            if (this.proj && this.proj2 && this.proj.arduino.alias.projector === this.proj.arduino.alias.projector_second) {
                ms = await this.proj.both();
            }
            else {
                this.proj.move();
                this.proj2.move();
                both = [await this.proj.move, await this.proj2.move];
                ms = Math.max(...both);
            }
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Throws an alert to pause a sequence
     *
     * @returns {integer} Length of action in ms
     **/
    async alert(cmd) {
        let ms;
        try {
            ms = await this.alertObj.start(cmd.light); //change this meta
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    /**
     * Pauses a sequence for a length of time
     *
     * @returns {integer} Length of action in ms
     **/
    async pause(cmd) {
        let ms;
        try {
            ms = await (0, delay_1.delay)(cmd.light * 1000); //delay is in seconds
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
    async camera_exposure(cmd) {
        let ms;
        try {
            ms = await this.cam.exposure(cmd.light);
        }
        catch (err) {
            throw err;
        }
        return ms;
    }
}
module.exports = function (cfg, proj, cam, light, alert, cam2, proj2, capper) {
    return new Commands(cfg, proj, cam, light, alert, cam2, proj2, capper);
};
//# sourceMappingURL=index.js.map
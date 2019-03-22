'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Log = require("log");
let seq;
class Sequencer {
    constructor(cfg, cmd) {
        this.arr = [];
        this.loops = 1;
        this.CMDS = {};
        this.id = 'sequence';
        this.cfg = cfg;
        this.cmd = cmd;
        this.cmds(cfg.cmd);
        this.init();
    }
    cmds(obj) {
        let keys = Object.keys(obj);
        let key;
        for (key in keys) {
            this.CMDS[keys[key]] = key;
        }
    }
    //currently called by ui
    async init() {
        this.log = Log({ label: this.id });
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    listen() {
        this.ipc.on(this.id, this.listener.bind(this));
    }
    async listener(event, arg) {
        console.dir(arg);
        if (arg && arg.set) {
            this.setSteps(arg.set);
        }
        else if (arg && arg.loops) {
            this.loops = arg.loops;
        }
        event.returnValue = true;
    }
    setSteps(steps) {
        console.dir(steps);
    }
    //new
    async start(arg) {
        if (arg && arg.arr) {
            this.arr = arg.arr;
        }
        if (arg && arg.loops) {
            this.loops = arg.loops;
        }
        for (let x = 0; x < this.loops; x++) {
            for (let y = 0; y < this.arr.length; y++) {
                if (this.running) {
                    await this.step(y);
                }
            }
        }
    }
    //new
    pause() {
    }
    /**
     * Stop the sequence
     **/
    stop() {
        this.running = false;
        //clear?
    }
    async step(index) {
        try {
            await this.cmdMap(index);
        }
        catch (err) {
            throw err;
        }
    }
    async cmdMap(index) {
        const cmdOriginal = this.arr[index].cmd;
        const cmd = this.CMDS[cmdOriginal];
        return await this.cmd[cmd];
    }
}
module.exports = function (cfg, cmd) {
    return new Sequencer(cfg, cmd);
};
//# sourceMappingURL=index.js.map
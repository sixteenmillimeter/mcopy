'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Log = require("log");
let seq;
class Sequencer {
    constructor(cfg, cmd) {
        this.running = false;
        this.paused = false;
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
        if (arg && arg.start) {
            this.start(arg);
        }
        else if (arg && arg.stop) {
            this.stop();
        }
        else if (arg && arg.pause) {
            this.pause();
        }
        else if (arg && arg.set) {
            this.setSteps(arg.set);
        }
        else if (arg && arg.unset) {
            this.unsetSteps(arg.unset);
        }
        else if (arg && arg.loops) {
            this.loops = arg.loops;
        }
        event.returnValue = true;
    }
    setSteps(steps) {
        console.dir(steps);
    }
    unsetSteps(steps) {
    }
    //new, replaces exec and init
    async start(arg) {
        if (arg && arg.arr) {
            this.arr = arg.arr; //overwrite sequence
        }
        if (arg && arg.loops) {
            this.loops = arg.loops; //overwrite loops
        }
        this.running = true;
        this.paused = false;
        for (let x = 0; x < this.loops; x++) {
            //start loop
            for (let y = 0; y < this.arr.length; y++) {
                //start step
                if (this.running) {
                    while (this.paused) {
                        await delay(42);
                    }
                    await this.step(y);
                }
                //end step
            }
            //end loop
        }
    }
    //new
    pause() {
        this.paused = true;
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
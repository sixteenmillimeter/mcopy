'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Log = require("log");
let seq;
class Sequencer {
    constructor(cfg, cmd, ui) {
        this.running = false;
        this.paused = false;
        this.grid = [];
        this.gridLoops = 1;
        this.arr = []; //store sequence from gui
        this.loops = 1;
        this.CMDS = {};
        this.id = 'sequence';
        this.cfg = cfg;
        this.cmd = cmd;
        this.ui = ui;
        this.cmds(cfg.cmd);
        this.init();
    }
    cmds(obj) {
        let keys = Object.keys(obj);
        for (let key of keys) {
            this.CMDS[obj[key]] = key;
        }
    }
    //currently called by ui
    async init() {
        this.log = await Log({ label: this.id });
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    listen() {
        this.ipc.on(this.id, this.listener.bind(this));
    }
    async listener(event, arg) {
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
            this.setLoops(arg.loops);
        }
        event.returnValue = true;
    }
    setLoops(count) {
        this.gridLoops = count;
        this.log.info(`Set loop count to ${count}`);
    }
    setSteps(steps) {
        for (let step of steps) {
            this.grid[step.x] = step;
        }
    }
    unsetSteps(steps) {
        for (let x of steps) {
            this.grid[x] = undefined;
        }
    }
    //new, replaces exec and init
    async start(arg) {
        if (arg && arg.arr) {
            this.arr = arg.arr; //overwrite sequence
        }
        else {
            this.arr = this.grid;
        }
        if (arg && arg.loops) {
            this.loops = arg.loops; //overwrite loops
        }
        else {
            this.loops = this.gridLoops;
        }
        this.running = true;
        this.paused = false;
        //start sequence
        this.log.info(`Starting sequence...`);
        this.ui.send(this.id, { start: true });
        for (let x = 0; x < this.loops; x++) {
            //start loop
            this.log.info(`Starting loop ${x + 1}`);
            this.ui.send(this.id, { loop: x, start: true });
            for (let y = 0; y < this.arr.length; y++) {
                //start step
                if (!this.running) {
                    break;
                }
                while (this.paused) {
                    await delay(42);
                }
                this.log.info(`Starting step ${y + 1} of loop ${x + 1}`);
                this.ui.send(this.id, { step: y, loop: x, start: true });
                await this.step(y);
                //end step
                this.log.info(`Ended step ${y + 1} of loop ${x + 1}`);
                this.ui.send(this.id, { step: y, loop: x, stop: true });
            }
            if (!this.running) {
                break;
            }
            //end loop
            this.log.info(`Ended loop ${x + 1}`);
            this.ui.send(this.id, { loop: x, stop: true });
        }
        //end sequence
        this.log.info(`Ended sequence`);
        this.ui.send(this.id, { stop: true });
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
    async step(x) {
        try {
            await this.cmdMap(x);
        }
        catch (err) {
            throw err;
        }
    }
    async cmdMap(x) {
        const cmdOriginal = this.arr[x].cmd;
        const cmd = this.CMDS[cmdOriginal];
        this.log.info(`CMD: '${cmdOriginal}' -> ${cmd}`);
        //I wrote this when I was very tired and delirious
        return await this.cmd[cmd]();
    }
}
module.exports = function (cfg, cmd, ui) {
    return new Sequencer(cfg, cmd, ui);
};
//# sourceMappingURL=index.js.map
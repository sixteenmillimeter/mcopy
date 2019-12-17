'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Log = require("log");
const electron_1 = require("electron");
/** @module lib/sequencer **/
let seq;
class Sequencer {
    /**
     * @constructor
     * Create a new sequencer and assign command and UI as private sub-classes
     *
     * @param {object} cfg Configuration object
     * @param {object} cmd Shared command class
     * @param {object} ui Electron UI, browser window
     **/
    constructor(cfg, cmd, ui) {
        this.running = false;
        this.paused = false;
        this.grid = [];
        this.gridLoops = 1;
        this.arr = []; //store sequence from gui
        this.loops = 1;
        this.CMDS = {};
        this.id = 'sequence';
        this.alerted = false;
        this.cfg = cfg;
        this.cmd = cmd;
        this.ui = ui;
        this.cmds(cfg.cmd);
        this.init();
    }
    /**
     * Take configuration object and assign all commands as keys
     * in the internal CMDS object.
     *
     * @param {object} obj Configuration object
     **/
    cmds(obj) {
        let keys = Object.keys(obj);
        for (let key of keys) {
            this.CMDS[obj[key]] = key;
        }
        //
        //
    }
    /**
     * Initialize the class by requiring ipcMain from electron
     * and creating logger.
     *
     **/
    async init() {
        this.log = await Log({ label: this.id });
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    /**
     * Bind ipc listener to channel 'sequencer' or current id of
     * class.
     **/
    listen() {
        this.ipc.on(this.id, this.listener.bind(this));
    }
    /**
     * Listener callback function. Called whenever ipc
     * message is sent to channel 'sequencer'.
     *
     * @param {object} event IPC message event
     * @param {object} arg Arguments provided in message
     **/
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
    /**
     * Sets the value of the loops in the grid sequence
     * to value sent by UI in ipc message.
     *
     * @param {integer} count Number of loops to set grid sequence to
     **/
    setLoops(count) {
        this.gridLoops = count;
        this.log.info(`Set loop count to ${count}`);
    }
    /**
     * Sets multiple steps at once
     *
     * @param {array} steps Array of steps to set or update
     **/
    setSteps(steps) {
        for (let step of steps) {
            this.grid[step.x] = step;
        }
    }
    /**
     * Resets multiple steps to default 'undefined' state
     *
     * @param {array} steps Array containing the x location of steps to unset
     **/
    unsetSteps(steps) {
        for (let x of steps) {
            this.grid[x] = undefined;
        }
    }
    /**
     * Starts a sequence with the existing grid sequence,
     * or if one is provided in the arg object, starts
     * that sequence.
     *
     * @param {object} arg Arguments from ipc message
     **/
    async start(arg) {
        let startTime = +new Date();
        let ms;
        this.psbId = electron_1.powerSaveBlocker.start('prevent-display-sleep');
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
        if (this.cmd.proj.filmout.state.enabled === true) {
            await this.cmd.proj.filmout.display.open();
        }
        for (let x = 0; x < this.loops; x++) {
            //start loop
            this.log.info(`Starting loop ${x + 1}`);
            this.ui.send(this.id, { loop: x, start: true });
            for (let y = 0; y < this.arr.length; y++) {
                //start step
                if (!this.running) {
                    break;
                }
                //UI initiates pause, not planned
                while (this.paused) {
                    await delay(42);
                }
                if (typeof this.arr[y] === 'undefined') {
                    continue;
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
        if (this.cmd.proj.filmout.state.enabled === true) {
            await this.cmd.proj.filmout.display.close();
        }
        electron_1.powerSaveBlocker.stop(this.psbId);
        this.psbId = null;
        ms = (+new Date()) - startTime;
        //end sequence
        this.log.info(`Ended sequence`);
        this.ui.send(this.id, { stop: true, ms });
    }
    /**
     * Pauses sequence from UI.
     **/
    pause() {
        this.paused = true;
    }
    /**
     * Stops the sequence
     **/
    stop() {
        if (this.cmd.proj.filmout.state.enabled === true) {
            this.cmd.proj.filmout.display.close();
        }
        this.running = false;
        if (this.psbId) {
            electron_1.powerSaveBlocker.stop(this.psbId);
        }
        //clear?
    }
    /**
     * Execute command @ step x. Wrapper with try catch.
     *
     * @param {integer} x Step to execute command at
     **/
    async step(x) {
        try {
            await this.cmdExec(x);
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Locate step @ position x and execute the command.
     *
     * @param {integer} x Step to execute command at
     **/
    async cmdExec(x) {
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
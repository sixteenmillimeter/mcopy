'use strict';

import { v4 as uuid } from 'uuid';
import { Log } from 'log';
import type { Logger } from 'winston';
import { powerSaveBlocker } from 'electron'
import { delay } from 'delay';
import { Commands } from 'cmd';
import type { WebContents } from 'electron';

/** @module lib/sequencer **/

let seq : Sequencer;

export class Sequencer {
	private running : boolean = false;
	private paused : boolean = false;

	private grid : any[] = [];
	private gridLoops : number = 1;

	private arr : any[] = []; //store sequence from gui
	private loops : number = 1;

	private cfg : any;
	private cmd : Commands;
	private CMDS : any = {};
	private ipc : any;
	private ui : WebContents;
	private log : Logger;
	private id : string = 'sequence';
	private alerted : boolean = false;
	private psbId : any;

	/**
	 * @constructor
	 * Create a new sequencer and assign command and UI as private sub-classes
	 *
	 * @param {object} cfg Configuration object
	 * @param {object} cmd Shared command class
	 * @param {object} ui Electron UI, browser window
	 **/

	constructor (cfg : any, cmd : Commands, ui : WebContents) {
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
	private cmds (obj : any) {
		let keys : string[] = Object.keys(obj);
		for (let key of keys) {
			this.CMDS[obj[key]] = key;
		}
	}

	/**
	 * Initialize the class by requiring ipcMain from electron
	 * and creating logger.
	 *
	 **/
	private async init () {
		this.log = await Log({ label : this.id })
		this.ipc = require('electron').ipcMain;
		this.listen();
	}

	/**
	 * Bind ipc listener to channel 'sequencer' or current id of
	 * class.
	 **/ 
	private listen () {
		this.ipc.on(this.id, this.listener.bind(this));
	}

	/**
	 * Listener callback function. Called whenever ipc
	 * message is sent to channel 'sequencer'.
	 *
	 * @param {object} event IPC message event
	 * @param {object} arg Arguments provided in message
	 **/
	private async listener (event : any, arg : any) {
		if (arg && arg.start) {
			this.start(arg);
		} else if (arg && arg.stop) {
			this.stop();
		} else if (arg && arg.pause) {
			this.pause();
		} else if (arg && arg.set) {
			this.setSteps(arg.set);
		} else if (arg && arg.unset) {
			this.unsetSteps(arg.unset);
		} else if (arg && arg.loops) {
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
	public setLoops (count : number) {
		this.gridLoops = count;
		this.log.info(`Set loop count to ${count}`);
	}

	/**
	 * Sets multiple steps at once
	 *
	 * @param {array} steps Array of steps to set or update
	 **/
	public setSteps (steps : any[]) {
		for (let step of steps) {
			this.grid[step.x] = step;
		}
	}

    /**
     * Resets multiple steps to default 'undefined' state
     *
     * @param {array} steps Array containing the x location of steps to unset
     **/
	public unsetSteps (steps : number[]) {
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
	public async start (arg : any) {
		const psbId : number = powerSaveBlocker.start('prevent-display-sleep');
		let startTime : number = +new Date();
		let ms : number;

		if (arg && arg.arr) {
			this.arr = arg.arr; //overwrite sequence
		} else {
			this.arr = this.grid;
		}

		if (arg && arg.loops) {
			this.loops = arg.loops; //overwrite loops
		} else {
			this.loops = this.gridLoops;
		}
		
		this.running = true;
		this.paused = false;

		//start sequence
		this.log.info(`Starting sequence...`);
		this.ui.send(this.id, { start : true });

		if (this.cmd.proj.filmout.state.enabled === true && !this.cmd.proj.filmout.server.useServer()) {
			await this.cmd.proj.filmout.display.open();
		}

		for (let x = 0; x < this.loops; x++) {
			//start loop
			this.log.info(`Starting loop ${x + 1}`);
			this.ui.send(this.id, { loop : x, start : true });

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
				this.ui.send(this.id, { step : y, loop : x, start : true });
					
				await this.step(y);

				//end step
				this.log.info(`Ended step ${y + 1} of loop ${x + 1}`);
				this.ui.send(this.id, { step : y,  loop : x, stop : true });
			}
			if (!this.running) {
				break;
			}
			//end loop
			this.log.info(`Ended loop ${x + 1}`);
			this.ui.send(this.id, { loop : x, stop : true });
		}

		if (this.cmd.proj.filmout.state.enabled === true && !this.cmd.proj.filmout.server.useServer()) {
			await this.cmd.proj.filmout.display.close();
		}

		powerSaveBlocker.stop(psbId)
		this.psbId = null

		ms = ( +new Date() ) - startTime;
		//end sequence
		this.log.info(`Ended sequence`);
		this.ui.send(this.id, { stop : true, ms });
	}

	/**
	 * Pauses sequence from UI.
	 **/
	public pause () {
		this.paused = true;
	}

	/**
	 * Stops the sequence
	 **/
	public stop () {
		if (this.cmd.proj.filmout.state.enabled === true) {
			this.cmd.proj.filmout.display.close();
		}
		this.running = false;
		if (this.psbId) {
			powerSaveBlocker.stop(this.psbId);
		}
		//clear?

	}

	/**
	 * Execute command @ step x. Wrapper with try catch.
	 *
	 * @param {integer} x Step to execute command at
	 **/
	private async step ( x: number) {
		try {
			await this.cmdExec(x)
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Locate step @ position x and execute the command.
	 * 
	 * @param {integer} x Step to execute command at
	 **/
	private async cmdExec (x : number) {
		const cmdOriginal : string = this.arr[x].cmd;
		const cmd : string = this.CMDS[cmdOriginal];
		this.log.info(`CMD: '${cmdOriginal}' -> ${cmd}`);
		//@ts-ignore
		return await this.cmd[cmd](this.arr[x]);
	}
}

module.exports = function (cfg : any, cmd : Commands, ui : WebContents) {
	return new Sequencer(cfg, cmd, ui);
}

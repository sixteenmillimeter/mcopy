'use strict';

import uuid from 'uuid/v4';
import Log = require('log');

let seq : Sequencer;

class Sequencer {
	private running : boolean = false;
	private paused : boolean = false;

	private grid : any[] = [];
	private gridLoops : number = 1;

	private arr : any[] = []; //store sequence from gui
	private loops : number = 1;

	private cfg : any;
	private cmd : any;
	private CMDS : any = {};
	private ipc : any;
	private ui : any;
	private log : any;
	private id : string = 'sequence';

	constructor (cfg : any, cmd : any, ui : any) {
		this.cfg = cfg;
		this.cmd = cmd;
		this.ui = ui;
		this.cmds(cfg.cmd);
		this.init();
	}

	private cmds (obj : any) {
		let keys : string[] = Object.keys(obj);
		for (let key of keys) {
			this.CMDS[obj[key]] = key;
		}
	}

	//currently called by ui
	private async init () {
		this.log = await Log({ label : this.id })
		this.ipc = require('electron').ipcMain;
		this.listen();
	}

	private listen () {
		this.ipc.on(this.id, this.listener.bind(this));
	}

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

	public setLoops (count : number) {
		this.gridLoops = count;
		this.log.info(`Set loop count to ${count}`);
	}

	public setSteps (steps : any[]) {
		for (let step of steps) {
			this.grid[step.x] = step;
		}
	}

	public unsetSteps (steps : number[]) {
		for (let x of steps) {
			this.grid[x] = undefined;
		}
	}

	//new, replaces exec and init
	public async start (arg : any) {
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
		this.log.info(`Starting sequence...`)
		this.ui.send(this.id, { start : true })

		if (this.cmd.proj.filmout.state.enabled === true) {
			await this.cmd.proj.filmout.display.open()
		}

		for (let x = 0; x < this.loops; x++) {
			//start loop
			this.log.info(`Starting loop ${x + 1}`)
			this.ui.send(this.id, { loop : x, start : true });

			for (let y = 0; y < this.arr.length; y++) {
				//start step
				if (!this.running) {
					break
				}
				
				while (this.paused) {
					await delay(42);
				}

				if (typeof this.arr[y] === 'undefined') {
					continue
				}

				this.log.info(`Starting step ${y + 1} of loop ${x + 1}`)
				this.ui.send(this.id, { step : y, loop : x, start : true });
					
				await this.step(y);

				//end step
				this.log.info(`Ended step ${y + 1} of loop ${x + 1}`)
				this.ui.send(this.id, { step : y,  loop : x, stop : true });
			}
			if (!this.running) {
				break
			}
			//end loop
			this.log.info(`Ended loop ${x + 1}`)
			this.ui.send(this.id, { loop : x, stop : true });
		}

		if (this.cmd.proj.filmout.state.enabled === true) {
			await this.cmd.proj.filmout.display.close();
		}

		ms = ( +new Date() ) - startTime;
		//end sequence
		this.log.info(`Ended sequence`)
		this.ui.send(this.id, { stop : true, ms })
	}

	//new
	public pause () {
		this.paused = true;
	}

	/**
	 * Stop the sequence
	 **/
	public stop () {
		if (this.cmd.proj.filmout.state.enabled === true) {
			this.cmd.proj.filmout.display.close();
		}
		this.running = false;
		//clear?

	}

	private async step (x: number) {
		try {
			await this.cmdMap(x)
		} catch (err) {
			throw err;
		}
	}

	private async cmdMap (x : number) {
		const cmdOriginal : string = this.arr[x].cmd;
		const cmd : string = this.CMDS[cmdOriginal];
		this.log.info(`CMD: '${cmdOriginal}' -> ${cmd}`);
		//I wrote this when I was very tired and delirious
		return await this.cmd[cmd]();
	}
}

module.exports = function (cfg : any, cmd : any, ui : any) {
	return new Sequencer(cfg, cmd, ui);
}

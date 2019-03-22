'use strict';

import Log = require('log');

let seq : Sequencer;

class Sequencer {
	private time : number;
	private running : boolean = false;
	private paused : boolean = false;

	private arr : any[] = [];
	private loops : number = 1;

	private cfg : any;
	private cmd : any;
	private CMDS : any = {};
	private ipc : any;
	private log : any;
	private id : string = 'sequence';

	constructor (cfg : any, cmd : any) {
		this.cfg = cfg;
		this.cmd = cmd;
		this.cmds(cfg.cmd);
		this.init();
	}

	private cmds (obj : any) {
		let keys : string[] = Object.keys(obj);
		let key : string;
		for (key in keys) {
			this.CMDS[keys[key]] = key;
		}
	}

	//currently called by ui
	private async init () {
		this.log = Log({ label : this.id })
		this.ipc = require('electron').ipcMain;
		this.listen();
	}

	private listen () {
		this.ipc.on(this.id, this.listener.bind(this));
	}

	private async listener (event : any, arg : any) {
		console.dir(arg)
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
			this.loops = arg.loops;
		}
		event.returnValue = true;
	}

	public setSteps (steps : any) {
		console.dir(steps)
	}
	public unsetSteps (steps : number[]) {

	}
	//new, replaces exec and init
	public async start (arg : any) {
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
	public pause () {
		this.paused = true;
	}
	/**
	 * Stop the sequence
	 **/
	public stop () {
		this.running = false;
		//clear?

	}

	private async step (index : number) {
		try {
			await this.cmdMap(index)
		} catch (err) {
			throw err;
		}
		
	}

	private async cmdMap (index : number) {
		const cmdOriginal : string = this.arr[index].cmd;
		const cmd : string = this.CMDS[cmdOriginal];
		return await this.cmd[cmd];
	}
}

module.exports = function (cfg : any, cmd : any) {
	return new Sequencer(cfg, cmd);
}

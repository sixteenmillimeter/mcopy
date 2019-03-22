'use strict';

import Log = require('log');

let seq : Sequencer;

class Sequencer {
	private time : number;
	private running : boolean;

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
		if (arg && arg.set) {
			this.setSteps(arg.set);
		} else if (arg && arg.loops) {
			this.loops = arg.loops;
		}
		event.returnValue = true;
	}

	public setSteps (steps : any) {
		console.dir(steps)
	}
	//new
	public async start (arg : any) {
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
	public pause () {

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

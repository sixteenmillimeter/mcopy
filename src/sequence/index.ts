'use strict';

import Log = require('log');

let seq : Sequence;

class Sequence {
	private time : number;
	private running : boolean;

	private arr : any[] = [];
	private loops : number = 1;

	private cfg : any;
	private cmd : any;
	private CMDS : any = {};
	private ipc : any;
	private log : any;

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
		this.log = Log({ label : 'sequence' })
		this.ipc = require('electron').ipcMain;
		this.listen();
	}

	private listen () {
		this.ipc.on('sequence', this.listener.bind(this));
	}

	private async listener (event : any, arg : any) {
		if (arg && arg.diff) {
			this.diff(arg.diff);
		} else if (arg && arg.loops) {
			this.loops = arg.loops;
		}
		event.returnValue = true;
	}

	private diff (steps : any[]) {
		
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
	seq = new Sequence(cfg, cmd);
}

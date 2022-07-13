'use strict';

import { Intval } from 'intval';
import { Processing } from 'processing';
import { delay } from 'delay';

/** class representing capper functions **/

class Capper {
	private state : any = { 
		capper : false
	};
	private arduino : Arduino = null;
	private log : any;
	private cfg : any;
	private filmout : any;
	private ui : any;
	private ipc : any;
	private id : string = 'capper';
	/**
	 *
	 **/
	constructor (arduino : Arduino, cfg : any, ui : any, filmout : any) {
		this.arduino = arduino;
		this.cfg = cfg;	
		this.ui = ui;
		this.filmout = filmout;
		this.init();
	}

	/**
	 *
	 **/
	private async init () {
		const Log = require('log');
		this.log = await Log({ label : this.id });
		this.ipc = require('electron').ipcMain;
		this.listen();
	}

	/**
	 *
	 **/
	private listen () {
		this.ipc.on(this.id, this.listener.bind(this));
	}

	/**
	 *
	 **/
	 public async capper (state : boolean, id : string) {
		let cmd : string;
		let ms : number;

		if (state) {
			cmd = this.cfg.arduino.cmd[`${this.id}_on`];
		} else {
			cmd = this.cfg.arduino.cmd[`${this.id}_off`];
		}

		this.state.capper = state;

		try {
			ms = await this.arduino.send(this.id, cmd);
		} catch (err) {
			this.log.error(err);
		}
		return await this.end(cmd, id, ms);
	}


	/**
	 *
	 **/
	private async listener (event : any, arg : any) {
		if (typeof arg.capper !== 'undefined') {
			try {
				await this.capper(arg.capper, arg.id)
			} catch (err) {
				this.log.error(err)
			}
		}
		event.returnValue = true
	}

	/**
	 *
	 **/
	private async end (cmd : string, id : string, ms : number) {
		let message = '';

		if (cmd === this.cfg.arduino.cmd.capper_on) {
			message = 'Capper set to ON';
		} else if (cmd === this.cfg.arduino.cmd.capper_off) {
			message = 'Capper set to OFF';
		}

		message += ` ${ms}ms`

		this.log.info(message);
		this.ui.send(this.id, {cmd: cmd, id : id, ms: ms});
	}
}

module.exports = function (arduino : Arduino, cfg : any, ui : any, filmout: any) {
	return new Capper(arduino, cfg, ui, filmout);
}
'use strict';

import { ipcMain } from 'electron';
import { Intval } from 'intval';
import { Processing } from 'processing';
import { delay } from 'delay';
import { Log } from 'log';
import type { Logger } from 'winston';
import type { FilmOut } from 'filmout';
import type { Arduino } from 'arduino';
import type { Config } from 'cfg';
import type { WebContents, IpcMainEvent } from 'electron';

interface CapperState {
	capper : boolean
}

/** @module lib/capper */

/**
 * Class representing capper functions.
 */

export class Capper {
	private state : CapperState = { 
		capper : false
	};
	private arduino : Arduino = null;
	private log : Logger;
	private cfg : Config;
	private filmout : FilmOut;
	private ui : WebContents;
	private ipc : typeof ipcMain = ipcMain;
	private id : string = 'capper';
	/**
	 *
	 **/
	constructor (arduino : Arduino, cfg : any, ui : WebContents, filmout : FilmOut) {
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
		this.log = await Log({ label : this.id });
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
	 public async capper (state : boolean, id : string) : Promise<number> {
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
	private async listener (event : IpcMainEvent, arg : any) {
		if (typeof arg.state !== 'undefined') {
			try {
				await this.capper(arg.state, arg.id);
			} catch (err) {
				this.log.error(err);
			}
		}
		event.returnValue = true
	}

	/**
	 *
	 **/
	private async end (cmd : string, id : string, ms : number) : Promise<number> {
		let message : string = '';

		if (cmd === this.cfg.arduino.cmd.capper_on) {
			message = 'Capper set to ON';
		} else if (cmd === this.cfg.arduino.cmd.capper_off) {
			message = 'Capper set to OFF';
		}

		message += ` ${ms}ms`;

		this.log.info(message);
		await this.ui.send(this.id, {cmd: cmd, id : id, ms: ms});
		return ms;
	}
}

module.exports = { Capper }
export type { CapperState }
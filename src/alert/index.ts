'use strict';

import { ipcMain } from 'electron';
import { delay } from 'delay';
import { Log } from 'log';
import type { Logger } from 'winston';
import type { WebContents } from 'electron';

/* class representing alert functionality */

export class Alert {
	private ipc : typeof ipcMain = ipcMain
	private log : Logger
	private id : string = 'alert'
	private cb : Function = null
	private ui : WebContents

	constructor ( ui : WebContents) {
		this.ui = ui
		this.init()
	}

	/**
	 *
	 **/
	private async init () {
		this.log = await Log({ label : this.id })
		this.listen()
	}

	/**
	 *
	 **/
	private listen () {
		this.ipc.on(this.id, this.listener.bind(this))
	}

	/**
	 *
	 **/
	private async listener (event : any, arg : any) {
		if (this.cb !== null) { 
			try {
				await this.cb(arg.state, arg.id)
			} catch (err) {
				this.log.error(err)
			}
		}
		event.returnValue = true
	}

	/**
	 *
	 **/
	public async start (cmd : string) : Promise<number> {
		const start = +new Date();
		const msg : string = (cmd + '').replace('ALERT', '').replace('Alert', '').replace('alert', '').trim()
		this.ui.send(this.id, { msg })
		return new Promise(function (resolve : Function, reject : Function) {
			this.cb = function () {
				const ms = (+new Date()) - start;
				return resolve(ms);
			}
		}.bind(this));
	}
}

module.exports = { Alert }
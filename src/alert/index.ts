'use strict';

import { delay } from 'delay'

/* class representing alert functionality */

class Alert {
	private ipc : any
	private log : any
	private id : string = 'alert'
	private cb : Function = null
	private ui : any

	constructor ( ui : any) {
		this.ui = ui
		this.init()
	}

	/**
	 *
	 **/
	private async init () {
		const Log = require('log')
		this.log = await Log({ label : this.id })
		this.ipc = require('electron').ipcMain
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
	public async start (cmd : string) {
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

module.exports = function (ui : any) {
	return new Alert(ui);
}
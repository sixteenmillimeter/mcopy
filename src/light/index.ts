'use strict';

import { delay } from 'delay';
import Log = require('log');

class Light {
	public state : any = { color : [0, 0, 0] }

	private arduino : Arduino;
	private cfg : any;
	private ui : any;
	private log : any;
	private ipc : any;
	private enabled : boolean = true;

	private id : string = 'light';

	/**
	 *
	 **/
	constructor (arduino : Arduino, cfg : any, ui : any) {
		this.arduino = arduino;
		this.cfg = cfg;
		this.ui = ui;
		this.init();
	}

	/**
	 *
	 **/
	private async init () {
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
	private async listener (event : any, arg : any) {
		if (typeof arg.rgb !== 'undefined') {
			try {
				await this.set(arg.rgb, arg.id, true);
			} catch (err) {
				this.log.error('Error setting light', err);
				
			}
		} else if (typeof arg.enable !== 'undefined') {
			this.enabled = true;
		} else if (typeof arg.disable !== 'undefined') {
			this.enabled = false;
		}
		event.returnValue = true
	}

	/**
	 *
	 **/
	public async set (rgb : number[], id : string, on : boolean) {
		const str : string = rgb.join(',');
		let ms : any;
		
		this.state.color = rgb;
		try {
			ms = this.arduino.send(this.id, this.cfg.arduino.cmd.light);
		} catch (err) {
			this.log.error('Error sending light command', err);
		}
		await delay(1);
		try {
			this.arduino.string(this.id, str);
		} catch (err) {
			this.log.error('Error sending light string', err);
		}
		await delay(1);
		await ms;
		return await this.end(rgb, id, ms);
	}

	/**
	 *
	 **/
	private async end (rgb : number[], id : string, ms : number) {
		this.log.info(`Light set to ${rgb.join(',')}`, 'LIGHT', true, true);
		return await this.ui.send(this.id, { rgb: rgb, id : id, ms: ms });
	}
}

module.exports = function (arduino : Arduino, cfg : any, ui : any) {
	return new Light(arduino, cfg, ui);
}
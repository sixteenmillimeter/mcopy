'use strict';

import { delay } from 'delay';
import { Log } from 'log';
import type { Logger } from 'winston';
import type { Arduino } from 'arduino';

export class Light {
	public state : any = { color : [0, 0, 0] }

	private arduino : Arduino;
	private cfg : any;
	private ui : any;
	private log : Logger;
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
		this.ipc.handle(this.id, this.listener.bind(this));
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
		return true;
	}

	/**
	 *
	 **/
	public async set (rgb : number[], id : string, on : boolean = true) {
		const str : string = rgb.join(',');
		let ms : any;
		
		this.state.color = rgb;
		try {
			ms = await this.arduino.send(this.id, this.cfg.arduino.cmd.light);
		} catch (err) {
			this.log.error('Error sending light command', err);
		}
		await delay(1);
		try {
			this.arduino.sendString(this.id, str);
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
		let res;
		//console.trace()
		this.log.info(`Light set to ${rgb.join(',')}`, 'LIGHT', true, true);
		try {
			//console.dir({ rgb, id, ms })
			res = await this.ui.send(this.id, { rgb, id, ms });
		} catch (err) {
			console.error(err);
			throw err
		}
		return res;
	}
}

module.exports = function (arduino : Arduino, cfg : any, ui : any) {
	return new Light(arduino, cfg, ui);
}
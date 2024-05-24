'use strict';

import { ipcMain } from 'electron';
import { delay } from 'delay';
import { Log } from 'log';
import type { Logger } from 'winston';
import type { Arduino } from 'arduino';
import type { Config } from 'cfg';
import type { WebContents, IpcMainEvent } from 'electron';

interface LightState {
	color : number[]
}

/** @module lib/light */

/**
 * Class representing the all light features.
 */
export class Light {
	public state : LightState = { color : [0, 0, 0] }

	private arduino : Arduino;
	private cfg : Config;
	private ui : WebContents;
	private log : Logger;
	private ipc : typeof ipcMain = ipcMain;
	private enabled : boolean = true;

	private id : string = 'light';

	/**
	 *
	 **/
	constructor (arduino : Arduino, cfg : Config, ui : WebContents) {
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
	private async listener (event : IpcMainEvent, arg : any) {
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
	}

	/**
	 *
	 **/
	public async set (rgb : number[], id : string, on : boolean = true) {
		const str : string = rgb.join(',');
		let ms : number;
		
		this.state.color = rgb;
		try {
			ms = await this.arduino.send(this.id, this.cfg.arduino.cmd.light);
		} catch (err) {
			this.log.error('Error sending light command', err);
		}
		await delay(1);
		try {
			ms += await this.arduino.sendString(this.id, str);
		} catch (err) {
			this.log.error('Error sending light string', err);
		}
		await delay(1);
		ms += 2;
		await this.end(rgb, id, ms);
		return ms;
	}

	/**
	 *
	 **/
	private async end (rgb : number[], id : string, ms : number) {
		let res;
		this.log.info(`Light set to ${rgb.join(',')}`, 'LIGHT', true, true);
		try {
			res = await this.ui.send(this.id, { rgb, id, ms });
		} catch (err) {
			this.log.error(`Error ending light`, err);
			throw err
		}
		return res;
	}
}

module.exports = { Light };

export type { LightState };
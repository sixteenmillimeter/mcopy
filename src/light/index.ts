'use strict';

import delay = require('delay');

class Light {
	public state : any = { color : [0, 0, 0] }

	private arduino : Arduino;
	private cfg : any;
	private ui : any;
	private log : any;
	private ipc : any;

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
		this.log = await require('log')({});
		this.ipc = require('electron').ipcMain;
		this.listen();
	}

	/**
	 *
	 **/
	private listen () {
		this.ipc.on('light', this.listener.bind(this));
	}

	/**
	 *
	 **/
	private async listener (event : any, arg : any) {
		try {
			await this.set(arg.rgb, arg.id, true);
		} catch (err) {
			this.log.error('Error setting light', err);
			
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
			ms = this.arduino.send('light', this.cfg.arduino.cmd.light);
		} catch (err) {
			this.log.error('Error sending light command', err);
		}
		await delay(1);
		try {
			this.arduino.string('light', str);
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
		return await this.ui.send('light', { rgb: rgb, id : id, ms: ms });
	}
}

module.exports = function (arduino : Arduino, cfg : any, ui : any) {
	return new Light(arduino, cfg, ui);
}
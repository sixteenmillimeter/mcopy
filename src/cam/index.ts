'use strict';

import { ipcMain } from 'electron';
import { Intval } from 'intval';
import { Processing } from 'processing';
import { delay } from 'delay';
import { Log } from 'log';
import type { Logger } from 'winston';
import type { Arduino } from 'arduino';
import type { FilmOut } from 'filmout';
import type { Config } from 'cfg';
import type { WebContents, IpcMainEvent } from 'electron';

interface CameraState{
	pos : number,
	dir : boolean,
	capper : boolean
}

/** @module lib/cam */

/**
 * Class representing camera functions.
 */

export class Camera {
	public state : CameraState = { 
		pos : 0,
		dir : true,
		capper: false
	};
	public arduino : Arduino = null;
	private intval : Intval = null;
	private processing : Processing = null;
	private log : Logger;
	private cfg : Config;
	private filmout : FilmOut;
	private ui : WebContents;
	private ipc : typeof ipcMain = ipcMain;
	private id : string = 'camera';
	/**
	 *
	 **/
	constructor (arduino : Arduino, cfg : Config, ui : WebContents, filmout : FilmOut, second : boolean = false) {
		this.arduino = arduino;
		this.cfg = cfg;	
		this.ui = ui;
		this.filmout = filmout;
		if (second) this.id += '_second';
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
		this.ipc.on('intval', this.connectIntval.bind(this));
		this.ipc.on('processing', this.connectProcessing.bind(this));
	}

	/**
	 *
	 **/
	public async set (dir : boolean, id : string) {
		let cmd : string;
		let ms : number;

		if (dir) {
			cmd = this.cfg.arduino.cmd[`${this.id}_forward`];
		} else {
			cmd = this.cfg.arduino.cmd[`${this.id}_backward`];
		}
		this.state.dir = dir;

		if (this.processing) {
			try {
				ms = await this.processing.setDir(dir);
			} catch (err) {
				this.log.error(err);
			}
		} else if (this.intval) {
			try {
				ms = await this.intval.setDir(dir);
			} catch (err) {
				this.log.error(err);
			}
		} else {
			try {
				ms = await this.arduino.send(this.id, cmd);
			} catch (err) {
				this.log.error(err);
			}
		}
		return await this.end(cmd, id, ms);
	}

	/**
	 *
	 **/
	 public async cap (state : boolean, id : string) {
		let cmd : string;
		let ms : number;

		if (state) {
			cmd = this.cfg.arduino.cmd[`${this.id}_forward`];
		} else {
			cmd = this.cfg.arduino.cmd[`${this.id}_backward`];
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
	public async move (id : string) {
		const cmd : string = this.cfg.arduino.cmd[this.id];
		let ms : number;
		if (this.filmout.state.enabled) {
			await this.filmout.start();
		}
		if (this.processing) {
			try {
				ms = await this.processing.move();
			} catch (err) {
				this.log.error(err);
			}
		} else if (this.intval) {
			try {
				ms = await this.intval.move();
			} catch (err) {
				this.log.error(`Error moving intval ${this.id}: ${id}`, err);
			}
		} else { 
			try {
				ms = await this.arduino.send(this.id, cmd);
			} catch (err) {
				this.log.error(err);
			}
		}
		if (this.filmout.state.enabled) {
			//await delay(100 * 1000);
			await this.filmout.end();
		}
		//this.log.info('Camera move time', { ms });
		return this.end(cmd, id, ms);
	}

	public async both (id : string) {
		const cmd : string = this.cfg.arduino.cmd[id];
		let ms : number;
		try {
			ms = await this.arduino.send(this.id, cmd)
		} catch (err) {
			this.log.error(`Error moving both ${this.id}: ${id}`, err)
		}
		//this.log.info('Cameras move time', { ms });
		return await this.end(cmd, id, ms)
	}

	/**
	 *
	 **/
	public async exposure (exposure : number, id : string) {
		const cmd : string = this.cfg.arduino.cmd.camera_exposure;
		const str : string = `${exposure}`;
		const started : number = +new Date();
		let ms : any;
		let confirmState : any;
		let parts : string[];
		let confirmExposure : number;

		if (this.intval) {
			return this.intval.setExposure(exposure, (ms : number) => {
				this.ui.send('timing', { c : 'c', ms : exposure });
				return this.end(cmd, id, ms);
			});
		} else if (this.arduino.hasState[this.id]) {
			try {
				ms = this.arduino.send(this.id, cmd);
			} catch (err) {
				this.log.error('Error sending camera exposure command', err);
			}
			
			await delay(1);

			try {
				ms = await this.arduino.sendString(this.id, str);
			} catch (err) {
				this.log.error('Error sending camera exposure string', err);
			}
			await ms;
			await delay(1);

			try {
				confirmState = await this.arduino.state(this.id, false);
			} catch (err) {
				this.log.error(`Error confirming set state`, err);
			}

			parts = this.arduino.stateStr[this.id].split('G')
			if (parts.length > 1) {
				parts = parts[1].split('H')
				confirmExposure = parseInt(parts[0])
				if (!isNaN(confirmExposure)) {
					this.log.info(`Exposure successfully set to ${confirmExposure}ms`)
					this.ui.send('timing', { c : 'c', ms : exposure })
				}
			}

			ms = (+new Date()) - started;
			return await this.end(cmd, id, ms);
		}
		return 0;
	}

	/**
	 *
	 **/
	private async connectIntval (event : IpcMainEvent, arg : any) {
		return new Promise((resolve : Function, reject : Function) => {
			if (arg.connect) {
				this.intval = new Intval(arg.url)
				this.processing = null
				this.intval.connect((err : Error, ms : number, state : boolean) => {
					if (err) {
						this.ui.send('intval', { connected : false })
						this.log.info(`Cannot connect to ${arg.url}`, 'INTVAL')
						this.intval = null
					} else {
						this.ui.send('intval', { connected : true, url : arg.url, state : state })
						this.log.info(`Connected to INTVAL3 @ ${arg.url}`, 'INTVAL')
					}
					return resolve(true)
				})
			} else if (arg.disconnect) {
				this.intval = null
				return resolve(false)
			}
		})
	}

	/**
	 *
	 **/
	private async connectProcessing (event : IpcMainEvent, arg : any) {
		return new Promise((resolve, reject) => {
			this.processing = new Processing(arg.url)
			this.intval = null
			this.ui.send('processing', { connected : true, url : arg.url })
			return resolve(true)
		})
	}

	/**
	 *
	 **/
	private async listener (event : IpcMainEvent, arg : any) {
		if (typeof arg.dir !== 'undefined') {
			try {
				await this.set(arg.dir, arg.id)
			} catch (err) {
				this.log.error(err)
			}
		} else if (typeof arg.move !== 'undefined') {
			try {
				await this.move(arg.id)
			} catch (err) {
				this.log.error(err)
			}
		} else if (typeof arg.val !== 'undefined') {
			this.state.pos = arg.val
		} else if (typeof arg.capper !== 'undefined') {
			try {
				await this.cap(arg.capper, arg.id)
			} catch (err) {
				this.log.error(err)
			}
		} else if (typeof arg.exposure !== 'undefined') {
			try {
				await this.exposure(arg.exposure, arg.id);
			} catch (err) {
				this.log.error(err);
			}
		}
		event.returnValue = true
	}

	/**
	 *
	 **/
	private async end (cmd : string, id : string, ms : number) {
		let message : string = '';
		if (cmd === this.cfg.arduino.cmd.camera_forward) {
			message = 'Camera set to FORWARD';
		} else if (cmd === this.cfg.arduino.cmd.camera_backward) {
			message = 'Camera set to BACKWARD';
		} else if (cmd === this.cfg.arduino.cmd.camera_second_forward) {
			message = 'Camera second set to FORWARD';
		} else if (cmd === this.cfg.arduino.cmd.camera_second_backward) {
			message = 'Camera second set to BACKWARD';
		} else if (cmd === this.cfg.arduino.cmd.camera) {
			message = 'Camera ';
			if (this.state.dir) {
				message += 'ADVANCED';
			} else {
				message += 'REWOUND';
			}
			message += ' 1 frame';
		} else if (cmd === this.cfg.arduino.cmd.camera_second) {
			message = 'Camera second ';
			if (this.state.dir) {
				message += 'ADVANCED';
			} else {
				message += 'REWOUND';
			}
			message += ' 1 frame';
		} else if (cmd === this.cfg.arduino.cmd.camerass) {
			message += 'Cameras both MOVED 1 frame each';
		} else if (cmd === this.cfg.arduino.camera_exposure) {
			message += 'Camera set exposure';
		}
		message += ` ${ms}ms`
		this.log.info(message);
		await this.ui.send(this.id, {cmd: cmd, id : id, ms: ms});
		return ms;
	}
}

module.exports = { Camera };
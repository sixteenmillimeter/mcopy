/** class representing the Projector features **/

import { Log } from 'log';
import type { Logger } from 'winston';
import type { Arduino } from 'arduino';
import type { FilmOut } from 'filmout';
import type { WebContents } from 'electron';

interface ProjectorState {
	pos : number,
	dir : boolean
}

export class Projector {
	public state : ProjectorState = { 
		pos : 0,
		dir : true
	};
	public arduino : Arduino = null;
	private log : Logger;
	private cfg : any;
	private ui : WebContents;
	private ipc : any;
	public filmout : FilmOut;
	private id : string = 'projector';

	/**
	 *
	 **/
	constructor (arduino : Arduino, cfg : any, ui : WebContents, filmout : any, second : boolean = false) {
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
		this.log = await Log({ label : this.id })
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
	public async set (dir : boolean, id : string) : Promise<number> {
		let cmd : string;
		let ms : number;
		if (dir) {
			cmd = this.cfg.arduino.cmd[`${this.id}_forward`]
		} else {
			cmd = this.cfg.arduino.cmd[`${this.id}_backward`]
		}
		this.state.dir = dir
		if (this.filmout.state.enabled) {
			this.filmout.set(dir)
		} else {
			try {
				ms = await this.arduino.send(this.id, cmd)
			} catch (err) {
				this.log.error(`Error setting ${this.id} direction: ${id}`, err)
			}
		}
		return await this.end(cmd, id, ms)
	}

	/**
	 *
	 **/
	public async move (id : string) : Promise<number> {
		const cmd : string = this.cfg.arduino.cmd[this.id];
		let ms : number;
		if (this.filmout.state.enabled) {
			try {
				ms = await this.filmout.move()
			} catch (err) {
				this.log.error(err)
			}
		} else {
			try {
				ms = await this.arduino.send(this.id, cmd)
			} catch (err) {
				this.log.error(`Error moving ${this.id}: ${id}`, err)
			}
		}
		//this.log.info('Projector move time', { ms });
		return await this.end(cmd, id, ms)
	}

	public async both (id : string) : Promise<number> {
		const cmd : string = this.cfg.arduino.cmd[this.id + 's'];
		let ms : number;
		try {
			ms = await this.arduino.send(this.id, cmd)
		} catch (err) {
			this.log.error(`Error moving ${this.id}: ${id}`, err)
		}
		//this.log.info('Projectors move time', { ms });
		return await this.end(cmd, id, ms)
	}

	/**
	 *
	 **/
	private async listener  (event : any, arg : any) {
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
				this.log.error(`Error moving ${this.id}: ${arg.id}`, err)
			}
		} else if (typeof arg.val !== 'undefined') {
			this.state.pos = arg.val;
			this.filmout.state.frame = arg.val
		}
		event.returnValue = true
	}

	/**
	 *
	 **/
	async end (cmd : string, id : string, ms : number) : Promise<number> {
		let message : string = ''
		if (cmd === this.cfg.arduino.cmd.projector_forward) {
			message = 'Projector set to FORWARD'
		} else if (cmd === this.cfg.arduino.cmd.projector_backward) {
			message = 'Projector set to BACKWARD'
		} else if (cmd === this.cfg.arduino.cmd.projector_second_forward) {
			message = 'Projector second set to FORWARD'
		} else if (cmd === this.cfg.arduino.cmd.projector_second_backward) {
			message = 'Projector second set to BACKWARD'
		} else if (cmd === this.cfg.arduino.cmd.projector) {
			message = 'Projector '
			if (this.state.dir) {
				message += 'ADVANCED'
			} else {
				message += 'REWOUND'
			}
			message += ' 1 frame'
		} else if (cmd === this.cfg.arduino.cmd.projector_second) {
			message = 'Projector second '
			if (this.state.dir) {
				message += 'ADVANCED'
			} else {
				message += 'REWOUND'
			}
			message += ' 1 frame'
		} else if (cmd === this.cfg.arduino.cmd.projectors) {
			message += 'Projectors both MOVED 1 frame each'
		}
		message += ` ${ms}ms`
		this.log.info(message, 'PROJECTOR')
		await this.ui.send(this.id, { cmd, id, ms })
		return ms
	}
}

module.exports = function (arduino : Arduino, cfg : any, ui : WebContents, filmout : FilmOut, second : boolean) {
	return new Projector(arduino, cfg, ui, filmout, second)
}

export type { ProjectorState }
'use strict';

import { Intval } from 'intval';
import { Processing } from 'processing';
import { delay } from 'delay';

/** class representing camera functions **/

class Camera {
	private state : any = { 
		pos : 0,
		dir : true,
		capepr: false
	};
	private arduino : Arduino = null;
	private intval : any = null;
	private processing : any = null;
	private log : any;
	private cfg : any;
	private filmout : any;
	private ui : any;
	private ipc : any;
	private id : string = 'camera';
	/**
	 *
	 **/
	constructor (arduino : Arduino, cfg : any, ui : any, filmout : any, second : boolean = false) {
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
	public async move (frame : number, id : string) {
		const cmd : string = this.cfg.arduino.cmd[this.id];
		let ms : number;
		if (this.filmout.state.enabled) {
			await this.filmout.start()
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
				this.log.error(err);
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

	public async both (frame : any, id : string) {
		const cmd : string = this.cfg.arduino.cmd[id];
		let ms : number;
		try {
			ms = await this.arduino.send(this.id, cmd)
		} catch (err) {
			this.log.error(`Error moving ${this.id}`, err)
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

		if (this.intval) {
			return this.intval.setExposure(this.id, exposure, (ms : number) => {
				return this.end(cmd, id, ms);
			});
		} else if (this.arduino.hasState[this.id]) {
			this.log.info(`Sending cmd ${cmd}`);
			try {
				ms = this.arduino.send(this.id, cmd);
			} catch (err) {
				this.log.error('Error sending camera exposure command', err);
			}
			
			await delay(1);
			this.log.info(`Sending str ${str}`);
			try {
				ms = await this.arduino.sendString(this.id, str);
			} catch (err) {
				this.log.error('Error sending camera exposure string', err);
			}
			this.log.info(`Sent str ${str}`);
			await ms;
			this.log.info(`Sent cmd ${cmd}`);
			await delay(1);
			this.log.info(`Sending state request`);
			try {
				confirmState = await this.arduino.state(this.id, false);
			} catch (err) {
				this.log.error(`Error confirming set state`, err);
			}
			console.dir(confirmState);
			ms = (+new Date()) - started;
			return await this.end(cmd, id, ms);
		}
		return 0;
	}

	/**
	 *
	 **/
	private async connectIntval (event : any, arg : any) {
		return new Promise((resolve, reject) => {
			if (arg.connect) {
				this.intval = new Intval(arg.url)
				this.processing = null
				this.intval.connect((err : any, ms : number, state : boolean) => {
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
	private async connectProcessing (event : any, arg : any) {
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
	private async listener (event : any, arg : any) {
		if (typeof arg.dir !== 'undefined') {
			try {
				await this.set(arg.dir, arg.id)
			} catch (err) {
				this.log.error(err)
			}
		} else if (typeof arg.frame !== 'undefined') {
			try {
				await this.move(arg.frame, arg.id)
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
		let message = '';
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
		this.ui.send(this.id, {cmd: cmd, id : id, ms: ms});
		return ms;
	}
}

module.exports = function (arduino : Arduino, cfg : any, ui : any, filmout : any, second : boolean) {
	return new Camera(arduino, cfg, ui, filmout, second);
}
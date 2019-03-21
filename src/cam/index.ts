'use strict';

import Intval = require('intval');
import Log = require('log');
import delay = require('delay');

/** class representing camera functions **/

class Camera {
	private state : any = { 
		pos : 0,
		dir : true, 
		digital : false 
	};
	private arduino : Arduino = null;
	private intval : any = null;
	private log : any;
	private cfg : any;
	private dig : any;
	private ui : any;
	private ipc : any;
	private id : string = 'camera';
	/**
	 *
	 **/
	constructor (arduino : Arduino, cfg : any, ui : any, dig : any) {
		this.arduino = arduino;
		this.cfg = cfg;	
		this.ui = ui;
		this.dig = dig;
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
		this.ipc.on('intval', this.connectIntval.bind(this));
	}

	/**
	 *
	 **/
	public async set (dir : boolean, id : string) {
		let cmd : string;
		let ms : number;

		if (dir) {
			cmd = this.cfg.arduino.cmd.cam_forward;
		} else {
			cmd = this.cfg.arduino.cmd.cam_backward;
		}
		this.state.dir = dir;

		if (this.intval) {
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
	public async move (frame : number, id : string) {
		const cmd : string = this.cfg.arduino.cmd.camera;
		let ms : number;
		if (this.dig.state.enabled) {
			await this.dig.start()
		}
		if (this.intval) {
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
		if (this.dig.state.enabled) {
			await this.dig.end()
		}
		this.log.info('Camera move time', { ms });
		return this.end(cmd, id, ms);
	}

	/**
	 *
	 **/
	public exposure (exposure : number, id : string) {
		let cmd : string = 'E';
		this.intval.setExposure(this.id, exposure, (ms : number) => {
			this.end(cmd, id, ms);
		});
	}

	/**
	 *
	 **/
	private async connectIntval (event : any, arg : any) {
		return new Promise((resolve, reject) => {
			if (arg.connect) {
				this.intval = new Intval(arg.url)
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
	private async listener (event : any, arg : any) {
		if (typeof arg.dir !== 'undefined') {
			try {
				await this.set(arg.dir, arg.id);
			} catch (err) {
				this.log.error(err);
			}
		} else if (typeof arg.frame !== 'undefined') {
			try {
				await this.move(arg.frame, arg.id);
			} catch (err) {
				this.log.error(err);
			}
		} else if (typeof arg.val !== 'undefined') {
			this.state.pos = arg.val;
		}
		event.returnValue = true;
	}

	/**
	 *
	 **/
	private async end (cmd : string, id : string, ms : number) {
		let message = '';
		if (cmd === this.cfg.arduino.cmd.cam_forward) {
			message = 'Camera set to FORWARD';
		} else if (cmd === this.cfg.arduino.cmd.cam_backward) {
			message = 'Camera set to BACKWARD';
		} else if (cmd === this.cfg.arduino.cmd.camera) {
			message = 'Camera ';
			if (this.state.dir) {
				message += 'ADVANCED';
			} else {
				message += 'REWOUND';
			}
			message += ' 1 frame';
		}
		this.log.info(message, 'CAMERA', true, true)
		this.ui.send(this.id, {cmd: cmd, id : id, ms: ms})
	}
}

module.exports = function (arduino : Arduino, cfg : any, ui : any, dig : any) {
	return new Camera(arduino, cfg, ui, dig);
}
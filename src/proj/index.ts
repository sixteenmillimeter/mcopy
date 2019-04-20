/** class representing the Projector features **/

import Log = require('log');

class Projector {
	private state : any = { 
		pos : 0,
		dir : true, 
		digital : false 
	};
	private arduino : Arduino = null;
	private log : any;
	private cfg : any;
	private ui : any;
	private ipc : any;
	private dig : any;
	private id : string = 'projector';

	/**
	 *
	 **/
	constructor (arduino : Arduino, cfg : any, ui : any, dig : any, second : boolean = false) {
		this.arduino = arduino;
		this.cfg = cfg;
		this.ui = ui;
		this.dig = dig;
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
	public async set (dir : boolean, id : string) {
		let cmd : string;
		let ms : number;
		if (dir) {
			cmd = this.cfg.arduino.cmd[`${this.id}_forward`]
		} else {
			cmd = this.cfg.arduino.cmd[`${this.id}_backward`]
		}
		this.state.dir = dir
		if (this.dig.state.enabled) {
			this.dig.set(dir)
		} else {
			try {
				ms = await this.arduino.send(this.id, cmd)
			} catch (err) {
				this.log.error(`Error setting ${this.id} direction`, err)
			}
		}
		return await this.end(cmd, id, ms)
	}

	/**
	 *
	 **/
	public async move (frame : any, id : string) {
		const cmd : string = this.cfg.arduino.cmd[this.id];
		let ms : number;
		if (this.dig.state.enabled) {
			try {
				ms = await this.dig.move()
			} catch (err) {
				this.log.error(err)
			}
		} else {
			try {
				ms = await this.arduino.send(this.id, cmd)
			} catch (err) {
				this.log.error(`Error moving ${this.id}`, err)
			}
		}
		//this.log.info('Projector move time', { ms });
		return await this.end(cmd, id, ms)
	}

	public async both (frame : any, id : string) {
		const cmd : string = this.cfg.arduino.cmd[this.id + 's'];
		let ms : number;
		try {
			ms = await this.arduino.send(this.id, cmd)
		} catch (err) {
			this.log.error(`Error moving ${this.id}`, err)
		}
		//this.log.info('Projectors move time', { ms });
		return await this.end(cmd, id, ms)
	}

	/**
	 *
	 **/
	private async listener  (event : any, arg : any){
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
			this.state.pos = arg.val;
			this.dig.state.frame = arg.val
		}
		event.returnValue = true
	}

	/**
	 *
	 **/
	async end (cmd : string, id : string, ms : number) {
		let message : string = '';
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
			message += 'Projectors both MOVED 1 frame each';
		}
		message += ` ${ms}ms`
		this.log.info(message, 'PROJECTOR')
		return await this.ui.send(this.id, {cmd: cmd, id : id, ms: ms})
	}
}

module.exports = function (arduino : Arduino, cfg : any, ui : any, dig : any, second : boolean) {
	return new Projector(arduino, cfg, ui, dig, second);
}
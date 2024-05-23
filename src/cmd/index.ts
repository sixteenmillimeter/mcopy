'use strict';

import { v4 as uuid } from 'uuid';
import { delay } from 'delay';
import type { Projector } from 'proj';
import type { Camera } from 'cam';
import type { Light } from 'light';
import type { Capper } from 'capper';
import type { Alert } from 'alert';

export class Commands {
	public proj : Projector;
	public cam : Camera;
	public light : Light;

	public cam2 : Camera;
	public proj2 : Projector;

	public capper : Capper;

	public alertObj : Alert;

	private cfg : any;
	private ipc : any;

	/**
	 * @constructor
	 * Assign all connected devices and mock devices as private classes.
	 *
	 * @param {object} cfg Configuration object
	 * @param {object} proj Projector 1
	 * @param {object} cam  Camera 1
	 * @param {object} light Light source
	 * @param {object} alert Alert object
	 * @param {object} cam2 (optional) Camera 2
	 * @param {object} proj2 (optional) Projector 2
	 * @param {object} capper Capper object
	 * 
	 **/

	constructor (cfg : any, proj : Projector, cam : any, light : Light, alert : Alert, cam2 : any = null, proj2 : Projector = null, capper : any = null) {
		this.cfg = cfg;
		this.proj = proj;
		this.cam = cam;
		this.light = light;
		this.alertObj = alert;

		if (cam2 !== null) this.cam2 = cam2;
		if (proj2 !== null) this.proj2 = proj2;
		if (capper !== null) this.capper = capper;
		
		this.ipc = require('electron').ipcMain;
	}

	/**
	 * Move the projector one frame forward
	 * 
	 * @returns {integer} Length of action in ms
	 **/
	public async projector_forward () : Promise<number> {
		const id : string = uuid();
		let ms : number;
		try {
			if (!this.proj.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj.set(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.proj.move(id);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the projector one frame backward
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async projector_backward () : Promise<number> {
		const id : string = uuid();
		let ms : number;
		try {
			if (this.proj.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj.set(false, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.proj.move(id);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the camera one frame forward
	 *
	 * @param {object} 	 cmd 	   Full cmd object
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async camera_forward () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let rgb : number[] = [255, 255, 255];
		let ms : number;
		try {
			if (!this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb, id);
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.cam.move(id);
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the camera one frame forward with light off 
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async black_forward () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let ms : number = 0;
		try {
			if (!this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			if (this.capper) {
				ms += await this.capper.capper(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id); //make sure set to off
			await delay(this.cfg.arduino.serialDelay);
			ms += await this.cam.move(id);
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
			if (this.capper) {
				ms += await this.capper.capper(false, id);
			}
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the camera one frame backward
	 *
	 * @param {object} 	 cmd 	   Full cmd object
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async camera_backward () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let rgb : number[] = [255, 255, 255];
		let ms : number;
		try {
			if (this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(false, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb, id);
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.cam.move(id);
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the camera one frame forward, light set to black or off
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async black_backward  () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let ms : number = 0;
		try {
			if (this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(false, id);
			}
			if (this.capper) {
				ms += await this.capper.capper(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id); //make sure set to off
			await delay(this.cfg.arduino.serialDelay);
			ms += await this.cam.move(id);
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
			if (this.capper) {
				ms += await this.capper.capper(false, id);
			}
		} catch (err) {
			throw err;
		}
		return ms;
	}

	/**
	 * Move the second camera one frame forward
	 *
	 * @param {object} 	 cmd 	   Full cmd object
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async camera_second_forward () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let rgb : number[] = [255, 255, 255];
		let ms : number;
		try {
			if (!this.cam2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam2.set(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb, id);
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.cam2.move(id);
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
		} catch (err) {
			throw err;
		}
		return ms;
	}

	/**
	 * Move the second camera one frame backward
	 *
	 * @param {object} 	 cmd 	   Full cmd object
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async camera_second_backward () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let rgb : number[] = [255, 255, 255];
		let ms : number;
		try {
			if (this.cam2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam2.set(false, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb, id);
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.cam2.move(id);
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
		} catch (err) {
			throw err;
		}
		return ms;
	}


	/**
	 * Move the both cameras one frame forward
	 *
	 * @param {object} 	 cmd 	   Full cmd object
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async cameras_forward () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let rgb : number[] = [255, 255, 255];
		let both : number[];
		let ms : number;
		try {
			if (!this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(true, id);
			}
			if (!this.cam2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam2.set(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb, id);
			await delay(this.cfg.arduino.serialDelay);

			if (this.cam && this.cam2 && this.cam.arduino.alias.camera === this.cam.arduino.alias.camera_second) {
				ms = await this.cam.both(id);
			} else {
				both = await Promise.all( [this.cam.move(id), this.cam2.move(id)] );
				ms = Math.max(...both);
			}

			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the both cameras one frame backward
	 *
	 * @param {object} 	 cmd 	   Full cmd object
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async cameras_backward () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let rgb : number[] = [255, 255, 255];
		let both : number[];
		let ms : number;
		try {
			if (this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(false, id);
			}
			if (this.cam2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam2.set(false, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb, id);
			await delay(this.cfg.arduino.serialDelay);

			if (this.cam && this.cam2 && this.cam.arduino.alias.camera === this.cam.arduino.alias.camera_second) {
				ms = await this.cam.both(id);
			} else {
				both = await Promise.all( [this.cam.move(id), this.cam2.move(id)] );
				ms = Math.max(...both);
			}

			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
		} catch (err) {
			throw err;
		}
		return ms;
	}

	/**
	 * Move first camera one frame forward and rewind secondary camera one frame backward
	 *
	 * @param {object} 	 cmd 	   Full cmd object
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async camera_forward_camera_second_backward () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let rgb : number[] = [255, 255, 255];
		let both : number[];
		let ms : number;
		try {
			if (!this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(true, id);
			}
			if (this.cam2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam2.set(false, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb, id);
			await delay(this.cfg.arduino.serialDelay);

			if (this.cam && this.cam2 && this.cam.arduino.alias.camera === this.cam.arduino.alias.camera_second) {
				ms = await this.cam.both(id);
			} else {
				both = await Promise.all( [this.cam.move(id), this.cam2.move(id)] );
				ms = Math.max(...both);
			}

			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Rewind first camera one frame backward and move secondary camera one frame forward
	 *
	 * @param {object} 	 cmd 	   Full cmd object
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async camera_backward_camera_second_forward () : Promise<number> {
		const id : string = uuid();
		const off : number[] = [0, 0, 0];
		let rgb : number[] = [255, 255, 255];
		let both : number[];
		let ms : number;
		try {
			if (this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(false, id);
			}
			if (!this.cam2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam2.set(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb, id);
			await delay(this.cfg.arduino.serialDelay);

			if (this.cam && this.cam2 && this.cam.arduino.alias.camera === this.cam.arduino.alias.camera_second) {
				ms = await this.cam.both(id);
			} else {
				both = await Promise.all( [this.cam.move(id), this.cam2.move(id)] );
				ms = Math.max(...both);
			}

			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off, id);
		} catch (err) {
			throw err;
		}
		return ms;
	}

	/**
	 * Move the secondary projector forward one frame
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async projector_second_forward () : Promise<number> {
		const id : string = uuid();
		let ms : number;
		try {
			if (!this.proj2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj2.set(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.proj2.move(id);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Rewind the secondary projector backward one frame
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async projector_second_backward () : Promise<number> {
		const id : string = uuid();
		let ms : number;
		try {
			if (this.proj2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj2.set(false, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.proj2.move(id);
		} catch (err) {
			throw err;
		}
		return ms;
	}

	/**
	 * Move the both projectors forward one frame
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async projectors_forward () : Promise<number> {
		const id : string = uuid();
		let both : number[];
		let ms : number;
		try {
			if (!this.proj.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj.set(true, id);
			}
			if (!this.proj2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj2.set(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			if (this.proj && this.proj2 && this.proj.arduino.alias.projector === this.proj.arduino.alias.projector_second) {
				ms = await this.proj.both(id);
			} else {
				both = await Promise.all([ this.proj.move(id), this.proj2.move(id) ]);
				ms = Math.max(...both);
			}
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Rewind both projectors backwards one frame
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async projectors_backward () : Promise<number> {
		const id : string = uuid();
		let both : number[];
		let ms : number;
		try {
			if (this.proj.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj.set(false, id);
			}
			if (this.proj2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj2.set(false, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			if (this.proj && this.proj2 && this.proj.arduino.alias.projector === this.proj.arduino.alias.projector_second) {
				ms = await this.proj.both(id);
			} else {
				both = await Promise.all([ this.proj.move(id), this.proj2.move(id) ]);
				ms = Math.max(...both);
			}
		} catch (err) {
			throw err;
		}
		return ms;
	}

	/**
	 * Move the primary projector forward one frame and rewind the secondary projector
	 * one frame backwards.
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async projector_forward_projector_second_backward () : Promise<number> {
		const id : string = uuid();
		let both : number[];
		let ms : number;
		try {
			if (!this.proj.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj.set(true, id);
			}
			if (this.proj2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj2.set(false, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			if (this.proj && this.proj2 && this.proj.arduino.alias.projector === this.proj.arduino.alias.projector_second) {
				ms = await this.proj.both(id);
			} else {
				both = await Promise.all([ this.proj.move(id), this.proj2.move(id) ]);
				ms = Math.max(...both);
			}
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Rewind the primary projector backwards one frame and move the secondary
	 * projector forward one frame.
	 *
	 * @returns {integer} Length of action in ms
	 **/
	public async projector_backward_projector_second_forward () : Promise<number> {
		const id : string = uuid();
		let both : number[];
		let ms : number;
		try {
			if (this.proj.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj.set(false, id);
			}
			if (!this.proj2.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj2.set(true, id);
			}
			await delay(this.cfg.arduino.serialDelay);
			if (this.proj && this.proj2 && this.proj.arduino.alias.projector === this.proj.arduino.alias.projector_second) {
				ms = await this.proj.both(id);
			} else {
				both = await Promise.all([ this.proj.move(id), this.proj2.move(id) ]);
				ms = Math.max(...both);
			}
		} catch (err) {
			throw err;
		}
		return ms;
	}

	/**
	 * Throws an alert to pause a sequence
	 * 
	 * @returns {integer} Length of action in ms 
	 **/

	public async alert (cmd : any) : Promise<number> {
		const id : string = uuid();
		let ms : number;
		try {
			ms = await this.alertObj.start(cmd.light); //change this meta
		} catch (err) {
			throw err;
		}
		return ms;
	}


	/**
	 * Pauses a sequence for a length of time
	 * 
	 * @returns {integer} Length of action in ms 
	 **/

	public async pause (cmd : any) : Promise<number>{
		const id : string = uuid();
		let ms : number;
		try {
			ms = await delay(cmd.light * 1000); //delay is in seconds
		} catch (err) {
			throw err;
		}
		return ms;
	}

	/**
	 * Sets the camera exposure (if supported).
	 * 
	 **/
	public async camera_exposure (cmd : any) : Promise<number>{
		const id : string = uuid();
		let ms : number;
		try {
			ms = await this.cam.exposure(cmd.light, id);
		} catch (err) {
			throw err;
		}
		return ms;
	}
}

module.exports = function (cfg : any, proj : any, cam : any, light : any, alert : any, cam2 : any, proj2 : any, capper : any) {
	return new Commands(cfg, proj, cam, light, alert, cam2, proj2, capper);
}
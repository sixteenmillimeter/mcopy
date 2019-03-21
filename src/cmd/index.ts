'use strict';

import delay = require('delay');

class Commands {
	private proj : any;
	private cam : any;
	private light : any;

	private cfg : any;
	private ipc : any;

	constructor (cfg : any, proj : any, cam : any, light : any) {
		this.cfg = cfg;
		this.proj = proj;
		this.cam = cam;
		this.light = light;

		this.ipc = require('electron').ipcMain;
	}

	/**
	 * Move the projector one frame forward
	 **/
	public async proj_forward () {
		let ms : number;
		try {
			if (!this.proj.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj.set(true);
			}
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.proj.move();
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the projector one frame backward
	 **/
	public async proj_backward () {
		let ms : number;
		try {
			if (this.proj.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.proj.set(false);
			}
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.proj.move();
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the camera one frame forward
	 *
	 * @param {array} 	 rgb 	   Color to set light for frame
	 **/
	public async cam_forward (rgb : number[] = [255, 255, 255]) {
		const off : number[] = [0, 0, 0];
		let ms : number;
		try {
			if (!this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(true);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb);
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.cam.move();
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the camera one frame forwardwith light off 
	 **/
	public async black_forward () {
		const off : number[] = [0, 0, 0];
		let ms : number;
		try {
			if (!this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(true);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off); //make sure set to off
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.cam.move();
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the camera one frame backward
	 *
	 * @param {array} 	 rgb 	   Color to set light for frame
	 **/
	public async cam_backward (rgb : number[] = [255, 255, 255]) {
		const off : number[] = [0, 0, 0];
		let ms : number;
		try {
			if (this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(false);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(rgb);
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.cam.move();
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off);
		} catch (err) {
			throw err;
		}
		return ms;
	}
	/**
	 * Move the camera one frame forward, light set to black or off
	 *
	 **/
	public async black_backward  () {
		const off : number[] = [0, 0, 0];
		let ms : number;
		try {
			if (this.cam.state.dir) {
				await delay(this.cfg.arduino.serialDelay);
				await this.cam.set(false);
			}
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off); //make sure set to off
			await delay(this.cfg.arduino.serialDelay);
			ms = await this.cam.move();
			await delay(this.cfg.arduino.serialDelay);
			await this.light.set(off);
		} catch (err) {
			throw err;
		}
		return ms;
	}

	/*
		cam2_forward : 'C2F',
		cam2_backward : 'C2B',

		cams_forward : 'CCF',
		cams_forward : 'CCB',

		cam_forward_cam2_backward : 'CFCB',
		cam_backward_cam2_forward : 'CBCF',
	*/
	/**
	 * Move the secondary projector forward one frame
	 *
	 * @param {function} callback  Function to call after action
	 **/
	/*cmd.proj2_forward = function (callback) {
		'use strict';
		var res = function (ms) {
			$('#cmd_proj2_forward').removeClass('active');
			gui.updateState();
			if (callback) { callback(ms); }
		};
		$('#cmd_proj2_forward').addClass('active');
		if (!mcopy.state.projector2.direction) {
			proj.set2(true, function (ms) {				
				setTimeout(function () {
					proj.move2(res);
				}, mcopy.cfg.arduino.serialDelay);
			});
		} else {
			setTimeout(function () {
				proj.move2(res);
			}, mcopy.cfg.arduino.serialDelay);
		}
	};
	cmd.proj2_backward = function (callback) {};

	cmd.projs_forward = function (callback) {};
	cmd.projs_backward = function (callback) {};

	cmd.proj_forward_proj2_backward = function (callback) {};
	cmd.proj_backward_proj2_forward = function (callback) {};
	*/


	/**
	 * Move the camera to a specific frame. Accepts the input with the "move_cam_to"
	 * value. Moves as black frames to prevent multiple exposure.
	 *
	 **/
	public async cam_to () {
		/*const raw = $('#move_cam_to').val();
		const val = parseInt(raw);
		let proceed = false;
		let total;
		let steps = [];
		let c;
		let cont;
		if (val !== mcopy.state.camera.pos) {
			if (val < mcopy.state.camera.pos) {
				total = -(mcopy.state.camera.pos - val)
			} else if (val > mcopy.state.camera.pos) {
				total = val - mcopy.state.camera.pos
			}
			if (total > 0) {
				c = 'BF';
			} else if (total < 0) {
				c = 'BB';
			}
			for (let i = 0; i < Math.abs(total); i++) {
				steps.push({ cmd : c })
			}
			cont = confirm(`Do you want to ${(total > 0 ? 'advance' : 'rewind')} the camera ${total} frame${(total === 1 ? '' : 's')} to frame ${val}?`)
			if (cont) {
				seq.exec(steps);
			}
		}*/
	}

	/**
	 * Move the projector to a specific frame. Accepts the input with the "move_proj_to"
	 * value.
	 *
	 **/
	public async proj_to () {
		/*const raw = $('#move_proj_to').val();
		const val = parseInt(raw);
		let proceed = false;
		let total;
		let steps = [];
		let c;
		let cont
		if (val !== mcopy.state.projector.pos) {
			if (val < mcopy.state.projector.pos) {
				total = -(mcopy.state.projector.pos - val)
			} else if (val > mcopy.state.projector.pos) {
				total = val - mcopy.state.projector.pos
			}
			if (total > 0) {
				c = 'PF';
			} else if (total < 0) {
				c = 'PB';
			}
			for (let i = 0; i < Math.abs(total); i++) {
				steps.push({ cmd : c })
			}
			cont = confirm(`Do you want to ${(total > 0 ? 'advance' : 'rewind')} the projector ${total} frame${(total === 1 ? '' : 's')} to frame ${val}?`)
			if (cont) {
				seq.exec(steps);
			}
		}*/
	}

}

module.exports = function (cfg : any, proj : any, cam : any, light : any) {
	return new Commands(cfg, proj, cam, light);
}
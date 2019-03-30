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
	public async projector_forward () {
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
	public async projector_backward () {
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
	public async camera_forward (rgb : number[] = [255, 255, 255]) {
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
	public async camera_backward (rgb : number[] = [255, 255, 255]) {
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
		camera_second_forward : 'C2F',
		camera_second_backward : 'C2B',

		cameras_forward : 'CCF',
		cameras_forward : 'CCB',

		camera_forward_camera_second_backward : 'CFCB',
		camera_backward_camera_second_forward : 'CBCF',
	*/
	/**
	 * Move the secondary projector forward one frame
	 *
	 * @param {function} callback  Function to call after action
	 **/
	/*cmd.projector_second_forward = function (callback) {
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
				}, this.cfg.arduino.serialDelay);
			});
		} else {
			setTimeout(function () {
				proj.move2(res);
			}, this.cfg.arduino.serialDelay);
		}
	};
	cmd.projector_second_backward = function (callback) {};

	cmd.projectors_forward = function (callback) {};
	cmd.projectors_backward = function (callback) {};

	cmd.projector_forward_projector_second_backward = function (callback) {};
	cmd.projector_backward_projector_second_forward = function (callback) {};
	*/

}

module.exports = function (cfg : any, proj : any, cam : any, light : any) {
	return new Commands(cfg, proj, cam, light);
}
'use strict'

/// <reference path ="jquery.d.ts"/> 

declare var gui : any;
declare var light : any;
declare var cfg : any;
declare var log : any;
declare var w2popup : any;
declare var cam : any;
declare var proj : any;
declare var ipcRenderer : any;
declare var humanizeDuration : Function;

interface Arg {
	loop : number;
	step : number;
	stop : boolean;
	start : boolean;
	ms : number;
}

interface Step {
	cmd : string;
	light: string;
	x : number;
}

let seq : any = {};


class Sequence {
	private id : string = 'sequence';
	public grid : any[] = [];
	public gridLoops : number = 1;
	public arr : any[] = [];
	public loops : number = 1;
	public size : number = 24;
	private time : number = 0;
	private running : boolean = false;
	constructor () {

	}
	public init () {
		this.listen();
	}
	private listen () {
		ipcRenderer.on(this.id, this.listener.bind(this))
	}
	private listener (event : Event, arg : Arg) {
		let timeStr;
		console.log(JSON.stringify(arg))
		if (arg.start) {
			if (typeof arg.loop !== 'undefined' && typeof arg.step !== 'undefined') {
				this.activeStep(arg.step);
				log.info(`Step ${arg.step + 1}/${this.arr.length}, Loop ${arg.loop + 1}/${this.loops}`, 'SERIAL', true);
			} else if (typeof arg.loop !== 'undefined') {
				$('#loop_current').text(gui.fmtZero(arg.loop + 1, 6));
			} else {
				this.progress(0, 0);
			}
		} else if (arg.stop) {
			if (typeof arg.loop !== 'undefined' && typeof arg.step !== 'undefined') {
				//console.log(JSON.stringify(arg))
				this.progress(arg.step + 1, arg.loop);
				this.inactiveAll();
			} else if (typeof arg.loop !== 'undefined') {
				$('#loop_current').text('');
			} else {
				gui.overlay(false);
				gui.spinner(false);
				log.info('Sequence stopped', 'SERIAL', true);
				log.info(typeof arg.ms)
				timeStr = ( arg.ms < 2000 ) ? `${arg.ms}ms` : humanizeDuration(arg.ms);
				gui.notify(`SEQUENCE`, `Sequence finished in ${timeStr}`);
			}
		}
		return event.returnValue = true;
	}

	private progress (step : number, loop : number) {
		const elem : any = $('.progress-bar');
		const len : number = this.arr.length;
		const total : number = len * this.loops;
		let pos : number = (loop * len) + step;
		let progress : number = 0;

		if (pos > 0 && total > 0) {
			progress = (pos / total) * 100;
		}
		
		elem.attr('aria-valuenow', progress);
		elem.css('width', `${progress}%`);
	}

	private activeStep (x : number) {
		const step : string = String(x);
		this.inactiveAll();
		$(`.row input[x=${step}]`).addClass('h');
		$(`#numbers div[x=${step}]`).addClass('h');
	}

	private inactiveAll () {
		$('.row input').removeClass('h');
		$('#numbers div').removeClass('h');
	}

	public stop () {
		ipcRenderer.send(this.id, { stop : true });
		$('#loop_current').text('');
	}
	//start the sequencer from the grid
	public start () {
		this.time = +new Date();
		this.arr = JSON.parse(JSON.stringify(this.grid));
		this.loops = this.gridLoops + 0;
		ipcRenderer.send(this.id, { start : true });
	}
	//start a pre-set sequence, not using the gui
	public exec (arr : any[], loops : number) {
		this.time = +new Date();
		this.arr = arr;
		this.loops = loops;
		ipcRenderer.send(this.id, { start : true, arr, loops });
	}

	public set (x : number, cmd : string) {
		let increase : number = 0;
		if (x >= this.grid.length + 1) {
			increase =  x - this.grid.length;
			for (let i : number = 0; i < increase; i++) {
				this.grid.push({});
			}
		}
		if (!this.grid[x]) this.grid[x] = {};
		this.grid[x].x = x;
		this.grid[x].cmd = cmd;
		if (cmd.indexOf('C') !== -1) {
			this.grid[x].light = light.color;
		} else {
			if (this.grid[x].light) {
				delete this.grid[x].light;
			}
		}
		//set
		ipcRenderer.send(this.id, { set : [ this.grid[x] ] });
		//update grid?
	}
	public unsetAll () {
		const len : number = this.grid.length;
		const steps : number[] = [];
		for (let i : number = 0; i < len; i++) {
			if (typeof this.grid[i] !== 'undefined') {
				steps.push(i);
			}
		}
		ipcRenderer.send(this.id, { unset : steps });
		this.grid = [];
	}

	public unset (x : number) {
		this.grid[x] = undefined; //revist this
		ipcRenderer.send(this.id, { unset : [ x ]});
	}

	/**
	 * Set the light value at a specific step and then update
	 * GUI grid via .state()
	 *
	 * @param {integer} x   Step in sequence
	 * @param {array}   rgb Light value in RGB
	 **/
	public setLight (x : number, rgb : number[]) {
		let color : string = rgb.join(',');
		this.grid[x].light = color;
		ipcRenderer.send(this.id, { x, cmd : this.grid[x].cmd, light : color });
	}

	/**
	 * Function bound to the change event on the loop counter
	 * input element
	 *
	 * @param  {integer}  count 	Integer to set loops to
	 */
	public setLoops (count : number) {
		this.gridLoops = count;
		this.stats();
		ipcRenderer.send(this.id, { loops : this.gridLoops })
	}

	public stats () {
		let ms : number = 0;
		let c : string = '';
		let cam_total : number = 0;
		let proj_total : number = 0;
		let real_total : Step[] = this.grid.filter((elem : any) => {
			if (elem == undefined) {
				return false;
			}
			return true;
		});

		//timing
		for (let step of this.grid) {
			if (!step) continue
			c = step.cmd;
			if (c === cfg.cmd.camera_forward || c === cfg.cmd.camera_backward){
				ms += cfg.arduino.cam.time;
				ms += cfg.arduino.cam.delay;
				ms += cfg.arduino.serialDelay;
			}
			if (c === cfg.cmd.projector_forward || c === cfg.cmd.projector_backward){
				ms += cfg.arduino.proj.time;
				ms += cfg.arduino.proj.delay;
				ms += cfg.arduino.serialDelay;
			}
			if (c === cfg.cmd.black_forward || c === cfg.cmd.black_backward){
				ms += cfg.arduino.black.before;
				ms += cfg.arduino.black.after;
				ms += cfg.arduino.cam.time;
				ms += cfg.arduino.cam.delay;
				ms += cfg.arduino.serialDelay;
			}
			ms += cfg.arduino.sequenceDelay;

			if (c === cfg.cmd.camera_forward || c === cfg.cmd.black_forward) {
				cam_total++;
			}
			if (c === cfg.cmd.camera_backward || c === cfg.cmd.black_backward) {
				cam_total--;
			}
			if (c === cfg.cmd.projector_forward) {
				proj_total++;
			}
			if (c === cfg.cmd.projector_backward) {
				proj_total--;
			}
		}

		//timing
		ms = ms * this.gridLoops;
		if (ms < 2000) {
			$('#seq_stats .timing span').text(ms + 'ms');
		} else {
			$('#seq_stats .timing span').text(humanizeDuration(ms));
		}

		//ending frames
		cam_total = cam_total * this.gridLoops;
		proj_total = proj_total * this.gridLoops;

		$('#seq_stats .cam_end span').text(gui.fmtZero(cam.pos + cam_total, 6));
		$('#seq_stats .proj_end span').text(gui.fmtZero(proj.pos + proj_total, 6));

		//count
		$('#seq_stats .seq_count span').text(real_total.length * this.gridLoops);
		return ms;
	}

	public clear () {
		this.size = 24;
		this.unsetAll();
		this.progress(0, 0);
	}

	public cancel () {
		gui.spinner(true, `Cancelling sequence...`);
		this.running = false;
		this.stop();
	}
}

seq = new Sequence();

module.exports = seq;
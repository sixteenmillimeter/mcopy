/* jslint esversion: 6*/
'use strict';

/// <reference path ="jquery.d.ts"/> 

declare var cam : any;
declare var proj : any;
declare var notifier : any;
declare var PACKAGE : any;
declare var Spinner : any;
declare var dialog : any;

let gui : GUI;

class GUI {
	private id : string = 'gui';
	private notifierWorking : boolean = true;
	private spinnerCfg : any=  {
		lines: 11, // The number of lines to draw
		length: 15, // The length of each line
		width: 7, // The line thickness
		radius: 20, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#F2F2F1', // #rgb or #rrggbb or array of colors
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: true, // Whether to render a shadow
		hwaccel: true, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: '50%', // Top position relative to parent
		left: '50%' // Left position relative to parent
	};

	constructor () {

	}

	public init () {
		this.version();
		this.listen();
	}

	private listen() {
		ipcRenderer.on(this.id, this.listener.bind(this));
	}

	private listener (event : any, arg : any) {
		if (arg.notify) {
			this.notify(arg.notify.title, arg.notify.message);
		}
	}

	public fmtZero (val : any, len : number) : string {
		const raw : number = val;
		let str : string = val + '';
		let output : string = '';
		if (raw < 0) {
			output = '-' + Array(len - (str.length - 1)).join('0') + str.replace('-', '');
		} else {
			if (str.length < len) {
				output = Array(len - str.length).join('0') + str;
			} else if (str.length >= len) {
				str = parseInt(str) + '';
				output = Array(len - str.length).join('0') + str;
			}
		}
		return output;
	}

	counterFormat (t : HTMLInputElement, normal : number = null) {
		const raw : string = t.value;
		t.value = gui.fmtZero(raw, 6);
		if (typeof normal !== 'undefined' && parseInt(raw) !== normal) {
			$(t).addClass('changed');
		} else {
			$(t).removeClass('changed');
		}
	}

	counterUpdate (which : string, raw : number) {
		const formattedVal : string = this.fmtZero(raw, 6);
		$(`.${which} .count`).val(formattedVal);
	}

	public notify (title : string, message : string) : Promise<boolean> {
		const config : any = {
			title,
			message,
			//icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons) 
			sound: true, // Only Notification Center or Windows Toasters 
			wait: true // Wait with callback, until user action is taken against notification 
		};
		if (!this.notifierWorking) {
			return new Promise((resolve, reject) => { return resolve(true); })
		}
		return new Promise((resolve, reject) => {
			try {
				notifier.notify(config,
					function (err : Error, response : any) {
						// Response is response from notification 
						if (err) {
							this.notifierWorking = false;
							log.error(`Error with notification`, err);
							return reject(err);
						}
						return resolve(true);
				}.bind(this));
			} catch (err) {
				this.notifierWorking = false;
				//notify-send is not found
				//determine an alternate for raspian
				//this feels like a hack
			}
		});
	}

	public async updateCam (t : HTMLInputElement) {
		const val : string = t.value;
		let change : boolean;

		if (parseInt(val) === cam.pos) { 
			return false; 
		}

		change = await this.confirm(`Are you sure you want to set camera counter to ${val}?`);

		if (change) {
			cam.pos = parseInt(val);
			this.updateState();
		} else {
			t.value = cam.pos;
			this.counterFormat(t);
		}
	}

	async updateCam2 (t : HTMLInputElement) {
		const val : string = t.value;
		let change : boolean;

		if (parseInt(val) === cam.pos) { 
			return false; 
		}

		change = await this.confirm(`Are you sure you want to set second camera counter to ${val}?`);

		if (change) {
			cam.second.pos = parseInt(val);
			this.updateState();
		} else {
			t.value = cam.second.pos;
			this.counterFormat(t);
		}
	}

	async updateProj (t : HTMLInputElement) {
		const val : string = t.value;
		let change : boolean;
		if (parseInt(val) === proj.pos) { 
			return false; 
		}
		change = await this.confirm(`Are you sure you want to set projector counter to ${val}?`);
		if (change) {
			proj.pos = parseInt(val);
			this.updateState();
		} else {
			t.value = proj.pos;
			this.counterFormat(t);
		}
		proj.setValue(t.value);
	}

	async updateProj2 (t : HTMLInputElement) {
		const val : string = t.value;
		let change : boolean;

		if (parseInt(val) === proj.second.pos) { 
			return false; 
		}

		change = await this.confirm(`Are you sure you want to set second projector counter to ${val}?`);
		
		if (change) {
			proj.second.pos = parseInt(val);
			this.updateState();
		} else {
			t.value = proj.second.pos;
			this.counterFormat(t);
		}
		proj.setValue(t.value);
	}

	public updateState () {
		const cpos : number = cam.pos;
		const ppos : number = proj.pos;
		
		const p2pos : number = proj.second.pos;
		const c2pos : number = cam.second.pos;

		$('#seq_cam_count').val(cpos).change();
		$('#seq_proj_count').val(ppos).change();

		$('#seq_cam_count_2').val(cpos).change();
		$('#seq_proj_count_2').val(ppos).change();

		$('#seq_cam_2_count').val(c2pos).change();
		$('#seq_proj_2_count').val(p2pos).change();

		$('#seq_cam_2_count_2').val(c2pos).change();
		$('#seq_proj_2_count_2').val(p2pos).change();
	}

	public spinner (state : boolean, msg : string = null, progress : boolean = false, cancel : boolean = false) {
		let target;
		let spinner;
		if (msg && msg !== '') {
			this.spinnerMsg(msg);
		}
		if (state && !$('#spinner').hasClass('created')) {
			target = document.getElementById('spinner');
			spinner = new Spinner(this.spinnerCfg).spin(target);
			$('#spinnerProgress').hide();
			$('#spinner').addClass('created');
		} else if (state) {
			$('#spinner').show();
		} else if (!state) {
			$('#spinner').hide();
			this.spinnerMsg('');
		}
		if (progress) {
			$('#spinnerProgress').show();
		} else {
			$('#spinnerProgress').hide();
		}
		if (cancel) {
			$('#spinnerCancel').show();
		} else {
			$('#spinnerCancel').hide();
		}
	}

	private spinnerMsg (msg : string) {
		$('#spinnerMsg').text(msg);
	}

	public overlay (state : boolean) {
		if (state) {
			$('#overlay').show();
		} else {
			$('#overlay').hide();
		}
	}

	public async info (title : string, message : string) {
		const config : any = {
			type : 'info',
			buttons : ['Ok'],
			title: title,
			message : message
		};
		return dialog.showMessageBox(config);
	}

	async confirm (message : string, cancel : string = 'Cancel') {
		const config : any = {
			buttons : ['Yes', cancel],
			message
		}
		const res = await dialog.showMessageBox(config);
		return res.response === 0;
	}

	public async choice (message : string, choices : string[]) {
		const config : any = {
			buttons : choices,
			defaultId : 0,
			message
		}
		const res = await dialog.showMessageBox(config);
		return res.response;
	}

	public async warn (title : string, message : string) {
		const config : any = {
			type : 'warning',
			buttons : ['Ok'],
			title,
			message
		};
		return dialog.showMessageBox(config);
	}

	private version () {
		$('#version').text(PACKAGE.version);
	}

	private error () {

	}
}


gui = new GUI();
module.exports = gui;
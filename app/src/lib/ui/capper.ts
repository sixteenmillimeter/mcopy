'use strict';

/// <reference path ="jquery.d.ts"/> 

declare var uuid : any;
declare var ipcRenderer : any;
declare var w2ui : any;

let capper : Capper;

interface CapperEvent {
	id : string;
	state : boolean;
	callback? : Function;
}

class Capper {
	public enabled = false;
	queue : any = {};
	lock : boolean = false;
	id : string = 'capper';
	state : boolean = false;

	constructor () {

	}

	init () {
		this.listen();
	}

	public enable () {
		$('.black').addClass('on');
		$('#cmd_black_forward').parent().removeClass('hide');
		$('#cmd_black_backward').parent().removeClass('hide');
		$('#cmd_capper_on').parent().removeClass('hide');
		$('#cmd_capper_off').parent().removeClass('hide');
		this.enabled = true;
	}

	public capper (state : boolean, callback : Function) {
		let obj : CapperEvent;

		if (this.lock) {
			return false;
		}

		obj = {
			state,
			id : uuid()
		};

		ipcRenderer.sendSync(this.id, obj);

		if (typeof callback !== 'undefined') {
			obj.callback = callback;
		}

		this.queue[obj.id] = obj;
		this.lock = true;
		this.state = state;

		if (state) {
			$('#cmd_capper_on').addClass('active');
			$('#cmd_capper_off').removeClass('active');
		} else {
			$('#cmd_capper_off').addClass('active');
			$('#cmd_capper_on').removeClass('active');
		}
	}

	public end (c : string, id : string, ms : number) {
		if (c === cfg.arduino.cmd.capper_on) {
			this.state = true;
		} else if (c === cfg.arduino.cmd.capper_off) {
			this.state = false;
		}
		if (typeof this.queue[id] !== 'undefined') {
			if (typeof this.queue[id].callback !== 'undefined') {
				this.queue[id].callback(ms);
			}
			delete this.queue[id];
			this.lock = false;
		}
	}
	private listen () {
		ipcRenderer.on(this.id, function (event : Event, arg : any) {
			capper.end(arg.cmd, arg.id, arg.ms);		
			return event.returnValue = true;
		});
	};

}

capper = new Capper();
module.exports = capper;
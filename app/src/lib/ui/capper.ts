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
	state : boolean = true;

	constructor () {

	}

	init () {
		this.listen();
	}

	public enable () {
		$('.capper').addClass('on');
		enabled = true
	}

	public set (state : boolean, callback : Function) {
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
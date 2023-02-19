'use strict';

/// <reference path ="jquery.d.ts"/> 

declare var uuid : any;
declare var ipcRenderer : any;

let alertObj : Alert;

class Alert {
	id : string = 'alert';

	constructor () {
	}

	public init () {
		this.listen();
	}

	public start (msg : string) {
		alert(msg);
		this.end();
	}

	private end () {
		const obj : any = {};

		ipcRenderer.sendSync(this.id, obj);
	}

	private listen () {
		ipcRenderer.on(this.id, (function (event : Event, arg : any) {
			this.start(arg.msg);
		}).bind(this));
	};

}

alertObj = new Alert();
module.exports = alertObj;
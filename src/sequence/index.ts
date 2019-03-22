'use strict';

let log : any;
let seq : Sequence;

class Sequence {
	private i : number;
	private time : number;
	private running : boolean;

	private cfg : any;
	private cmd : any;
	constructor (cfg : any, cmd : any) {
		this.cfg = cfg;
		this.cmd = cmd;
	}
	//currently called by ui
	public init () {

	}
	//new
	public start () {

	}
	//new
	public pause () {

	}
	/**
	 * Stop the sequence
	 **/
	public stop () {
		this.running = false;
	}

	public exec () {

	}

	public execStop () {

	}

	//private
	private run () {

	}
	private step () {

	}
}

module.exports = function (cfg : any, cmd : any, l : any) {
	log = l;
	seq = new Sequence(cfg, cmd);
}

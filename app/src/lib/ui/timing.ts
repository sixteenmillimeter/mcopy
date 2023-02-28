'use strict';

let timing : Timing;

interface TimingData {
	[key: string]: number;
}

class Timing {
	private data : TimingData = {

	}
	constructor () {

	}

	public reset (profile : any) {
		const keys : string[] = Object.keys(profile);
		const cmds : string[] = Object.keys(cfg.cmd);
		let cam : number;
		let proj : number;
		for (let key of keys) {
			if (key === 'label') {
				continue
			} else if (key === 'cam') {
				cam = 0;
				cam += profile[key].time;
				cam += profile[key].delay;
				for (let cmd of cmds) {
					if (cmd.indexOf('camera') !== -1 || cmd.indexOf('black') !== -1) {
						this.data[cfg.cmd[cmd]] = cam;
					}
				}
			} else if (key === 'proj') {
				proj = 0;
				proj += profile[key].time;
				proj += profile[key].delay;
				for (let cmd of cmds) {
					if (cmd.indexOf('projector') !== -1) {
						this.data[cfg.cmd[cmd]] = proj;
					}
				}
			}
		}
	}

	//update with rolling average
	public update (cmd : string, ms : number) {
		if (typeof this.data[cmd] !== 'undefined') {
			this.data[cmd] = (this.data[cmd] + ms) / 2;
		}
	}

	//get current value
	public get (cmd : string) {
		if (typeof this.data[cmd] !== 'undefined') {
			return this.data[cmd];
		}
		return 0;
	}
}

timing = new Timing();

module.exports = timing;
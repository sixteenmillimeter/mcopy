'use strict';

let timing : Timing;

interface TimingData {
	[key: string]: number;
}

class Timing {
	public data : TimingData = {

	}

	private fromArduino : any = {
		'c' : 'cam',
    	'3' : 'cam2',
    	'4' : 'cams',
    	'b' : 'black',
		'p' : 'proj',
   		'w' : 'proj2',
		'x' : 'projs'
	}

	private fromCmd  : any = {
		'CF' : 'cam',
		'CB' : 'cam',
		'BF' : 'black',
    	'BB' : 'black',
    	'C2F': 'cam2',
    	'C2B': 'cam2',
    	'CCF' : 'cams',
    	'CCB' : 'cams',
    	'CFCB': 'cams',
    	'CBCF': 'cams',
		'PF' : 'proj',
		'PB' : 'proj',
		'P2F' : 'proj2',
		'P2B' : 'proj2',
		'PPF' : 'projs',
		'PPB' : 'projs',
		'PFPB' : 'projs',
		'PBPF' : 'projs'
	}

	constructor () {

	}

	public reset (profile : any) {
		const keys : string[] = Object.keys(profile);
		const cmds : string[] = Object.keys(cfg.cmd);
		let cam : number;
		let proj : number;
		let pad : number;
		for (let key of keys) {
			if (key === 'label') {
				continue
			} else if (key === 'cam') {
				cam = 0;
				cam += profile[key].time;
				cam += profile[key].delay;
				cam += profile[key].momentary;
				pad = 0;

				if (typeof profile['black'] !== 'undefined' && typeof profile['black'].before !== 'undefined' && typeof profile['black'].after !== 'undefined') {
					pad = (profile['black'].before + profile['black'].after);
				}

				this.data['cam'] = cam;
				this.data['cam2'] = cam;
				this.data['cams'] = cam; 
				this.data['black'] = cam + pad;
				this.updateUI('#cam_time', cam);
			} else if (key === 'proj') {
				proj = 0;
				proj += profile[key].time;
				proj += profile[key].delay;
				proj += profile[key].momentary;
				this.data['proj'] = proj;
				this.data['proj2'] = proj;
				this.data['projs'] = proj;
				this.updateUI('#proj_time', proj);
			}
		}
	}

	public restore (timing : TimingData) {
		this.data = timing;
	}

	//update with rolling average
	public update (c : string, ms : number) {
		let cmd : string = this.fromArduino[c];
		let id : string;
		if (typeof cmd !== 'undefined' && typeof this.data[cmd] !== 'undefined') {
			this.data[cmd] = Math.round((this.data[cmd] + ms) / 2);
			id = `#${cmd}_time`;
			this.updateUI(id, this.data[cmd]);
		}
	}

	public updateUI (id : string, ms : number) {
		if ($(id).length) {
			$(id).val(ms);
		}
	}

	//get current value
	public get (c : string) : number {
		const cmd : string = this.fromCmd[c];
		if (typeof cmd !== 'undefined' && typeof this.data[cmd] !== 'undefined') {
			return this.data[cmd];
		}
		return 0;
	}

	public store () {
		ipcRenderer.send('profile', { timing : this.data })
	}
}

timing = new Timing();

module.exports = timing;
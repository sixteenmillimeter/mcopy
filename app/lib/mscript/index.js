'use strict';

/** @module lib/mscript */

const BLACK = '0,0,0';
const CMD = [
	'CF',
	'PF',
	'BF',
	'CB',
	'PB',
	'BB'
];
const ALTS = {
	'CF' : ['CAMERA FORWARD', 'CAM FORWARD'],
	'PF' : ['PROJECTOR FORWARD', 'PROJ FORWARD'],
	'BF' : ['BLACK FORWARD', 'BLACK', 'BLANK FORWARD', 'BLANK'],
	'CB' : ['CAMERA BACKWARD', 'CAM BACKWARD', 'CAMERA BACK', 'CAM BACK'],
	'PB' : ['PROJECTOR FORWARD', 'PROJ FORWARD', 'PROJECTOR BACK', 'PROJ BACK'],
	'BB' : ['BLACK BACKWARD', 'BLACK BACK', 'BLANK BACK'],
	'L ' : ['LIGHT', 'COLOR', 'LAMP'],
	'F ' : ['FADE']
};

class Mscript {
	constructor () {
		this.output = {};
	}

	/**
	 * Clear the state of the script
	 */
	clear () {
		this.cam = 0;
		this.proj = 0;
		this.color = '';
		this.loops = [];
		this.rec = -1;
		this.output = {};
	}
	/**
	 * Main function, accepts multi-line string, parses into lines
	 * and interprets the instructions from the text. Returns an array
	 * of steps to be fed into the mcopy.
	 */
	interpret (text, callback) {
		this.clear()

		if (typeof text === 'undefined') {
			return this.fail('No input');
		}

		//split string into lines, each containing a command
		let lines = text.split('\n');
			
		let two = '';
		
		let arr = [];
			
		let light = [];
		
		let target = 0;// move to target using CAM # or PROJ #
			
		let dist = 0; //?

		for (let line of lines) {
			line = line.replace(/\t+/g, ""); //strip tabs
			line = line.trim(); //remove excess whitespace before and after command
			two = line.substring(0, 2);
			if (CMD.indexOf(two) !== -1) {

				if (this.loops.length > 0) {
					//hold generated arr in state loop array
					this.loops[this.rec].arr
						.push.apply(this.loops[this.rec].arr, 
									this.str_to_arr(line, 
									two));
					this.loops[this.rec].light
						.push.apply(this.loops[this.rec].light, 
									this.light_to_arr(line, 
									two));
				} else {
					arr.push.apply(arr, this.str_to_arr(line, two));
					light.push.apply(light, this.light_to_arr(line, two))
				}

			} else if (line.substring(0, 4) === 'LOOP') {
				this.rec++;
				this.loops[this.rec] = {
					arr : [],
					light : [],
					cam : 0,
					proj : 0,
					cmd : line + ''
				};
			} else if (line.substring(0, 2) === 'L ') {
				this.light_state(line);
			} else if (line.substring(0, 3) === 'END') {
				for (var x = 0; x < this.loop_count(this.loops[this.rec].cmd); x++) {
					if (this.rec === 0) {
						arr.push.apply(arr, this.loops[this.rec].arr);
						light.push.apply(light, this.loops[this.rec].light);
					} else if (this.rec >= 1) {
						this.loops[this.rec - 1].arr
							.push.apply(this.loops[this.rec - 1].arr, 
										this.loops[this.rec].arr);
						this.loops[this.rec - 1].light
							.push.apply(this.loops[this.rec - 1].light, 
										this.loops[this.rec].light);
					}
				}
				this.update('END', this.loop_count(this.loops[this.rec].cmd));
				delete this.loops[this.rec];
				this.rec--;
			} else if (line.substring(0, 3) === 'CAM') { //directly go to that frame (black?)
				target = parseInt(line.split('CAM ')[1]);
				if (this.loops.length > 0) {
					if (target > this.cam) {
						dist = target - this.cam;
						for (var x = 0; x < dist; x++) {
							this.loops[this.rec].arr.push('BF');
							this.loops[this.rec].light.push(BLACK);
							this.update('BF');
						} 
					} else {
						dist = this.cam - target;
						for (var x = 0; x < dist; x++) {
							this.loops[this.rec].arr.push('BB');
							this.loops[this.rec].light.push(BLACK);
							this.update('BB');
						}
					}
				} else {
					if (target > this.cam) {
						dist = target - this.cam;
						for (var x = 0; x < dist; x++) {
							arr.push('BF');
							light.push(BLACK);
							this.update('BF');
						} 
					} else {
						dist = this.cam - target;
						for (var x = 0; x < dist; x++) {
							arr.push('BB');
							light.push(BLACK);
							this.update('BB');
						}
					}
				}
			} else if (line.substring(0, 4) === 'PROJ') { //directly go to that frame
				target = parseInt(line.split('PROJ ')[1]);
				if (this.loops.length > 0) {
					if (target > this.proj) {
						dist = target - this.proj;
						for (var x = 0; x < dist; x++) {
							this.loops[this.rec].arr.push('PF');
							this.loops[this.rec].light.push('');
							this.update('PF');
						} 
					} else {
						dist = this.proj - target;
						for (var x = 0; x < dist; x++) {
							this.loops[this.rec].arr.push('PB');
							this.loops[this.rec].light.push('');
							this.update('PB');
						} 
					}
				} else {
					if (target > this.proj) {
						dist = target - this.proj;
						for (var x = 0; x < dist; x++) {
							arr.push('PF');
							light.push('');
							this.update('PF');
						} 
					} else {
						dist = this.proj - target;
						for (var x = 0; x < dist; x++) {
							arr.push('PB');
							light.push('');
							this.update('PB');
						} 
					}
				}
			} else if (line.substring(0, 3) === 'SET') { //set that state
				if (line.substring(0, 7) === 'SET CAM') {
					this.cam = parseInt(line.split('SET CAM')[1]);
				} else if (line.substring(0, 8) === 'SET PROJ') {
					this.proj = parseInt(line.split('SET PROJ')[1]);
				}
			} else if (line.substring(0, 1) === '#' || line.substring(0, 2) === '//') {
				//comments
				//ignore while parsing
			}
		}


		this.output.success = true;
		this.output.arr = arr; //all instructions
		this.output.light = light; //all light instructions
		this.output.cam = this.cam;
		this.output.proj = this.proj;


		if (typeof callback !== 'undefined') {
			//should only be invoked by running mscript.tests()
			callback(this.output);
		}
	}
	last_loop () {
		return this.loops[this.loops.length - 1];
	}
	parent_loop () {
		return this.loops[this.loops.length - 2];
	}
	loop_count (str) {
		return parseInt(str.split(' ')[1]);
	}
	fade_count (str) {
		return parseInt(str.split(' ')[1]);
	}
	/**
	 * Increase the state of a specific object, such as the camera/projector,
	 * by the value defined in val
	 */
	update (cmd, val = 1) {
		if (cmd === 'END') {
			//I don't understand this loop
			for (let i = 0; i < val; i++) {
				if (this.rec === 0) {
					this.cam += this.loops[this.rec].cam;
					this.proj += this.loops[this.rec].proj;
				} else if (this.rec >= 1) {
					this.loops[this.rec - 1].cam += this.loops[this.rec].cam;
					this.loops[this.rec - 1].proj += this.loops[this.rec].proj;
				}
			}
		} else if (cmd === 'CF') {
			if (this.loops.length < 1) {
				this.cam += val;
			} else {
				this.loops[this.rec].cam += val;
			}
		} else if (cmd === 'CB') {
			if (this.loops.length < 1) {
				this.cam -= val;
			} else {
				this.loops[this.rec].cam--;
			}
		} else if (cmd === 'PF') {
			if (this.loops.length < 1) {
				this.proj += val;
			} else {
				this.loops[this.rec].proj += val;
			}		
		} else if (cmd === 'PB') {
			if (this.loops.length < 1) {
				this.proj -= val;
			} else {
				this.loops[this.rec].proj--;
			}		
		} else if (cmd === 'BF') {
			if (this.loops.length < 1) {
				this.cam += val;
			} else {
				this.loops[this.rec].cam += val;
			}		
		} else if (cmd === 'BB') {
			if (this.loops.length < 1) {
				this.cam -= val;
			} else {
				this.loops[this.rec].cam -= val;
			}		
		} else if (cmd === 'L ') {

		}
	}
	/**
	 * Split string on command, extract any integers from string
	 */
	str_to_arr (str, cmd) {
		const cnt = str.split(cmd);
		let c = parseInt(cnt[1]);
		let arr = [];
		if (cnt[1] === '') {
			c = 1;
		} else {
			c = parseInt(cnt[1]);
		}
		arr = new Array(c).fill(cmd);
		this.update(cmd, c);
		return arr;
	}
	/**
	 *
	 */
	light_to_arr (str, cmd) {
		const cnt = str.split(cmd);
		let c = parseInt(cnt[1]);
		let arr = [];
		if (cnt[1] === '') {
			c = 1;
		} else {
			c = parseInt(cnt[1]);
		}
		for (var i = 0; i < c; i++) {
			if (cmd === 'CF'
			 || cmd === 'CB') {
				arr.push(this.color);
			} else if (cmd === 'BF'
					|| cmd === 'BB') {
				arr.push(BLACK);
			} else {
				arr.push('');
			}
		}
		return arr;
	}
	/**
	 *
	 */
	light_state (str) {
		//add parsers for other color spaces
		const color = str.replace('L ', '').trim();
		this.color = color;
	}

	/**
	 *
	 */
	fail (msg) {
		throw new Error(msg);
	}
}

module.exports = Mscript;


/*

CAM # - go to camera frame #
PROJ # - go to projector frame #

SET CAM # - sets camera count to #
SET PROJ # - sets projector count to #

LOOP # - begin loop, can nest recursively, # times
END LOOP - (or END) closes loop

L #RGB - sets light to rgb value

FADE

CF - Camera forwards
PF - Projector forwards
BF - Black forwards
CB - Camera backwards
PB - Projector backwards
BB - Black backwards

*/
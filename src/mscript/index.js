'use strict';

/** @module lib/mscript */

const BLACK = '0,0,0';
const WHITE = '255,255,255';
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

/** helper functions */

/** startswith function from lodash, do not want the entire lib for this */
function startsWith(string, target, position) {
	const { length } = string;
	position = position == null ? 0 : position;
	if (position < 0) {
		position = 0;
	} else if (position > length) {
		position = length;
	}
	target = `${target}`;
	return string.slice(position, position + target.length) == target;
}

/** class Mscript */
class Mscript {
	constructor () {
		this.output = {};
	}
	/**
	 * Clear the state of the script
	 */
	clear () {
		this.lines = [];

		this.cam = 0;
		this.proj = 0;
		this.color = '';
		this.loops = [];
		this.rec = -1;

		this.two = '';
		this.arr = [];
		this.light = [];
		this.target = 0; //move to target using CAM # or PROJ #
		this.dist = 0;

		this.variables = {};

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
		this.lines = text.split('\n');

		this.lines = this.lines.map(line => {
			line = line.replace(/\t+/g, ''); //strip tabs
			line = line.trim(); //remove excess whitespace before and after command
			line = line.toUpperCase();
			return line;
		})

		for (let line of this.lines) {
			this.two = line.substring(0, 2);
			if (CMD.indexOf(this.two) !== -1) {
				this.basic_cmd(line);
			} else if (startsWith(line, '@') || line.indexOf('@') !== -1) {
				this.variable(line);
			} else if (startsWith(line, 'LOOP')) {
				this.new_loop(line);
			} else if (startsWith(line, 'L ')) {
				this.light_state(line);
			} else if (startsWith(line, 'F ')) {
				this.new_loop(line, true);
			} else if (startsWith(line, 'END')) {
				this.end_loop(line);
			} else if (startsWith(line, 'CAM')) { //directly go to that frame (black?)
				this.move_cam(line);
			} else if (startsWith(line, 'PROJ')) { //directly go to that frame
				this.move_proj(line);
			} else if (startsWith(line, 'SET')) { //set that state
				this.set_state(line);
			} else if (startsWith(line, '#') || startsWith(line, '//')) {
				//comments
				//ignore while parsing
			}
		}

		this.output.success = true;
		this.output.arr = this.arr; //all instructions
		this.output.light = this.light; //all light instructions
		this.output.cam = this.cam;
		this.output.proj = this.proj;

		if (typeof callback !== 'undefined') {
			//should only be invoked by running mscript.tests()
			callback(this.output);
		} else {
			return this.output;
		}
	}
	variable (line) {
		let parts = line.split('=');
		let key = parts[0];
		let value = parts[1];
		let update = false;

		if (value && value.indexOf('#') !== -1) {
			value = value.split('#')[0];
		}

		if (value && value.indexOf('//') !== -1) {
			value = value.split('//')[0];
		}

		if (value && value.indexOf('+') !== -1) {
			if (value)
			update = true;
		}

		if (line.indexOf('-') !== -1) {

			update = true;
		}

		if (line.indexOf(',') === -1) { //if not color string
			try {
				value = parseInt(value);
			} catch (err) {
				//supress parsing error
			}
		}
		//console.dir(parts)
		if (!this.variables[key] || update) {
			this.variables[key] = value;
		}
		//console.dir(this.variables)
	}
	variable_replace(line) {

	}
	/**
	 * Apply a basic two character command
	 */
	basic_cmd (line) {
		if (this.rec !== -1) {
			//hold generated arr in state loop array
			this.loops[this.rec].arr
				.push.apply(this.loops[this.rec].arr, 
							this.str_to_arr(line, 
							this.two));
			this.loops[this.rec].light
				.push.apply(this.loops[this.rec].light, 
							this.light_to_arr(line, 
							this.two));
		} else {
			this.arr.push.apply(this.arr, this.str_to_arr(line, this.two));
			this.light.push.apply(this.light, this.light_to_arr(line, this.two))
		}
	}
	/**
	 * Start a new loop
	 */
	new_loop (line, fade) {
		this.rec++;
		this.loops[this.rec] = {
			arr : [],
			light : [],
			cam : 0,
			proj : 0,
			cmd : line + ''
		};
		if (fade) {
			this.fade(line);
		}
	}
	/**
	 * Close the most recent loop
	 */
	end_loop (line) {
		let light_arr;
		let start;
		let end;
		let len;
		
		for (let x = 0; x < this.loop_count(this.loops[this.rec].cmd); x++) {
			light_arr = this.loops[this.rec].light;
			if (this.loops[this.rec].fade) {
				start = this.loops[this.rec].start;
				end = this.loops[this.rec].end;
				len = this.loops[this.rec].fade_len;
				light_arr = light_arr.map(l => {
					return this.fade_rgb(start, end, len, x);
				})
			}
			if (this.rec === 0) {
				this.arr.push.apply(this.arr, this.loops[this.rec].arr);
				this.light.push.apply(this.light, light_arr);
			} else if (this.rec >= 1) {
				this.loops[this.rec - 1].arr
					.push.apply(this.loops[this.rec - 1].arr, 
								this.loops[this.rec].arr);

				this.loops[this.rec - 1].light
					.push.apply(this.loops[this.rec - 1].light, 
								light_arr);
			}
		}
		this.update('END', this.loop_count(this.loops[this.rec].cmd));
		delete this.loops[this.rec];
		this.rec--;
	}
	/**
	 * Move camera to explicitly-defined frame
	 */
	move_cam (line) {
		this.target = parseInt(line.split('CAM ')[1]);
		if (this.rec !== -1) {
			if (this.target > this.cam) {
				this.dist = this.target - this.cam;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('BF');
					this.loops[this.rec].light.push(BLACK);
					this.update('BF');
				} 
			} else {
				this.dist = this.cam - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('BB');
					this.loops[this.rec].light.push(BLACK);
					this.update('BB');
				}
			}
		} else {
			if (this.target > this.cam) {
				this.dist = this.target - this.cam;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('BF');
					this.light.push(BLACK);
					this.update('BF');
				} 
			} else {
				this.dist = this.cam - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('BB');
					this.light.push(BLACK);
					this.update('BB');
				}
			}
		}
	}
	/**
	 * Move projector to explicitly-defined frame
	 */
	move_proj (line) {
		this.target = parseInt(line.split('PROJ ')[1]);
		if (this.rec !== -1) {
			if (this.target > this.proj) {
				this.dist = this.target - this.proj;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('PF');
					this.loops[this.rec].light.push('');
					this.update('PF');
				} 
			} else {
				this.dist = this.proj - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('PB');
					this.loops[this.rec].light.push('');
					this.update('PB');
				} 
			}
		} else {
			if (this.target > this.proj) {
				this.dist = this.target - this.proj;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('PF');
					this.light.push('');
					this.update('PF');
				} 
			} else {
				this.dist = this.proj - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('PB');
					this.light.push('');
					this.update('PB');
				} 
			}
		}
	}
	/**
	 * Set the state of either the cam or projector
	 */
	set_state (line) {
		if (startsWith(line, 'SET CAM')) {
			this.cam = parseInt(line.split('SET CAM')[1]);
		} else if (startsWith(line, 'SET PROJ')) {
			this.proj = parseInt(line.split('SET PROJ')[1]);
		}
	}
	/**
	 * Return the last loop
	 */
	last_loop () {
		return this.loops[this.loops.length - 1];
	}
	/**
	 * Return the second-last loop
	 */
	parent_loop () {
		return this.loops[this.loops.length - 2];
	}
	/**
	 * Extract the loop count integer from a LOOP cmd
	 */
	loop_count (str) {
		return parseInt(str.split(' ')[1]);
	}
	/**
	 * Execute a fade of frame length, from color to another color
	 */
	fade (line) {
		let len = this.fade_count(line);
		let start = this.fade_start(line);
		let end = this.fade_end(line);

		this.loops[this.rec].start = start;
		this.loops[this.rec].end = end;
		this.loops[this.rec].fade = true;
		this.loops[this.rec].fade_count = 0;
		this.loops[this.rec].fade_len = len;
	}
	/**
	 * Extract the fade length integer from a FADE cmd
	 */
	fade_count (str) {
		return parseInt(str.split(' ')[1]);
	}
	/**
	 * Extract the start color from a string
	 */
	fade_start (str) {
		let color = str.split(' ')[2];
		return this.rgb(color.trim())
	}
	/**
	 * Extract the end color from a string
	 */
	fade_end (str) {
		let color = str.split(' ')[3];
		return this.rgb(color.trim())
	}
	fade_rgb (start, end, len, x) {
		let cur = [];
		let diff;
		for (let i = 0; i < 3; i++) {
			if (x === len - 1) {
				cur[i] = end[i];
			} else if (start[i] >= end[i]) {
				diff = start[i] - end[i];
				cur[i] = start[i] - Math.round((diff / (len - 1)) * x);
			} else {
				diff = end[i] - start[i];
				cur[i] = start[i] + Math.round((diff / (len - 1)) * x);
			}
		}
		return this.rgb_str(cur);

	}
	rgb (str) {
		let rgb = str.split(',');
		return rgb.map( char => {
			return parseInt(char);
		})
	} 
	rgb_str (arr) {
		return arr.join(',');
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
			if (this.rec === -1) {
				this.cam += val;
			} else {
				this.loops[this.rec].cam += val;
			}
		} else if (cmd === 'CB') {
			if (this.rec === -1) {
				this.cam -= val;
			} else {
				this.loops[this.rec].cam--;
			}
		} else if (cmd === 'PF') {
			if (this.rec === -1) {
				this.proj += val;
			} else {
				this.loops[this.rec].proj += val;
			}		
		} else if (cmd === 'PB') {
			if (this.rec === -1) {
				this.proj -= val;
			} else {
				this.loops[this.rec].proj--;
			}		
		} else if (cmd === 'BF') {
			if (this.rec === -1) {
				this.cam += val;
			} else {
				this.loops[this.rec].cam += val;
			}		
		} else if (cmd === 'BB') {
			if (this.rec === -1) {
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
	 * Split a string on a command to extract data for light array
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
	 * Split a string to extract an rgb color value
	 */
	light_state (str) {
		//add parsers for other color spaces
		const color = str.replace('L ', '').trim();
		this.color = color;
	}

	/**
	 * Throw an error with specific message
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

FADE 24 0,0,0 255,255,255

CF - Camera forwards
PF - Projector forwards
BF - Black forwards
CB - Camera backwards
PB - Projector backwards
BB - Black backwards

*/
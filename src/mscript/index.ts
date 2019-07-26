'use strict';

/** @module lib/mscript */


interface RGB extends Array<number>{
	[index : number] : number;
}

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

/** startswith function from lodash, do not want the entire lib for this 
 * @param str 		{string} Text to evaluate
 * @param target 	{string} Text to compare string against
 * @param position  {integer} Position in the string to make comparison at
 *
 * @returns {boolean} True for match, false for no match
 **/
function startsWith (str : string, target : string, position? : number) : boolean {
	const { length } = str;
	position = position == null ? 0 : position;
	if (position < 0) {
		position = 0;
	} else if (position > length) {
		position = length;
	}
	target = `${target}`;
	return str.slice(position, position + target.length) == target;
}

/** class Mscript */
class Mscript {
	output : any;
	lines : any[];
	cam : number;
	proj : number;
	color : string;
	loops : any[];
	rec : number;
	two : string;
	arr : any[];
	meta : string[];
	target : number;
	dist : number;
	variables : any;

	/**
	 * @constructor
	 * Create new Mscript interpreter
	 **/

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
		this.meta = [];
		this.target = 0; //move to target using CAM # or PROJ #
		this.dist = 0;

		this.variables = {};

		this.output = {};
	}
	/**
	 * Main function, accepts multi-line string, parses into lines
	 * and interprets the instructions from the text. Returns an array
	 * of steps to be fed into the mcopy sequence.
	 * 
	 * @param {string} text  Mscript text to interpret
	 * @param {function} callback Function to call when string is interpreted
	 *
	 * @returns {object} if callback is not provided
	 */
	interpret (text : string, callback : Function) {
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
			} else if (startsWith(line, 'ALERT')) {

			} else if (startsWith(line, 'PAUSE')) {
				this.pause(line);
			}
		}

		this.output.success = true;
		this.output.arr = this.arr; //all instructions
		this.output.meta = this.meta; //all metadata for instructions
		this.output.cam = this.cam;
		this.output.proj = this.proj;

		if (typeof callback !== 'undefined') {
			//should only be invoked by running mscript.tests()
			callback(this.output);
		} else {
			return this.output;
		}
	}
	/**
	 * Interprets variables for complex sequence behavior.
	 * TODO: Fully implement, add test coverage
	 *
	 * @param {string} line Line containing a variable assignment
	 *
	 **/
	variable (line : string) {
		let parts : string[] = line.split('=');
		let key : string = parts[0];
		let value : any = parts[1];
		let update : boolean = false;

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

	/**
	 * Replace variable with value at time of interpretation
	 * TODO: Implement this please
	 *
	 * @param {string} line Line containing variable to be replaced with value
	 *
	 * @returns {string} New string to be interpreted
	 **/
	variable_replace(line : string) : string {
		return line;
	}
	/**
	 * Interpret a basic two character command
	 * 
	 * @param {string} line Line of script to interpret
	 */
	basic_cmd (line : string) {
		if (this.rec !== -1) {
			//hold generated arr in state loop array
			this.loops[this.rec].arr
				.push.apply(this.loops[this.rec].arr, 
							this.str_to_arr(line, 
							this.two));
			this.loops[this.rec].meta
				.push.apply(this.loops[this.rec].meta, 
							this.light_to_arr(line, 
							this.two));
		} else {
			this.arr.push.apply(this.arr, this.str_to_arr(line, this.two));
			this.meta.push.apply(this.meta, this.light_to_arr(line, this.two));
		}
	}
	/**
	 * Start a new loop
	 * 
	 * @param {string} line  	Line to evaluate as either loop or fade
	 * @param {boolean} fade 	Flag as boolean if true
	 */
	new_loop (line : string, fade? : boolean) {
		this.rec++;
		this.loops[this.rec] = {
			arr : [],
			meta : [],
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
	 * 
	 * @param {string} line Line to interpret
	 */
	end_loop (line : string) {
		let meta_arr : string[];
		let start : RGB;
		let end : RGB;
		let len : number;
		
		for (let x = 0; x < this.loop_count(this.loops[this.rec].cmd); x++) {
			meta_arr = this.loops[this.rec].meta;
			if (this.loops[this.rec].fade) {
				start = this.loops[this.rec].start;
				end = this.loops[this.rec].end;
				len = this.loops[this.rec].fade_len;
				meta_arr = meta_arr.map(l => {
					return this.fade_rgb(start, end, len, x);
				})
			}
			if (this.rec === 0) {
				this.arr.push.apply(this.arr, this.loops[this.rec].arr);
				this.meta.push.apply(this.meta, meta_arr);
			} else if (this.rec >= 1) {
				this.loops[this.rec - 1].arr
					.push.apply(this.loops[this.rec - 1].arr, 
								this.loops[this.rec].arr);

				this.loops[this.rec - 1].meta
					.push.apply(this.loops[this.rec - 1].meta, 
								meta_arr);
			}
		}
		this.update('END', this.loop_count(this.loops[this.rec].cmd));
		delete this.loops[this.rec];
		this.rec--;
	}
	/**
	 * Move camera to explicitly-defined frame
	 * 
	 * @param {string} line Line to interpret with camera move statement
	 */
	move_cam (line : string) {
		this.target = parseInt(line.split('CAM ')[1]);
		if (this.rec !== -1) {
			if (this.target > this.cam) {
				this.dist = this.target - this.cam;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('BF');
					this.loops[this.rec].meta.push(BLACK);
					this.update('BF');
				} 
			} else {
				this.dist = this.cam - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('BB');
					this.loops[this.rec].meta.push(BLACK);
					this.update('BB');
				}
			}
		} else {
			if (this.target > this.cam) {
				this.dist = this.target - this.cam;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('BF');
					this.meta.push(BLACK);
					this.update('BF');
				} 
			} else {
				this.dist = this.cam - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('BB');
					this.meta.push(BLACK);
					this.update('BB');
				}
			}
		}
	}
	/**
	 * Move projector to explicitly-defined frame
	 * 
	 * @param {string} line Line containing `move` statement to interpret
	 */
	move_proj (line : string) {
		this.target = parseInt(line.split('PROJ ')[1]);
		if (this.rec !== -1) {
			if (this.target > this.proj) {
				this.dist = this.target - this.proj;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('PF');
					this.loops[this.rec].meta.push('');
					this.update('PF');
				} 
			} else {
				this.dist = this.proj - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('PB');
					this.loops[this.rec].meta.push('');
					this.update('PB');
				} 
			}
		} else {
			if (this.target > this.proj) {
				this.dist = this.target - this.proj;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('PF');
					this.meta.push('');
					this.update('PF');
				} 
			} else {
				this.dist = this.proj - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('PB');
					this.meta.push('');
					this.update('PB');
				} 
			}
		}
	}
	/**
	 * Set the state of either the cam or projector
	 *
	 * @param line {string} String containing set statement
	 */
	set_state (line : string) {
		if (startsWith(line, 'SET CAM')) {
			this.cam = parseInt(line.split('SET CAM')[1]);
		} else if (startsWith(line, 'SET PROJ')) {
			this.proj = parseInt(line.split('SET PROJ')[1]);
		}
	}
	/**
	 * Return the last loop
	 *
	 * @returns {object}
	 */
	last_loop () : any {
		return this.loops[this.loops.length - 1];
	}
	/**
	 * Return the second-last loop
	 * 
	 * @returns {object} Loop array
	 */
	parent_loop () : any {
		return this.loops[this.loops.length - 2];
	}
	/**
	 * Extract the loop count integer from a LOOP cmd
	 *
	 * @returns {integer} Loop count in string parsed into integer
	 */
	loop_count (str : string) : number {
		return parseInt(str.split(' ')[1]);
	}
	/**
	 * Execute a fade of frame length, from color to another color
	 * 
	 * @param {string} line Line containing a fade initiator
	 */
	fade (line : string) {
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
	 *
	 * @param {string} str Line containing the length of fade in frames
	 */
	fade_count (str : string) {
		return parseInt(str.split(' ')[1]);
	}
	/**
	 * Extract the start color from a string
	 *
	 * @param {string} str Line containing the start color value in a fade initiator
	 *
	 * @returns {array} Array containing RGB color values
	 */
	fade_start (str :  string) : RGB {
		let color : string = str.split(' ')[2];
		return this.rgb(color.trim())
	}
	/**
	 * Extract the end color from a string
	 *
	 * @param {string} str Line containing the end color value in a fade initiator
	 *
	 * @returns {array} Array containing RGB color values
	 */
	fade_end (str : string) : RGB {
		let color : string = str.split(' ')[3];
		return this.rgb(color.trim())
	}
    /** 
     * Determine the state of a fade at a particular frame in the sequence, x
	 *
	 * @param {array} start Color the fade starts at
	 * @param {array} end Color the fade finishes at
	 * @param {integer} len Total length of the fade in frames
	 * @param {integer} x Position of the fade to get color value of
	 *
	 * @returns {array} Array containing RGB color values
	 */
	fade_rgb (start : RGB, end : RGB, len : number, x : number) {
		let cur = [];
		let diff;
		for (let i : number = 0; i < 3; i++) {
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
	/**
	 * Parse string into array of RGB color values. 0-255 octet.
	 * 
	 * @param {string} str String containing only color values as `#,#,#`
	 **/
	rgb (str : string) : RGB {
		let rgb = str.split(',');
		return rgb.map( (char : string) => {
			return parseInt(char);
		})
	} 
	/**
	 *  Cast RGB color values as string
	 * 
	 * @param {array} arr Array to join into string
	 *
	 * @returns {string} String of RGB values
	 **/
	rgb_str (arr : RGB) : string {
		return arr.join(',');
	}
	/**
	 * Increase the state of a specific object, such as the camera/projector,
	 * by the value defined in val.
	 *
	 * @param {string} cmd String representing command to interpret and update state
	 */
	update (cmd : string, val : number = 1) {
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
	 * Split string on command, turn into array of commands
	 * as long as count variable. Default 1.
	 *
	 * @param {string} str String to split
	 * @param {string} cmd String representing command to split at
	 * 
	 * @returns {array} Array containing commands
	 */
	str_to_arr (str : string, cmd : string) : string[] {
		const cnt : string[] = str.split(cmd);
		let c  : number = parseInt(cnt[1]);
		let arr  : any[] = [];
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
	 *
	 * @param {string} str String containing light command
	 * @param {string} cmd String representing command
	 *
	 * @returns {array} An RGB array containing the color values
	 */
	light_to_arr (str : string, cmd : string) : RGB {
		const cnt : string[] = str.split(cmd);
		let c : number = parseInt(cnt[1]);
		let arr : any[] = [];
		if (cnt[1] === '') {
			c = 1;
		} else {
			c = parseInt(cnt[1]);
		}
		for (let i : number = 0; i < c; i++) {
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
	 *
	 * @param {string} Color string assign to color property
	 */
	light_state (str : string) {
		//add parsers for other color spaces
		const color : string = str.replace('L ', '').trim();
		this.color = color;
	}

	/**
	 * Interpret a pause command
	 * 
	 * @param {string} line String containing pause command
	 **/
	 pause (line : string) {

	 }

	/**
	 * Throw an error with specific message
	 *
	 * @param {string} msg Error message to print
	 */
	fail (msg : string) {
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
END FADE

CF - Camera forwards
PF - Projector forwards
BF - Black forwards
CB - Camera backwards
PB - Projector backwards
BB - Black backwards

ALERT {MESSAGE} - Stop the sequence and requiure user interaction to complete
PAUSE # - Pause the sequence for a # of seconds

*/
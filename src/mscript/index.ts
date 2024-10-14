'use strict';

interface MscriptOutput {
	success : boolean,
	arr : string[],
	meta : string[],
	cam : number,
	proj : number,
	cam2 ? : number
	proj2 ? : number
}

interface MscriptLoop {
	arr : string[],
	meta : string[],
	cam : number,
	proj : number,
	cam2 : number,
	proj2 : number,
	cmd : string,
	start ? : RGB,
	end ? : RGB,
	fade? : boolean,
	fade_len ? : number,
	fade_count ? : number,
	count ? : number
}

interface MscriptVariables {
	[key : string] : number
}

interface RGB extends Array<number>{
	[index : number] : number;
}

interface Alts {
	[key : string] : string[]
}

interface MscriptUpdatedState {
	cam ? : number,
	proj ? : number,
	cam2 ? : number,
	proj2 ? : number,
}

const BLACK : string = '0,0,0';
const WHITE : string = '255,255,255';
const CMD : string[] = [
	'CF',
	'PF',
	'BF',
	'CB',
	'PB',
	'BB',
	'C2F',
	'C2B',
	'CCF',
	'CCB',
	'P2F',
	'P2B',
	'PPF',
	'PPB',
	'CFCB',
    'CBCF',
    'PFPB',
    'PBPF'
];

const CAMERA_SECONDARY : string[] = [
	'C2F',
	'C2B',
	'CCF',
	'CCB',
	'CFCB',
    'CBCF'
];

const PROJECTOR_SECONDARY : string[] = [
	'P2F',
	'P2B',
	'PPF',
	'PPB',
    'PFPB',
    'PBPF'
];

const ALTS : Alts = {
	'CF' : ['CAMERA FORWARD', 'CAM FORWARD'],
	'PF' : ['PROJECTOR FORWARD', 'PROJ FORWARD'],
	'BF' : ['BLACK FORWARD', 'BLACK', 'BLANK FORWARD', 'BLANK'],
	'CB' : ['CAMERA BACKWARD', 'CAM BACKWARD', 'CAMERA BACK', 'CAM BACK'],
	'PB' : ['PROJECTOR FORWARD', 'PROJ FORWARD', 'PROJECTOR BACK', 'PROJ BACK'],
	'BB' : ['BLACK BACKWARD', 'BLACK BACK', 'BLANK BACK'],
	'L ' : ['LIGHT', 'COLOR', 'LAMP'],
	'F ' : ['FADE'],
	'C2F' : ['CAMERA2 FORWARD', 'CAM2 FORWARD'],
    'C2B' : ['CAMERA2 BACKWARD', 'CAM2 BACKWARD', 'CAMERA2 BACK', 'CAM2 BACK'],
    'CCF' : ['CAMERAS FORWARD', 'CAMS FORWARD'],
    'CCB' : ['CAMERAS BACKWARD', 'CAMS BACKWARD', 'CAMERAS BACK', 'CAMS BACK'],
    'P2F' : ['PROJECTOR2 FORWARD', 'PROJ2 FORWARD'],
    'P2B' : ['PROJECTOR2 BACKWARD', 'PROJ2 BACKWARD', 'PROJECTOR2 BACK', 'PROJ2 BACK'],
    'PPF' : ['PROJECTORS FORWARD', 'PROJS FORWARD'],
    'PPB' : ['PROJECTORS BACKWARD', 'PROJS BACKWARD', 'PROJECTORS BACK', 'PROJS BACK'],

    'CFCB' : [ ],
    'CBCF' : [ ],
    'PFPB' : [ ],
    'PBPF' : [ ]
};

const DELAY : string = 'DELAY';
const PAUSE : string = 'PAUSE';
const ALERT : string = 'ALERT';


/** @module lib/mscript */

/**
 * Class representing the mscript language.
 */
export default class Mscript {
	private output : MscriptOutput;
	private lines : string[];
	private cam : number;
	private cam2 : number;
	private proj : number;
	private proj2 : number;
	private color : string;
	private loops : MscriptLoop[];
	private rec : number;
	private two : string;
	private three : string;
	private four : string;
	private arr : string[];
	private meta : string[];
	private target : number;
	private dist : number;
	private variables : MscriptVariables;

	/**
	 * @constructor
	 * Create new Mscript interpreter
	 **/

	constructor () {
		this.output = {
			success : false,
			arr : [],
			meta : [],
			cam : 0,
			proj : 0
		};
	}
	/**
	 * Clear the state of the script
	 */
	private clear () {
		this.lines = [];

		this.cam = 0;
		this.cam2 = 0;
		this.proj = 0;
		this.proj2 = 0;
		this.color = '';
		this.loops = [];
		this.rec = -1;
		this.two = '';
		this.three = '';
		this.four = '';
		this.arr = [];
		this.meta = [];
		this.target = 0; //move to target using CAM # or PROJ #
		this.dist = 0;

		this.variables = {};

		this.output = {
			success : false,
			arr : [],
			meta : [],
			cam : 0,
			proj : 0
		};
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
	public interpret (text : string) {
		this.clear()

		if (typeof text === 'undefined') {
			return this.fail('No input');
		}

		//split string into lines, each containing a command
		this.lines = text.split('\n');

		this.lines = this.lines.map((line : string) => {
			line = line.replace(/\t+/g, ' '); //strip tabs
			line = line.trim(); //remove excess whitespace before and after command
			line = line.toUpperCase();
			return line;
		})

		for (let line of this.lines) {
			this.two = line.substring(0, 2);
			this.three = line.substring(0, 3);
			this.four = line.substring(0, 4);
			if (CMD.indexOf(this.four) !== -1) {
				this.basic_cmd(line, this.four);
			} else if (CMD.indexOf(this.three) !== -1) {
				this.basic_cmd(line, this.three);
			} else if (CMD.indexOf(this.two) !== -1) {
				this.basic_cmd(line, this.two);
			} else if (line.startsWith(DELAY)) {
				this.delay(line);
			} else if (line.startsWith(PAUSE)) {
				this.pause(line);
			} else if (line.startsWith(ALERT)) {
				this.alert(line);
			} else if (line.startsWith('@') || line.indexOf('@') !== -1) {
				this.variable(line);
			} else if (line.startsWith('LOOP')) {
				this.new_loop(line);
			} else if (line.startsWith('L ')) {
				this.light_state(line);
			} else if (line.startsWith('F ')) {
				this.new_loop(line, true);
			} else if (line.startsWith('END')) {
				this.end_loop(line);
			} else if (line.startsWith('CAM2')) { //directly go to that frame 
				this.move_cam2(line);
			} else if (line.startsWith('CAM')) { //directly go to that frame 
				this.move_cam(line);
			} else if (line.startsWith('PROJ2')) { //directly go to that frame
				this.move_proj2(line);
			} else if (line.startsWith('PROJ')) { //directly go to that frame
				this.move_proj(line);
			} else if (line.startsWith('SET')) { //set that state
				this.set_state(line);
			} else if (line.startsWith('#') || line.startsWith('//')) {
				//comments
				//ignore while parsing
			}
		}

		this.output.success = true;
		this.output.arr = this.arr; //all instructions
		this.output.meta = this.meta; //all metadata for instructions
		this.output.cam = this.cam;
		this.output.proj = this.proj;
		if (this.contains(this.arr, CAMERA_SECONDARY) || this.cam2 !== 0) {
			this.output.cam2 = this.cam2;
		}
		if (this.contains(this.arr, PROJECTOR_SECONDARY) || this.proj2 !== 0) {
			this.output.proj2 = this.proj2;
		}

		return this.output;
	}
	/**
	 * Interprets variables for complex sequence behavior.
	 * TODO: Fully implement, add test coverage
	 *
	 * @param {string} line Line containing a variable assignment
	 *
	 **/
	private variable (line : string) {
		let parts : string[] = line.split('=');
		let key : string = parts[0];
		let value : string = parts[1];
		let update : boolean = false;
		let num : number;

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
				num = parseInt(value);
			} catch (err) {
				//supress parsing error
			}
		}
		//console.dir(parts)
		if (!this.variables[key] || update) {
			this.variables[key] = num;
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
	private variable_replace(line : string) : string {
		return line;
	}
	/**
	 * Interpret a basic two character command
	 * 
	 * @param {string} line Line of script to interpret
	 * @param {string} short The short command to use
	 */
	private basic_cmd (line : string, short : string) {
		if (this.rec !== -1) {
			//hold generated arr in state loop array
			this.loops[this.rec].arr
				.push.apply(this.loops[this.rec].arr, 
							this.str_to_arr(line, 
							short));
			this.loops[this.rec].meta
				.push.apply(this.loops[this.rec].meta, 
							this.light_to_arr(line, 
							short));
		} else {
			this.arr.push.apply(this.arr, this.str_to_arr(line, short));
			this.meta.push.apply(this.meta, this.light_to_arr(line, short));
		}
	}
	/**
	 * Start a new loop
	 * 
	 * @param {string} line  	Line to evaluate as either loop or fade
	 * @param {boolean} fade 	Flag as true if fade
	 */
	private new_loop (line : string, fade? : boolean) {
		this.rec++;
		this.loops[this.rec] = {
			arr : [],
			meta : [],
			cam : 0,
			proj : 0,
			cam2 : 0,
			proj2 : 0,
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
	private end_loop (line : string) {
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
				meta_arr = meta_arr.map((l : string) => {
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
	private move_cam (line : string) {
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
	 * Move secondary camera to explicitly-defined frame
	 * 
	 * @param {string} line Line to interpret with camera move statement
	 */
	private move_cam2 (line : string) {
		this.target = parseInt(line.split('CAM2 ')[1]);
		if (this.rec !== -1) {
			if (this.target > this.cam2) {
				this.dist = this.target - this.cam2;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('C2F');
					this.loops[this.rec].meta.push(BLACK);
					this.update('C2F');
				} 
			} else {
				this.dist = this.cam2 - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('C2B');
					this.loops[this.rec].meta.push(BLACK);
					this.update('C2B');
				}
			}
		} else {
			if (this.target > this.cam2) {
				this.dist = this.target - this.cam2;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('C2F');
					this.meta.push(BLACK);
					this.update('C2F');
				} 
			} else {
				this.dist = this.cam2 - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('C2B');
					this.meta.push(BLACK);
					this.update('C2B');
				}
			}
		}
	}

	/**
	 * Move projector to explicitly-defined frame
	 * 
	 * @param {string} line Line containing `move` statement to interpret
	 */
	private move_proj (line : string) {
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
	 * Move projector to explicitly-defined frame
	 * 
	 * @param {string} line Line containing `move` statement to interpret
	 */
	private move_proj2 (line : string) {
		this.target = parseInt(line.split('PROJ2 ')[1]);
		if (this.rec !== -1) {
			if (this.target > this.proj2) {
				this.dist = this.target - this.proj2;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('P2F');
					this.loops[this.rec].meta.push('');
					this.update('P2F');
				} 
			} else {
				this.dist = this.proj2 - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.loops[this.rec].arr.push('P2B');
					this.loops[this.rec].meta.push('');
					this.update('P2B');
				} 
			}
		} else {
			if (this.target > this.proj2) {
				this.dist = this.target - this.proj2;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('P2F');
					this.meta.push('');
					this.update('P2F');
				} 
			} else {
				this.dist = this.proj2 - this.target;
				for (let x = 0; x < this.dist; x++) {
					this.arr.push('P2B');
					this.meta.push('');
					this.update('P2B');
				} 
			}
		}
	}
	/**
	 * Set the state of either the cam or projector
	 *
	 * @param line {string} String containing set statement
	 */
	private set_state (line : string) {
		const update : MscriptUpdatedState = {};
		let dist : number = 0;
		if (line.startsWith('SET CAM2')) {
			update.cam2 = parseInt(line.split('SET CAM2')[1]);
		} else if (line.startsWith('SET CAMERA2')) {
			update.cam2 = parseInt(line.split('SET CAMERA2')[1]);
		} else if (line.startsWith('SET PROJ2')) {
			update.proj2 = parseInt(line.split('SET PROJ2')[1]);
		} else if (line.startsWith('SET PROJECTOR2')) {
			update.proj2 = parseInt(line.split('SET PROJECTOR2')[1]);
		} else if (line.startsWith('SET CAM')) {
			update.cam = parseInt(line.split('SET CAM')[1]);
		} else if (line.startsWith('SET PROJ')) {
			update.proj = parseInt(line.split('SET PROJ')[1]);
		}
		if (this.rec > -1) {
			this.fail(`Line "${line}" is invalid inside of a loop`);
			return;
		}
		for (let key of Object.keys(update)) {
			(this as any)[key] = (update as any)[key];
		}
	}
	/**
	 * Return the last loop
	 *
	 * @returns {object}
	 */
	private last_loop () : MscriptLoop {
		return this.loops[this.loops.length - 1];
	}
	/**
	 * Return the second-last loop
	 * 
	 * @returns {object} Loop array
	 */
	private parent_loop () : MscriptLoop {
		return this.loops[this.loops.length - 2];
	}
	/**
	 * Extract the loop count integer from a LOOP cmd
	 *
	 * @returns {integer} Loop count in string parsed into integer
	 */
	private loop_count (str : string) : number {
		return parseInt(str.split(' ')[1]);
	}
	/**
	 * Execute a fade of frame length, from color to another color
	 * 
	 * @param {string} line Line containing a fade initiator
	 */
	private fade (line : string) {
		const len : number = this.fade_count(line);
		const start : RGB = this.fade_start(line);
		const end : RGB = this.fade_end(line);

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
	private fade_count (str : string) {
		return parseInt(str.split(' ')[1]);
	}
	/**
	 * Extract the start color from a string
	 *
	 * @param {string} str Line containing the start color value in a fade initiator
	 *
	 * @returns {array} Array containing RGB color values
	 */
	private fade_start (str :  string) : RGB {
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
	private fade_end (str : string) : RGB {
		const color : string = str.split(' ')[3];
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
	private fade_rgb (start : RGB, end : RGB, len : number, x : number) {
		let cur = [];
		let diff : number;
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
	private rgb (str : string) : RGB {
		const rgb : string[] = str.split(',');
		return rgb.map( (char : string) => {
			return parseInt(char);
		});
	} 
	/**
	 *  Cast RGB color values as string
	 * 
	 * @param {array} arr Array to join into string
	 *
	 * @returns {string} String of RGB values
	 **/
	private rgb_str (arr : RGB) : string {
		return arr.join(',');
	}
	/**
	 * Increase the state of a specific object, such as the camera/projector,
	 * by the value defined in val.
	 *
	 * @param {string} cmd String representing command to interpret and update state
	 */
	private update (cmd : string, val : number = 1) {
		if (cmd === 'END') {
			//squashes down loops into the previous one until
			//the base is reached. val is never not 1, though.
			for (let i = 0; i < val; i++) {
				if (this.rec === 0) {
					this.cam += this.loops[this.rec].cam;
					this.proj += this.loops[this.rec].proj;
					this.cam2 += this.loops[this.rec].cam2;
					this.proj2 += this.loops[this.rec].proj2;
				} else if (this.rec >= 1) {
					this.loops[this.rec - 1].cam += this.loops[this.rec].cam;
					this.loops[this.rec - 1].proj += this.loops[this.rec].proj;
					this.loops[this.rec - 1].cam2 += this.loops[this.rec].cam2;
					this.loops[this.rec - 1].proj2 += this.loops[this.rec].proj2;
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
				this.loops[this.rec].cam -= val;
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
				this.loops[this.rec].proj -= val;
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
		} else if (cmd === 'C2F') {
			if (this.rec === -1) {
				this.cam2 += val;
			} else {
				this.loops[this.rec].cam2 += val;
			}
		} else if (cmd === 'C2B') {
			if (this.rec === -1) {
				this.cam2 -= val;
			} else {
				this.loops[this.rec].cam2 -= val;
			}
		} else if (cmd === 'CCF') {
			if (this.rec === -1) {
				this.cam += val;
				this.cam2 += val;
			} else {
				this.loops[this.rec].cam2 += val;
				this.loops[this.rec].cam2 += val;
			}
		} else if (cmd === 'CCB') {
			if (this.rec === -1) {
				this.cam -= val;
				this.cam2 -= val;
			} else {
				this.loops[this.rec].cam2 -= val;
				this.loops[this.rec].cam2 -= val;
			}
		} else if (cmd === 'P2F') {
			if (this.rec === -1) {
				this.proj2 += val;
			} else {
				this.loops[this.rec].proj2 += val;
			}
		} else if (cmd === 'P2B') {
			if (this.rec === -1) {
				this.proj2 -= val;
			} else {
				this.loops[this.rec].proj2 -= val;
			}
		} else if (cmd === 'PPF') {
			if (this.rec === -1) {
				this.proj += val;
				this.proj2 += val;
			} else {
				this.loops[this.rec].proj += val
				this.loops[this.rec].proj2 += val;
			}
		} else if (cmd === 'PPB') {
			if (this.rec === -1) {
				this.proj -= val;
				this.proj2 -= val;
			} else {
				this.loops[this.rec].proj -= val
				this.loops[this.rec].proj2 -= val;
			}
		} else if (cmd === 'CFCB') {
			if (this.rec === -1) {
				this.cam += val;
				this.cam2 -= val;
			} else {
				this.loops[this.rec].cam += val;
				this.loops[this.rec].cam2 -= val;
			}
		} else if (cmd === 'CBCF') {
			if (this.rec === -1) {
				this.cam -= val;
				this.cam2 += val;
			} else {
				this.loops[this.rec].cam -= val;
				this.loops[this.rec].cam2 += val;
			}
		} else if (cmd === 'PFPB') {
			if (this.rec === -1) {
				this.proj += val;
				this.proj2 -= val;
			} else {
				this.loops[this.rec].proj += val;
				this.loops[this.rec].proj2 -= val;
			}
		} else if (cmd === 'PBPF') {
			if (this.rec === -1) {
				this.proj -= val;
				this.proj2 += val;
			} else {
				this.loops[this.rec].proj -= val;
				this.loops[this.rec].proj2 += val;
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
	private str_to_arr (str : string, cmd : string) : string[] {
		const cnt : string[] = str.split(cmd);
		let c  : number = parseInt(cnt[1]);
		let arr  : string[] = [];
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
	private light_to_arr (str : string, cmd : string) : RGB {
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
	private light_state (str : string) {
		//add parsers for other color spaces
		const color : string = str.replace('L ', '').trim();
		this.color = color;
	}

	/**
	 * Interpret a delay command
	 * 
	 * @param {string} line String containing delay command
	 **/
	private delay (line : string) {
	 	let lenStr : string = line.split(' ')[1] || ''
	 	let len : number;
	 	lenStr = lenStr.trim();

	 	try {
	 		len = parseInt(lenStr, 10); //clean up string or fail
	 	} catch (err) {
	 		len = 0;
	 	}

	 	if (isNaN(len)) {
	 		len = 0;
	 	}

	 	lenStr = String(len);

	 	if (this.rec !== -1) {
			//hold generated arr in state loop array
			this.loops[this.rec].arr
				.push('DE');
			this.loops[this.rec].meta
				.push(lenStr);
		} else {
			this.arr.push('DE');
			this.meta.push(lenStr);
		}
	 }

	 /**
	 * Interpret an alert command
	 * 
	 * @param {string} line String containing alert message
	 **/
	private alert (line : string) {
	 	let msg : string = line.split(' ')[1] || ''
	 	msg = msg.trim();
	 	if (this.rec !== -1) {
			//hold generated arr in state loop array
			this.loops[this.rec].arr
				.push('AL');
			this.loops[this.rec].meta
				.push(line);
		} else {
			this.arr.push('AL');
			this.meta.push(line);
		}
	 }

	 /**
	 * Interpret an pause command
	 * 
	 * @param {string} line String containing alert message
	 **/
	private pause (line : string) {
	 	const msg : string = "Paused script. Click OK to continue."
	 	if (this.rec !== -1) {
			//hold generated arr in state loop array
			this.loops[this.rec].arr
				.push('AL');
			this.loops[this.rec].meta
				.push(msg);
		} else {
			this.arr.push('AL');
			this.meta.push(msg);
		}
	 }

	/**
	 * Throw an error with specific message
	 *
	 * @param {string} msg Error message to print
	 */
	private fail (msg : string) {
		throw new Error(msg);
	}

	/**
	 * Determine if array contains matching elements of 
	 * another array
	 * 
	 * @param {Array} arr Original array to compare
	 * @param {Array} arr2 Array to compare elements from
	 * 
	 * @returns {boolean} Whether arr contains elements in arr2
	 **/
	private contains (arr : string[], arr2 : string[]) {
		return arr.some((r : string) => arr2.includes(r));
	}
}

module.exports = Mscript;
export type { RGB };

/*

CAM # - go to camera frame #
PROJ # - go to projector frame #

CAM2 # - go to camera 2 frame #
PROJ # - go to projector 2 frame #

SET CAM # - sets camera count to #
SET PROJ # - sets projector count to #

SET CAM2 # - sets camera 2 count to #
SET PROJ2 # - sets projector 2 count to #

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
C2F - Camera 2 forwards
C2B - Camera 2 backwards
CCF - Both cameras forwards
CCB - Both cameras backwards
P2F - Projector 2 forwards
P2B - Projector 2 backwards
PPF - Both projectors forwards
PPB - Both projectors backwards

ALERT {MESSAGE} - Stop the sequence and requiure user interaction to complete

*/
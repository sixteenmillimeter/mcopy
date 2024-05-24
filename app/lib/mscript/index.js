'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const BLACK = '0,0,0';
const WHITE = '255,255,255';
const CMD = [
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
const CAMERA_SECONDARY = [
    'C2F',
    'C2B',
    'CCF',
    'CCB',
    'CFCB',
    'CBCF'
];
const PROJECTOR_SECONDARY = [
    'P2F',
    'P2B',
    'PPF',
    'PPB',
    'PFPB',
    'PBPF'
];
const ALTS = {
    'CF': ['CAMERA FORWARD', 'CAM FORWARD'],
    'PF': ['PROJECTOR FORWARD', 'PROJ FORWARD'],
    'BF': ['BLACK FORWARD', 'BLACK', 'BLANK FORWARD', 'BLANK'],
    'CB': ['CAMERA BACKWARD', 'CAM BACKWARD', 'CAMERA BACK', 'CAM BACK'],
    'PB': ['PROJECTOR FORWARD', 'PROJ FORWARD', 'PROJECTOR BACK', 'PROJ BACK'],
    'BB': ['BLACK BACKWARD', 'BLACK BACK', 'BLANK BACK'],
    'L ': ['LIGHT', 'COLOR', 'LAMP'],
    'F ': ['FADE'],
    'C2F': ['CAMERA2 FORWARD', 'CAM2 FORWARD'],
    'C2B': ['CAMERA2 BACKWARD', 'CAM2 BACKWARD', 'CAMERA2 BACK', 'CAM2 BACK'],
    'CCF': ['CAMERAS FORWARD', 'CAMS FORWARD'],
    'CCB': ['CAMERAS BACKWARD', 'CAMS BACKWARD', 'CAMERAS BACK', 'CAMS BACK'],
    'P2F': ['PROJECTOR2 FORWARD', 'PROJ2 FORWARD'],
    'P2B': ['PROJECTOR2 BACKWARD', 'PROJ2 BACKWARD', 'PROJECTOR2 BACK', 'PROJ2 BACK'],
    'PPF': ['PROJECTORS FORWARD', 'PROJS FORWARD'],
    'PPB': ['PROJECTORS BACKWARD', 'PROJS BACKWARD', 'PROJECTORS BACK', 'PROJS BACK'],
    'CFCB': [],
    'CBCF': [],
    'PFPB': [],
    'PBPF': []
};
const DELAY = 'DELAY';
const PAUSE = 'PAUSE';
const ALERT = 'ALERT';
/** @module lib/mscript */
/**
 * Class representing the mscript language.
 */
class Mscript {
    /**
     * @constructor
     * Create new Mscript interpreter
     **/
    constructor() {
        this.output = {
            success: false,
            arr: [],
            meta: [],
            cam: 0,
            proj: 0
        };
    }
    /**
     * Clear the state of the script
     */
    clear() {
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
            success: false,
            arr: [],
            meta: [],
            cam: 0,
            proj: 0
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
    interpret(text) {
        this.clear();
        if (typeof text === 'undefined') {
            return this.fail('No input');
        }
        //split string into lines, each containing a command
        this.lines = text.split('\n');
        this.lines = this.lines.map((line) => {
            line = line.replace(/\t+/g, ' '); //strip tabs
            line = line.trim(); //remove excess whitespace before and after command
            line = line.toUpperCase();
            return line;
        });
        for (let line of this.lines) {
            this.two = line.substring(0, 2);
            this.three = line.substring(0, 3);
            this.four = line.substring(0, 4);
            if (CMD.indexOf(this.four) !== -1) {
                this.basic_cmd(line, this.four);
            }
            else if (CMD.indexOf(this.three) !== -1) {
                this.basic_cmd(line, this.three);
            }
            else if (CMD.indexOf(this.two) !== -1) {
                this.basic_cmd(line, this.two);
            }
            else if (line.startsWith(DELAY)) {
                this.delay(line);
            }
            else if (line.startsWith(PAUSE)) {
                this.pause(line);
            }
            else if (line.startsWith(ALERT)) {
                this.alert(line);
            }
            else if (line.startsWith('@') || line.indexOf('@') !== -1) {
                this.variable(line);
            }
            else if (line.startsWith('LOOP')) {
                this.new_loop(line);
            }
            else if (line.startsWith('L ')) {
                this.light_state(line);
            }
            else if (line.startsWith('F ')) {
                this.new_loop(line, true);
            }
            else if (line.startsWith('END')) {
                this.end_loop(line);
            }
            else if (line.startsWith('CAM2')) { //directly go to that frame 
                this.move_cam2(line);
            }
            else if (line.startsWith('CAM')) { //directly go to that frame 
                this.move_cam(line);
            }
            else if (line.startsWith('PROJ2')) { //directly go to that frame
                this.move_proj2(line);
            }
            else if (line.startsWith('PROJ')) { //directly go to that frame
                this.move_proj(line);
            }
            else if (line.startsWith('SET')) { //set that state
                this.set_state(line);
            }
            else if (line.startsWith('#') || line.startsWith('//')) {
                //comments
                //ignore while parsing
            }
        }
        this.output.success = true;
        this.output.arr = this.arr; //all instructions
        this.output.meta = this.meta; //all metadata for instructions
        this.output.cam = this.cam;
        this.output.proj = this.proj;
        if (this.contains(this.arr, CAMERA_SECONDARY)) {
            this.output.cam2 = this.cam2;
        }
        if (this.contains(this.arr, PROJECTOR_SECONDARY)) {
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
    variable(line) {
        let parts = line.split('=');
        let key = parts[0];
        let value = parts[1];
        let update = false;
        let num;
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
            }
            catch (err) {
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
    variable_replace(line) {
        return line;
    }
    /**
     * Interpret a basic two character command
     *
     * @param {string} line Line of script to interpret
     * @param {string} short The short command to use
     */
    basic_cmd(line, short) {
        if (this.rec !== -1) {
            //hold generated arr in state loop array
            this.loops[this.rec].arr
                .push.apply(this.loops[this.rec].arr, this.str_to_arr(line, short));
            this.loops[this.rec].meta
                .push.apply(this.loops[this.rec].meta, this.light_to_arr(line, short));
        }
        else {
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
    new_loop(line, fade) {
        this.rec++;
        this.loops[this.rec] = {
            arr: [],
            meta: [],
            cam: 0,
            proj: 0,
            cam2: 0,
            proj2: 0,
            cmd: line + ''
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
    end_loop(line) {
        let meta_arr;
        let start;
        let end;
        let len;
        for (let x = 0; x < this.loop_count(this.loops[this.rec].cmd); x++) {
            meta_arr = this.loops[this.rec].meta;
            if (this.loops[this.rec].fade) {
                start = this.loops[this.rec].start;
                end = this.loops[this.rec].end;
                len = this.loops[this.rec].fade_len;
                meta_arr = meta_arr.map((l) => {
                    return this.fade_rgb(start, end, len, x);
                });
            }
            if (this.rec === 0) {
                this.arr.push.apply(this.arr, this.loops[this.rec].arr);
                this.meta.push.apply(this.meta, meta_arr);
            }
            else if (this.rec >= 1) {
                this.loops[this.rec - 1].arr
                    .push.apply(this.loops[this.rec - 1].arr, this.loops[this.rec].arr);
                this.loops[this.rec - 1].meta
                    .push.apply(this.loops[this.rec - 1].meta, meta_arr);
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
    move_cam(line) {
        this.target = parseInt(line.split('CAM ')[1]);
        if (this.rec !== -1) {
            if (this.target > this.cam) {
                this.dist = this.target - this.cam;
                for (let x = 0; x < this.dist; x++) {
                    this.loops[this.rec].arr.push('BF');
                    this.loops[this.rec].meta.push(BLACK);
                    this.update('BF');
                }
            }
            else {
                this.dist = this.cam - this.target;
                for (let x = 0; x < this.dist; x++) {
                    this.loops[this.rec].arr.push('BB');
                    this.loops[this.rec].meta.push(BLACK);
                    this.update('BB');
                }
            }
        }
        else {
            if (this.target > this.cam) {
                this.dist = this.target - this.cam;
                for (let x = 0; x < this.dist; x++) {
                    this.arr.push('BF');
                    this.meta.push(BLACK);
                    this.update('BF');
                }
            }
            else {
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
    move_cam2(line) {
        this.target = parseInt(line.split('CAM2 ')[1]);
        if (this.rec !== -1) {
            if (this.target > this.cam2) {
                this.dist = this.target - this.cam2;
                for (let x = 0; x < this.dist; x++) {
                    this.loops[this.rec].arr.push('C2F');
                    this.loops[this.rec].meta.push(BLACK);
                    this.update('C2F');
                }
            }
            else {
                this.dist = this.cam2 - this.target;
                for (let x = 0; x < this.dist; x++) {
                    this.loops[this.rec].arr.push('C2B');
                    this.loops[this.rec].meta.push(BLACK);
                    this.update('C2B');
                }
            }
        }
        else {
            if (this.target > this.cam2) {
                this.dist = this.target - this.cam2;
                for (let x = 0; x < this.dist; x++) {
                    this.arr.push('C2F');
                    this.meta.push(BLACK);
                    this.update('C2F');
                }
            }
            else {
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
    move_proj(line) {
        this.target = parseInt(line.split('PROJ ')[1]);
        if (this.rec !== -1) {
            if (this.target > this.proj) {
                this.dist = this.target - this.proj;
                for (let x = 0; x < this.dist; x++) {
                    this.loops[this.rec].arr.push('PF');
                    this.loops[this.rec].meta.push('');
                    this.update('PF');
                }
            }
            else {
                this.dist = this.proj - this.target;
                for (let x = 0; x < this.dist; x++) {
                    this.loops[this.rec].arr.push('PB');
                    this.loops[this.rec].meta.push('');
                    this.update('PB');
                }
            }
        }
        else {
            if (this.target > this.proj) {
                this.dist = this.target - this.proj;
                for (let x = 0; x < this.dist; x++) {
                    this.arr.push('PF');
                    this.meta.push('');
                    this.update('PF');
                }
            }
            else {
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
    move_proj2(line) {
        this.target = parseInt(line.split('PROJ2 ')[1]);
        if (this.rec !== -1) {
            if (this.target > this.proj2) {
                this.dist = this.target - this.proj2;
                for (let x = 0; x < this.dist; x++) {
                    this.loops[this.rec].arr.push('P2F');
                    this.loops[this.rec].meta.push('');
                    this.update('P2F');
                }
            }
            else {
                this.dist = this.proj2 - this.target;
                for (let x = 0; x < this.dist; x++) {
                    this.loops[this.rec].arr.push('P2B');
                    this.loops[this.rec].meta.push('');
                    this.update('P2B');
                }
            }
        }
        else {
            if (this.target > this.proj2) {
                this.dist = this.target - this.proj2;
                for (let x = 0; x < this.dist; x++) {
                    this.arr.push('P2F');
                    this.meta.push('');
                    this.update('P2F');
                }
            }
            else {
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
    set_state(line) {
        if (line.startsWith('SET CAM2')) {
            parseInt(line.split('SET CAM2')[1]);
        }
        else if (line.startsWith('SET PROJ2')) {
            this.cam2 = parseInt(line.split('SET PROJ2')[1]);
        }
        else if (line.startsWith('SET CAM')) {
            this.cam = parseInt(line.split('SET CAM')[1]);
        }
        else if (line.startsWith('SET PROJ')) {
            this.proj = parseInt(line.split('SET PROJ')[1]);
        }
    }
    /**
     * Return the last loop
     *
     * @returns {object}
     */
    last_loop() {
        return this.loops[this.loops.length - 1];
    }
    /**
     * Return the second-last loop
     *
     * @returns {object} Loop array
     */
    parent_loop() {
        return this.loops[this.loops.length - 2];
    }
    /**
     * Extract the loop count integer from a LOOP cmd
     *
     * @returns {integer} Loop count in string parsed into integer
     */
    loop_count(str) {
        return parseInt(str.split(' ')[1]);
    }
    /**
     * Execute a fade of frame length, from color to another color
     *
     * @param {string} line Line containing a fade initiator
     */
    fade(line) {
        const len = this.fade_count(line);
        const start = this.fade_start(line);
        const end = this.fade_end(line);
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
    fade_count(str) {
        return parseInt(str.split(' ')[1]);
    }
    /**
     * Extract the start color from a string
     *
     * @param {string} str Line containing the start color value in a fade initiator
     *
     * @returns {array} Array containing RGB color values
     */
    fade_start(str) {
        let color = str.split(' ')[2];
        return this.rgb(color.trim());
    }
    /**
     * Extract the end color from a string
     *
     * @param {string} str Line containing the end color value in a fade initiator
     *
     * @returns {array} Array containing RGB color values
     */
    fade_end(str) {
        const color = str.split(' ')[3];
        return this.rgb(color.trim());
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
    fade_rgb(start, end, len, x) {
        let cur = [];
        let diff;
        for (let i = 0; i < 3; i++) {
            if (x === len - 1) {
                cur[i] = end[i];
            }
            else if (start[i] >= end[i]) {
                diff = start[i] - end[i];
                cur[i] = start[i] - Math.round((diff / (len - 1)) * x);
            }
            else {
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
    rgb(str) {
        const rgb = str.split(',');
        return rgb.map((char) => {
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
    rgb_str(arr) {
        return arr.join(',');
    }
    /**
     * Increase the state of a specific object, such as the camera/projector,
     * by the value defined in val.
     *
     * @param {string} cmd String representing command to interpret and update state
     */
    update(cmd, val = 1) {
        if (cmd === 'END') {
            //I don't understand this loop
            for (let i = 0; i < val; i++) {
                if (this.rec === 0) {
                    this.cam += this.loops[this.rec].cam;
                    this.proj += this.loops[this.rec].proj;
                    this.cam2 += this.loops[this.rec].cam2;
                    this.proj2 += this.loops[this.rec].proj2;
                }
                else if (this.rec >= 1) {
                    this.loops[this.rec - 1].cam += this.loops[this.rec].cam;
                    this.loops[this.rec - 1].proj += this.loops[this.rec].proj;
                    this.loops[this.rec - 1].cam2 += this.loops[this.rec].cam2;
                    this.loops[this.rec - 1].proj2 += this.loops[this.rec].proj2;
                }
            }
        }
        else if (cmd === 'CF') {
            if (this.rec === -1) {
                this.cam += val;
            }
            else {
                this.loops[this.rec].cam += val;
            }
        }
        else if (cmd === 'CB') {
            if (this.rec === -1) {
                this.cam -= val;
            }
            else {
                this.loops[this.rec].cam -= val;
            }
        }
        else if (cmd === 'PF') {
            if (this.rec === -1) {
                this.proj += val;
            }
            else {
                this.loops[this.rec].proj += val;
            }
        }
        else if (cmd === 'PB') {
            if (this.rec === -1) {
                this.proj -= val;
            }
            else {
                this.loops[this.rec].proj -= val;
            }
        }
        else if (cmd === 'BF') {
            if (this.rec === -1) {
                this.cam += val;
            }
            else {
                this.loops[this.rec].cam += val;
            }
        }
        else if (cmd === 'BB') {
            if (this.rec === -1) {
                this.cam -= val;
            }
            else {
                this.loops[this.rec].cam -= val;
            }
        }
        else if (cmd === 'C2F') {
            if (this.rec === -1) {
                this.cam2 += val;
            }
            else {
                this.loops[this.rec].cam2 += val;
            }
        }
        else if (cmd === 'C2B') {
            if (this.rec === -1) {
                this.cam2 -= val;
            }
            else {
                this.loops[this.rec].cam2 -= val;
            }
        }
        else if (cmd === 'CCF') {
            if (this.rec === -1) {
                this.cam += val;
                this.cam2 += val;
            }
            else {
                this.loops[this.rec].cam2 += val;
                this.loops[this.rec].cam2 += val;
            }
        }
        else if (cmd === 'CCB') {
            if (this.rec === -1) {
                this.cam -= val;
                this.cam2 -= val;
            }
            else {
                this.loops[this.rec].cam2 -= val;
                this.loops[this.rec].cam2 -= val;
            }
        }
        else if (cmd === 'P2F') {
            if (this.rec === -1) {
                this.proj2 += val;
            }
            else {
                this.loops[this.rec].proj2 += val;
            }
        }
        else if (cmd === 'P2B') {
            if (this.rec === -1) {
                this.proj2 -= val;
            }
            else {
                this.loops[this.rec].proj2 -= val;
            }
        }
        else if (cmd === 'PPF') {
            if (this.rec === -1) {
                this.proj += val;
                this.proj2 += val;
            }
            else {
                this.loops[this.rec].proj += val;
                this.loops[this.rec].proj2 += val;
            }
        }
        else if (cmd === 'PPB') {
            if (this.rec === -1) {
                this.proj -= val;
                this.proj2 -= val;
            }
            else {
                this.loops[this.rec].proj -= val;
                this.loops[this.rec].proj2 -= val;
            }
        }
        else if (cmd === 'CFCB') {
            if (this.rec === -1) {
                this.cam += val;
                this.cam2 -= val;
            }
            else {
                this.loops[this.rec].cam += val;
                this.loops[this.rec].cam2 -= val;
            }
        }
        else if (cmd === 'CBCF') {
            if (this.rec === -1) {
                this.cam -= val;
                this.cam2 += val;
            }
            else {
                this.loops[this.rec].cam -= val;
                this.loops[this.rec].cam2 += val;
            }
        }
        else if (cmd === 'PFPB') {
            if (this.rec === -1) {
                this.proj += val;
                this.proj2 -= val;
            }
            else {
                this.loops[this.rec].proj += val;
                this.loops[this.rec].proj2 -= val;
            }
        }
        else if (cmd === 'PBPF') {
            if (this.rec === -1) {
                this.proj -= val;
                this.proj2 += val;
            }
            else {
                this.loops[this.rec].proj -= val;
                this.loops[this.rec].proj2 += val;
            }
        }
        else if (cmd === 'L ') {
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
    str_to_arr(str, cmd) {
        const cnt = str.split(cmd);
        let c = parseInt(cnt[1]);
        let arr = [];
        if (cnt[1] === '') {
            c = 1;
        }
        else {
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
    light_to_arr(str, cmd) {
        const cnt = str.split(cmd);
        let c = parseInt(cnt[1]);
        let arr = [];
        if (cnt[1] === '') {
            c = 1;
        }
        else {
            c = parseInt(cnt[1]);
        }
        for (let i = 0; i < c; i++) {
            if (cmd === 'CF'
                || cmd === 'CB') {
                arr.push(this.color);
            }
            else if (cmd === 'BF'
                || cmd === 'BB') {
                arr.push(BLACK);
            }
            else {
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
    light_state(str) {
        //add parsers for other color spaces
        const color = str.replace('L ', '').trim();
        this.color = color;
    }
    /**
     * Interpret a delay command
     *
     * @param {string} line String containing delay command
     **/
    delay(line) {
        let lenStr = line.split(' ')[1] || '';
        let len;
        lenStr = lenStr.trim();
        try {
            len = parseInt(lenStr, 10); //clean up string or fail
        }
        catch (err) {
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
        }
        else {
            this.arr.push('DE');
            this.meta.push(lenStr);
        }
    }
    /**
    * Interpret an alert command
    *
    * @param {string} line String containing alert message
    **/
    alert(line) {
        let msg = line.split(' ')[1] || '';
        msg = msg.trim();
        if (this.rec !== -1) {
            //hold generated arr in state loop array
            this.loops[this.rec].arr
                .push('AL');
            this.loops[this.rec].meta
                .push(line);
        }
        else {
            this.arr.push('AL');
            this.meta.push(line);
        }
    }
    /**
    * Interpret an pause command
    *
    * @param {string} line String containing alert message
    **/
    pause(line) {
        const msg = "Paused script. Click OK to continue.";
        if (this.rec !== -1) {
            //hold generated arr in state loop array
            this.loops[this.rec].arr
                .push('AL');
            this.loops[this.rec].meta
                .push(msg);
        }
        else {
            this.arr.push('AL');
            this.meta.push(msg);
        }
    }
    /**
     * Throw an error with specific message
     *
     * @param {string} msg Error message to print
     */
    fail(msg) {
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
    contains(arr, arr2) {
        return arr.some((r) => arr2.includes(r));
    }
}
exports.default = Mscript;
module.exports = Mscript;
//# sourceMappingURL=index.js.map
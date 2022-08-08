/** @module lib/mscript */
interface RGB extends Array<number> {
    [index: number]: number;
}
/** class Mscript */
export default class Mscript {
    output: any;
    lines: string[];
    cam: number;
    cam2: number;
    proj: number;
    proj2: number;
    color: string;
    loops: any[];
    rec: number;
    two: string;
    three: string;
    four: string;
    arr: any[];
    meta: string[];
    target: number;
    dist: number;
    variables: any;
    /**
     * @constructor
     * Create new Mscript interpreter
     **/
    constructor();
    /**
     * Clear the state of the script
     */
    clear(): void;
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
    interpret(text: string, callback?: Function): any;
    /**
     * Interprets variables for complex sequence behavior.
     * TODO: Fully implement, add test coverage
     *
     * @param {string} line Line containing a variable assignment
     *
     **/
    variable(line: string): void;
    /**
     * Replace variable with value at time of interpretation
     * TODO: Implement this please
     *
     * @param {string} line Line containing variable to be replaced with value
     *
     * @returns {string} New string to be interpreted
     **/
    variable_replace(line: string): string;
    /**
     * Interpret a basic two character command
     *
     * @param {string} line Line of script to interpret
     * @param {string} short The short command to use
     */
    basic_cmd(line: string, short: string): void;
    /**
     * Start a new loop
     *
     * @param {string} line  	Line to evaluate as either loop or fade
     * @param {boolean} fade 	Flag as true if fade
     */
    new_loop(line: string, fade?: boolean): void;
    /**
     * Close the most recent loop
     *
     * @param {string} line Line to interpret
     */
    end_loop(line: string): void;
    /**
     * Move camera to explicitly-defined frame
     *
     * @param {string} line Line to interpret with camera move statement
     */
    move_cam(line: string): void;
    /**
     * Move secondary camera to explicitly-defined frame
     *
     * @param {string} line Line to interpret with camera move statement
     */
    move_cam2(line: string): void;
    /**
     * Move projector to explicitly-defined frame
     *
     * @param {string} line Line containing `move` statement to interpret
     */
    move_proj(line: string): void;
    /**
     * Move projector to explicitly-defined frame
     *
     * @param {string} line Line containing `move` statement to interpret
     */
    move_proj2(line: string): void;
    /**
     * Set the state of either the cam or projector
     *
     * @param line {string} String containing set statement
     */
    set_state(line: string): void;
    /**
     * Return the last loop
     *
     * @returns {object}
     */
    last_loop(): any;
    /**
     * Return the second-last loop
     *
     * @returns {object} Loop array
     */
    parent_loop(): any;
    /**
     * Extract the loop count integer from a LOOP cmd
     *
     * @returns {integer} Loop count in string parsed into integer
     */
    loop_count(str: string): number;
    /**
     * Execute a fade of frame length, from color to another color
     *
     * @param {string} line Line containing a fade initiator
     */
    fade(line: string): void;
    /**
     * Extract the fade length integer from a FADE cmd
     *
     * @param {string} str Line containing the length of fade in frames
     */
    fade_count(str: string): number;
    /**
     * Extract the start color from a string
     *
     * @param {string} str Line containing the start color value in a fade initiator
     *
     * @returns {array} Array containing RGB color values
     */
    fade_start(str: string): RGB;
    /**
     * Extract the end color from a string
     *
     * @param {string} str Line containing the end color value in a fade initiator
     *
     * @returns {array} Array containing RGB color values
     */
    fade_end(str: string): RGB;
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
    fade_rgb(start: RGB, end: RGB, len: number, x: number): string;
    /**
     * Parse string into array of RGB color values. 0-255 octet.
     *
     * @param {string} str String containing only color values as `#,#,#`
     **/
    rgb(str: string): RGB;
    /**
     *  Cast RGB color values as string
     *
     * @param {array} arr Array to join into string
     *
     * @returns {string} String of RGB values
     **/
    rgb_str(arr: RGB): string;
    /**
     * Increase the state of a specific object, such as the camera/projector,
     * by the value defined in val.
     *
     * @param {string} cmd String representing command to interpret and update state
     */
    update(cmd: string, val?: number): void;
    /**
     * Split string on command, turn into array of commands
     * as long as count variable. Default 1.
     *
     * @param {string} str String to split
     * @param {string} cmd String representing command to split at
     *
     * @returns {array} Array containing commands
     */
    str_to_arr(str: string, cmd: string): string[];
    /**
     * Split a string on a command to extract data for light array
     *
     * @param {string} str String containing light command
     * @param {string} cmd String representing command
     *
     * @returns {array} An RGB array containing the color values
     */
    light_to_arr(str: string, cmd: string): RGB;
    /**
     * Split a string to extract an rgb color value
     *
     * @param {string} Color string assign to color property
     */
    light_state(str: string): void;
    /**
     * Interpret a pause command
     *
     * @param {string} line String containing pause command
     **/
    pause(line: string): void;
    /**
    * Interpret an alert command
    *
    * @param {string} line String containing pause command
    **/
    alert(line: string): void;
    /**
     * Throw an error with specific message
     *
     * @param {string} msg Error message to print
     */
    fail(msg: string): void;
    /**
     * Determine if array contains matching elements of
     * another array
     *
     * @param {Array} arr Original array to compare
     * @param {Array} arr2 Array to compare elements from
     *
     * @returns {boolean} Whether arr contains elements in arr2
     **/
    contains(arr: string[], arr2: string[]): boolean;
}
export {};

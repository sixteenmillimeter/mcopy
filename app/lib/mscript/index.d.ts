interface MscriptOutput {
    success: boolean;
    arr: string[];
    meta: string[];
    cam: number;
    proj: number;
    cam2?: number;
    proj2?: number;
}
interface RGB extends Array<number> {
    [index: number]: number;
}
/** @module lib/mscript */
/**
 * Class representing the mscript language.
 */
export default class Mscript {
    private output;
    private lines;
    private cam;
    private cam2;
    private proj;
    private proj2;
    private color;
    private loops;
    private rec;
    private two;
    private three;
    private four;
    private arr;
    private meta;
    private target;
    private dist;
    private variables;
    /**
     * @constructor
     * Create new Mscript interpreter
     **/
    constructor();
    /**
     * Clear the state of the script
     */
    private clear;
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
    interpret(text: string): void | MscriptOutput;
    /**
     * Interprets variables for complex sequence behavior.
     * TODO: Fully implement, add test coverage
     *
     * @param {string} line Line containing a variable assignment
     *
     **/
    private variable;
    /**
     * Replace variable with value at time of interpretation
     * TODO: Implement this please
     *
     * @param {string} line Line containing variable to be replaced with value
     *
     * @returns {string} New string to be interpreted
     **/
    private variable_replace;
    /**
     * Interpret a basic two character command
     *
     * @param {string} line Line of script to interpret
     * @param {string} short The short command to use
     */
    private basic_cmd;
    /**
     * Start a new loop
     *
     * @param {string} line  	Line to evaluate as either loop or fade
     * @param {boolean} fade 	Flag as true if fade
     */
    private new_loop;
    /**
     * Close the most recent loop
     *
     * @param {string} line Line to interpret
     */
    private end_loop;
    /**
     * Move camera to explicitly-defined frame
     *
     * @param {string} line Line to interpret with camera move statement
     */
    private move_cam;
    /**
     * Move secondary camera to explicitly-defined frame
     *
     * @param {string} line Line to interpret with camera move statement
     */
    private move_cam2;
    /**
     * Move projector to explicitly-defined frame
     *
     * @param {string} line Line containing `move` statement to interpret
     */
    private move_proj;
    /**
     * Move projector to explicitly-defined frame
     *
     * @param {string} line Line containing `move` statement to interpret
     */
    private move_proj2;
    /**
     * Set the state of either the cam or projector
     *
     * @param line {string} String containing set statement
     */
    private set_state;
    /**
     * Return the last loop
     *
     * @returns {object}
     */
    private last_loop;
    /**
     * Return the second-last loop
     *
     * @returns {object} Loop array
     */
    private parent_loop;
    /**
     * Extract the loop count integer from a LOOP cmd
     *
     * @returns {integer} Loop count in string parsed into integer
     */
    private loop_count;
    /**
     * Execute a fade of frame length, from color to another color
     *
     * @param {string} line Line containing a fade initiator
     */
    private fade;
    /**
     * Extract the fade length integer from a FADE cmd
     *
     * @param {string} str Line containing the length of fade in frames
     */
    private fade_count;
    /**
     * Extract the start color from a string
     *
     * @param {string} str Line containing the start color value in a fade initiator
     *
     * @returns {array} Array containing RGB color values
     */
    private fade_start;
    /**
     * Extract the end color from a string
     *
     * @param {string} str Line containing the end color value in a fade initiator
     *
     * @returns {array} Array containing RGB color values
     */
    private fade_end;
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
    private fade_rgb;
    /**
     * Parse string into array of RGB color values. 0-255 octet.
     *
     * @param {string} str String containing only color values as `#,#,#`
     **/
    private rgb;
    /**
     *  Cast RGB color values as string
     *
     * @param {array} arr Array to join into string
     *
     * @returns {string} String of RGB values
     **/
    private rgb_str;
    /**
     * Increase the state of a specific object, such as the camera/projector,
     * by the value defined in val.
     *
     * @param {string} cmd String representing command to interpret and update state
     */
    private update;
    /**
     * Split string on command, turn into array of commands
     * as long as count variable. Default 1.
     *
     * @param {string} str String to split
     * @param {string} cmd String representing command to split at
     *
     * @returns {array} Array containing commands
     */
    private str_to_arr;
    /**
     * Split a string on a command to extract data for light array
     *
     * @param {string} str String containing light command
     * @param {string} cmd String representing command
     *
     * @returns {array} An RGB array containing the color values
     */
    private light_to_arr;
    /**
     * Split a string to extract an rgb color value
     *
     * @param {string} Color string assign to color property
     */
    private light_state;
    /**
     * Interpret a delay command
     *
     * @param {string} line String containing delay command
     **/
    private delay;
    /**
    * Interpret an alert command
    *
    * @param {string} line String containing alert message
    **/
    private alert;
    /**
    * Interpret an pause command
    *
    * @param {string} line String containing alert message
    **/
    private pause;
    /**
     * Throw an error with specific message
     *
     * @param {string} msg Error message to print
     */
    private fail;
    /**
     * Determine if array contains matching elements of
     * another array
     *
     * @param {Array} arr Original array to compare
     * @param {Array} arr2 Array to compare elements from
     *
     * @returns {boolean} Whether arr contains elements in arr2
     **/
    private contains;
}
export type { RGB };

import type { FilmOutState } from 'filmout';
import type { System } from 'system';
import type { LightState } from 'light';
interface StdErr {
    frame: number;
    fps: number;
    time: string;
    speed: number;
    size: string;
    remaining?: number;
    progress?: number;
    estimated?: number;
}
/** @module lib/ffmpeg */
/**
 * Class representing all ffmpeg features.
 */
export declare class FFMPEG {
    private bin;
    private log;
    private id;
    private TMPDIR;
    private child;
    onProgress: Function;
    /**
     * @constructor
     * Creates an ffmpeg class
     *
     * @param {object} sys System object to be used to get temp directory
     **/
    constructor(sys: System);
    /**
     * Async method to call async functions from constructor
     **/
    init(): Promise<void>;
    /**
     * Add padding to a number to 5 places. Return a string.
     *
     * @param {integer} i Integer to pad
     *
     * @returns {string} Padded string
     **/
    private padded_frame;
    /**
     * Parse the stderr output of ffmpeg
     *
     * @param {string} line		Stderr line
     **/
    private parseStderr;
    /**
     * Render a single frame from a video or image to a png.
     *
     * @param {object} state State object containing file data
     * @param {object} light Object containing color information for frame
     *
     * @returns {string} Path of frame
     **/
    frame(state: FilmOutState, light: LightState): Promise<string>;
    /**
     * Render all frames in a video to the temp directory.
     * Not in use.
     *
     * @param {string} video Path to video
     * @param {object} obj Not sure
     *
     * @returns {?}
     **/
    frames(state: FilmOutState): Promise<unknown>;
    cancel(): void;
    /**
     * Clears a specific frame from the tmp directory
     *
     * @param {integer} frame Integer of frame to clear
     *
     * @returns {boolean} True if successful, false if not
     **/
    clear(state: any): Promise<boolean>;
    /**
     * Deletes all frames in temp directory.
     *
     **/
    clearAll(): Promise<void>;
    /**
     * Checks if mcopy temp directory exists. If it doesn't,
     * creates it.
     **/
    private checkDir;
}
export type { StdErr };

import type { Server } from 'server';
import type { Display } from 'display';
import type { Light } from 'light';
import type { FFMPEG } from 'ffmpeg';
import type { FFPROBE } from 'ffprobe';
import type { WebContents, IpcMainEvent } from 'electron';
interface FilmOutState {
    hash: string;
    frame: number;
    frames: number;
    fps: number;
    seconds: number;
    still: boolean;
    path: string;
    fileName: string;
    directory: boolean;
    info: any;
    dir: boolean;
    enabled: boolean;
    files: string[];
}
/**
 * @module FilmOut
 **/
export declare class FilmOut {
    private id;
    private videoExtensions;
    private stillExtensions;
    private sequenceExtensions;
    private gifExtension;
    state: FilmOutState;
    private ffmpeg;
    private ffprobe;
    private light;
    private ipc;
    private ui;
    private log;
    display: Display;
    server: Server;
    /**
     * @constructor
     * Builds FilmOut class with display, ffmpeg, ffprobe, ui and light as internal properties.
     *
     * @param {object} display Display object for showing frames
     * @param {object} ffmpeg  FFMPEG wrapper
     * @param {object} ffprobe FFPROBE wrapper for file info
     * @param {object} ui      Electron ui object
     * @param {object} light   Light device object
     **/
    constructor(display: Display, server: Server, ffmpeg: FFMPEG, ffprobe: FFPROBE, ui: WebContents, light: Light);
    /**
     * Async function for requiring log, ipcMain and bind events.
     **/
    private init;
    /**
     *
     **/
    private listen;
    /**
     * Create a hash of a string.
     *
     * @param {string} data Data to produce hash of
     */
    private hash;
    /**
     * Sets filmout direction.
     *
     * @param {boolean} dir  Direction of filmout
     **/
    set(dir: boolean): void;
    /**
     * Moves filmout a frame at a time.
     *
     * @returns {number} Time since start
     **/
    move(): Promise<number>;
    /**
    * Begin the process of exporting single frames from the video for display.
    **/
    start(): Promise<void>;
    /**
     * Ends the filmout process and closes the display.
     **/
    end(): Promise<void>;
    /**
     * Use a video file as a film out source on "projector"
     *
     * @param {object} evt Original connect event
     * @param {object} arg Arguments from ipc message
     *
     * @returns {boolean} Success state
     **/
    onConnect(evt: IpcMainEvent, arg: any): Promise<boolean>;
    /**
     * Pre-export all frames from video for display.
     *
     * @param {object} evt IPC event
     * @param {object} arg IPC args
     *
     * @returns {any} UI send call
     */
    onPreExport(evt: IpcMainEvent, arg: any): Promise<any>;
    /**
     * Return true if gif is animated, false if it is a still
     *
     * @param {string} pathStr Path to gif to check
     *
     * @returns {boolean} Whether or not gif is animated
     **/
    isGifAnimated(pathStr: string): Promise<boolean>;
    /**
     * Return information on a still image using the Jimp module
     *
     * @param {string} pathStr Path to gif to check
     *
     * @returns {object} Info about still from sharp
     **/
    stillInfo(pathStr: string): Promise<any>;
    /**
     * Return information on the first still image found in a
     * directory using the Jimp module.
     *
     * @param {array} images List of image paths
     *
     * @returns {object} Info about first image
     **/
    dirInfo(images: string[]): Promise<any>;
    /**
     * Returns a list of images within a directory, filtered
     * for supported types and sorted.
     *
     * @param {string} pathStr Path to directory
     *
     * @returns {array} Array of image paths
     **/
    dirList(pathStr: string): Promise<string[]>;
    /**
     * Preview a frame from the selected video.
     *
     * @param {object} evt Original event
     * @param {object} arg Arguments from message
     **/
    previewFrame(evt: IpcMainEvent, arg: any): Promise<void>;
    /**
     * Open a single frame in a display window to preview filmout.
     *
     * @param {object} evt Original event
     * @param {object} arg Arguments from message
     **/
    preview(evt: IpcMainEvent, arg: any): Promise<void>;
    /**
     *
     **/
    focus(evt: IpcMainEvent, arg: any): Promise<void>;
    /**
     *
     **/
    field(evt: IpcMainEvent, arg: any): Promise<void>;
    /**
     *
     **/
    meter(evt: IpcMainEvent, arg: any): Promise<void>;
    /**
     *
     **/
    close(evt: IpcMainEvent, arg: any): Promise<void>;
    /**
     *
     **/
    onDisplay(evt: IpcMainEvent, arg: any): void;
}
export type { FilmOutState };

import type { System } from 'system';
/** @module lib/ffprobe */
/**
 * Class representing all ffprobe features.
 */
export declare class FFPROBE {
    private bin;
    private log;
    constructor(sys: System);
    private init;
    /**
     * Parse the fps entry into a float representing the fps of a video
     **/
    private parseFps;
    /**
     * Get info on a video in json format. Use for filmout.
     *
     * @param {string} video Path to video
     *
     * @returns {object} Video info in an object
     **/
    info(video: string): Promise<any>;
    /**
     * Count the number of frames in the video using one of two methods.
     * The first uses -select_streams and is very fast. The second uses
     * -count_frames and is VERY slow.
     *
     * @param {string} video Path to video
     *
     * @returns {integer} Number of frames in video
     **/
    frames(video: string): Promise<any>;
}

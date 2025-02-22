'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFPROBE = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const exec_1 = require("exec");
const log_1 = require("log");
/** @module lib/ffprobe */
/**
 * Class representing all ffprobe features.
 */
class FFPROBE {
    constructor(sys) {
        this.bin = sys.deps.ffprobe;
        this.init();
    }
    async init() {
        this.log = await (0, log_1.Log)({ label: 'ffprobe' });
    }
    /**
     * Parse the fps entry into a float representing the fps of a video
     **/
    parseFps(fpsStr) {
        let fps = 30.0;
        let parts;
        if (fpsStr.indexOf('/') !== -1) {
            parts = fpsStr.split('/');
            fps = parseFloat(parts[0]) / parseFloat(parts[1]);
        }
        else {
            fps = parseFloat(fpsStr);
        }
        return fps;
    }
    /**
     * Get info on a video in json format. Use for filmout.
     *
     * @param {string} video Path to video
     *
     * @returns {object} Video info in an object
     **/
    async info(video) {
        const cmd = `${this.bin} -v quiet -print_format json -show_format -show_streams "${video}"`;
        let fileExists;
        let raw;
        let json;
        let vid; //whether video has stream with video data
        try {
            fileExists = await (0, fs_extra_1.exists)(video);
        }
        catch (err) {
            return exit(err, 5);
        }
        if (!fileExists) {
            //return exit(`File ${video} does not exist`, 6);
            this.log.error(new Error(`File ${video} does not exist`));
            return false;
        }
        try {
            this.log.info(cmd);
            raw = await (0, exec_1.exec)(cmd);
        }
        catch (err) {
            //return exit(err, 7);
            this.log.error(err);
            return false;
        }
        try {
            json = JSON.parse(raw.stdout);
        }
        catch (err) {
            this.log.error('Error parsing stdout', err);
            this.log.error(raw.stdout);
            return raw.stdout;
        }
        if (json.format && json.format.duration) {
            json.seconds = parseFloat(json.format.duration);
        }
        if (json && json.streams) {
            vid = json.streams.find((stream) => {
                if (stream.width && stream.height)
                    return stream;
            });
        }
        if (vid) {
            json.width = vid.width;
            json.height = vid.height;
            json.fps = this.parseFps(vid.r_frame_rate);
        }
        return json;
    }
    /**
     * Count the number of frames in the video using one of two methods.
     * The first uses -select_streams and is very fast. The second uses
     * -count_frames and is VERY slow.
     *
     * @param {string} video Path to video
     *
     * @returns {integer} Number of frames in video
     **/
    async frames(video) {
        const ext = (0, path_1.extname)(video.toLowerCase());
        let cmd = `${this.bin} -v error -select_streams v:0 -show_entries stream=nb_frames -of default=nokey=1:noprint_wrappers=1 "${video}"`;
        let backup_cmd = `${this.bin} -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 "${video}"`;
        let gif_cmd = `identify -format "%n\n" "${video}" | head -1`;
        let fileExists;
        let raw;
        let frames;
        try {
            fileExists = await (0, fs_extra_1.exists)(video);
        }
        catch (err) {
            //return exit(err, 5);
            this.log.error(err);
            return false;
        }
        if (!fileExists) {
            //return exit(`File ${video} does not exist`, 6);
            console.error(new Error(`File ${video} does not exist`));
            return false;
        }
        if (ext === '.mkv') {
            cmd = backup_cmd;
        }
        else if (ext === '.gif') {
            cmd = gif_cmd;
        }
        try {
            this.log.info(cmd);
            raw = await (0, exec_1.exec)(cmd);
        }
        catch (err) {
            this.log.error(err);
            return false;
        }
        try {
            frames = parseInt(raw.stdout);
        }
        catch (err) {
            return raw.stdout;
        }
        return frames;
    }
}
exports.FFPROBE = FFPROBE;
/*
function map (obj : any) {
    console.dir(obj);
}
*/
module.exports = { FFPROBE };
//# sourceMappingURL=index.js.map
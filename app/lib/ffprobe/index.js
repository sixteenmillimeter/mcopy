'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/** @module FFPROBE **/
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const exec_1 = require("exec");
//const spawn = require('spawn');
//const exit = require('exit');
class FFPROBE {
    constructor(sys) {
        this.bin = sys.deps.ffprobe;
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
            fileExists = await fs_extra_1.exists(video);
        }
        catch (err) {
            return exit(err, 5);
        }
        if (!fileExists) {
            //return exit(`File ${video} does not exist`, 6);
            console.error(new Error(`File ${video} does not exist`));
            return false;
        }
        try {
            console.log(cmd);
            raw = await exec_1.exec(cmd);
        }
        catch (err) {
            //return exit(err, 7);
            console.error(err);
            return false;
        }
        try {
            json = JSON.parse(raw.stdout);
        }
        catch (err) {
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
        const ext = path_1.extname(video.toLowerCase());
        let cmd = `${this.bin} -v error -select_streams v:0 -show_entries stream=nb_frames -of default=nokey=1:noprint_wrappers=1 "${video}"`;
        let backup_cmd = `${this.bin} -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 "${video}"`;
        let gif_cmd = `identify -format "%n\n" "${video}" | head -1`;
        let fileExists;
        let raw;
        let frames;
        try {
            fileExists = await fs_extra_1.exists(video);
        }
        catch (err) {
            //return exit(err, 5);
            console.error(err);
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
            console.log(cmd);
            raw = await exec_1.exec(cmd);
        }
        catch (err) {
            console.error(err);
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
/*
function map (obj : any) {
    console.dir(obj);
}
*/
module.exports = (sys) => {
    return new FFPROBE(sys);
};
//# sourceMappingURL=index.js.map
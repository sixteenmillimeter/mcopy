'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/** @module ffmpeg **/
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const exec_1 = require("exec");
const child_process_1 = require("child_process");
async function spawnAsync(bin, args) {
    return new Promise((resolve, reject) => {
        const child = (0, child_process_1.spawn)(bin, args);
        let stdout = '';
        let stderr = '';
        child.on('exit', (code) => {
            if (code === 0) {
                return resolve({ stdout, stderr });
            }
            else {
                console.error(`Process exited with code: ${code}`);
                console.error(stderr);
                return reject(stderr);
            }
        });
        child.stdout.on('data', (data) => {
            stdout += data;
        });
        child.stderr.on('data', (data) => {
            stderr += data;
        });
        return child;
    });
}
/** @class FFMPEG **/
class FFMPEG {
    /**
     * @constructor
     * Creates an ffmpeg class
     *
     * @param {object} sys System object to be used to get temp directory
     **/
    constructor(sys) {
        this.id = 'ffmpeg';
        this.onProgress = () => { };
        this.bin = sys.deps.ffmpeg;
        this.TMPDIR = (0, path_1.join)(sys.tmp, 'mcopy_digital');
        this.init();
    }
    /**
     * Async method to call async functions from constructor
     **/
    async init() {
        const Log = require('log');
        this.log = await Log({ label: this.id });
        await this.checkDir();
    }
    /**
     * Add padding to a number to 5 places. Return a string.
     *
     * @param {integer} i Integer to pad
     *
     * @returns {string} Padded string
     **/
    padded_frame(i) {
        let len = (i + '').length;
        let str = i + '';
        for (let x = 0; x < 8 - len; x++) {
            str = '0' + str;
        }
        return str;
    }
    /**
     * Parse the stderr output of ffmpeg
     *
     * @param {string} line		Stderr line
     **/
    parseStderr(line) {
        //frame= 6416 fps= 30 q=31.0 size=   10251kB time=00:03:34.32 bitrate= 391.8kbits/s speed=   1x
        let obj = {};
        if (line.substring(0, 'frame='.length) === 'frame=') {
            try {
                obj.frame = line.split('frame=')[1].split('fps=')[0];
                obj.frame = parseInt(obj.frame);
                obj.fps = line.split('fps=')[1].split('q=')[0];
                obj.fps = parseFloat(obj.fps);
                obj.time = line.split('time=')[1].split('bitrate=')[0];
                obj.speed = line.split('speed=')[1].trim().replace('x', '');
                obj.speed = parseFloat(obj.speed);
                obj.size = line.split('size=')[1].split('time=')[0].trim();
            }
            catch (err) {
                console.error(err);
                console.log(line);
                process.exit();
            }
        }
        else {
        }
        return obj;
    }
    /**
     * Render a single frame from a video or image to a png.
     *
     * @param {object} state State object containing file data
     * @param {object} light Object containing color information for frame
     *
     * @returns {string} Path of frame
     **/
    async frame(state, light) {
        const frameNum = state.frame;
        const video = state.directory ? state.files[frameNum] : state.path;
        const w = state.info.width;
        const h = state.info.height;
        const padded = this.padded_frame(frameNum);
        let ext = 'png';
        let rgb = light.color;
        let rgba = {};
        let tmpoutput;
        let cmd;
        let output;
        let fileExists = false;
        let scale = '';
        if (state.directory) {
            return video;
        }
        if (w && h) {
            scale = `,scale=trunc(ih*dar):${h}`; //:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2
        }
        tmpoutput = (0, path_1.join)(this.TMPDIR, `${state.hash}-export-${padded}.${ext}`);
        try {
            fileExists = await (0, fs_extra_1.exists)(tmpoutput);
        }
        catch (err) {
            //
        }
        if (fileExists) {
            this.log.info(`File ${tmpoutput} exists`);
            return tmpoutput;
        }
        //
        cmd = `${this.bin} -y -i "${video}" -vf "select='gte(n\\,${frameNum})'${scale}" -vframes 1 -compression_algo raw -pix_fmt rgb24 -crf 0 "${tmpoutput}"`;
        //cmd2 = `${this.convert} "${tmpoutput}" -resize ${w}x${h} -size ${w}x${h} xc:"rgb(${rgb[0]},${rgb[1]},${rgb[2]})" +swap -compose Darken -composite "${tmpoutput}"`;
        //ffmpeg -i "${video}" -ss 00:00:07.000 -vframes 1 "export-${time}.jpg"
        //ffmpeg -i "${video}" -compression_algo raw -pix_fmt rgb24 "export-%05d.tiff"
        //-vf "select=gte(n\,${frame})" -compression_algo raw -pix_fmt rgb24 "export-${padded}.png"
        try {
            this.log.info(cmd);
            output = await (0, exec_1.exec)(cmd);
        }
        catch (err) {
            this.log.error(err);
        }
        if (output && output.stdout)
            this.log.info(`"${output.stdout.trim()}"`);
        if (rgb[0] !== 255 || rgb[1] !== 255 || rgb[2] !== 255) {
            rgb = rgb.map((e) => {
                return parseInt(e);
            });
            rgba = { r: rgb[0], g: rgb[1], b: rgb[2], a: 255 };
            try {
                //await Frame.blend(tmpoutput, rgba, tmpoutput);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        return tmpoutput;
    }
    /**
     * Render all frames in a video to the temp directory.
     * Not in use.
     *
     * @param {string} video Path to video
     * @param {object} obj Not sure
     *
     * @returns {?}
     **/
    async frames(state) {
        const video = state.path;
        const w = state.info.width;
        const h = state.info.height;
        const tmppath = this.TMPDIR;
        let ext = 'png';
        let tmpoutput = (0, path_1.join)(tmppath, `${state.hash}-export-%08d.${ext}`);
        let args;
        let output;
        let estimated = -1;
        //cmd = `${this.bin} -y -i "${video}" -vf "${scale}" -compression_algo raw -pix_fmt rgb24 -crf 0 "${tmpoutput}"`;
        args = [
            '-y',
            '-i', video
        ];
        if (w && h) {
            args.push('-vf');
            args.push(`scale=${w}:${h}`);
        }
        args = args.concat([
            '-compression_algo', 'raw',
            '-pix_fmt', 'rgb24',
            '-crf', '0',
            tmpoutput
        ]);
        //console.dir(args)
        //console.dir(state)
        try {
            await (0, fs_extra_1.mkdir)(tmppath);
        }
        catch (err) {
            if (err.code && err.code === 'EEXIST') {
                //directory exists
            }
            else {
                this.log.error(err);
            }
        }
        //ffmpeg -i "${video}" -compression_algo raw -pix_fmt rgb24 "${tmpoutput}"
        return new Promise((resolve, reject) => {
            let stdout = '';
            let stderr = '';
            this.log.info(`${this.bin} ${args.join(' ')}`);
            this.child = (0, child_process_1.spawn)(this.bin, args);
            this.child.on('exit', (code) => {
                //console.log('GOT TO EXIT');
                if (code === 0) {
                    console.log(stderr);
                    console.log(stdout);
                    return resolve(true);
                }
                else {
                    console.error(`Process exited with code: ${code}`);
                    console.error(stderr);
                    return reject(stderr + stdout);
                }
            });
            this.child.stdout.on('data', (data) => {
                const line = data.toString();
                stdout += line;
            });
            this.child.stderr.on('data', (data) => {
                const line = data.toString();
                const obj = this.parseStderr(line);
                if (obj.frame && state.frames) {
                    obj.progress = obj.frame / state.frames;
                }
                if (obj.frame && obj.speed && state.frames && state.info.fps) {
                    //scale by speed
                    obj.remaining = ((state.frames - obj.frame) / state.info.fps) / obj.speed;
                    obj.estimated = state.info.seconds / obj.speed;
                    if (obj.estimated > estimated) {
                        estimated = obj.estimated;
                    }
                }
                if (obj.frame) {
                    //log.info(`${input.name} ${obj.frame}/${input.frames} ${Math.round(obj.progress * 1000) / 10}% ${Math.round(obj.remaining)} seconds remaining of ${Math.round(obj.estimated)}`);
                    this.onProgress(obj);
                }
            });
        });
    }
    cancel() {
        if (this.child) {
            this.child.kill();
            this.log.info(`Stopped exporting sequence with ffmpeg`);
        }
    }
    /**
     * Clears a specific frame from the tmp directory
     *
     * @param {integer} frame Integer of frame to clear
     *
     * @returns {boolean} True if successful, false if not
     **/
    async clear(state) {
        const padded = this.padded_frame(state.frame);
        let ext = 'png';
        let tmppath;
        let fileExists;
        tmppath = (0, path_1.join)(this.TMPDIR, `${state.hash}-export-${padded}.${ext}`);
        try {
            fileExists = await (0, fs_extra_1.exists)(tmppath);
        }
        catch (err) {
            this.log.error(err);
        }
        if (!fileExists)
            return false;
        try {
            await (0, fs_extra_1.unlink)(tmppath);
            this.log.info(`Cleared frame ${tmppath}`);
        }
        catch (err) {
            this.log.error(err);
        }
        return true;
    }
    /**
     * Deletes all frames in temp directory.
     *
     **/
    async clearAll() {
        const tmppath = this.TMPDIR;
        let files;
        try {
            files = await (0, fs_extra_1.readdir)(tmppath);
        }
        catch (err) {
            this.log.error(err);
        }
        files = files.filter((file) => {
            if (file.indexOf('-export-') !== -1) {
                return true;
            }
            return false;
        });
        if (files) {
            files.forEach(async (file, index) => {
                try {
                    await (0, fs_extra_1.unlink)((0, path_1.join)(tmppath, file));
                }
                catch (err) {
                    this.log.error(err);
                }
            });
        }
    }
    /**
     * Checks if mcopy temp directory exists. If it doesn't,
     * creates it.
     **/
    async checkDir() {
        let fileExists;
        try {
            fileExists = await (0, fs_extra_1.exists)(this.TMPDIR);
        }
        catch (err) {
            this.log.error('Error checking for tmp dir', err);
        }
        if (!fileExists) {
            try {
                await (0, fs_extra_1.mkdir)(this.TMPDIR);
                this.log.info(`Created tmpdir ${this.TMPDIR}`);
            }
            catch (err) {
                this.log.error('Error creating tmp dir', err);
            }
        }
        try {
            await this.clearAll();
        }
        catch (err) {
            this.log.error(err);
        }
    }
}
module.exports = (sys) => {
    return new FFMPEG(sys);
};
//# sourceMappingURL=index.js.map
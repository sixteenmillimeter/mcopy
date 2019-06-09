'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const exec_1 = require("exec");
//const spawn = require('spawn');
//const exit = require('exit');
let system = {};
async function info(video) {
    let cmd = `ffprobe -v quiet -print_format json -show_format -show_streams "${video}"`;
    let fileExists;
    let raw;
    let json;
    let vid;
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
    if (json && json.streams) {
        vid = json.streams.find((stream) => {
            if (stream.width && stream.height)
                return stream;
        });
    }
    if (vid) {
        json.width = vid.width;
        json.height = vid.height;
    }
    return json;
}
async function frames(video) {
    let cmd = `ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 "${video}"`;
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
function map(obj) {
    console.dir(obj);
}
module.exports = (sys) => {
    system = sys;
    return {
        info,
        frames
    };
};
//# sourceMappingURL=index.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const electron_1 = require("electron");
//private
const exec_1 = require("exec");
/**
 * Evaluates system dependencies for digital
 * projector features by executing `which` on binary.
 * If they do not exist, log to console
 *
 * @param {string} platform  Operating system type
 *
 * @returns {object} Object containing path to dependency from `which`, if they exist
 **/
async function dependencies(platform) {
    let obj = {};
    let ffmpeg = require('ffmpeg-static');
    let ffprobe = require('ffprobe-static');
    let ffoutput;
    //let imoutput : ExecOutput;
    let eogoutput;
    obj.ffmpeg = ffmpeg; /*.replace(
        'app.asar',
        'app.asar.unpacked'
    );*/
    obj.ffprobe = ffprobe.path; /*.replace(
        'app.asar',
        'app.asar.unpacked'
    );*/
    try {
        //imoutput = await exec('which convert');
    }
    catch (err) {
        console.error('imagemagick is not installed', err);
    }
    /*if (!imoutput || imoutput.stdout.trim() === '') {
        console.error('imagemagick is not installed');
    } else {
        obj.convert = imoutput.stdout.trim();
    }*/
    //if linux
    if (platform === 'nix') {
        try {
            eogoutput = await (0, exec_1.exec)('which eog');
        }
        catch (err) {
            console.error('eog is not installed', err);
        }
        if (!eogoutput || eogoutput.stdout.trim() === '') {
            console.error('eog is not installed');
        }
        else {
            obj.eog = eogoutput.stdout.trim();
        }
    }
    return obj;
}
function displayMap(obj) {
    const sm = {
        id: obj.id,
        width: obj.size.width,
        height: obj.size.height,
        x: obj.bounds.x,
        y: obj.bounds.y,
        scale: obj.scaleFactor,
        primary: (obj.bounds.x === 0 && obj.bounds.y === 0)
    };
    const primary = sm.primary ? ' (Primary)' : '';
    sm.name = `${sm.width}x${sm.height}${primary}`;
    return sm;
}
function displaySort(a, b) {
    if (a.primary) {
        return -1;
    }
    else if (b.primary) {
        return 1;
    }
    return 0;
}
async function displays() {
    let displays = electron_1.screen.getAllDisplays();
    displays = displays.map(displayMap);
    displays.sort(displaySort);
    return displays;
}
/**
 * Profile the current system and return an object with
 * data about the displays and dependencies for the digital
 * projector feature.
 *
 * @returns {object} Object containing system information
 */
async function system(ui) {
    const obj = {};
    let platform;
    try {
        obj.tmp = (0, os_1.tmpdir)();
    }
    catch (err) {
        obj.tmp = '/tmp';
    }
    platform = (0, os_1.type)();
    if (platform === 'Darwin') {
        obj.platform = 'osx';
    }
    else if (platform === 'Windows_NT') {
        obj.platform = 'win';
    }
    else {
        obj.platform = 'nix';
    }
    obj.displays = await displays();
    obj.deps = await dependencies(obj.platform);
    setTimeout(() => {
        ui.send('system', obj);
    }, 3000);
    return obj;
}
module.exports = system;
//# sourceMappingURL=index.js.map
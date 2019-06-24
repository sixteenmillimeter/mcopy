'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const electron_1 = require("electron");
//private
const exec_1 = require("exec");
/**
 * Evaluates system dependencies for digital
 * projector features by executing processes with
 * --help flag. If they do not exist, log to console
 *
 * @param {string} platform  Operating system type
 **/
async function dependencies(platform) {
    let obj = {};
    try {
        await exec_1.exec('ffmpeg -h');
        obj.ffmpeg = 'ffmpeg';
    }
    catch (err) {
        //return exit('ffmpeg is not installed', 3);
        return console.error('ffmpeg is not installed', err);
    }
    //if linux
    if (platform === 'nix') {
        try {
            await exec_1.exec('eog -h');
            obj.eog = 'eog';
        }
        catch (err) {
            //return exit('eog is not installed', 4);
            return console.error('eog is not installed', err);
        }
    }
    return obj;
}
function displayMap(obj) {
    const sm = {
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
async function system() {
    const obj = {};
    let platform;
    try {
        obj.tmp = os_1.tmpdir();
    }
    catch (err) {
        obj.tmp = '/tmp';
    }
    platform = os_1.type();
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
    return obj;
}
module.exports = system;
//# sourceMappingURL=index.js.map
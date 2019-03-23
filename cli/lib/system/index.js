'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const si = require("systeminformation");
//private
const exec = require('exec');
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
        await exec('ffmpeg -h');
        obj.ffmpeg = 'ffmpeg';
    }
    catch (err) {
        //return exit('ffmpeg is not installed', 3);
        return console.error('ffmpeg is not installed', err);
    }
    //if linux
    if (platform === 'nix') {
        try {
            await exec('eog -h');
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
        width: obj.resolutionx,
        height: obj.resolutiony
    };
    return sm;
}
async function displays() {
    const obj = await si.graphics();
    const arr = obj.displays;
    return arr.map(displayMap);
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
        obj.tmp = os.tmpdir();
    }
    catch (err) {
        obj.tmp = '/tmp';
    }
    platform = os.type();
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
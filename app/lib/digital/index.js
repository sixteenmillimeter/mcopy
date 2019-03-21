'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const delay = require("delay");
const dig = {};
dig.state = {
    frame: 0,
    frames: 0,
    path: null,
    fileName: null,
    info: {},
    dir: true
};
dig.set = function (dir) {
    dig.state.dir = dir;
};
dig.move = async function () {
    let start = +new Date();
    let last = dig.state.dir + 0;
    if (dig.state.dir) {
        dig.state.frame++;
    }
    else {
        dig.state.frame--;
    }
    if (dig.state.frame < 1) {
        dig.state.frame = 1;
    }
    return (+new Date()) - start;
};
dig.start = async function (lightState) {
    try {
        await dig.ffmpeg.clearAll();
    }
    catch (err) {
        console.error(err);
    }
    try {
        await dig.ffmpeg.frame(dig.state, lightState);
    }
    catch (err) {
        console.error(err);
    }
    dig.display.start(dig.state.frame);
    await delay(20);
};
dig.end = async function () {
    await delay(20);
    dig.display.end();
};
module.exports = (display, ffmpeg, ffprobe) => {
    dig.display = display;
    dig.ffmpeg = ffmpeg;
    dig.ffprobe = ffprobe;
    return dig;
};
//# sourceMappingURL=index.js.map
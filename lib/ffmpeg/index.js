'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs_extra_1 = require("fs-extra");
const exec_1 = require("exec");
let system = {};
let TMPDIR;
function padded_frame(i) {
    let len = (i + '').length;
    let str = i + '';
    for (let x = 0; x < 5 - len; x++) {
        str = '0' + str;
    }
    return str;
}
async function frame(state, light) {
    let frame = state.frame;
    let video = state.path;
    let w = state.info.width;
    let h = state.info.height;
    let padded = padded_frame(frame);
    let ext = 'tif';
    let rgb = light.color;
    let tmpoutput;
    let cmd;
    let output;
    let cmd2;
    let output2;
    //if (system.platform !== 'nix') {
    ext = 'png';
    //}
    rgb = rgb.map((e) => {
        return parseInt(e);
    });
    tmpoutput = path.join(TMPDIR, `export-${padded}.${ext}`);
    cmd = `ffmpeg -y -i "${video}" -vf "select='gte(n\\,${frame})',scale=${w}:${h}" -vframes 1 -compression_algo raw -pix_fmt rgb24 "${tmpoutput}"`;
    cmd2 = `convert "${tmpoutput}" -resize ${w}x${h} -size ${w}x${h} xc:"rgb(${rgb[0]},${rgb[1]},${rgb[2]})" +swap -compose Darken -composite "${tmpoutput}"`;
    //ffmpeg -i "${video}" -ss 00:00:07.000 -vframes 1 "export-${time}.jpg"
    //ffmpeg -i "${video}" -compression_algo raw -pix_fmt rgb24 "export-%05d.tiff"
    //-vf "select=gte(n\,${frame})" -compression_algo raw -pix_fmt rgb24 "export-${padded}.png"
    try {
        console.log(cmd);
        output = await exec_1.exec(cmd);
    }
    catch (err) {
        console.error(err);
    }
    if (output && output.stdout)
        console.log(`"${output.stdout}"`);
    if (rgb[0] !== 255 || rgb[1] !== 255 || rgb[2] !== 255) {
        try {
            console.log(cmd2);
            output2 = await exec_1.exec(cmd2);
        }
        catch (err) {
            console.error(err);
        }
    }
    if (output2 && output2.stdout)
        console.log(`"${output2.stdout}"`);
}
async function frames(video, obj) {
    let tmppath = TMPDIR;
    let ext = 'tif';
    let tmpoutput;
    //if (system.platform !== 'nix') {
    ext = 'png';
    //}
    tmpoutput = path.join(tmppath, `export-%05d.${ext}`);
    try {
        await fs_extra_1.mkdir(tmppath);
    }
    catch (err) {
        console.error(err);
    }
    //ffmpeg -i "${video}" -compression_algo raw -pix_fmt rgb24 "${tmpoutput}"
}
async function clear(frame) {
    let padded = padded_frame(frame);
    let ext = 'tif';
    let tmppath;
    let tmpoutput;
    let cmd;
    let fileExists;
    //if (system.platform !== 'nix') {
    ext = 'png';
    //}
    tmppath = path.join(TMPDIR, `export-${padded}.${ext}`);
    try {
        fileExists = await fs_extra_1.exists(tmppath);
    }
    catch (err) {
        console.error(err);
    }
    if (!fs_extra_1.exists)
        return false;
    try {
        await fs_extra_1.unlink(tmppath);
        console.log(`Cleared frame ${tmppath}`);
    }
    catch (err) {
        console.error(err);
    }
    return true;
}
async function clearAll() {
    let tmppath = TMPDIR;
    let files;
    try {
        files = await fs_extra_1.readdir(tmppath);
    }
    catch (err) {
        console.error(err);
    }
    if (files) {
        files.forEach(async (file, index) => {
            try {
                await fs_extra_1.unlink(path.join(tmppath, file));
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
async function checkDir() {
    let fileExists;
    try {
        fileExists = await fs_extra_1.exists(TMPDIR);
    }
    catch (err) {
        console.error('Error checking for tmp dir', err);
    }
    if (!fileExists) {
        try {
            await fs_extra_1.mkdir(TMPDIR);
            console.log(`Created tmpdir ${TMPDIR}`);
        }
        catch (err) {
            console.error('Error creating tmp dir', err);
        }
    }
    try {
        await clearAll();
    }
    catch (err) {
        console.error(err);
    }
}
module.exports = (sys) => {
    system = sys;
    TMPDIR = path.join(system.tmp, 'mcopy_digital');
    checkDir();
    return {
        frames,
        frame,
        clear,
        clearAll
    };
};
//# sourceMappingURL=index.js.map
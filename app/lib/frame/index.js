'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
const jimp_1 = __importDefault(require("jimp"));
/** @module lib/frame */
/**
 * Class representing the static Frame module.
 */
class Frame {
    static async info(imagePath) {
        let image;
        try {
            image = await jimp_1.default.read(imagePath);
        }
        catch (err) {
            throw err;
        }
        return {
            width: image.bitmap.width,
            height: image.bitmap.height
        };
    }
    static async solidColor(width, height, color) {
        //@ts-ignore
        const colorInt = jimp_1.default.rgbaToInt(color.r, color.g, color.b, color.a);
        return new Promise((resolve, reject) => {
            return new jimp_1.default(width, height, colorInt, (err, image) => {
                if (err) {
                    return reject(err);
                }
                return resolve(image);
            });
        });
    }
    static async blend(inPath, color, imagePath) {
        //cmd2 = `${this.convert} "${tmpoutput}" -resize ${w}x${h} -size ${w}x${h} xc:"rgb(${rgb[0]},${rgb[1]},${rgb[2]})" +swap -compose Darken -composite "${tmpoutput}"`;
        const options = {
            mode: jimp_1.default.BLEND_DARKEN,
            opacitySource: 1.0,
            opacityDest: 1.0
        };
        let width;
        let height;
        let bottom;
        let top;
        try {
            top = await jimp_1.default.read(inPath);
        }
        catch (err) {
            throw err;
        }
        width = top.bitmap.width;
        height = top.bitmap.height;
        try {
            bottom = await Frame.solidColor(width, height, color);
        }
        catch (err) {
            throw err;
        }
        bottom.composite(top, 0, 0, options);
        try {
            await bottom.writeAsync(imagePath);
        }
        catch (err) {
            throw err;
        }
        return imagePath;
    }
}
exports.Frame = Frame;
module.exports = { Frame };
//# sourceMappingURL=index.js.map
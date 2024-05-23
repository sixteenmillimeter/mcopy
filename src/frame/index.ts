'use strict';

import Jimp from 'jimp';

interface RGBA {
	r : number;
	g : number;
	b : number;
	a : number;
}

export default class Frame {
	static async info (imagePath : string) {
		let image : any;
		try { 
			image = await Jimp.read(imagePath);
		} catch (err) {
			throw err;
		}
		return {
			width : image.bitmap.width,
			height : image.bitmap.height
		};
	}
	static async solidColor (width : number, height : number, color : RGBA) {
		//@ts-ignore
		const colorInt : string = Jimp.rgbaToInt(color.r, color.g, color.b, color.a);
		return new Promise((resolve : Function, reject : Function) => {
			return new Jimp(width, height, colorInt, (err, image) => {
  				if (err) {
  					return reject(err)
  				}
  				return resolve(image);
			});
		});
	}

	static async blend (inPath : any, color : RGBA, imagePath : string) {
		//cmd2 = `${this.convert} "${tmpoutput}" -resize ${w}x${h} -size ${w}x${h} xc:"rgb(${rgb[0]},${rgb[1]},${rgb[2]})" +swap -compose Darken -composite "${tmpoutput}"`;
		const options : any = {
			mode: Jimp.BLEND_DARKEN,
			opacitySource: 1.0,
			opacityDest: 1.0
		};
		let width : number;
		let height : number;
		let bottom : any;
		let top : any;

		try { 
			top = await Jimp.read(inPath);
		} catch (err) {
			throw err;
		}

		width = top.bitmap.width;
		height = top.bitmap.height;

		try {
			bottom = await Frame.solidColor(width, height, color);
		} catch (err) {
			throw err;
		}

		bottom.composite(top, 0, 0, options);

		try {
			await bottom.writeAsync(imagePath);
		} catch (err) {
			throw err;
		}
		
		return imagePath;
	}
}

module.exports = Frame

export type { RGBA }
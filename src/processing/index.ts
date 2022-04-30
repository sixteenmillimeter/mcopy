'use strict'

import { exec } from 'exec';

class Processing {
	private _baseUrl : string
	constructor (url : string) {
		this._baseUrl = (url.indexOf('http') === -1 && url.indexOf('://') === -1) ? `http://${url}` : url
	}

	public async move () {
		return new Promise (async (resolve : any, reject : any) => {
			const timeStart : number = +new Date()
			const url : string = `${this._baseUrl}`
			const cmd : string = `curl --http0.9 ${url}`
			let res : string
			let ms : number
			//console.log(url)
			try {
				res = await exec(cmd)
			} catch (err) {
				return reject(err)
			}
			ms = (+new Date()) - timeStart
			return resolve(ms)
		})
	}
	public async setDir (dir : boolean) {
		return new Promise ((resolve : any, reject : any) => {
			return resolve(0)
		})
	}
}

module.exports.Processing = Processing
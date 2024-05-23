'use strict'

import { exec } from 'exec';
import type { ExecOutput } from 'exec';

export class Processing {
	private _baseUrl : string
	constructor (url : string) {
		this._baseUrl = (url.indexOf('http') === -1 && url.indexOf('://') === -1) ? `http://${url}` : url
	}

	public async move () : Promise<number> {
		return new Promise (async (resolve : Function, reject : Function) => {
			const timeStart : number = +new Date()
			const url : string = `${this._baseUrl}`
			const cmd : string = `curl --http0.9 ${url}`
			let res : ExecOutput
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
	public async setDir (dir : boolean) : Promise<number> {
		return new Promise ((resolve : Function, reject : Function) => {
			return resolve(0)
		})
	}
}

module.exports = { Processing }
'use strict'

import * as request from 'request'

export class Intval {
	private _baseUrl : string

	constructor (url : string) {
		this._baseUrl = `http://${url}`
	}
	public async move () : Promise<number> {
		return new Promise ((resolve : Function, reject : Function) => {
			const timeStart : number = +new Date()
			const url : string = `${this._baseUrl}/frame`
			//console.log(url)
			return request(url, (err : Error, res : any, body : string) => {
				let ms : number = (+new Date()) - timeStart
				if (err) {
					return reject(err)
				}
				return resolve(ms)
			})
		})
	}
	public async setDir (dir : boolean) : Promise<number>  {
		return new Promise ((resolve : Function, reject : Function) => {
			const timeStart : number = +new Date()
			const url : string = `${this._baseUrl}/dir?dir=${dir}`
			//console.log(url)
			return request(url, (err : Error, res : any, body : string) => {
				let ms : number = (+new Date()) - timeStart
				if (err) {
					return reject(err)
				}
				return resolve(ms)
			})
		})
	}
	public async setExposure (exposure : number, cb : Function) : Promise<number> {
		return new Promise ((resolve : Function, reject : Function) => {
			const timeStart : number = +new Date()
			const url : string = `${this._baseUrl}/exposure?exposure=${exposure}`
			return request(url, (err : Error, res : any, body : string) => {
				let ms : number = (+new Date()) - timeStart
				if (err) {
					return reject(err)
				}
				return resolve(ms)
			})
		})
	}
	public connect (cb : Function) {
		const timeStart : number = +new Date()
		const url : string = `${this._baseUrl}/status`
		const opts : any = {
			method : 'GET',
			uri : url,
			timeout: 5000
		}

		request(opts, (err : Error, res : any, body : string) => {
			let ms : number = (+new Date()) - timeStart
			if (err) {
				return cb(err, ms)
			}
			cb(null, ms, body)
		})
	}
}

module.exports = { Intval }
'use strict'

export class Intval {
	private _baseUrl : string
	private req : any
	constructor (url : string) {
		this._baseUrl = `http://${url}`
		this.req = require('request')
	}
	public async move () {
		return new Promise ((resolve : any, reject : any) => {
			const timeStart : number = +new Date()
			const url : string = `${this._baseUrl}/frame`
			//console.log(url)
			return this.req(url, (err : Error, res : any, body : string) => {
				let ms : number = (+new Date()) - timeStart
				if (err) {
					return reject(err)
				}
				return resolve(ms)
			})
		})
	}
	public async setDir (dir : boolean) {
		return new Promise ((resolve : any, reject : any) => {
			const timeStart : number = +new Date()
			const url : string = `${this._baseUrl}/dir?dir=${dir}`
			//console.log(url)
			return this.req(url, (err : Error, res : any, body : string) => {
				let ms : number = (+new Date()) - timeStart
				if (err) {
					return reject(err)
				}
				return resolve(ms)
			})
		})
	}
	public async setExposure (exposure : number, cb : Function) {
		return new Promise ((resolve : any, reject : any) => {
			const timeStart : number = +new Date()
			const url : string = `${this._baseUrl}/exposure?exposure=${exposure}`
			return this.req(url, (err : Error, res : any, body : string) => {
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

		this.req(opts, (err : Error, res : any, body : string) => {
			let ms : number = (+new Date()) - timeStart
			if (err) {
				return cb(err, ms)
			}
			cb(null, ms, body)
		})
	}
}

module.exports.Intval = Intval
'use strict'

const req = require('request')

class Intval {
	constructor (url) {
		this._baseUrl = `http://${url}`
	}
	async move () {
		return new Promise ((resolve, reject) => {
			const timeStart = +new Date()
			const url = `${this._baseUrl}/frame`
			//console.log(url)
			return req(url, (err, res, body) => {
				let ms = (+new Date()) - timeStart
				if (err) {
					return reject(err)
				}
				return resolve(ms)
			})
		})
	}
	async setDir (dir) {
		return new Promise ((resolve, reject) => {
			const timeStart = +new Date()
			const url = `${this._baseUrl}/dir?dir=${dir}`
			//console.log(url)
			return req(url, (err, res, body) => {
				let ms = (+new Date()) - timeStart
				if (err) {
					return reject(err)
				}
				return resolve(ms)
			})
		})
	}
	async setExposure (exposure, cb) {
		const timeStart = +new Date()
		const url = `${this._baseUrl}/exposure?exposure=${exposure}`
		//console.log(url)
		req(url, (err, res, body) => {
			let ms = (+new Date()) - timeStart
			if (err) {
				console.error(err)
			}
			cb(ms)
		})
	}
	connect (cb) {
		const timeStart = +new Date()
		const url = `${this._baseUrl}/status`
		const opts = {
			method : 'GET',
			uri : url,
			timeout: 5000
		}

		req(opts, (err, res, body) => {
			let ms = (+new Date()) - timeStart
			if (err) {
				//console.error(err)
				return cb(err, ms)
			}
			cb(null, ms, body)
		})
	}
}

module.exports = Intval
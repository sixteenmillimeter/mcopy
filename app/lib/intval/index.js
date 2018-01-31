'use strict'

const req = require('request')

class Intval {
	constructor (url) {
		this._baseUrl = `http://${url}`
	}
	move (cb) {
		const timeStart = +new Date()
		const url = `${this._baseUrl}/frame`
		//console.log(url)
		req(url, (err, res, body) => {
			let ms = (+new Date()) - timeStart
			if (err) {
				console.error(err)
			}
			cb(ms)
		})
	}
	setDir (dir, cb) {
		const timeStart = +new Date()
		const url = `${this._baseUrl}/dir?dir=${dir}`
		//console.log(url)
		req(url, (err, res, body) => {
			let ms = (+new Date()) - timeStart
			if (err) {
				console.error(err)
			}
			cb(ms)
		})

	}
	setExposure (exposure, cb) {
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
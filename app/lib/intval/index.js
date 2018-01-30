'use strict'

const req = require('request')
const devices = {}

class Intval {
	constructor (device, url) {
		devices[device] = `http://${url}`
	}
	move (device, cb) {
		const timeStart = +new Date()
		const baseUrl = devices[device]
		const url = `${baseUrl}/frame`
		//console.log(url)
		req(url, (err, res, body) => {
			let ms = (+new Date()) - timeStart
			if (err) {
				console.error(err)
			}
			cb(ms)
		})
	}
	setDir (device, dir, cb) {
		const timeStart = +new Date()
		const baseUrl = devices[device]
		const url = `${baseUrl}/dir?dir=${dir}`
		//console.log(url)
		req(url, (err, res, body) => {
			let ms = (+new Date()) - timeStart
			if (err) {
				console.error(err)
			}
			cb(ms)
		})

	}
	setExposure (device, exposure, cb) {
		const timeStart = +new Date()
		const baseUrl = devices[device]
		const url = `${baseUrl}/exposure?exposure=${exposure}`
		//console.log(url)
		req(url, (err, res, body) => {
			let ms = (+new Date()) - timeStart
			if (err) {
				console.error(err)
			}
			cb(ms)
		})
	}
}

module.exports = Intval
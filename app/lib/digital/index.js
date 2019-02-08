'use strict'

//Original idea for "display" module.

const path = require('path')

const delay = require('../delay')
const exec = require('../exec')

const { ipcMain, BrowserWindow} = require('electron')

let digitalWindow

class Digital {
	constructor() {

	}
	async open () {
		digitalWindow = new BrowserWindow({
			width: 800, 
			height: 600,
			minWidth : 800,
			minHeight : 600,
			icon: path.join(__dirname, '../../assets/icons/icon.png')
		})
		digitalWindow.loadURL('file://' + __dirname + '../../../views/digital.html')
		if (process.argv.indexOf('-d') !== -1 || process.argv.indexOf('--dev') !== -1) {
			digitalWindow.webContents.openDevTools()
		}
		digitalWindow.on('closed', () => {
			digitalWindow = null
		})
	}
	async fullScreen () {
		return digitalWindow.setFullScreen(true)
	}
	async setImage (src) {
		return digitalWindow.webContents.send('digital', { src })
	}
	async setMeter () {
		return digitalWindow.webContents.send('digital', { meter : true })
	}
	async setGrid () {
		return digitalWindow.webContents.send('digital', { grid : true })
	}
	async setFocus (num = 1) {
		let imagePath = path.join(__dirname, `../../data/focus${num}.jpg`)
		return digitalWindow.webContents.send('digital', { src : imagePath })
	}
	async getDir (dirPath, num = 0) {

	}
	async getFrame (videoPath, num = 0) {

	}
	async close () {
		if (digitalWindow) {
			digitalWindow.close()
		}
		return true
	}
	async move () {

	}
}

module.exports = Digital
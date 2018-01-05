'use strict'

const os = require('os');
const path = require('path');
const fs = require('fs');
const settings = {};

settings.file = path.join(os.homedir(), `/.mcopy/settings.json`);
settings.state = {
	server : {
		port : 1111,
		enabled : true
	},
	camera : {},
	projector : {},
	light : {}
}

settings.checkDir = function () {
	const dir = path.join(os.homedir(), '.mcopy/')
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

settings.save = function () {
	const str = JSON.stringify(settings.state, null, '\t');
	settings.checkDir()
	fs.writeFile(settings.file, str, 'utf8', (err) => {
		if (err) console.error(err);
	})
}
settings.update = function (key, val) {
	settings.state[key] = val
}

settings.get = function (key) {
	return settings.state[key]
}

settings.restore = function () {
	let str
	settings.checkDir()
	if (fs.existsSync(settings.file)) {
		str = fs.readFileSync(settings.file, 'utf8')
		settings.state = JSON.parse(str)
	} else {
		settings.save()
	}
}

module.exports = settings
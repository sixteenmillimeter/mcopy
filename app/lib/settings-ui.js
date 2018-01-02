'use strict'

const os = require('os');
const fs = require('fs');
const settings = {};

settings.file = `${os.homedir()}/.mcopy/settings.json`;
settings.state = {
	camera : {},
	projector : {},
	light : {}
}

settings.save = function () {
	const str = JSON.stringify(settings.state, null, '\t');
	fs.writeFile(settings.file, str, 'utf8', (err) => {
		if (err) console.error(err);
	});
}
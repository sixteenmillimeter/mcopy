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
	devices : [],
	camera : {},
	projector : {},
	light : {}
}

settings.checkDir = function () {
	'use strict'
	const dir = path.join(os.homedir(), '.mcopy/');
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

settings.save = function () {
	'use strict'
	const str = JSON.stringify(settings.state, null, '\t');
	settings.checkDir();
	fs.writeFile(settings.file, str, 'utf8', (err) => {
		if (err) console.error(err);
	})
}
settings.update = function (key, val) {
	'use strict'
	settings.state[key] = val;
}

settings.get = function (key) {
	'use strict'
	return settings.state[key];
}

settings.all = function () {
	'use strict'
	return settings.state;
}

settings.restore = function () {
	'use strict'
	let str;
	settings.checkDir();
	if (fs.existsSync(settings.file)) {
		str = fs.readFileSync(settings.file, 'utf8')
		settings.state = JSON.parse(str);
	} else {
		settings.save();
	}
}

settings.reset = function () {
	'use strict'
	if (fs.existsSync(settings.file)) {
		fs.unlinkSync(settings.file);
	}
	settings.restore();
};

module.exports = settings
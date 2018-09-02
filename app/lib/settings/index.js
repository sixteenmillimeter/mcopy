const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const settings = {};

settings.file = path.join(os.homedir(), `/.mcopy/settings.json`);
settings.state = {
	server : {
		port : 1111,
		enabled : true
	},
	devices : [],
	profile : 'mcopy',
	camera : {},
	projector : {},
	light : {}
}

settings.checkDir = async function () {
	'use strict';
	const dir = path.join(os.homedir(), '.mcopy/');
	const exists = await fs.exists(dir)
	if (!exists) {
		try {
			await fs.mkdir(dir);
		} catch (err) {
			if (err.code === 'EEXIST') return true
			console.error(err);
		}
	}
	return true
}

settings.save = async function () {
	'use strict';
	const str = JSON.stringify(settings.state, null, '\t');
	settings.checkDir();
	try {
		await fs.writeFile(settings.file, str, 'utf8');
	} catch (err) {
		console.error(err);
	}
}
settings.update = function (key, val) {
	'use strict';
	settings.state[key] = val;
}

settings.get = function (key) {
	'use strict';
	return settings.state[key];
}

settings.all = function () {
	'use strict';
	return settings.state;
}

settings.restore = async function () {
	'use strict';
	let exists;
	let str;

	settings.checkDir();
	exists = await fs.exists(settings.file);
	
	if (exists) {
		str = await fs.readFile(settings.file, 'utf8');
		settings.state = JSON.parse(str);
	} else {
		settings.save();
	}
}

settings.reset = async function () {
	'use strict';
	const exists = await fs.exists(settings.file);
	if (exists) {
		try {
			await fs.unlink(settings.file);
		} catch (err) {
			console.error(err);
		}
	}
	settings.restore();
};

module.exports = settings;
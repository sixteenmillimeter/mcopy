'use strict';

const log = require('log')({quiet : false})

function exit (msg, code = 0) {
	if (code === 0) {
		log.info(msg);
		process.exit();
	} else {
		log.error(msg);
		process.exit(code);
	}
}

module.exports = exit;
'use strict';

function exit (msg, code = 0) {
	if (code === 0) {
		console.log(msg);
		process.exit();
	} else {
		console.error(msg);
		process.exit(code);
	}
}

module.exports = exit;
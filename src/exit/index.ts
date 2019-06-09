'use strict';

/**
 * Exit process with either a 0 code or other
 * specified failure code. Print message to console first.
 *
 * @param {string}  msg 	Reason for exit
 * @param {integer} code 	process exit code, default 0
 **/

function exit (msg : string, code : number = 0) {
	if (code === 0) {
		console.log(msg);
		process.exit();
	} else {
		console.error(msg);
		process.exit(code);
	}
}

module.exports = exit;
'use strict';

/**
 * Delay in an async/await function
 *
 * @param {integer}  ms 	Milliseconds to delay for
 *
 * @returns {Promise} Promise to resolve after timeout
 **/

function delay (ms : number) {
	return new Promise((resolve : any) => {
		return setTimeout(resolve, ms);
	});
}

module.exports.delay = delay;
'use strict';

/**
 * Delay in an async/await function
 *
 * @param {integer}  ms 	Milliseconds to delay for
 *
 * @returns {Promise} Promise to resolve after timeout
 **/

export function delay (ms : number) : Promise<number> {
	return new Promise((resolve : any) => {
		return setTimeout(() => { resolve(ms) }, ms);
	});
}

module.exports = { delay };
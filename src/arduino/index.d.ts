/**
 * Delay in an async/await function
 *
 * @param {integer}  ms 	Milliseconds to delay for
 *
 * @returns {Promise} Promise to resolve after timeout
 **/
declare function delay(ms: number): Promise<unknown>;
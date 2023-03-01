'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
/**
 * Delay in an async/await function
 *
 * @param {integer}  ms 	Milliseconds to delay for
 *
 * @returns {Promise} Promise to resolve after timeout
 **/
function delay(ms) {
    return new Promise((resolve) => {
        return setTimeout(resolve, ms);
    });
}
exports.delay = delay;
module.exports = { delay };
//# sourceMappingURL=index.js.map
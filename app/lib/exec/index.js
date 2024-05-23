'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = require("child_process");
/**
 * Promisified child_process.exec
 *
 * @param cmd
 * @param arg
 * @param opts See child_process.exec node docs
 * @param {stream.Writable} opts.stdout If defined, child process stdout will be piped to it.
 * @param {stream.Writable} opts.stderr If defined, child process stderr will be piped to it.
 *
 * @returns {Promise<{ stdout: string, stderr: stderr }>}
 */
async function exec(...args) {
    let cmd = args[0];
    let argz = null;
    let opts = null;
    if (typeof args[1] === 'object' && Array.isArray(args[1])) {
        argz = args[1];
    }
    if (argz === null && typeof args[1] === 'object') {
        opts = args[1];
    }
    else if (typeof args[2] === 'object') {
        opts = args[2];
    }
    if (opts === null) {
        opts = { maxBuffer: 1024 * 1024 };
    }
    return new Promise((resolve, reject) => {
        const child = (0, child_process_1.exec)(cmd, opts, (err, stdout, stderr) => err ? reject(err) : resolve({
            stdout,
            stderr
        }));
        if (opts.stdout) {
            child.stdout.pipe(opts.stdout);
        }
        if (opts.stderr) {
            child.stderr.pipe(opts.stderr);
        }
    });
}
exports.exec = exec;
module.exports = { exec };
//# sourceMappingURL=index.js.map
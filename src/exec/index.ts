'use strict'

export const execRaw = require('child_process').exec

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
async function exec(...args : string[]) {
	let cmd : string = args[0]
	let argz : string = null
	let opts : any = null

	if (typeof args[1] === 'object' && Array.isArray(args[1])) {
		argz = args[1]
	}
	if (argz === null && typeof args[1] === 'object') {
		opts = args[1]
	} else if (typeof args[2] === 'object') {
		opts = args[2]
	}
	if (opts === null) {
		opts = { maxBuffer : 1024 * 1024 }
	}
    return new Promise((resolve, reject) => {
    	const child = execRaw(cmd, opts,
			(err : Error, stdout : string, stderr: string) => err ? reject(err) : resolve({
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

module.exports.exec = exec
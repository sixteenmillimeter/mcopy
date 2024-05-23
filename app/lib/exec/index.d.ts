interface ExecOutput {
    stdout: string;
    stderr: string;
}
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
export declare function exec(...args: string[]): Promise<ExecOutput>;
export type { ExecOutput };

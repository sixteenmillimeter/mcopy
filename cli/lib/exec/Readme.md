<a name="exec"></a>

## exec(cmd, arg, opts) ⇒ <code>Promise.&lt;{stdout: string, stderr: stderr}&gt;</code>
Promisified child_process.exec

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cmd |  |  |
| arg |  |  |
| opts |  | See child_process.exec node docs |
| opts.stdout | <code>stream.Writable</code> | If defined, child process stdout will be piped to it. |
| opts.stderr | <code>stream.Writable</code> | If defined, child process stderr will be piped to it. |


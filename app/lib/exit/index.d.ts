/**
 * Exit process with either a 0 code or other
 * specified failure code. Print message to console first.
 *
 * @param {string}  msg 	Reason for exit
 * @param {integer} code 	process exit code, default 0
 **/
declare function exit(msg: string, code?: number): void;

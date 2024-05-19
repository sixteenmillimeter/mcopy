import type { Logger } from 'winston';
/**
 * Create and return the logger transport based on settings determined in
 * arguments object
 *
 * @param {object} arg  	Arguments from process
 *
 * @returns {object} Logger transport
 **/
export declare function Log(arg: any): Promise<Logger>;

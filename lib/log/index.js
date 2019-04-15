'use strict';
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, colorize, simple, json } = format;
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const logTime = 'MM/DD/YY-HH:mm:ss';
let transport;
/**
 * Determine the location of the log file based on the operating system
 * and return as an absolute string from os.homedir()
 *
 * @returns {string} Path to log file
 **/
async function logFile() {
    const homeDir = os.homedir();
    const linuxDir = `/.config/mcopy/`;
    const macDir = `/Library/Logs/mcopy/`;
    const winDir = `/AppData/Roaming/mcopy/`;
    let logPath = path.join(homeDir, linuxDir);
    let exists;
    if (process.platform === 'darwin') {
        logPath = path.join(homeDir, macDir);
    }
    else if (process.platform === 'win32') {
        logPath = path.join(homeDir, winDir);
    }
    exists = await fs.exists(logPath);
    if (!exists) {
        await fs.mkdir(logPath);
    }
    return path.join(logPath, 'mcopy.log');
}
/**
 * Create and return the logger transport based on settings determined in
 * arguments object
 *
 * @param {object} arg  	Arguments from process
 *
 * @returns {object} Logger transport
 **/
module.exports = async function (arg) {
    let format;
    if (arg && arg.quiet) {
        transport = {
            info: function () { return false; },
            warn: function () { return false; },
            error: function () { return false; }
        };
    }
    else {
        if (arg && arg.label) {
            format = combine(label({ label: arg.label }), 
            //timestamp(),
            colorize(), simple());
        }
        else {
            format = combine(
            //timestamp(),
            colorize(), simple());
        }
        transport = createLogger({
            transports: [
                new (transports.Console)({
                    format
                }),
                new (transports.File)({
                    filename: await logFile(),
                    format: combine(label({ label: arg.label }), 
                    //timestamp(),
                    json())
                })
            ]
        });
    }
    return transport;
};
//# sourceMappingURL=index.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const winston_1 = require("winston");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const os_1 = require("os");
const logTime = 'MM/DD/YY-HH:mm:ss';
/**
 * Determine the location of the log file based on the operating system
 * and return as an absolute string from os.homedir()
 *
 * @returns {string} Path to log file
 **/
async function logFile() {
    const homeDir = (0, os_1.homedir)();
    const linuxDir = `/.mcopy/`;
    const macDir = `/Library/Logs/mcopy/`;
    const winDir = `/AppData/Roaming/mcopy/`;
    let logPath = (0, path_1.normalize)((0, path_1.join)(homeDir, linuxDir));
    let dirExists;
    if (process.platform === 'darwin') {
        logPath = (0, path_1.normalize)((0, path_1.join)(homeDir, macDir));
    }
    else if (process.platform === 'win32') {
        logPath = (0, path_1.normalize)((0, path_1.join)(homeDir, winDir));
    }
    try {
        dirExists = await (0, fs_extra_1.exists)(logPath);
    }
    catch (err) {
        console.error(err);
    }
    if (!dirExists) {
        try {
            await (0, fs_extra_1.mkdir)(logPath);
        }
        catch (err) {
            console.error(`Error creating directory for mcopy log file, ${logPath}`);
            console.error(err);
        }
    }
    return (0, path_1.join)(logPath, 'mcopy.log');
}
/**
 * Create and return the logger transport based on settings determined in
 * arguments object
 *
 * @param {object} arg  	Arguments from process
 *
 * @returns {object} Logger transport
 **/
async function Log(arg) {
    let transport;
    let consoleFormat = {
        colorize: true
    };
    let fileFormat = {
        filename: await logFile(),
        json: true
    };
    if (arg && arg.label) {
        consoleFormat.label = arg.label;
        fileFormat.label = arg.label;
    }
    transport = (0, winston_1.createLogger)({
        format: winston_1.format.combine(winston_1.format.label({ label: arg.label || 'mcopy' }), winston_1.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }), winston_1.format.printf((info) => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " "))),
        transports: [
            new (winston_1.transports.Console)(consoleFormat),
            new (winston_1.transports.File)(fileFormat)
        ]
    });
    return transport;
}
exports.Log = Log;
module.exports = { Log };
//# sourceMappingURL=index.js.map
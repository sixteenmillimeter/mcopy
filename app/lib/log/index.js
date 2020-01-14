'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const os_1 = require("os");
const logTime = 'MM/DD/YY-HH:mm:ss';
let transport;
/**
 * Determine the location of the log file based on the operating system
 * and return as an absolute string from os.homedir()
 *
 * @returns {string} Path to log file
 **/
async function logFile() {
    const homeDir = os_1.homedir();
    const linuxDir = `/.config/mcopy/`;
    const macDir = `/Library/Logs/mcopy/`;
    const winDir = `/AppData/Roaming/mcopy/`;
    let logPath = path_1.join(homeDir, linuxDir);
    let dirExists;
    if (process.platform === 'darwin') {
        logPath = path_1.join(homeDir, macDir);
    }
    else if (process.platform === 'win32') {
        logPath = path_1.join(homeDir, winDir);
    }
    dirExists = await fs_extra_1.exists(logPath);
    if (!dirExists) {
        await fs_extra_1.mkdir(logPath);
    }
    return path_1.join(logPath, 'mcopy.log');
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
    let consoleFormat = {
        colorize: true
    };
    let fileFormat = {
        filename: await logFile(),
        json: true
    };
    if (arg && arg.quiet) {
        transport = {
            info: function () { return false; },
            warn: function () { return false; },
            error: function () { return false; }
        };
    }
    else {
        if (arg && arg.label) {
            consoleFormat.label = arg.label;
            fileFormat.label = arg.label;
        }
        transport = winston_1.createLogger({
            format: winston_1.format.combine(winston_1.format.label({ label: arg.label || 'mcopy' }), winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }), winston_1.format.printf((info) => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " "))),
            transports: [
                new (winston_1.transports.Console)(consoleFormat),
                new (winston_1.transports.File)(fileFormat)
            ]
        });
    }
    return transport;
};
//# sourceMappingURL=index.js.map
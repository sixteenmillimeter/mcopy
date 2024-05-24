'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
const electron_1 = require("electron");
const log_1 = require("log");
/** @module lib/alert */
/**
 * Class for pushing an alert to the UI from the backend.
 */
class Alert {
    constructor(ui) {
        this.ipc = electron_1.ipcMain;
        this.id = 'alert';
        this.cb = null;
        this.ui = ui;
        this.init();
    }
    /**
     *
     **/
    async init() {
        this.log = await (0, log_1.Log)({ label: this.id });
        this.listen();
    }
    /**
     *
     **/
    listen() {
        this.ipc.on(this.id, this.listener.bind(this));
    }
    /**
     *
     **/
    async listener(event, arg) {
        if (this.cb !== null) {
            try {
                await this.cb(arg.state, arg.id);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        event.returnValue = true;
    }
    /**
     *
     **/
    async start(cmd) {
        const start = +new Date();
        const msg = (cmd + '').replace('ALERT', '').replace('Alert', '').replace('alert', '').trim();
        this.ui.send(this.id, { msg });
        return new Promise(function (resolve, reject) {
            this.cb = function () {
                const ms = (+new Date()) - start;
                return resolve(ms);
            };
        }.bind(this));
    }
}
exports.Alert = Alert;
module.exports = { Alert };
//# sourceMappingURL=index.js.map
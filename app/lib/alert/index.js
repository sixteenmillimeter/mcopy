'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/* class representing alert functionality */
class Alert {
    constructor(ui) {
        this.id = 'alert';
        this.cb = null;
        this.ui = ui;
        this.init();
    }
    /**
     *
     **/
    async init() {
        const Log = require('log');
        this.log = await Log({ label: this.id });
        this.ipc = require('electron').ipcMain;
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
module.exports = function (ui) {
    return new Alert(ui);
};
//# sourceMappingURL=index.js.map
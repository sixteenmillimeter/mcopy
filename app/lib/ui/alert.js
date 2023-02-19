'use strict';
let alertObj;
class Alert {
    constructor() {
        this.id = 'alert';
    }
    init() {
        this.listen();
    }
    start(msg) {
        alert(msg);
        this.end();
    }
    end() {
        const obj = {};
        ipcRenderer.sendSync(this.id, obj);
    }
    listen() {
        ipcRenderer.on(this.id, (function (event, arg) {
            this.start(arg.msg);
        }).bind(this));
    }
    ;
}
alertObj = new Alert();
module.exports = alertObj;
//# sourceMappingURL=alert.js.map
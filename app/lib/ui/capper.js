'use strict';
let capper;
class Capper {
    constructor() {
        this.queue = {};
        this.lock = false;
        this.id = 'capper';
        this.state = true;
    }
    init() {
        this.listen();
    }
    enable() {
        $('.capper').addClass('on');
    }
    set(state, callback) {
        let obj;
        if (this.lock) {
            return false;
        }
        obj = {
            state,
            id: uuid()
        };
        ipcRenderer.sendSync(this.id, obj);
        if (typeof callback !== 'undefined') {
            obj.callback = callback;
        }
        this.queue[obj.id] = obj;
        this.lock = true;
    }
    end(c, id, ms) {
        if (c === cfg.arduino.cmd.capper_on) {
            this.state = true;
        }
        else if (c === cfg.arduino.cmd.capper_off) {
            this.state = false;
        }
        if (typeof this.queue[id] !== 'undefined') {
            if (typeof this.queue[id].callback !== 'undefined') {
                this.queue[id].callback(ms);
            }
            delete this.queue[id];
            this.lock = false;
        }
    }
    listen() {
        ipcRenderer.on(this.id, function (event, arg) {
            capper.end(arg.cmd, arg.id, arg.ms);
            return event.returnValue = true;
        });
    }
    ;
}
capper = new Capper();
module.exports = capper;
//# sourceMappingURL=capper.js.map
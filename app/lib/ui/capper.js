'use strict';
let capper;
class Capper {
    constructor() {
        this.enabled = false;
        this.queue = {};
        this.lock = false;
        this.id = 'capper';
        this.state = false;
    }
    init() {
        this.listen();
    }
    enable() {
        $('.black').addClass('on');
        $('#cmd_black_forward').parent().removeClass('hide');
        $('#cmd_black_backward').parent().removeClass('hide');
        $('#cmd_capper_on').parent().removeClass('hide');
        $('#cmd_capper_off').parent().removeClass('hide');
        this.enabled = true;
    }
    capper(state, callback) {
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
        this.state = state;
        if (state) {
            $('#cmd_capper_on').addClass('active');
            $('#cmd_capper_off').removeClass('active');
        }
        else {
            $('#cmd_capper_off').addClass('active');
            $('#cmd_capper_on').removeClass('active');
        }
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
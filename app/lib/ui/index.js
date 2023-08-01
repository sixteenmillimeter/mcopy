/* jslint esversion: 6*/
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let gui;
class GUI {
    constructor() {
        this.id = 'gui';
        this.notifierWorking = true;
        this.spinnerCfg = {
            lines: 11,
            length: 15,
            width: 7,
            radius: 20,
            corners: 1,
            rotate: 0,
            direction: 1,
            color: '#F2F2F1',
            speed: 1,
            trail: 60,
            shadow: true,
            hwaccel: true,
            className: 'spinner',
            zIndex: 2e9,
            top: '50%',
            left: '50%' // Left position relative to parent
        };
    }
    init() {
        this.version();
        this.listen();
    }
    listen() {
        ipcRenderer.on(this.id, this.listener.bind(this));
    }
    listener(event, arg) {
        if (arg.notify) {
            this.notify(arg.notify.title, arg.notify.message);
        }
    }
    fmtZero(val, len) {
        const raw = val;
        let str = val + '';
        let output = '';
        if (raw < 0) {
            output = '-' + Array(len - (str.length - 1)).join('0') + str.replace('-', '');
        }
        else {
            if (str.length < len) {
                output = Array(len - str.length).join('0') + str;
            }
            else if (str.length >= len) {
                str = parseInt(str) + '';
                output = Array(len - str.length).join('0') + str;
            }
        }
        return output;
    }
    counterFormat(t, normal = null) {
        const raw = t.value;
        t.value = gui.fmtZero(raw, 6);
        if (typeof normal !== 'undefined' && parseInt(raw) !== normal) {
            $(t).addClass('changed');
        }
        else {
            $(t).removeClass('changed');
        }
    }
    counterUpdate(which, raw) {
        const formattedVal = this.fmtZero(raw, 6);
        $(`.${which} .count`).val(formattedVal);
    }
    notify(title, message) {
        const config = {
            title,
            message,
            //icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons) 
            sound: true,
            wait: true // Wait with callback, until user action is taken against notification 
        };
        if (!this.notifierWorking) {
            return new Promise((resolve, reject) => { return resolve(true); });
        }
        return new Promise((resolve, reject) => {
            try {
                notifier.notify(config, function (err, response) {
                    // Response is response from notification 
                    if (err) {
                        this.notifierWorking = false;
                        log.error(`Error with notification`, err);
                        return reject(err);
                    }
                    return resolve(true);
                }.bind(this));
            }
            catch (err) {
                this.notifierWorking = false;
                //notify-send is not found
                //determine an alternate for raspian
                //this feels like a hack
            }
        });
    }
    updateCam(t) {
        return __awaiter(this, void 0, void 0, function* () {
            const val = t.value;
            let change;
            if (parseInt(val) === cam.pos) {
                return false;
            }
            change = yield this.confirm(`Are you sure you want to set camera counter to ${val}?`);
            if (change) {
                cam.pos = parseInt(val);
                this.updateState();
            }
            else {
                t.value = cam.pos;
                this.counterFormat(t);
            }
        });
    }
    updateCam2(t) {
        return __awaiter(this, void 0, void 0, function* () {
            const val = t.value;
            let change;
            if (parseInt(val) === cam.pos) {
                return false;
            }
            change = yield this.confirm(`Are you sure you want to set second camera counter to ${val}?`);
            if (change) {
                cam.second.pos = parseInt(val);
                this.updateState();
            }
            else {
                t.value = cam.second.pos;
                this.counterFormat(t);
            }
        });
    }
    updateProj(t) {
        return __awaiter(this, void 0, void 0, function* () {
            const val = t.value;
            let change;
            if (parseInt(val) === proj.pos) {
                return false;
            }
            change = yield this.confirm(`Are you sure you want to set projector counter to ${val}?`);
            if (change) {
                proj.pos = parseInt(val);
                this.updateState();
            }
            else {
                t.value = proj.pos;
                this.counterFormat(t);
            }
            proj.setValue(t.value);
        });
    }
    updateProj2(t) {
        return __awaiter(this, void 0, void 0, function* () {
            const val = t.value;
            let change;
            if (parseInt(val) === proj.second.pos) {
                return false;
            }
            change = yield this.confirm(`Are you sure you want to set second projector counter to ${val}?`);
            if (change) {
                proj.second.pos = parseInt(val);
                this.updateState();
            }
            else {
                t.value = proj.second.pos;
                this.counterFormat(t);
            }
            proj.setValue(t.value);
        });
    }
    updateState() {
        const cpos = cam.pos;
        const ppos = proj.pos;
        const p2pos = proj.second.pos;
        const c2pos = cam.second.pos;
        $('#seq_cam_count').val(cpos).change();
        $('#seq_proj_count').val(ppos).change();
        $('#seq_cam_count_2').val(cpos).change();
        $('#seq_proj_count_2').val(ppos).change();
        $('#seq_cam_2_count').val(c2pos).change();
        $('#seq_proj_2_count').val(p2pos).change();
        $('#seq_cam_2_count_2').val(c2pos).change();
        $('#seq_proj_2_count_2').val(p2pos).change();
    }
    spinner(state, msg = null, progress = false, cancel = false) {
        let target;
        let spinner;
        if (msg && msg !== '') {
            this.spinnerMsg(msg);
        }
        if (state && !$('#spinner').hasClass('created')) {
            target = document.getElementById('spinner');
            spinner = new Spinner(this.spinnerCfg).spin(target);
            $('#spinnerProgress').hide();
            $('#spinner').addClass('created');
        }
        else if (state) {
            $('#spinner').show();
        }
        else if (!state) {
            $('#spinner').hide();
            this.spinnerMsg('');
        }
        if (progress) {
            $('#spinnerProgress').show();
        }
        else {
            $('#spinnerProgress').hide();
        }
        if (cancel) {
            $('#spinnerCancel').show();
        }
        else {
            $('#spinnerCancel').hide();
        }
    }
    spinnerMsg(msg) {
        $('#spinnerMsg').text(msg);
    }
    overlay(state) {
        if (state) {
            $('#overlay').show();
        }
        else {
            $('#overlay').hide();
        }
    }
    info(title, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                type: 'info',
                buttons: ['Ok'],
                title: title,
                message: message
            };
            return dialog.showMessageBox(config);
        });
    }
    confirm(message, cancel = 'Cancel') {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                buttons: ['Yes', cancel],
                message
            };
            const res = yield dialog.showMessageBox(config);
            return res.response === 0;
        });
    }
    choice(message, choices) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                buttons: choices,
                defaultId: 0,
                message
            };
            const res = yield dialog.showMessageBox(config);
            return res.response;
        });
    }
    warn(title, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                type: 'warning',
                buttons: ['Ok'],
                title,
                message
            };
            return dialog.showMessageBox(config);
        });
    }
    version() {
        $('#version').text(PACKAGE.version);
    }
    error() {
    }
}
gui = new GUI();
module.exports = gui;
//# sourceMappingURL=index.js.map
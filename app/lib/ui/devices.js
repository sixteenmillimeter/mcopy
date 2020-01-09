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
let devices;
class Devices {
    constructor() {
        this.id = 'devices';
    }
    init() {
        this.listen();
        this.profiles();
        gui.overlay(true);
        gui.spinner(true, 'Checking for connected devices...');
    }
    listen() {
        ipcRenderer.on('ready', this.ready.bind(this));
        ipcRenderer.on('intval', this.intvalCb.bind(this));
    }
    ready(event, arg) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.dir(arg)
            let opt;
            let devs = [];
            let notify = 'Connected to ';
            let p;
            //@ts-ignore
            yield delay(1000);
            try {
                gui.spinner(false);
                gui.overlay(false);
            }
            catch (err) {
                log.error(err);
            }
            for (let i in arg) {
                devs.push(arg[i].arduino);
                if (arg[i].arduino && arg[i].arduino !== '/dev/fake') {
                    if (notify === 'Connected to ') {
                        notify += arg[i].arduino + ' ';
                    }
                    else {
                        notify += `& ${arg[i].arduino}`;
                    }
                }
                opt = $('<option>');
                opt.val(`ARDUINO_${arg[i].arduino}`);
                opt.text(arg[i].arduino);
                $(`#${i}_device`).empty();
                $(`#${i}_device`).append(opt);
            }
            if (notify !== 'Connected to ') {
                gui.notify('DEVICES', notify);
            }
            else {
                gui.notify('DEVICES', 'Connected to mock devices');
            }
            if (devs.length > 0) {
                $('#devices').empty();
                for (let i of devs) {
                    opt = $('<option>');
                    opt.val(i);
                    opt.text(i);
                    $('#devices').append(opt);
                }
            }
            if (arg && arg.profile) {
                $('#profile').val(arg.profile);
                log.info(`Using configuration profile "${arg.profile}"`, 'DEVICES', true, true);
                p = cfg.profiles[arg.profile];
                if (typeof p.light !== 'undefined' && p.light === false) {
                    light.disable();
                }
                else {
                    light.enable();
                }
                //devices.profile(arg.profile)
            }
            seq.set(0, cfg.cmd.camera_forward);
            seq.set(1, cfg.cmd.projector_forward);
            grid.state(0);
            grid.state(1);
            seq.stats();
            if (arg.projector_second) {
                //add second row of projector pads to grid
                proj.second.enable();
            }
            if (arg.camera_second) {
                //add second row of camera pads to grid
                cam.second.enable();
            }
            return event.returnValue = true;
        });
    }
    profiles() {
        const keys = Object.keys(cfg.profiles);
        const elem = $('#profile');
        let opt;
        elem.empty();
        for (let key of keys) {
            opt = $('<option>');
            opt.val(key);
            opt.text(cfg.profiles[key].label);
            elem.append(opt);
        }
        elem.on('change', (t) => {
            const val = $('#profile').val();
            this.profile(val);
        });
    }
    profile(profile) {
        log.info(`Changed configuration profile to "${profile}"`, 'DEVICES', true, true);
        const p = cfg.profiles[profile];
        const keys = Object.keys(p);
        for (let key of keys) {
            cfg[key] = keys[key];
        }
        if (typeof p.light !== 'undefined' && p.light === false) {
            light.disable();
        }
        else {
            light.enable();
        }
        ipcRenderer.send('profile', { profile });
    }
    intval() {
        const url = $('#intval').val();
        let proceed = false;
        let obj = {
            connect: true,
            url: url
        };
        if (url !== '' && typeof url !== 'undefined') {
            proceed = confirm(`Are you sure you want to connect to INTVAL3 @ ${url}?`);
        }
        else {
            alert('Cannot connect to INTVAL3 url as entered.');
        }
        if (proceed) {
            gui.overlay(true);
            gui.spinner(true, `Connecting to INTVAL3 @ ${url}`);
            ipcRenderer.send('intval', obj);
        }
        else {
            $('#camera_type_arduino').prop('checked', 'checked');
            $('#intval').removeClass('active');
        }
    }
    intvalCb(evt, args) {
        let state;
        gui.spinner(false);
        gui.overlay(false);
        if (args.connected && args.connected === true) {
            //success state
            state = JSON.parse(args.state);
            cam.pos = state.counter;
            cam.dir = state.frame.dir;
            $('#intval').val(args.url);
            $('#intval').addClass('active');
            $('#camera_type_intval').prop('checked', 'checked');
            gui.notify('DEVICES', `Connected to INTVAL3 @ ${args.url}`);
            gui.updateState();
        }
        else {
            $('#camera_type_arduino').prop('checked', 'checked');
            $('#intval').removeClass('active');
        }
    }
}
devices = new Devices();
module.exports = devices;

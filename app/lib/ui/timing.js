'use strict';
let timing;
class Timing {
    constructor() {
        this.data = {};
        this.fromArduino = {
            'c': 'cam',
            '3': 'cam2',
            '4': 'cams',
            'b': 'black',
            'p': 'proj',
            'w': 'proj2',
            'x': 'projs'
        };
        this.fromCmd = {
            'CF': 'cam',
            'CB': 'cam',
            'BF': 'black',
            'BB': 'black',
            'C2F': 'cam2',
            'C2B': 'cam2',
            'CCF': 'cams',
            'CCB': 'cams',
            'CFCB': 'cams',
            'CBCF': 'cams',
            'PF': 'proj',
            'PB': 'proj',
            'P2F': 'proj2',
            'P2B': 'proj2',
            'PPF': 'projs',
            'PPB': 'projs',
            'PFPB': 'projs',
            'PBPF': 'projs'
        };
    }
    reset(profile) {
        const keys = Object.keys(profile);
        const cmds = Object.keys(cfg.cmd);
        let cam;
        let proj;
        let pad;
        for (let key of keys) {
            if (key === 'label') {
                continue;
            }
            else if (key === 'cam') {
                cam = 0;
                cam += profile[key].time;
                cam += profile[key].delay;
                cam += profile[key].momentary;
                pad = 0;
                if (typeof profile['black'] !== 'undefined' && typeof profile['black'].before !== 'undefined' && typeof profile['black'].after !== 'undefined') {
                    pad = (profile['black'].before + profile['black'].after);
                }
                this.data['cam'] = cam;
                this.data['cam2'] = cam;
                this.data['cams'] = cam;
                this.data['black'] = cam + pad;
            }
            else if (key === 'proj') {
                proj = 0;
                proj += profile[key].time;
                proj += profile[key].delay;
                proj += profile[key].momentary;
                this.data['proj'] = proj;
                this.data['proj2'] = proj;
                this.data['projs'] = proj;
            }
        }
    }
    restore(timing) {
        this.data = timing;
    }
    //update with rolling average
    update(c, ms) {
        let cmd = this.fromArduino[c];
        if (typeof cmd !== 'undefined' && typeof this.data[cmd] !== 'undefined') {
            this.data[cmd] = Math.round((this.data[cmd] + ms) / 2);
        }
    }
    //get current value
    get(c) {
        const cmd = this.fromCmd[c];
        if (typeof cmd !== 'undefined' && typeof this.data[cmd] !== 'undefined') {
            return this.data[cmd];
        }
        return 0;
    }
    store() {
        ipcRenderer.send('profile', { timing: this.data });
    }
}
timing = new Timing();
module.exports = timing;
//# sourceMappingURL=timing.js.map
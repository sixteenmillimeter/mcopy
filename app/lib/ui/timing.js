'use strict';
let timing;
class Timing {
    constructor() {
        this.data = {};
    }
    reset(profile) {
        const keys = Object.keys(profile);
        const cmds = Object.keys(cfg.cmd);
        let cam;
        let proj;
        for (let key of keys) {
            if (key === 'label') {
                continue;
            }
            else if (key === 'cam') {
                cam = 0;
                cam += profile[key].time;
                cam += profile[key].delay;
                for (let cmd of cmds) {
                    if (cmd.indexOf('camera') !== -1 || cmd.indexOf('black') !== -1) {
                        this.data[cfg.cmd[cmd]] = cam;
                    }
                }
            }
            else if (key === 'proj') {
                proj = 0;
                proj += profile[key].time;
                proj += profile[key].delay;
                for (let cmd of cmds) {
                    if (cmd.indexOf('projector') !== -1) {
                        this.data[cfg.cmd[cmd]] = proj;
                    }
                }
            }
        }
    }
    //update with rolling average
    update(cmd, ms) {
        if (typeof this.data[cmd] !== 'undefined') {
            this.data[cmd] = (this.data[cmd] + ms) / 2;
        }
    }
    //get current value
    get(cmd) {
        if (typeof this.data[cmd] !== 'undefined') {
            return this.data[cmd];
        }
        return 0;
    }
}
timing = new Timing();
module.exports = timing;
//# sourceMappingURL=timing.js.map
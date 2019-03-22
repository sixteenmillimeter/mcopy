'use strict';
let log;
let seq;
class Sequence {
    constructor(cfg, cmd) {
        this.cfg = cfg;
        this.cmd = cmd;
    }
    //currently called by ui
    init() {
    }
    //new
    start() {
    }
    //new
    pause() {
    }
    /**
     * Stop the sequence
     **/
    stop() {
        this.running = false;
    }
    exec() {
    }
    execStop() {
    }
    //private
    run() {
    }
    step() {
    }
}
module.exports = function (cfg, cmd, l) {
    log = l;
    seq = new Sequence(cfg, cmd);
};
//# sourceMappingURL=index.js.map
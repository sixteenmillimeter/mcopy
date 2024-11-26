'use strict';
let seq = {};
class Sequence {
    constructor() {
        this.id = 'sequence';
        this.grid = [];
        this.gridLoops = 1;
        this.arr = [];
        this.loops = 1;
        this.size = 24;
        this.time = 0;
        this.running = false;
    }
    init() {
        this.listen();
    }
    listen() {
        ipcRenderer.on(this.id, this.listener.bind(this));
    }
    listener(event, arg) {
        let timeStr;
        //console.log(JSON.stringify(arg))
        if (arg.start) {
            this.running = true;
            if (typeof arg.loop !== 'undefined' && typeof arg.step !== 'undefined') {
                this.activeStep(arg.step);
                log.info(`Step ${arg.step + 1}/${this.arr.length}, Loop ${arg.loop + 1}/${this.loops}`, 'SERIAL', true);
            }
            else if (typeof arg.loop !== 'undefined') {
                $('#loop_current').text(gui.fmtZero(arg.loop + 1, 6));
            }
            else {
                this.progress(0, 0);
            }
        }
        else if (arg.stop) {
            this.running = false;
            if (typeof arg.loop !== 'undefined' && typeof arg.step !== 'undefined') {
                //console.log(JSON.stringify(arg))
                this.progress(arg.step + 1, arg.loop);
                this.inactiveAll();
            }
            else if (typeof arg.loop !== 'undefined') {
                $('#loop_current').text('');
            }
            else {
                gui.overlay(false);
                gui.spinner(false);
                log.info('Sequence stopped', 'SERIAL', true);
                timeStr = (arg.ms < 2000) ? `${arg.ms}ms` : humanizeDuration(arg.ms);
                gui.notify(`SEQUENCE`, `Sequence finished in ${timeStr}`);
                if (capper.enabled && this.arr.some(this.hasCapper)) {
                    $('#cmd_capper_off').addClass('active');
                    $('#cmd_capper_on').removeClass('active');
                }
                this.stats();
                timing.store();
            }
        }
        return event.returnValue = true;
    }
    hasCapper(el) {
        if (['BF', 'BB'].indexOf(el.cmd) !== -1) {
            return true;
        }
    }
    progress(step, loop) {
        const elem = $('.progress-bar');
        const len = this.arr.length;
        const total = len * this.loops;
        let pos = (loop * len) + step;
        let progress = 0;
        if (pos > 0 && total > 0) {
            progress = (pos / total) * 100;
        }
        elem.attr('aria-valuenow', progress);
        elem.css('width', `${progress}%`);
    }
    activeStep(x) {
        const step = String(x);
        this.inactiveAll();
        $(`.row input[x=${step}]`).addClass('h');
        $(`#numbers div[x=${step}]`).addClass('h');
    }
    inactiveAll() {
        $('.row input').removeClass('h');
        $('#numbers div').removeClass('h');
    }
    stop() {
        ipcRenderer.send(this.id, { stop: true });
        $('#loop_current').text('');
    }
    //start the sequencer from the grid
    start() {
        this.time = +new Date();
        this.arr = JSON.parse(JSON.stringify(this.grid));
        this.loops = this.gridLoops + 0;
        ipcRenderer.send(this.id, { start: true });
    }
    //start a pre-set sequence, not using the gui
    exec(arr, loops) {
        this.time = +new Date();
        this.arr = arr;
        this.loops = loops;
        ipcRenderer.send(this.id, { start: true, arr, loops });
    }
    set(x, cmd) {
        let increase = 0;
        if (x >= this.grid.length + 1) {
            increase = x - this.grid.length;
            for (let i = 0; i < increase; i++) {
                this.grid.push({});
            }
        }
        if (!this.grid[x])
            this.grid[x] = {};
        this.grid[x].x = x;
        this.grid[x].cmd = cmd;
        if (cmd.indexOf('C') !== -1) {
            this.grid[x].light = light.color;
        }
        else {
            if (this.grid[x].light) {
                delete this.grid[x].light;
            }
        }
        //set
        ipcRenderer.send(this.id, { set: [this.grid[x]] });
        //update grid?
    }
    unsetAll() {
        const len = this.grid.length;
        const steps = [];
        for (let i = 0; i < len; i++) {
            if (typeof this.grid[i] !== 'undefined') {
                steps.push(i);
            }
        }
        ipcRenderer.send(this.id, { unset: steps });
        this.grid = [];
    }
    unset(x) {
        this.grid[x] = undefined; //revist this
        ipcRenderer.send(this.id, { unset: [x] });
    }
    /**
     * Set the light value at a specific step and then update
     * GUI grid via .state()
     *
     * @param {integer} x   Step in sequence
     * @param {array}   rgb Light value in RGB
     **/
    setLight(x, rgb) {
        let color = rgb.join(',');
        this.grid[x].light = color;
        ipcRenderer.send(this.id, { x, cmd: this.grid[x].cmd, light: color });
    }
    /**
     * Function bound to the change event on the loop counter
     * input element
     *
     * @param  {integer}  count 	Integer to set loops to
     */
    setLoops(count) {
        this.gridLoops = count;
        this.stats();
        ipcRenderer.send(this.id, { loops: this.gridLoops });
    }
    stats() {
        let ms = 0;
        let c = '';
        let cam_total = 0;
        let proj_total = 0;
        let real_total = this.grid.filter((elem) => {
            if (elem == undefined) {
                return false;
            }
            return true;
        });
        //timing
        for (let step of this.grid) {
            if (!step)
                continue;
            c = step.cmd;
            ms += timing.get(c);
            if (c === cfg.cmd.camera_forward || c === cfg.cmd.black_forward) {
                cam_total++;
            }
            if (c === cfg.cmd.camera_backward || c === cfg.cmd.black_backward) {
                cam_total--;
            }
            if (c === cfg.cmd.projector_forward) {
                proj_total++;
            }
            if (c === cfg.cmd.projector_backward) {
                proj_total--;
            }
        }
        //timing
        ms = ms * this.gridLoops;
        if (ms < 2000) {
            $('#seq_stats .timing span').text(ms + 'ms');
        }
        else {
            $('#seq_stats .timing span').text(humanizeDuration(ms));
        }
        //ending frames
        cam_total = cam_total * this.gridLoops;
        proj_total = proj_total * this.gridLoops;
        $('#seq_stats .cam_end span').text(gui.fmtZero(cam.pos + cam_total, 6));
        $('#seq_stats .proj_end span').text(gui.fmtZero(proj.pos + proj_total, 6));
        //count
        $('#seq_stats .seq_count span').text(real_total.length * this.gridLoops);
        return ms;
    }
    clear() {
        this.size = 24;
        this.unsetAll();
        this.progress(0, 0);
    }
    cancel() {
        gui.spinner(true, `Cancelling sequence...`);
        this.stop();
    }
    isRunning() {
        return this.running;
    }
}
seq = new Sequence();
module.exports = seq;
//# sourceMappingURL=seq.js.map
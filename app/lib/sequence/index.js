'use strict';
let log;
let seq;
//var seq = {};
/******
    Sequence Object

seq.i = 0;
seq.time = 0;
seq.stopState = false;

mcopy.loop = 1; //
mcopy.loopCount = 0;

seq.queue = [];
seq.running = false;
seq.state = {};

*******/
/**
 * Run the sequence

seq.run = function () {
    'use strict';
    var c = mcopy.state.sequence.arr[seq.i],
        timeEnd = 0,
        rgb,
    action = function () {
        setTimeout(function () {
            seq.i++;
            seq.run();
        }, mcopy.cfg.arduino.sequenceDelay);
    }
    if (seq.i == 0) {
        $('#loop_current').text(gui.fmtZero(mcopy.loopCount + 1, 6));
        ipcRenderer.send('seq', { action : 'loop' });
    }
    if (seq.stop()) {
        $('.row input').removeClass('h');
        $('#numbers div').removeClass('h');
        log.info('Sequence stopped', 'SERIAL', true);
        return false;
    }
    if (seq.i <= mcopy.state.sequence.arr.length && c !== undefined) {
        log.info('Step ' + seq.i + ' command ' + c, 'SEQUENCE', true);
        //gui action
        $('.row input').removeClass('h');
        $('#numbers div').removeClass('h');
        $('.row input[x=' + seq.i + ']').addClass('h');
        $('#numbers div[x=' + seq.i + ']').addClass('h');
        if (c === 'CF'){
            rgb = mcopy.state.sequence.light[seq.i].split(',');
            cmd.cam_forward(rgb, action);
        } else if (c === 'CB') {
            rgb = mcopy.state.sequence.light[seq.i].split(',');
            cmd.cam_backward(rgb, action);
        } else if (c === 'PF') {
            cmd.proj_forward(action);
        } else if (c === 'PB') {
            cmd.proj_backward(action);
        } else if (c === 'BF') {
            cmd.black_forward(action);
        } else if (c === 'BB') {
            cmd.black_backward(action);
        }
    } else {
        mcopy.loopCount++;
        $('#loop_current').text(gui.fmtZero(mcopy.loopCount + 1, 6));
        if (mcopy.loopCount < mcopy.loop) {
            log.info('Loop ' + mcopy.loopCount + ' completed', 'SEQUENCE', true);
            $('.row input').removeClass('h');
            $('#numbers div').removeClass('h');
            seq.i = 0;
            seq.run();
        } else {
            timeEnd = +new Date();
            timeEnd = timeEnd - seq.time;
            if (timeEnd < 2000) {
                log.info('Sequence completed in ' + timeEnd + 'ms', 'SEQUENCE', true);
            } else {
                log.info('Sequence completed in ' + humanizeDuration(timeEnd), 'SEQUENCE', true);
            }
            ipcRenderer.send('seq', { action : 'stop' });
            gui.notify('Sequence done!', (mcopy.state.sequence.arr.length * mcopy.loop) + ' actions completed in ' + humanizeDuration(timeEnd));
            //clear gui
            $('.row input').removeClass('h');
            $('#numbers div').removeClass('h');
            $('#loop_current').text('');
            seq.stats();
        }
    }
};
seq.stop = function (state) {
    'use strict';
    if (typeof state === 'undefined') {
        if (seq.stopState === true) {
            ipcRenderer.send('seq', { action : 'stop' });
        }
        return seq.stopState;
    } else {
        seq.stopState = state;
    }
    if (state === false) {
        mcopy.loopCount = 0
        $('#loop_current').text('');
    } else {
        ipcRenderer.send('seq', { action : 'stop' });
    }
    return state
};
seq.init = function (start) {
    'use strict';
    if (typeof start === 'undefined') {
        start = 0;
        mcopy.loopCount = 0;
        seq.time = +new Date();
    }
    seq.stop(false);
    seq.i = start;

    ipcRenderer.send('seq', { action : 'start' });
    seq.run();
};
//!!! redo
seq.stats = function () {
    'use strict';
    var ms = 0,
        c = '',
        cam_total = 0,
        proj_total = 0,
        real_total = mcopy.state.sequence.arr.filter(function (elem) {
            if (elem === undefined) {
                return false;
            }
            return true;
        });

    //timing
    for (var i = 0; i < mcopy.state.sequence.arr.length; i++) {
        c = mcopy.state.sequence.arr[i];
        if (c === 'CF' || c === 'CB'){
            ms += mcopy.cfg.arduino.cam.time;
            ms += mcopy.cfg.arduino.cam.delay;
            ms += mcopy.cfg.arduino.serialDelay;
        }
        if (c === 'PF' || c === 'PB'){
            ms += mcopy.cfg.arduino.proj.time;
            ms += mcopy.cfg.arduino.proj.delay;
            ms += mcopy.cfg.arduino.serialDelay;
        }
        if (c === 'BF' || c === 'BB'){
            ms += mcopy.cfg.arduino.black.before;
            ms += mcopy.cfg.arduino.black.after;
            ms += mcopy.cfg.arduino.cam.time;
            ms += mcopy.cfg.arduino.cam.delay;
            ms += mcopy.cfg.arduino.serialDelay;
        }
        ms += mcopy.cfg.arduino.sequenceDelay;

        if (c === 'CF' || c === 'BF') {
            cam_total++;
        }
        if (c === 'CB' || c === 'BB') {
            cam_total--;
        }
        if (c === 'PF') {
            proj_total++;
        }
        if (c === 'PB') {
            proj_total--;
        }
    }

    //timing
    ms = ms * mcopy.loop;
    if (ms < 2000) {
        $('#seq_stats .timing span').text(ms + 'ms');
    } else {
        $('#seq_stats .timing span').text(humanizeDuration(ms));
    }

    //ending frames
    cam_total = cam_total * mcopy.loop;
    proj_total = proj_total * mcopy.loop;

    $('#seq_stats .cam_end span').text(gui.fmtZero(mcopy.state.camera.pos + cam_total, 6));
    $('#seq_stats .proj_end span').text(gui.fmtZero(mcopy.state.projector.pos + proj_total, 6));

    //count
    $('#seq_stats .seq_count span').text(real_total.length * mcopy.loop);
    return ms;
};
seq.clear = function () {
    'use strict';
    mcopy.state.sequence.size = 24;
    mcopy.state.sequence.arr = [];
};
seq.exec = function (arr) {
    'use strict';
    seq.running = true;
    seq.state.len = arr.length;
    //setup queue
    seq.queue = arr;
    //console.dir(arr);
    gui.overlay(true);
    gui.spinner(true, `Running sequence of ${arr.length} frame${(arr.length === 1 ? '' : 's')}`, 0);
    log.info(`Sequence started`, 'SEQUENCE', true);
    seq.step();
};

seq.execStop = function (msg) {
    'use strict';
    gui.overlay(false);
    gui.spinner(false);
    log.info(`Sequence ${msg}`, 'SEQUENCE', true);
    return false;
};

seq.step = function () {
    'use strict';
    let elem;
    let c;
    let rgb;
    let current;
    let max;

    if (!seq.running) {
        return seq.execStop('stopped');
    }

    return setTimeout(() => {
        elem = seq.queue.shift();
        if (typeof elem !== 'undefined') {
            c = elem.cmd;
            if (typeof elem.light !== 'undefined') {
                rgb = elem.light.split(',');
            } else {
                rgb = light.color;
            }
        } else {
            return seq.execStop('completed');
        }
        if (typeof elem !== 'undefined') {
            current = seq.state.len - seq.queue.length;
            max = seq.state.len;
            gui.spinner(true, `Sequence: step ${c} ${current}/${max}`, (current / max) * 100);
            log.info(`Sequence: step ${c} ${current}/${max}`, 'SEQUENCE', true);
            if (c === 'CF'){
                cmd.cam_forward(rgb, seq.step);
            } else if (c === 'CB') {
                cmd.cam_backward(rgb, seq.step);
            } else if (c === 'PF') {
                cmd.proj_forward(seq.step);
            } else if (c === 'PB') {
                cmd.proj_backward(seq.step);
            } else if (c === 'BF') {
                cmd.black_forward(seq.step);
            } else if (c === 'BB') {
                cmd.black_backward(seq.step);
            }
        }
    }, mcopy.cfg.arduino.sequenceDelay);
};

// FROM SERVER SIDE
proj.state = {
    dir : true, //default dir
    digital : false
}
proj.init = function () {
    proj.listen()
}
proj.set = async function (dir, id) {
    let cmd
    let ms
    if (dir) {
        cmd = mcopy.cfg.arduino.cmd.proj_forward
    } else {
        cmd = mcopy.cfg.arduino.cmd.proj_backward
    }
    proj.state.dir = dir
    if (proj.state.digital) {
        dig.set(dir)
    } else {
        try {
            ms = await arduino.send('projector', cmd)
        } catch (err) {
            console.error(err)
        }
    }
    return await proj.end(cmd, id, ms)
}
proj.move = async function (frame, id) {
    const cmd = mcopy.cfg.arduino.cmd.projector
    let ms
    if (proj.digital) {
        try {
            ms = await dig.move()
        } catch (err) {
            console.error(err)
        }
    } else {
        try {
            ms = await arduino.send('projector', cmd)
        } catch (err) {
            console.error(err)
        }
    }
    return await proj.end(mcopy.cfg.arduino.cmd.projector, id, ms)
}
proj.listen = function () {
    ipcMain.on('proj', async (event, arg) => {
        if (typeof arg.dir !== 'undefined') {
            try {
                await proj.set(arg.dir, arg.id)
            } catch (err) {
                console.error(err)
            }
        } else if (typeof arg.frame !== 'undefined') {
            try {
                await proj.move(arg.frame, arg.id)
            } catch (err) {
                console.error(err)
            }
        } else if (typeof arg.val !== 'undefined') {
            dig.state.frame = arg.val
        }
        event.returnValue = true
    })
    ipcMain.on('digital', proj.connectDigital)
}
proj.end = async function (cmd, id, ms) {
    let message = ''
    if (cmd === mcopy.cfg.arduino.cmd.proj_forward) {
        message = 'Projector set to FORWARD'
    } else if (cmd === mcopy.cfg.arduino.cmd.proj_backward) {
        message = 'Projector set to BACKWARD'
    } else if (cmd === mcopy.cfg.arduino.cmd.projector) {
        message = 'Projector '
        if (proj.state.dir) {
            message += 'ADVANCED'
        } else {
            message += 'REWOUND'
        }
        message += ' 1 frame'
    }
    log.info(message, 'PROJECTOR', true, true)
    return await mainWindow.webContents.send('proj', {cmd: cmd, id : id, ms: ms})
}
proj.connectDigital = async function (evt, arg) {
    let info;
    let frames = 0;

    try {
        info = await ffprobe.info(arg.path);
    } catch (err) {
        log.error(err, 'DIGITAL', true, true);
        proj.digital = false;
        await mainWindow.webContents.send('digital', { valid : false });
        return false;
    }
    try {
        frames = await ffprobe.frames(arg.path);
    } catch (err) {
        log.error(err, 'DIGITAL', true, true);
        proj.digital = false;
        await mainWindow.webContents.send('digital', { valid : false });
        return false;
    }

    dig.state.frame = 0;
    dig.state.path = arg.path;
    dig.state.fileName = arg.fileName;
    dig.state.frames = frames;
    dig.state.info = info;

    //console.dir(dig.state);

    log.info(`Opened ${dig.state.fileName}`, 'DIGITAL', true, true);
    log.info(`Frames : ${frames}`, 'DIGITAL', true, true);
    proj.digital = true;
    return await mainWindow.webContents.send('digital', { valid : true, state : JSON.stringify(dig.state) });
}

const dig = {};
dig.state = {
    frame : 0,
    frames : 0,
    path : null,
    fileName : null,
    info : {},
    dir : true
};

dig.set  = function (dir) {
    dig.state.dir = dir;
}

dig.move = async function () {
    let start = +new Date()
    let last = dig.state.dir + 0;
    if (dig.state.dir) {
        dig.state.frame++
    } else {
        dig.state.frame--
    }
    if (dig.state.frame < 1) {
        dig.state.frame = 1
    }
    return (+new Date()) - start
}

dig.start = async function () {
    try {
        await ffmpeg.clearAll()
    } catch (err) {
        console.error(err)
    }
    
    try {
        await ffmpeg.frame(dig.state, light.state)
    } catch (err) {
        console.error(err)
    }

    display.start(dig.state.frame)
    await delay(20)
}

dig.end = async function () {
    await delay(20)
    display.end()
}

cam.intval = null
cam.state = {
    dir : true //default dir
}
cam.init = function () {
    cam.listen()
}
cam.set = async function (dir, id) {
    let cmd
    let ms
    if (dir) {
        cmd = mcopy.cfg.arduino.cmd.cam_forward
    } else {
        cmd = mcopy.cfg.arduino.cmd.cam_backward
    }
    cam.state.dir = dir

    if (cam.intval) {
        try {
            ms = await cam.intval.setDir(dir)
        } catch (err) {
            console.error(err)
        }
    } else {
        try {
            ms = await arduino.send('camera', cmd)
        } catch (err) {
            console.error(err)
        }
    }
    return await cam.end(cmd, id, ms)
}

cam.move = async function (frame, id) {
    const cmd = mcopy.cfg.arduino.cmd.camera
    let ms
    if (proj.digital) {
        await dig.start()
    }
    if (cam.intval) {
        try {
            ms = await cam.intval.move()
        } catch (err) {
            console.error(err)
        }
    } else {
        try {
            ms = await arduino.send('camera', cmd)
        } catch (err) {
            console.error(err)
        }
    }
    if (proj.digital) {
        await dig.end()
    }
    log.info('Camera move time', { ms })
    return cam.end(cmd, id, ms)
}

cam.exposure = function (exposure, id) {
    let cmd = 'E'
    cam.intval.setExposure('camera', exposure, ms => {
        cam.end(cmd, id, ms)
    })
}

cam.connectIntval = async function (event, arg) {
    return new Promise((resolve, reject) => {
        if (arg.connect) {
            cam.intval = new Intval(arg.url)
            cam.intval.connect((err, ms, state) => {
                if (err) {
                    mainWindow.webContents.send('intval', { connected : false })
                    log.info(`Cannot connect to ${arg.url}`, 'INTVAL', true, true)
                    cam.intval = null
                    delete cam.intval
                } else {
                    mainWindow.webContents.send('intval', { connected : true, url : arg.url, state : state })
                    log.info(`Connected to INTVAL3 @ ${arg.url}`, 'INTVAL', true, true)
                    settings.update('camera', { intval : arg.url })
                    settings.save()
                    dev.remember('intval', arg.url, 'camera')
                }
                return resolve(true)
            })
        } else if (arg.disconnect) {
            cam.intval = null
            return resolve(false)
        }
    })
}

cam.listen = function () {
    ipcMain.on('cam', async (event, arg) => {
        if (typeof arg.dir !== 'undefined') {
            try {
                await cam.set(arg.dir, arg.id)
            } catch (err) {
                console.error(err)
            }
        } else if (typeof arg.frame !== 'undefined') {
            try {
                await cam.move(arg.frame, arg.id)
            } catch (err) {
                console.error(err)
            }
        }
        event.returnValue = true
    })
    ipcMain.on('intval', cam.connectIntval)
}
cam.end = async function (cmd, id, ms) {
    var message = ''
    if (cmd === mcopy.cfg.arduino.cmd.cam_forward) {
        message = 'Camera set to FORWARD'
    } else if (cmd === mcopy.cfg.arduino.cmd.cam_backward) {
        message = 'Camera set to BACKWARD'
    } else if (cmd === mcopy.cfg.arduino.cmd.camera) {
        message = 'Camera '
        if (cam.state.dir) {
            message += 'ADVANCED'
        } else {
            message += 'REWOUND'
        }
        message += ' 1 frame'
    }
    log.info(message, 'CAMERA', true, true)
    mainWindow.webContents.send('cam', {cmd: cmd, id : id, ms: ms})
};

const seq = {};
seq.init = function () {
    seq.listen();
}

seq.listen = function () {
    ipcMain.on('seq', async (evt, arg) => {
        if (arg.action === 'stop' && proj.digital) {
            display.end()
        }
    })
}

 */
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
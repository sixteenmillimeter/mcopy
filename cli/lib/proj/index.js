/** class representing the Projector features **/
class Projector {
    /**
     *
     **/
    constructor(arduino, cfg, ui, dig) {
        this.state = { dir: true, digital: false };
        this.arduino = null;
        this.arduino = arduino;
        this.cfg = cfg;
        this.ui = ui;
        this.dig = dig;
        this.init();
    }
    /**
     *
     **/
    async init() {
        this.log = await require('log')({ label: 'proj' });
        this.ipc = require('electron').ipcMain;
        this.listen();
    }
    /**
     *
     **/
    listen() {
        this.ipc.on('proj', this.listener.bind(this));
        this.ipc.on('digital', this.connectDigital.bind(this));
    }
    /**
     *
     **/
    async set(dir, id) {
        let cmd;
        let ms;
        if (dir) {
            cmd = this.cfg.arduino.cmd.proj_forward;
        }
        else {
            cmd = this.cfg.arduino.cmd.proj_backward;
        }
        this.state.dir = dir;
        if (this.state.digital) {
            //this.dig.set(dir)
        }
        else {
            try {
                ms = await this.arduino.send('projector', cmd);
            }
            catch (err) {
                this.log.error('Error setting projector direction', err);
            }
        }
        return await this.end(cmd, id, ms);
    }
    /**
     *
     **/
    async move(frame, id) {
        const cmd = this.cfg.arduino.cmd.projector;
        let ms;
        if (this.state.digital) {
            try {
                //ms = await this.dig.move()
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else {
            try {
                ms = await this.arduino.send('projector', cmd);
            }
            catch (err) {
                this.log.error('Error moving projector', err);
            }
        }
        this.log.info('Projector move time', { ms });
        return await this.end(this.cfg.arduino.cmd.projector, id, ms);
    }
    /**
     *
     **/
    async listener(event, arg) {
        if (typeof arg.dir !== 'undefined') {
            try {
                await this.set(arg.dir, arg.id);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else if (typeof arg.frame !== 'undefined') {
            try {
                await this.move(arg.frame, arg.id);
            }
            catch (err) {
                this.log.error(err);
            }
        }
        else if (typeof arg.val !== 'undefined') {
            this.dig.state.frame = arg.val;
        }
        event.returnValue = true;
    }
    /**
     *
     **/
    async end(cmd, id, ms) {
        let message = '';
        if (cmd === this.cfg.arduino.cmd.proj_forward) {
            message = 'Projector set to FORWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.proj_backward) {
            message = 'Projector set to BACKWARD';
        }
        else if (cmd === this.cfg.arduino.cmd.projector) {
            message = 'Projector ';
            if (this.state.dir) {
                message += 'ADVANCED';
            }
            else {
                message += 'REWOUND';
            }
            message += ' 1 frame';
        }
        this.log.info(message, 'PROJECTOR');
        return await this.ui.send('proj', { cmd: cmd, id: id, ms: ms });
    }
    /**
     * Use a file as the "digital" source on "projector"
     *
     **/
    async connectDigital(evt, arg) {
        let info;
        let frames = 0;
        try {
            info = await this.dig.ffprobe.info(arg.path);
        }
        catch (err) {
            this.log.error(err, 'DIGITAL', true, true);
            this.state.digital = false;
            await this.ui.send('digital', { valid: false });
            return false;
        }
        try {
            frames = await this.dig.ffprobe.frames(arg.path);
        }
        catch (err) {
            this.log.error(err, 'DIGITAL', true, true);
            this.state.digital = false;
            await this.ui.send('digital', { valid: false });
            return false;
        }
        this.dig.state.frame = 0;
        this.dig.state.path = arg.path;
        this.dig.state.fileName = arg.fileName;
        this.dig.state.frames = frames;
        this.dig.state.info = info;
        this.log.info(`Opened ${this.dig.state.fileName}`, 'DIGITAL', true, true);
        this.log.info(`Frames : ${frames}`, 'DIGITAL', true, true);
        this.state.digital = true;
        return await this.ui.send('digital', { valid: true, state: JSON.stringify(this.dig.state) });
    }
}
module.exports = function (arduino, cfg, ui, dig) {
    return new Projector(arduino, cfg, ui, dig);
};
//# sourceMappingURL=index.js.map
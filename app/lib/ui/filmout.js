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
/**
 * Determine the greatest common denominator
 */
function gcd(a, b) {
    if (b === 0)
        return a;
    return gcd(b, a % b);
}
/**
 * Reduce a numerator and denominator to it's smallest, integer ratio using Euclid's Algorithm
 */
function reduceRatio(numerator, denominator) {
    // from: http://pages.pacificcoast.net/~cazelais/euclid.html
    let temp;
    let divisor;
    if (!isInteger(numerator) || !isInteger(denominator))
        return '? : ?';
    if (numerator === denominator)
        return '1 : 1';
    // make sure numerator is always the larger number
    if (+numerator < +denominator) {
        temp = numerator;
        numerator = denominator;
        denominator = temp;
    }
    divisor = gcd(+numerator, +denominator);
    return 'undefined' === typeof temp ? (numerator / divisor) + ' : ' + (denominator / divisor) : (denominator / divisor) + ' : ' + (numerator / divisor);
}
/**
 * Determine whether a value is an integer (ie. only numbers)
 */
function isInteger(value) {
    return /^[0-9]+$/.test(value);
}
let filmout;
class FilmOut {
    constructor() {
        this.id = 'filmout';
        this.extensions = ['.mpg', '.mpeg', '.mov', '.mkv', '.avi', '.mp4',
            '.gif',
            '.tif', '.tiff', '.png', '.jpg', '.jpeg', '.bmp'];
        this.displays = [];
        this.state = {
            frame: 0,
            display: null
        };
    }
    init() {
        this.listen();
    }
    listen() {
        ipcRenderer.on(this.id, this.onFilmout.bind(this));
        ipcRenderer.on('system', this.onSystem.bind(this));
        ipcRenderer.on('preview_frame', this.onFrame.bind(this));
        ipcRenderer.on('pre_export', this.onPreExport.bind(this));
        ipcRenderer.on('pre_export_progress', this.onPreExportProgress.bind(this));
    }
    onSystem(evt, args) {
        let option;
        for (let display of args.displays) {
            this.displays.push(display);
            option = $('<option>');
            option.val(display.id);
            option.text(display.name);
            if (display.primary) {
                this.setDisplay(display.id);
            }
            $('#filmout_displays').append(option);
        }
        if (args.displays.length > 1) {
            $('#filmout_displays').on('change', this.onChange.bind(this));
        }
        $('#filmout_position').on('change', this.previewFrame.bind(this));
    }
    onChange() {
        const val = $('#filmout_displays').val();
        this.setDisplay(val);
    }
    setDisplay(id) {
        const maxW = 800;
        const maxH = 360;
        const display = this.displays.find((elem) => {
            if (elem.id == id)
                return true;
        });
        let scale = display.height / maxH;
        const w = display.width / scale;
        const elem = $('#filmout_monitor');
        const aspect = reduceRatio(display.width, display.height);
        let h;
        let top;
        if (w > maxW) {
            scale = display.width / maxW;
            h = display.height / scale;
            top = Math.floor((maxH - h) / 2);
            elem.height(h);
            elem.width(maxW - 4);
            elem.css('top', `${top}px`);
        }
        else {
            elem.width(w);
            elem.height(maxH - 4);
            elem.css('top', `0px`);
        }
        elem.addClass('on');
        $('#filmout_stats_monitor_size').text(`${display.width} x ${display.height}`);
        $('#filmout_stats_monitor_aspect').text(`${aspect}`);
        $('#filmout_stats_monitor_scale').text(`${parseFloat(display.scale).toFixed(1)} scale factor`);
        //console.dir(display);
        this.state.display = id;
        ipcRenderer.send('display', { display: id });
    }
    selectFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const elem = $('#digital');
            const options = {
                title: `Select video or image sequence`,
                properties: [`openFile`],
                defaultPath: 'c:/',
                filters: [
                    {
                        name: 'All Files',
                        extensions: ['*']
                    },
                ]
            };
            let files;
            let valid = false;
            let pathStr;
            let displayName;
            let ext;
            try {
                files = yield dialog.showOpenDialog(options);
            }
            catch (err) {
                log.error(err);
                return false;
            }
            if (!files)
                return false;
            pathStr = files.filePaths[0];
            console.dir(pathStr);
            if (pathStr && pathStr !== '') {
                ext = path.extname(pathStr.toLowerCase());
                valid = this.extensions.indexOf(ext) === -1 ? false : true;
                log.info(pathStr);
                if (!valid) {
                    return false;
                }
                log.info(`Selected video ${pathStr.split('/').pop()}`, 'FILMOUT', true);
                elem.attr('data-file', pathStr);
                displayName = pathStr.split('/').pop();
                elem.val(displayName);
                $('#filmout_file').val(displayName);
                this.useFile();
            }
        });
    }
    useFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const elem = $('#digital');
            const filePath = elem.attr('data-file');
            const fileName = elem.val();
            let proceed = false;
            let obj = {
                path: filePath,
                fileName
            };
            if (filePath && filePath !== '') {
                proceed = yield gui.confirm(`Are you sure you want to use ${fileName}?`);
            }
            else {
                this.selectFile();
            }
            if (proceed) {
                gui.overlay(true);
                gui.spinner(true, `Getting info about ${fileName}`);
                ipcRenderer.send('filmout', obj);
            }
            else {
                $('#projector_type_digital').prop('checked', 'checked');
                $('#digital').removeClass('active');
            }
            //cancel video
        });
    }
    //callback after
    onFilmout(evt, args) {
        let state;
        let color = [255, 255, 255];
        gui.spinner(false);
        gui.overlay(false);
        if (args.valid && args.valid === true) {
            state = JSON.parse(args.state);
            $('#digital').addClass('active');
            $('#projector_type_digital').prop('checked', 'checked');
            gui.notify('FILMOUT', `Using video ${state.fileName}`);
            seq.set(0, 'PF');
            grid.state(0);
            seq.set(1, 'CF');
            seq.setLight(1, color);
            grid.state(1);
            if (light.disabled) {
                //light.enable();
            }
            //console.dir(state);
            this.state.frame = 0;
            this.state.frames = state.frames;
            this.state.seconds = state.seconds;
            this.state.fps = state.fps;
            this.state.width = state.info.width;
            this.state.height = state.info.height;
            this.state.name = state.fileName;
            this.state.path = state.path;
            $('#seq_loop').val(`${state.frames - 1}`).trigger('change');
            $('#filmout_stats_video_name').text(state.fileName);
            $('#filmout_stats_video_size').text(`${state.info.width} x ${state.info.height}`);
            $('#filmout_stats_video_frames').text(`${state.frames} frames`);
            gui.updateState();
            this.previewFrame();
            this.preExport();
        }
        else {
            $('#projector_type_digital').prop('checked', 'checked');
            $('#digital').removeClass('active');
        }
    }
    previewFrame() {
        const frameStr = $('#filmout_position').val();
        const frame = parseInt(frameStr, 10);
        this.state.frame = frame;
        ipcRenderer.send('preview_frame', { frame });
    }
    onFrame(evt, args) {
        const elem = $('#filmout');
        elem[0].style.backgroundImage = `url('${args.path}')`;
        elem.addClass('on');
    }
    preExport() {
        return __awaiter(this, void 0, void 0, function* () {
            let proceed = false;
            if (this.state.path && this.state.path !== '') {
                proceed = yield gui.confirm(`Export all frames of ${this.state.name}? This may take a while, but will allow filmout sequences to run faster.`);
            }
            if (proceed) {
                gui.overlay(true);
                gui.spinner(true, `Exporting frames of ${this.state.name}`, true, false);
                ipcRenderer.send('pre_export', { state: this.state });
            }
        });
    }
    onPreExport(evt, args) {
        if (args.completed && args.completed === true) {
            gui.notify('FILMOUT', `Exported frames of ${this.state.name}`);
            log.info(`Exported frames of ${this.state.name}`, 'FILMOUT', true);
        }
        else {
            log.info('onPreExport Error');
            log.error(JSON.stringify(args));
        }
        gui.overlay(false);
        gui.spinner(false);
    }
    onPreExportProgress(evt, args) {
        const elem = $('.progress-bar');
        let progress = 0;
        if (args.progress.progress) {
            progress = args.progress.progress * 100;
        }
        elem.attr('aria-valuenow', progress);
        elem.css('width', `${progress}%`);
        gui.spinner(true, `Exporting frames of ${this.state.name} in ${humanizeDuration(Math.round(args.progress.estimated) * 1000)}`, true, false);
    }
    advance() {
        this.state.frame++;
        if (this.state.frame >= this.state.frames) {
            this.state.frame = 0;
        }
        $('#filmout_position').val(this.state.frame).trigger('change');
    }
    rewind() {
        this.state.frame--;
        if (this.state.frame < 0) {
            this.state.frame = this.state.frames - 1;
        }
        $('#filmout_position').val(this.state.frame).trigger('change');
    }
    preview() {
        const frame = this.state.frame;
        ipcRenderer.send('preview', { frame });
    }
    focus() {
        ipcRenderer.send('focus', { focus: true });
    }
    field() {
        let ratio = null;
        if (this.state.name) {
            ratio = this.state.width / this.state.height;
        }
        ipcRenderer.send('field', { field: true, ratio });
    }
    meter() {
        ipcRenderer.send('meter', { meter: true });
    }
    close(evt, arg) {
    }
}
filmout = new FilmOut();
module.exports = filmout;
//# sourceMappingURL=filmout.js.map
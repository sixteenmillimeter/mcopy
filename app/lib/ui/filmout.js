'use strict';
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
        this.displays = [];
    }
    init() {
        this.listen();
    }
    listen() {
        ipcRenderer.on(this.id, this.onFilmout.bind(this));
        ipcRenderer.on('system', this.onSystem.bind(this));
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
            elem.css('margin-top', `${top}px`);
        }
        else {
            elem.width(w);
        }
        elem.addClass('on');
        $('#filmout_stats_monitor_size').text(`${display.width}x${display.height}`);
        $('#filmout_stats_monitor_aspect').text(`${aspect}`);
        console.dir(display);
    }
    selectFile() {
        const elem = $('#digital');
        const extensions = ['mpg', 'mpeg', 'mov', 'mkv', 'avi', 'mp4'];
        dialog.showOpenDialog({
            title: `Select video or image sequence`,
            properties: [`openFile`],
            defaultPath: 'c:/',
            filters: [
                {
                    name: 'All Files',
                    extensions: ['*']
                },
            ]
        }, (files) => {
            if (!files)
                return false;
            let valid = false;
            let path = files[0];
            let displayName;
            if (path && path !== '') {
                for (let ext of extensions) {
                    if (path.toLowerCase().indexOf(`.${ext}`) !== -1) {
                        valid = true;
                    }
                }
                if (!valid)
                    return false;
                log.info(`Selected video ${path.split('/').pop()}`, 'DIGITAL', true);
                elem.attr('data-file', path);
                displayName = path.split('/').pop();
                elem.val(displayName);
                $('#filmout_file').val(displayName);
            }
        });
    }
    useFile() {
        const elem = $('#digital');
        const path = elem.attr('data-file');
        const fileName = elem.val();
        let proceed = false;
        let obj = {
            path,
            fileName
        };
        if (path && path !== '') {
            proceed = confirm(`Are you sure you want to use ${fileName}?`);
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
    }
    onFilmout(evt, args) {
        let state;
        let color = [255, 255, 255];
        gui.spinner(false);
        gui.overlay(false);
        if (args.valid && args.valid === true) {
            //success state
            state = JSON.parse(args.state);
            console.dir(args);
            console.dir(state);
            $('#digital').addClass('active');
            $('#projector_type_digital').prop('checked', 'checked');
            gui.notify('DEVICES', `Using video ${state.fileName}`);
            seq.set(0, 'PF');
            grid.state(0);
            seq.set(1, 'CF');
            seq.setLight(1, color);
            grid.state(1);
            if (light.disabled) {
                light.enable();
            }
            $('#seq_loop').val(`${state.frames - 1}`).trigger('change');
            $('#filmout_stats_video_name').text(state.fileName);
            $('#filmout_stats_video_size').text(`${state.info.width}x${state.info.height}`);
            $('#filmout_stats_video_frames').text(`${state.frames} frames`);
            gui.updateState();
        }
        else {
            $('#projector_type_digital').prop('checked', 'checked');
            $('#digital').removeClass('active');
        }
    }
}
filmout = new FilmOut();
module.exports = filmout;

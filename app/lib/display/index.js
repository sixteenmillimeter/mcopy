'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module display
 * Provides features for displaying a full screen display of images for the digital module.
 **/
const spawn = require("spawn");
const path_1 = require("path");
const delay_1 = require("delay");
const { BrowserWindow } = require('electron');
function padded_frame(i) {
    let len = (i + '').length;
    let str = i + '';
    for (let x = 0; x < 5 - len; x++) {
        str = '0' + str;
    }
    return str;
}
class WebView {
    constructor() {
        this.opened = false;
        this.showing = false;
        this.digitalWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: false,
                'unsafe-eval': false
            },
            width: 800,
            height: 600,
            minWidth: 800,
            minHeight: 600 //,
            //icon: path.join(__dirname, '../../assets/icons/icon.png')
        });
        this.digitalWindow.loadURL('file://' + __dirname + '../../../display.html');
        if (process.argv.indexOf('-d') !== -1 || process.argv.indexOf('--dev') !== -1) {
            this.digitalWindow.webContents.openDevTools();
        }
        this.digitalWindow.on('closed', () => {
            this.digitalWindow = null;
            this.close();
        });
        this.digitalWindow.hide();
    }
    async open() {
        this.digitalWindow.show();
        this.showing = true;
        this.opened = true;
        await this.digitalWindow.setFullScreen(true);
        await delay_1.delay(300);
    }
    async show(src) {
        if (!this.digitalWindow) {
            console.warn(`Cannot show "${src}" because window does not exist`);
            return false;
        }
        try {
            this.digitalWindow.webContents.send('display', { src });
        }
        catch (err) {
            console.error(err);
        }
        this.showing = true;
        await delay_1.delay(100);
        return true;
    }
    hide() {
        if (this.digitalWindow) {
            this.digitalWindow.hide();
        }
        this.showing = false;
        return true;
    }
    close() {
        this.hide();
        if (this.digitalWindow) {
            this.digitalWindow.close();
            this.digitalWindow = null;
        }
        this.opened = false;
        this.showing = false;
        return true;
    }
}
class EOG {
    constructor() {
    }
    open() {
        this.hide();
    }
    async show(src) {
        //timeout 3 eog --fullscreen ${src}
        this.cp = spawn('eog', ['--fullscreen', src]);
        await delay_1.delay(200);
        return true;
    }
    hide() {
        if (this.cp) {
            this.cp.kill();
            this.cp = null;
        }
    }
    close() {
        this.hide();
    }
}
class Display {
    constructor(sys) {
        this.platform = sys.platform;
        this.tmpdir = path_1.join(sys.tmp, 'mcopy_digital');
    }
    async open() {
        //if (this.platform !== 'nix') {
        if (!this.wv || !this.wv.opened) {
            this.wv = new WebView();
            await this.wv.open();
        }
        //} else {
        //	if (!this.eog) {
        //		this.eog = new EOG()
        //	}
        //}
    }
    async show(frame) {
        let padded = padded_frame(frame);
        let ext = 'tif';
        let tmppath;
        //if (this.platform !== 'nix') {
        ext = 'png';
        //}
        tmppath = path_1.join(this.tmpdir, `export-${padded}.${ext}`);
        //if (this.platform !== 'nix') {
        await this.wv.show(tmppath);
        //} else {
        //await this.eog.show(tmppath);
        //}
    }
    hide() {
        //if (this.platform !== 'nix') {
        //don't hide between frames
        //this.wv.hide();
        //} else {
        //this.eog.hide();
        //}
    }
    close() {
        //if (this.platform !== 'nix') {
        this.wv.close();
        //} else {
        //this.eog.close()
        //}
    }
}
module.exports = function (sys) {
    return new Display(sys);
};
//# sourceMappingURL=index.js.map
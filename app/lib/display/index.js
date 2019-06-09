'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const spawn = require("spawn");
const delay_1 = require("delay");
const { BrowserWindow } = require('electron');
let wv;
let cp;
let system = {};
let TMPDIR;
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
        });
        this.digitalWindow.hide();
    }
    async open() {
        this.digitalWindow.show();
        this.showing = true;
        this.opened = true;
    }
    async start() {
        await this.open();
        await this.fullScreen();
        await delay_1.delay(300);
    }
    async fullScreen() {
        //this.digitalWindow.setFullScreen(true);
        await this.digitalWindow.maximize();
    }
    setImage(src) {
        try {
            this.digitalWindow.webContents.send('display', { src });
        }
        catch (err) {
            console.error(err);
        }
    }
    setMeter() {
        this.digitalWindow.webContents.send('display', { meter: true });
    }
    setGrid() {
        this.digitalWindow.webContents.send('display', { grid: true });
    }
    hide() {
        if (this.digitalWindow) {
            this.digitalWindow.hide();
        }
        this.showing = false;
    }
    close() {
        if (this.digitalWindow) {
            this.digitalWindow.close();
            this.digitalWindow = null;
        }
        this.showing = false;
        this.opened = false;
        return true;
    }
    async move() {
    }
}
function padded_frame(i) {
    let len = (i + '').length;
    let str = i + '';
    for (let x = 0; x < 5 - len; x++) {
        str = '0' + str;
    }
    return str;
}
async function display_eog(src) {
    //timeout 3 eog --fullscreen ${src}
    cp = spawn('eog', ['--fullscreen', src]);
    await delay_1.delay(200);
}
function display_wv(src) {
    wv.setImage(src);
}
async function hide() {
    if (system.platform !== 'nix') {
        //wv.hide();
    }
    else {
        if (cp)
            cp.kill();
    }
}
async function show(frame) {
    let padded = padded_frame(frame);
    let ext = 'tif';
    let tmppath;
    if (system.platform !== 'nix') {
        ext = 'png';
    }
    tmppath = path.join(TMPDIR, `export-${padded}.${ext}`);
    if (system.platform !== 'nix') {
        await open();
        display_wv(tmppath);
    }
    else {
        await display_eog(tmppath);
    }
}
async function open() {
    if (system.platform !== 'nix') {
        if (!wv || !wv.opened) {
            wv = new WebView();
            await wv.start();
        }
    }
    else {
        //
    }
}
async function close() {
    if (system.platform !== 'nix') {
        wv.close();
    }
    else {
        if (cp)
            cp.kill();
    }
}
module.exports = function (sys) {
    system = sys;
    TMPDIR = path.join(system.tmp, 'mcopy_digital');
    return {
        open,
        show,
        hide,
        close
    };
};
//# sourceMappingURL=index.js.map
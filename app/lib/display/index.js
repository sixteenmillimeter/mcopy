'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module display
 * Provides features for displaying a full screen display of images for the digital module.
 **/
const path_1 = require("path");
const url_1 = require("url");
const delay_1 = require("delay");
const { BrowserWindow } = require('electron');
class WebView {
    constructor(platform, display) {
        this.opened = false;
        this.showing = false;
        this.loadWait = {};
        const prefs = {
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: false,
                enableRemoteModule: true
            },
            width: 800,
            height: 600,
            minWidth: 800,
            minHeight: 600 //,
            //icon: path.join(__dirname, '../../assets/icons/icon.png')
        };
        const pagePath = path_1.normalize(path_1.join(__dirname, '../../display.html'));
        const pageUrl = url_1.format({
            pathname: pagePath,
            protocol: 'file:'
        });
        if (!display.primary) {
            prefs.x = display.x + 50;
            prefs.y = display.y + 50;
        }
        this.digitalWindow = new BrowserWindow(prefs);
        this.digitalWindow.loadURL(pageUrl);
        if (process.argv.indexOf('-d') !== -1 || process.argv.indexOf('--dev') !== -1) {
            this.digitalWindow.webContents.openDevTools();
        }
        this.digitalWindow.on('closed', () => {
            this.digitalWindow = null;
            this.close();
        });
        //this.digitalWindow.hide();
        this.platform = platform;
        this.display = display;
        this.ipc = require('electron').ipcMain;
        this.ipc.on('display_load', this.onLoad.bind(this));
    }
    async open() {
        this.digitalWindow.show();
        this.showing = true;
        this.opened = true;
        await this.digitalWindow.setFullScreen(true);
        await delay_1.delay(300);
        if (this.platform === 'osx') {
            await delay_1.delay(300); //give macs an extra 300ms to open fullscreen
        }
    }
    async show(src) {
        const normalSrc = path_1.normalize(path_1.join(src));
        if (!this.digitalWindow) {
            console.warn(`Cannot show "${src}" because window does not exist`);
            return false;
        }
        try {
            this.digitalWindow.webContents.send('display', { src: normalSrc });
        }
        catch (err) {
            console.error(err);
        }
        this.showing = true;
        return new Promise(function (resolve) {
            this.loadWait[src] = resolve;
        }.bind(this));
    }
    onLoad(evt, arg) {
        if (this.loadWait[arg.src]) {
            this.loadWait[arg.src]();
            delete this.loadWait[arg.src];
        }
    }
    async focus() {
        if (!this.digitalWindow) {
            console.warn(`Cannot show focus screen because window does not exist`);
            return false;
        }
        await delay_1.delay(500);
        try {
            this.digitalWindow.webContents.send('focus', { focus: true });
        }
        catch (err) {
            console.error(err);
        }
    }
    async field(ratio) {
        if (!this.digitalWindow) {
            console.warn(`Cannot show field guide because window does not exist`);
            return false;
        }
        await delay_1.delay(500);
        try {
            this.digitalWindow.webContents.send('field', { field: true, ratio });
        }
        catch (err) {
            console.error(err);
        }
    }
    async meter() {
        if (!this.digitalWindow) {
            console.warn(`Cannot show meter screen because window does not exist`);
            return false;
        }
        await delay_1.delay(500);
        try {
            this.digitalWindow.webContents.send('meter', { meter: true });
        }
        catch (err) {
            console.error(err);
        }
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
class Display {
    constructor(sys) {
        this.platform = sys.platform;
        this.displays = sys.displays;
        this.tmpdir = path_1.join(sys.tmp, 'mcopy_digital');
        this.display = this.displays.find((display) => {
            if (display.primary)
                return true;
        });
    }
    async open() {
        if (this.wv && this.wv.display && this.wv.display.id !== this.display.id) {
            this.wv.close();
        }
        if (!this.wv || !this.wv.opened) {
            this.wv = new WebView(this.platform, this.display);
            await this.wv.open();
        }
    }
    async show(src) {
        await this.wv.show(src);
    }
    async showPath(pathStr) {
        return await this.wv.show(pathStr);
    }
    hide() {
    }
    async close() {
        return await this.wv.close();
    }
    async focus() {
        return await this.wv.focus();
    }
    async field(ratio) {
        return await this.wv.field(ratio);
    }
    async meter() {
        return await this.wv.meter();
    }
    change(id) {
        this.display = this.displays.find((display) => {
            if (display.id == id)
                return true;
        });
    }
}
module.exports = function (sys) {
    return new Display(sys);
};
//# sourceMappingURL=index.js.map
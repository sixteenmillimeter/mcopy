"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const events_1 = require("events");
const path_1 = require("path");
const settings_1 = require("settings");
const system_1 = require("system");
const log_1 = require("log");
const arduino_1 = require("arduino");
const cam_1 = require("cam");
const proj_1 = require("proj");
const light_1 = require("light");
const capper_1 = require("capper");
const alert_1 = require("alert");
const display_1 = require("display");
const filmout_1 = require("filmout");
const ffmpeg_1 = require("ffmpeg");
const ffprobe_1 = require("ffprobe");
const devices_1 = require("devices");
const cmd_1 = require("cmd");
const sequencer_1 = require("sequencer");
const server_1 = require("server");
require('@electron/remote/main').initialize();
const ee = new events_1.EventEmitter();
//Objects
const mcopy = {};
let SYSTEM;
let settings;
let log;
let mainWindow;
let arduino;
let menu;
let display;
let ffmpeg;
let ffprobe;
let cam;
let cam2;
let proj;
let proj2;
let light;
let filmout;
let dev;
let cmd;
let seq;
let capper;
let alert;
let server;
const cfg = require('./data/cfg.json');
function createMenu() {
    const template = require('./data/menu.json');
    menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
function createWindow() {
    const windowOptions = {
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        icon: (0, path_1.join)(__dirname, 'assets/icons/icon.png'),
        skipTaskbar: true,
        //toolbar: false,	
        webPreferences: {
            nodeIntegration: true,
            //enableRemoteModule: true,
            contextIsolation: false
        }
    };
    mainWindow = new electron_1.BrowserWindow(windowOptions);
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    if (process.argv.indexOf('-d') !== -1 || process.argv.indexOf('--dev') !== -1) {
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.setMenu(null);
        mainWindow.setAutoHideMenuBar(true);
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    require('@electron/remote/main').enable(mainWindow.webContents);
}
var errorState = function () {
    if (seq && seq.isRunning()) {
        //pause sequence if running
        seq.pause();
    }
    mainWindow.webContents.send('error_state', { stop: true });
};
var init = async function () {
    log = await (0, log_1.Log)({ label: 'mcopy' });
    createWindow();
    createMenu();
    try {
        SYSTEM = await (0, system_1.system)(mainWindow.webContents);
    }
    catch (err) {
        console.error(err);
    }
    settings = new settings_1.Settings();
    await settings.restore();
    display = new display_1.Display(SYSTEM);
    ffmpeg = new ffmpeg_1.FFMPEG(SYSTEM);
    ffprobe = new ffprobe_1.FFPROBE(SYSTEM);
    arduino = new arduino_1.Arduino(cfg, ee, errorState);
    dev = new devices_1.Devices(arduino, settings, mainWindow);
    server = new server_1.Server(mainWindow.webContents);
    light = new light_1.Light(arduino, cfg, mainWindow.webContents);
    filmout = new filmout_1.FilmOut(display, server, ffmpeg, ffprobe, mainWindow.webContents, light);
    cam = new cam_1.Camera(arduino, cfg, mainWindow.webContents, filmout);
    proj = new proj_1.Projector(arduino, cfg, mainWindow.webContents, filmout);
    alert = new alert_1.Alert(mainWindow.webContents);
    try {
        await dev.enumerate();
    }
    catch (err) {
        log.error('Error enumerating connected devices', err);
    }
    if (dev && dev.connected && dev.connected.camera_second) {
        cam2 = new cam_1.Camera(arduino, cfg, mainWindow.webContents, filmout, true);
    }
    if (dev && dev.connected && dev.connected.projector_second) {
        proj2 = new proj_1.Projector(arduino, cfg, mainWindow.webContents, filmout, true);
    }
    if (dev && dev.connected && dev.connected.capper) {
        capper = new capper_1.Capper(arduino, cfg, mainWindow.webContents, filmout);
    }
    cmd = new cmd_1.Commands(cfg, proj, cam, light, alert, cam2, proj2, capper);
    seq = new sequencer_1.Sequencer(cfg, cmd, mainWindow.webContents);
};
electron_1.app.on('ready', init);
electron_1.app.on('window-all-closed', () => {
    electron_1.app.quit();
});
electron_1.app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
mcopy.relaunch = function () {
    electron_1.app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) });
    electron_1.app.exit(0);
};
//# sourceMappingURL=main.js.map
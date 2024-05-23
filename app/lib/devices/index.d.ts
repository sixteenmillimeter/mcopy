import type { Settings } from 'settings';
import type { Arduino } from 'arduino';
import type { BrowserWindow } from 'electron';
interface Device {
    serial: string;
    device: string;
}
/**
 * class representing the device discovery features
 *
 *
 **/
export declare class Devices {
    settings: Settings;
    connected: any;
    private arduino;
    private log;
    private ui;
    private ipc;
    private mainWindow;
    /**
     * Constructor assigns arduino, settings, UI browser window and cam objects
     * locally to this class for reference.
     **/
    constructor(arduino: Arduino, settings: Settings, mainWindow: BrowserWindow);
    /**
     * Initialize the log for "devices". Establish an ipc connection to the UI.
     * Start listening on that ipc connection.
     **/
    private init;
    /**
     * Listen to the "profile" channel for messages from the UI.
     **/
    private listen;
    /**
     * The "profile" channel callback. If a profile is changed, set it in the
     * local settings object.
     **/
    private listener;
    /**
     *
     **/
    enumerate(): Promise<boolean>;
    /**
     *
     **/
    private favor;
    /**
     *
     **/
    private distinguish;
    /**
     *
     **/
    private fakeProjector;
    /**
     *
     **/
    private fakeCamera;
    /**
     *
     **/
    private fakeLight;
    /**
     *
     **/
    private fakeCapper;
    /**
     *
     **/
    private connectDevice;
    /**
     *
     **/
    private all;
    /**
     *
     **/
    private remember;
    /**
     *
     **/
    private ready;
}
export type { Device };

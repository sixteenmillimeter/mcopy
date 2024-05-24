import type { WebContents } from 'electron';
/** @module lib/alert */
/**
 * Class for pushing an alert to the UI from the backend.
 */
export declare class Alert {
    private ipc;
    private log;
    private id;
    private cb;
    private ui;
    constructor(ui: WebContents);
    /**
     *
     **/
    private init;
    /**
     *
     **/
    private listen;
    /**
     *
     **/
    private listener;
    /**
     *
     **/
    start(cmd: string): Promise<number>;
}

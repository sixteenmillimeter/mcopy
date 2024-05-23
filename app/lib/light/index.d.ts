import type { Arduino } from 'arduino';
export declare class Light {
    state: any;
    private arduino;
    private cfg;
    private ui;
    private log;
    private ipc;
    private enabled;
    private id;
    /**
     *
     **/
    constructor(arduino: Arduino, cfg: any, ui: any);
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
    set(rgb: number[], id: string, on?: boolean): Promise<any>;
    /**
     *
     **/
    private end;
}

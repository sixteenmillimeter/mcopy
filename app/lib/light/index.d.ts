import type { Arduino } from 'arduino';
import type { Config } from 'cfg';
import type { WebContents } from 'electron';
interface LightState {
    color: number[];
}
export declare class Light {
    state: LightState;
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
    constructor(arduino: Arduino, cfg: Config, ui: WebContents);
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
    set(rgb: number[], id: string, on?: boolean): Promise<number>;
    /**
     *
     **/
    private end;
}
export type { LightState };

import type { FilmOut } from 'filmout';
import type { Arduino } from 'arduino';
import type { WebContents } from 'electron';
/** class representing capper functions **/
export declare class Capper {
    private state;
    private arduino;
    private log;
    private cfg;
    private filmout;
    private ui;
    private ipc;
    private id;
    /**
     *
     **/
    constructor(arduino: Arduino, cfg: any, ui: WebContents, filmout: FilmOut);
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
    capper(state: boolean, id: string): Promise<number>;
    /**
     *
     **/
    private listener;
    /**
     *
     **/
    private end;
}

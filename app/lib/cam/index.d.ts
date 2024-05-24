import type { Arduino } from 'arduino';
import type { FilmOut } from 'filmout';
import type { Config } from 'cfg';
import type { WebContents } from 'electron';
interface CameraState {
    pos: number;
    dir: boolean;
    capper: boolean;
}
/** class representing camera functions **/
export declare class Camera {
    state: CameraState;
    arduino: Arduino;
    private intval;
    private processing;
    private log;
    private cfg;
    private filmout;
    private ui;
    private ipc;
    private id;
    /**
     *
     **/
    constructor(arduino: Arduino, cfg: Config, ui: WebContents, filmout: FilmOut, second?: boolean);
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
    set(dir: boolean, id: string): Promise<number>;
    /**
     *
     **/
    cap(state: boolean, id: string): Promise<number>;
    /**
     *
     **/
    move(id: string): Promise<number>;
    both(id: string): Promise<number>;
    /**
     *
     **/
    exposure(exposure: number, id: string): Promise<number>;
    /**
     *
     **/
    private connectIntval;
    /**
     *
     **/
    private connectProcessing;
    /**
     *
     **/
    private listener;
    /**
     *
     **/
    private end;
}
export {};

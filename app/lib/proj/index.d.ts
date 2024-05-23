/** class representing the Projector features **/
import type { Arduino } from 'arduino';
import type { FilmOut } from 'filmout';
interface ProjectorState {
    pos: number;
    dir: boolean;
}
export declare class Projector {
    state: ProjectorState;
    arduino: Arduino;
    private log;
    private cfg;
    private ui;
    private ipc;
    filmout: FilmOut;
    private id;
    /**
     *
     **/
    constructor(arduino: Arduino, cfg: any, ui: any, filmout: any, second?: boolean);
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
    set(dir: boolean, id: string): Promise<any>;
    /**
     *
     **/
    move(id: string): Promise<any>;
    both(id: string): Promise<any>;
    /**
     *
     **/
    private listener;
    /**
     *
     **/
    end(cmd: string, id: string, ms: number): Promise<any>;
}
export type { ProjectorState };

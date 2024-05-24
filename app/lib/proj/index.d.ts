/** class representing the Projector features **/
import type { Arduino } from 'arduino';
import type { FilmOut } from 'filmout';
import type { Config } from 'cfg';
import type { WebContents } from 'electron';
interface ProjectorState {
    pos: number;
    dir: boolean;
}
/** @module lib/proj */
/**
 * Class representing all projector features.
 */
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
    move(id: string): Promise<number>;
    both(id: string): Promise<number>;
    /**
     *
     **/
    private listener;
    /**
     *
     **/
    end(cmd: string, id: string, ms: number): Promise<number>;
}
export type { ProjectorState };

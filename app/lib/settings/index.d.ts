export declare class Settings {
    private file;
    private defaultState;
    state: any;
    /**
     *
     **/
    constructor();
    private exists;
    private freshState;
    /**
     *
     **/
    private checkDir;
    /**
     *
     **/
    save(): Promise<void>;
    /**
     *
     **/
    update(key: string, val: any): void;
    /**
     *
     **/
    get(key: string): any;
    /**
     *
     **/
    all(): any;
    /**
     *
     **/
    restore(): Promise<void>;
    /**
     *
     **/
    reset(): Promise<void>;
}

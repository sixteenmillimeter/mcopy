export declare class Alert {
    private ipc;
    private log;
    private id;
    private cb;
    private ui;
    constructor(ui: any);
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

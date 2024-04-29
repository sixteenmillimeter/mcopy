export declare class Intval {
    private _baseUrl;
    private req;
    constructor(url: string);
    move(): Promise<unknown>;
    setDir(dir: boolean): Promise<unknown>;
    setExposure(exposure: number, cb: Function): Promise<unknown>;
    connect(cb: Function): void;
}

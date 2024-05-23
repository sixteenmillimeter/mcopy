export declare class Intval {
    private _baseUrl;
    constructor(url: string);
    move(): Promise<number>;
    setDir(dir: boolean): Promise<number>;
    setExposure(exposure: number, cb: Function): Promise<number>;
    connect(cb: Function): void;
}

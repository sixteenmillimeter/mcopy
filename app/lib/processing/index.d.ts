export declare class Processing {
    private _baseUrl;
    constructor(url: string);
    move(): Promise<number>;
    setDir(dir: boolean): Promise<number>;
}

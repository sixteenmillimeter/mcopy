interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}
export default class Frame {
    static info(imagePath: string): Promise<{
        width: any;
        height: any;
    }>;
    static solidColor(width: number, height: number, color: RGBA): Promise<unknown>;
    static blend(inPath: any, color: RGBA, imagePath: string): Promise<string>;
}
export {};

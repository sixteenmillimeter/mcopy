interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}
/** @module lib/frame */
/**
 * Class representing the static Frame module.
 */
export declare class Frame {
    static info(imagePath: string): Promise<{
        width: any;
        height: any;
    }>;
    static solidColor(width: number, height: number, color: RGBA): Promise<unknown>;
    static blend(inPath: any, color: RGBA, imagePath: string): Promise<string>;
}
export type { RGBA };

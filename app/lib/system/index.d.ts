interface Dependencies {
    ffmpeg?: string;
    ffprobe?: string;
    eog?: string;
}
interface Display {
    name: string;
    id: number;
    width: number;
    height: number;
    x: number;
    y: number;
    scale: number;
    primary: boolean;
}
interface System {
    deps: Dependencies;
    displays: Display[];
    tmp: string;
    platform: string;
}
/**
 * Profile the current system and return an object with
 * data about the displays and dependencies for the digital
 * projector feature.
 *
 * @returns {object} Object containing system information
 */
export declare function system(ui: any): Promise<System>;
export type { System, Display, Dependencies };

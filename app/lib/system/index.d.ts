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
export type { System, Display, Dependencies };

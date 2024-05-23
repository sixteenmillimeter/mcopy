import type { System } from 'system';
export declare class Display {
    private platform;
    private displays;
    private display;
    private tmpdir;
    private wv;
    constructor(sys: System);
    open(): Promise<void>;
    show(src: string): Promise<void>;
    showPath(pathStr: string): Promise<unknown>;
    hide(): void;
    close(): Promise<boolean>;
    focus(): Promise<boolean>;
    field(ratio: number): Promise<boolean>;
    meter(): Promise<boolean>;
    change(id: string): void;
}

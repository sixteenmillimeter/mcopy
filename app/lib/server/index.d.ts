import WebSocket from 'ws';
import express, { Request, Response } from 'express';
import type { WebContents } from 'electron';
interface ServerData {
    [key: string]: string;
    PORT?: string;
    SCRIPT?: string;
}
interface ServerTemplate {
    name: string;
    path: string;
    data?: string;
}
interface ServerProxy {
    path: string;
}
interface ServerProxyList {
    [key: string]: ServerProxy;
}
interface ServerQueue {
    [key: string]: Function;
}
export declare class Server {
    private id;
    isActive: boolean;
    private log;
    private templates;
    private http;
    private httpd;
    private wss;
    private port;
    private wsPort;
    private proxy;
    private queue;
    private interval;
    private intervalPeriod;
    private ui;
    constructor(ui: WebContents);
    private init;
    private load;
    template(name: string, data: ServerData): string;
    startWss(): Promise<void>;
    startHttp(): Promise<unknown>;
    start(): Promise<void>;
    stopHttp(): Promise<unknown>;
    stop(): Promise<void>;
    index(req: Request, res: Response, next: Function): express.Response<any, Record<string, any>>;
    image(req: Request, res: Response, next: Function): Promise<unknown>;
    addProxy(key: string, filePath: string): void;
    cmdAll(action: string, options?: any): Promise<boolean>;
    displayImage(src: string): Promise<boolean>;
    useServer(): boolean;
    /**
     * WSS
     **/
    cmd(ws: WebSocket, action: string, options?: any): Promise<unknown>;
    private notify;
}
export type { ServerData, ServerTemplate, ServerProxy, ServerProxyList, ServerQueue };

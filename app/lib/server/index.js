'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const promises_1 = require("fs/promises");
const path_1 = require("path");
const uuid_1 = require("uuid");
const log_1 = require("log");
/** @module lib/server */
/**
 * Class representing all filmout server features.
 */
class Server {
    constructor(ui) {
        this.id = 'server';
        this.isActive = false;
        this.templates = [
            {
                name: 'index',
                path: 'server.html'
            },
            {
                name: 'script',
                path: 'lib/client/index.js'
            }
        ];
        this.port = 9900;
        this.wsPort = 9901;
        this.proxy = {};
        this.queue = {};
        this.intervalPeriod = 10000; //10 sec
        this.init();
        this.ui = ui;
    }
    async init() {
        this.log = await (0, log_1.Log)({ label: this.id });
        await this.load();
        await this.start();
    }
    async load() {
        this.http = (0, express_1.default)();
        for (let tmpl of this.templates) {
            tmpl.data = await (0, promises_1.readFile)(tmpl.path, 'utf8');
        }
        this.http.get('/', this.index.bind(this));
        this.http.get('/image/:key', this.image.bind(this));
        this.log.info("Server assets loaded");
    }
    template(name, data) {
        let html = this.templates.find(el => el.name === name).data;
        for (let key of Object.keys(data)) {
            html = html.replace(`{{${key}}}`, data[key]);
        }
        return html;
    }
    async startWss() {
        try {
            this.wss = new ws_1.WebSocketServer({ port: this.wsPort });
        }
        catch (err) {
            this.log.error(err);
            return;
        }
        this.wss.on('connection', async function (ws, req) {
            const address = req.socket.remoteAddress;
            ws.on('message', function (data) {
                let obj = JSON.parse(data);
                //this.log.info(data)
                if (obj.id && this.queue[obj.id]) {
                    this.queue[obj.id](obj);
                    delete this.queue[obj.id];
                    if (obj.action !== 'ping') {
                        this.log.info(`${obj.action} ACK`);
                    }
                }
            }.bind(this));
            ws.on('close', function () {
                this.log.info('Client disconnected');
                this.notify('Client disconnected', `No longer forwarding digital display to client ${address}`);
            }.bind(this));
            await this.cmd(ws, 'mcopy');
            this.log.info('Client connected');
            this.notify('Client connected', `Forwarding digital display to client: ${address}`);
        }.bind(this));
        this.log.info(`Websocket server started!`);
        this.log.info(`WSS [ ws://localhost:${this.wsPort} ]`);
    }
    async startHttp() {
        return new Promise(function (resolve, reject) {
            this.httpd = this.http.listen(this.port, function () {
                this.log.info(`HTTP server started!`);
                this.log.info(`URL [ http://localhost:${this.port} ]`);
                return resolve(true);
            }.bind(this));
        }.bind(this));
    }
    async start() {
        await this.startHttp();
        await this.startWss();
        this.interval = setInterval(async function () {
            await this.cmdAll('ping');
        }.bind(this), this.intervalPeriod);
        this.isActive = true;
    }
    async stopHttp() {
        return new Promise(function (resolve, reject) {
            return this.httpd.close(function () {
                this.log.info(`HTTP server stopped :(`);
                return resolve(false);
            }.bind(this));
        }.bind(this));
    }
    async stop() {
        await this.stopHttp();
        clearInterval(this.interval);
        this.isActive = false;
    }
    index(req, res, next) {
        const SCRIPT = this.template('script', { PORT: `${this.wsPort}` });
        const html = this.template('index', { SCRIPT });
        this.log.info('GET /');
        return res.send(html);
    }
    async image(req, res, next) {
        let filePath;
        if (req.params && req.params.key) {
            if (this.proxy[req.params.key]) {
                filePath = this.proxy[req.params.key].path;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        return new Promise(function (resolve, reject) {
            return res.sendFile(filePath, function (err) {
                if (err) {
                    res.status(err.status).end();
                    return reject(err);
                }
                return resolve(true);
            });
        }.bind(this));
    }
    addProxy(key, filePath) {
        //wipe every time
        this.proxy = {};
        this.proxy[key] = {
            path: filePath
        };
        this.log.info(`Added proxy image [${key}]`);
    }
    async cmdAll(action, options = {}) {
        const cmds = [];
        if (this.useServer()) {
            this.wss.clients.forEach(function (ws) {
                cmds.push(this.cmd(ws, action, options));
            }.bind(this));
            await Promise.all(cmds);
            return true;
        }
        return false;
    }
    async displayImage(src) {
        let key;
        if (this.useServer()) {
            key = (0, path_1.basename)(src);
            this.addProxy(key, src);
            await this.cmdAll('image', { image: `/image/${key}` });
            return true;
        }
        return false;
    }
    useServer() {
        return this.isActive && this.wss.clients.size > 0;
    }
    /**
     * WSS
     **/
    async cmd(ws, action, options = {}) {
        const id = (0, uuid_1.v4)();
        let obj = {
            id, action
        };
        let str;
        obj = Object.assign(obj, options);
        str = JSON.stringify(obj);
        ws.send(str);
        return new Promise(function (resolve, reject) {
            this.queue[id] = function (obj) {
                return resolve(obj);
            };
            //setTimeout() ?
        }.bind(this));
    }
    notify(title, message) {
        this.ui.send('gui', { notify: { title, message } });
    }
}
exports.Server = Server;
module.exports = { Server };
//# sourceMappingURL=index.js.map
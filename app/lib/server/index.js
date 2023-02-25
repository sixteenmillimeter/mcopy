"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const promises_1 = require("fs/promises");
const mime_1 = __importDefault(require("mime"));
const Log = require("log");
class Server {
    constructor() {
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
        this.init();
    }
    async init() {
        this.log = await Log({ label: this.id });
        await this.load();
        await this.start();
    }
    async load() {
        this.http = express_1.default();
        for (let tmpl of this.templates) {
            tmpl.data = await promises_1.readFile(tmpl.path, 'utf8');
        }
        this.http.get('/', this.index.bind(this));
        this.http.get('/client.js', this.script.bind(this));
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
        this.wss.on('connection', (ws) => {
            this.log.info(`Client connected to WebSocketServer`);
            console.dir(ws);
            ws.send('mcopy');
        });
        this.log.info(`WSS [ ws://localhost:${this.wsPort} ]`);
    }
    async startHttp() {
        return new Promise(function (resolve, reject) {
            this.httpd = this.http.listen(this.port, function () {
                this.isActive = true;
                this.log.info(`Server started!`);
                this.log.info(`URL [ http://localhost:${this.port} ]`);
                return resolve(true);
            }.bind(this));
        }.bind(this));
    }
    async start() {
        await this.startHttp();
        await this.startWss();
    }
    async stop() {
        return new Promise(function (resolve, reject) {
            return this.httpd.close(function () {
                this.isActive = false;
                this.log.info(`Server stopped :(`);
                return resolve(false);
            }.bind(this));
        }.bind(this));
    }
    index(req, res, next) {
        const html = this.template('index', { PORT: `${this.port}` });
        this.log.info('GET /');
        return res.send(html);
    }
    script(req, res, next) {
        const js = this.template('script', { PORT: `${this.wsPort}` });
        res.contentType('text/javascript');
        this.log.info('GET /script.js');
        return res.send(js);
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
        this.proxy[key] = {
            path: filePath,
            mime: mime_1.default.getType(filePath)
        };
        this.log.info(`Added proxy image [${key}]`);
    }
}
module.exports = function () {
    return new Server();
};
//# sourceMappingURL=index.js.map
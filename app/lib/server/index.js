"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
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
        this.init();
    }
    async init() {
        this.log = await Log({ label: this.id });
    }
    async load() {
        for (let tmpl of this.templates) {
            tmpl.data = await promises_1.readFile(tmpl.path, 'utf8');
        }
        this.log.info("Server assets loaded");
    }
    template(name, data) {
        let html = this.templates.find(el => el.name === name).data;
        for (let key of Object.keys(data)) {
            html = html.replace(`{{${key}}}`, data[key]);
        }
        return html;
    }
    start() {
        this.http.listen(function () {
            this.isActive = true;
            this.log.inf(`Server started!`);
            this.log.info(`URL [ http://localhost:${this.port} ]`);
        }.bind(this));
    }
    stop() {
        this.http.close();
        this.isActive = false;
        this.log.info(`Server stopped :(`);
    }
    index(req, res, next) {
        const html = this.template('index', { PORT: `${this.port}` });
        return res.send(html);
    }
    script(req, res, next) {
        const js = this.template('script', { PORT: `${this.wsPort}` });
    }
}
//# sourceMappingURL=index.js.map
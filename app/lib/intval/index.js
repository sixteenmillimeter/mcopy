'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intval = void 0;
class Intval {
    constructor(url) {
        this._baseUrl = `http://${url}`;
        this.req = require('request');
    }
    async move() {
        return new Promise((resolve, reject) => {
            const timeStart = +new Date();
            const url = `${this._baseUrl}/frame`;
            //console.log(url)
            return this.req(url, (err, res, body) => {
                let ms = (+new Date()) - timeStart;
                if (err) {
                    return reject(err);
                }
                return resolve(ms);
            });
        });
    }
    async setDir(dir) {
        return new Promise((resolve, reject) => {
            const timeStart = +new Date();
            const url = `${this._baseUrl}/dir?dir=${dir}`;
            //console.log(url)
            return this.req(url, (err, res, body) => {
                let ms = (+new Date()) - timeStart;
                if (err) {
                    return reject(err);
                }
                return resolve(ms);
            });
        });
    }
    async setExposure(exposure, cb) {
        return new Promise((resolve, reject) => {
            const timeStart = +new Date();
            const url = `${this._baseUrl}/exposure?exposure=${exposure}`;
            return this.req(url, (err, res, body) => {
                let ms = (+new Date()) - timeStart;
                if (err) {
                    return reject(err);
                }
                return resolve(ms);
            });
        });
    }
    connect(cb) {
        const timeStart = +new Date();
        const url = `${this._baseUrl}/status`;
        const opts = {
            method: 'GET',
            uri: url,
            timeout: 5000
        };
        this.req(opts, (err, res, body) => {
            let ms = (+new Date()) - timeStart;
            if (err) {
                return cb(err, ms);
            }
            cb(null, ms, body);
        });
    }
}
exports.Intval = Intval;
module.exports.Intval = Intval;
//# sourceMappingURL=index.js.map
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intval = void 0;
const request = __importStar(require("request"));
/** @module lib/intval */
/**
 * Class representing all intval3 camera features.
 */
class Intval {
    constructor(url) {
        this._baseUrl = `http://${url}`;
    }
    async move() {
        return new Promise((resolve, reject) => {
            const timeStart = +new Date();
            const url = `${this._baseUrl}/frame`;
            //console.log(url)
            return request(url, (err, res, body) => {
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
            return request(url, (err, res, body) => {
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
            return request(url, (err, res, body) => {
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
        request(opts, (err, res, body) => {
            let ms = (+new Date()) - timeStart;
            if (err) {
                return cb(err, ms);
            }
            cb(null, ms, body);
        });
    }
}
exports.Intval = Intval;
module.exports = { Intval };
//# sourceMappingURL=index.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const exec_1 = require("exec");
class Processing {
    constructor(url) {
        this._baseUrl = (url.indexOf('http') === -1 && url.indexOf('://') === -1) ? `http://${url}` : url;
    }
    async move() {
        return new Promise(async (resolve, reject) => {
            const timeStart = +new Date();
            const url = `${this._baseUrl}`;
            const cmd = `curl --http0.9 ${url}`;
            let res;
            let ms;
            //console.log(url)
            try {
                res = await exec_1.exec(cmd);
            }
            catch (err) {
                return reject(err);
            }
            ms = (+new Date()) - timeStart;
            return resolve(ms);
        });
    }
    async setDir(dir) {
        return new Promise((resolve, reject) => {
            return resolve(0);
        });
    }
}
module.exports.Processing = Processing;
//# sourceMappingURL=index.js.map
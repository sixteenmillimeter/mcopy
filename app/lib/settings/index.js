'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const os_1 = require("os");
const path_1 = require("path");
const promises_1 = require("fs/promises");
class Settings {
    /**
     *
     **/
    constructor() {
        this.file = (0, path_1.join)((0, os_1.homedir)(), `/.mcopy/settings.json`);
        this.defaultState = {
            server: {
                port: 1111,
                enabled: true
            },
            devices: [],
            profile: 'mcopy',
            camera: {},
            projector: {},
            light: {},
            capper: {},
            timing: {}
        };
        this.state = this.freshState();
    }
    async exists(path) {
        try {
            await (0, promises_1.access)(path);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    freshState() {
        return JSON.parse(JSON.stringify(this.defaultState));
    }
    /**
     *
     **/
    async checkDir() {
        const dir = (0, path_1.join)((0, os_1.homedir)(), '.mcopy/');
        const exists = await this.exists(dir);
        if (!exists) {
            try {
                await (0, promises_1.mkdir)(dir);
            }
            catch (err) {
                if (err.code === 'EEXIST')
                    return true;
                console.error(err);
            }
        }
        return true;
    }
    /**
     *
     **/
    async save() {
        const str = JSON.stringify(this.state, null, '\t');
        this.checkDir();
        try {
            await (0, promises_1.writeFile)(this.file, str, 'utf8');
        }
        catch (err) {
            console.error(err);
        }
    }
    /**
     *
     **/
    update(key, val) {
        this.state[key] = val;
    }
    /**
     *
     **/
    get(key) {
        return this.state[key];
    }
    /**
     *
     **/
    all() {
        return this.state;
    }
    /**
     *
     **/
    async restore() {
        let exists = false;
        let str;
        this.checkDir();
        exists = await this.exists(this.file);
        if (exists) {
            str = await (0, promises_1.readFile)(this.file, 'utf8');
            this.state = JSON.parse(str);
            //console.dir(this.state)
        }
        else {
            this.save();
        }
    }
    /**
     *
     **/
    async reset() {
        const exists = await this.exists(this.file);
        if (exists) {
            try {
                await (0, promises_1.unlink)(this.file);
            }
            catch (err) {
                console.error(err);
            }
        }
        this.state = this.freshState();
        this.restore();
    }
    ;
}
exports.Settings = Settings;
module.exports = { Settings };
//# sourceMappingURL=index.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const path = require("path");
const fs = require("fs-extra");
class Settings {
    /**
     *
     **/
    constructor() {
        this.file = path.join(os.homedir(), `/.mcopy/settings.json`);
        this.state = {
            server: {
                port: 1111,
                enabled: true
            },
            devices: [],
            profile: 'mcopy',
            camera: {},
            projector: {},
            light: {}
        };
    }
    /**
     *
     **/
    async checkDir() {
        const dir = path.join(os.homedir(), '.mcopy/');
        const exists = await fs.exists(dir);
        if (!exists) {
            try {
                await fs.mkdir(dir);
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
            await fs.writeFile(this.file, str, 'utf8');
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
        let exists;
        let str;
        this.checkDir();
        exists = await fs.exists(this.file);
        if (exists) {
            str = await fs.readFile(this.file, 'utf8');
            this.state = JSON.parse(str);
        }
        else {
            this.save();
        }
    }
    /**
     *
     **/
    async reset() {
        const exists = await fs.exists(this.file);
        if (exists) {
            try {
                await fs.unlink(this.file);
            }
            catch (err) {
                console.error(err);
            }
        }
        this.restore();
    }
    ;
}
module.exports = new Settings();
//# sourceMappingURL=index.js.map
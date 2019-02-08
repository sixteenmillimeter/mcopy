'use strict';

const spawnRaw = require('child_process').spawn;

function spawn (cmd, args) {
    const sp = spawnRaw(cmd, args);
    let output = '';
    sp.stderr.on('data', (data) => {
        output += data;
        //console.log(`${data}`);
    });
    sp.on('close', (code) => {
        console.log(output);
    });
    return sp;
}

module.exports = spawn;
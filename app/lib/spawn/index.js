'use strict';

const spawnRaw = require('child_process').spawn;

/**
 * Wrapper function around spawn that prints to console
 * after process closes. Not used.
 **/
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
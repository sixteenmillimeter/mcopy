'use strict';

//the purpose of this script is to test the performance of the
//mscript rewrite against the original

const Mscript = require('../lib/mscript');
const mscript = new Mscript();
const mscriptOld = require('../lib/mscript/index.old.js');


mscript.interpret(`F 72 0,0,0 10,20,30
CF
END
PF 10
	`, (output) => {
	console.dir(output)
});

process.exit()

mscriptOld.state_clear();
console.time('mscript old str_to_arr');


for (let i = 0; i < 100000; i++) {
	mscriptOld.str_to_arr('BF 2222', 'BF');
}

console.timeEnd('mscript old str_to_arr')

mscript.clear()
console.time('mscript str_to_arr');

for (let i = 0; i < 100000; i++) {
	mscript.str_to_arr('BF 2222', 'BF');
}

console.timeEnd('mscript str_to_arr');
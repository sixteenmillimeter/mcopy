'use strict';

//the purpose of this script is to test the performance of the
//mscript rewrite against the original

const mscript = require('../lib/mscript');
const mscriptOld = require('../lib/mscript/index.old.js');

mscriptOld.state_clear();
console.time('mscript old str_to_arr');


for (let i = 0; i < 100000; i++) {
	mscriptOld.str_to_arr('BF 2222', 'BF');
}

console.timeEnd('mscript old str_to_arr')

mscript.state_clear();
console.time('mscript str_to_arr');

for (let i = 0; i < 100000; i++) {
	mscript.str_to_arr('BF 2222', 'BF');
}

console.timeEnd('mscript str_to_arr');
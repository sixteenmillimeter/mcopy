'use strict';

const mscript = require('../lib/mscript');

QUnit.test(`Basic functions`, (assert) => {
	const script = 'CF\nPF\nCB\nPB\nBF\nBB';
	let pass = false;
	mscript.interpret(script, (obj) => {
		if (obj.success === true 
			&& obj.cam === 0
			&& obj.proj === 0 
			&& obj.arr.length === 6) {
			pass = true;
		}
		assert.ok(pass, `Simple script compiles`)
	});
})
/*
	
	console.log('Basic function test...');
	mscript.interpret(script, function (obj) {
		if (obj.success === true 
			&& obj.cam === 0
			&& obj.proj === 0 
			&& obj.arr.length === 6) {
			console.log('...Passed!');
		} else {
			fail(script, obj);
		}
	});

	var script = 'CF\nPF\nCB\nPB\nBF\nBB';
	console.log('Functions with integers test...');
	mscript.interpret(script, function (obj) {
		if (obj.success === true 
			&& obj.cam === 0
			&& obj.proj === 0 
			&& obj.arr.length === 6) {
			console.log('...Passed!');
		} else {
			fail(script, obj);
		}
	});

	script = 'CF 1000\nCB 1000\nSET PROJ 200\nPB 200';
	console.log('Basic state test...');
	mscript.interpret(script, function (obj) {
		if (obj.success === true 
			&& obj.cam === 0
			&& obj.proj === 0) {
			console.log('...Passed!');
		} else {
			fail(script, obj);
		}
	});

	script = 'LOOP 10\nCF 3\nPF 1\nEND LOOP';
	console.log('Basic loop test...');
	mscript.interpret(script, function (obj) {
		if (obj.success === true 
			&& obj.cam === 30
			&& obj.proj === 10
			&& obj.arr.length === 40) {
			console.log('...Passed!');
		} else {
			fail(script, obj);
		}
	});

	script = 'LOOP 4\nLOOP 4\nPF\nBF\nEND LOOP\nEND LOOP';
	console.log('Recursive loop test...');
	mscript.interpret(script, function (obj) {
		if (obj.success === true 
			&& obj.cam === 16
			&& obj.proj === 16
			&& obj.arr.length === 32) {
			console.log('...Passed!');
		} else {
			fail(script, obj);
		}
	});

	//Lighting tests
	script = 'L 255,255,255\nCF\nPF';
	console.log('Basic light test...');
	mscript.interpret(script, function (obj) {
		if (obj.success === true 
			&& obj.cam === 1
			&& obj.proj === 1
			&& obj.arr.length === 2
			&& obj.light.length === 2
			&& obj.light[0] === '255,255,255'
			&& obj.light[1] === '') {
			console.log('...Passed!');
		} else {
			fail(script, obj);
		}
	});
	script = 'L 255,255,255\nCF\nPF\nBF';
	console.log('Basic black test...');
	mscript.interpret(script, function (obj) {
		if (obj.success === true 
			&& obj.cam === 2
			&& obj.proj === 1
			&& obj.arr.length === 3
			&& obj.light.length === 3
			&& obj.light[0] === '255,255,255'
			&& obj.light[1] === ''
			&& obj.light[2] === mscript.black) {
			console.log('...Passed!');
		} else {
			fail(script, obj);
		}
	});
	script = 'LOOP 2\nL 1,1,1\nCF\nL 2,2,2\nCF\nEND';
	console.log('Basic light loop test...');
	mscript.interpret(script, function (obj) {
		if (obj.success === true 
			&& obj.cam === 4
			&& obj.proj === 0
			&& obj.arr.length === 4
			&& obj.light.length === 4
			&& obj.light[0] === '1,1,1'
			&& obj.light[3] === '2,2,2') {
			console.log('...Passed!');
		} else {
			fail(script, obj);
		}
	});

	//LOOP W/ CAM and PROJ
	script = 'LOOP 2\nCAM 4\nPROJ 4\nEND';
	console.log('Basic cam/proj loop test...');
	mscript.interpret(script, function (obj) {
		if (obj.success === true 
			&& obj.cam === 8
			&& obj.proj === 8
			&& obj.arr.length === 16
			&& obj.light.length === 16
			&& obj.light[0] === mscript.black) {
			console.log('...Passed!');
		} else {
			fail(script, obj);
		}
	});
*/
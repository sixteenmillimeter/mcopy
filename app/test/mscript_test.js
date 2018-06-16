'use strict';

const Mscript = require('../lib/mscript');
const mscript = new Mscript();

QUnit.test(`Basic functions`, (assert) => {
	const script1 = 'CF\nPF\nCB\nPB\nBF\nBB';
	const script2 = `CF 3\nPF 3`
	assert.expect( 2 );

	mscript.interpret(script1, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 0
			&& obj.proj === 0 
			&& obj.arr.length === 6) {
			pass = true;
		}
		assert.ok(pass, `Simple script1 compiles`)
	});
	mscript.interpret(script2, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 3
			&& obj.proj === 3 
			&& obj.arr.length === 6) {
			pass = true;
		}
		assert.ok(pass, `Simple script2 compiles`)
	});
});

QUnit.test(`Commands with integers`, (assert) => {
	const script = 'CF 5\nPF 5\nCB 5\nPB 5\nBF 3\nBB 3';
	assert.expect( 1 );
	mscript.interpret(script, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 0
			&& obj.proj === 0 
			&& obj.arr.length === 26) {
			pass = true;
		}
		assert.ok(pass, `Script with integers cancels out count, but generates list of commands`)
	});
})


QUnit.test('State', (assert) => {
	const script = 'CF 1000\nCB 1000\nSET PROJ 200\nPB 200';
	assert.expect(1);
	mscript.interpret(script, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 0
			&& obj.proj === 0) {
			pass = true;
		}
		assert.ok(pass, `Basic state test`);
	});
});

QUnit.test('Loop', (assert) => {
	const script1 = 'LOOP 10\nCF 3\nPF 1\nEND LOOP';
	assert.expect(3);
	mscript.interpret(script1, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 30
			&& obj.proj === 10
			&& obj.arr.length === 40) {
			pass = true;
		}
		assert.ok(pass, 'Basic loop');

	});
	const script2 = 'LOOP 4\nLOOP 4\nPF\nBF\nEND LOOP\nEND LOOP';
	mscript.interpret(script2, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 16
			&& obj.proj === 16
			&& obj.arr.length === 32) {
			pass = true;
		}
		assert.ok(pass, 'Recursive loop');
	});
	//LOOP W/ CAM and PROJ
	const script3 = 'LOOP 2\nCAM 4\nPROJ 4\nEND';
	mscript.interpret(script3, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 8
			&& obj.proj === 8
			&& obj.arr.length === 16
			&& obj.light.length === 16
			&& obj.light[0] === '0,0,0') {
			pass = true;
		}
		assert.ok(pass, 'Basic cam/proj loop');
	});
});

QUnit.test('Light', (assert) => {
	//Lighting tests
	const script1 = 'L 255,255,255\nCF\nPF';
	assert.expect(3);
	mscript.interpret(script1, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 1
			&& obj.proj === 1
			&& obj.arr.length === 2
			&& obj.light.length === 2
			&& obj.light[0] === '255,255,255'
			&& obj.light[1] === '') {
			pass = true;
		}
		assert.ok(pass, 'Basic light');
	});
	
	const script2 = 'L 255,255,255\nCF\nPF\nBF';
	mscript.interpret(script2, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 2
			&& obj.proj === 1
			&& obj.arr.length === 3
			&& obj.light.length === 3
			&& obj.light[0] === '255,255,255'
			&& obj.light[1] === ''
			&& obj.light[2] === '0,0,0') {
			pass = true;
		}
		assert.ok(pass, 'Basic black');
	});
	const script3 = 'LOOP 2\nL 1,1,1\nCF\nL 2,2,2\nCF\nEND';
	mscript.interpret(script3, (obj) => {
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 4
			&& obj.proj === 0
			&& obj.arr.length === 4
			&& obj.light.length === 4
			&& obj.light[0] === '1,1,1'
			&& obj.light[3] === '2,2,2') {
			pass = true;
		}
		assert.ok(pass, 'Basic light');
	});
});

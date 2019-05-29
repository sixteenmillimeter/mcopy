'use strict';

const Mscript = require('../lib/mscript');
const mscript = new Mscript();

const assert = require('assert')

describe(`mscript module`, () => {
	const script1 = 'CF\nPF\nCB\nPB\nBF\nBB';
	const script2 = `CF 3\nPF 3`
	const script3 = `CF\nPF`

	it ('Should compile very short scripts as strings', () => {
		const obj = mscript.interpret(script1)
		assert.ok(obj.success, `Simple script1 compiles`);
		assert.equal(obj.cam, 0, 'Camera gets equaled out');
		assert.equal(obj.proj, 0, 'Projector gets cancelled out');
		assert.equal(obj.arr.length, 6, 'Generate sequence of 6 steps');
	});

	it ('Should compile script with count values after command', () => {
		const obj = mscript.interpret(script2)
		assert.ok(obj.success, `Simple script2 compiles`);
		assert.equal(obj.arr[0], 'CF', `First step is a camera_forward command`);
		assert.equal(obj.cam, 3, `Camera finished on frame 3`);
		assert.equal(obj.proj, 3, `Projector finished on frame 3`); 
		assert.equal(obj.arr.length,  6, `Generate sequence of 6 steps`);
	});


	it ('Should compile with implied counts of 1', () => {
		const obj = mscript.interpret(script3);
		assert.ok(obj.success, 'Simple script3 with implied counts compiles');
		//console.log(obj);
	});

});

describe(`mscript - Commands with integers`, () => {
	const script = `
CF 5
PF 5
CB 5
PB 5
BF 3
BB 3`;

	it ('Should compile script with integers as count values', () => {
		const obj = mscript.interpret(script)
		assert.ok(obj.success, `Script with integers cancels out count, but generates list of commands`)
		assert.equal(obj.cam , 0, 'Steps cancel each other out on cam');
		assert.equal(obj.proj, 0, 'Steps cancel each other out on proj');
		assert.equal(obj.arr.length, 26, 'Total of 26 steps in sequence');
	});
});

describe(`mscript - Device commands`, () => {
	const script1 = `
CAM 50
PROJ 50`;

	it ('Should compile script with device commands', () => {
		const obj = mscript.interpret(script1);
		assert.ok(obj.success, `Script generates 100 step sequence with 50 steps on each device`);
		assert.equal(obj.cam, 50, `Camera gets to 50`);
		assert.equal(obj.arr[0], 'BF', 'First step is black_forward');
		assert.equal(obj.proj, 50, `Projector gets to 50`); 
		assert.equal(obj.arr[50], 'PF', '51st step is projector_forward');
		assert.equal(obj.arr.length, 100, `Array is 100 steps long`);
	});

const script2 = `
SET CAM 0
SET PROJ 50

CAM 50
PROJ 0`

	it ('Should generate steps in correct direction', () => {
		const obj = mscript.interpret(script2);
		assert.ok(obj.success, `Script generates 100 step sequence with 50 steps on each device`);
		assert.equal(obj.cam, 50, `Camera gets to 50`);
		assert.equal(obj.arr[0], 'BF', 'First step is black_forward');
		assert.equal(obj.proj, 0, `Projector gets to 0`); 
		assert.equal(obj.arr[50], 'PB', '51st step is projector_backward');
		assert.equal(obj.arr.length, 100, `Array is 100 steps long`);
	});
});

describe('mscript - State', () => {
	const script = `
CF 1000
CB 1000
SET PROJ 200
PB 200`;

	it ('Should manage state using SET commands', () => {
		const obj = mscript.interpret(script)
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 0
			&& obj.proj === 0) {
			pass = true;
		}
		assert.ok(pass, `Basic state test`);
	});
});

describe('mscript - Loop', () => {
	const script1 = `
LOOP 10
	CF 3
	PF 1
END LOOP`;

	it ('Should generate a looped sequence between LOOP and END LOOP statements', () => {
		const obj = mscript.interpret(script1)
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 30
			&& obj.proj === 10
			&& obj.arr.length === 40) {
			pass = true;
		}
		assert.ok(pass, 'Basic loop');
	});

	const script2 = `
LOOP 4
	LOOP 4
		PF
		BF
	END LOOP
END LOOP`;

	it ('Should generate a sequence with nested loops', () => {
		const obj = mscript.interpret(script2)
		let pass = false;
		if (obj.success === true 
			&& obj.cam === 16
			&& obj.proj === 16
			&& obj.arr.length === 32) {
			pass = true;
		}
		assert.ok(pass, 'Nested loop works');
	});

	//LOOP W/ CAM and PROJ
	const script3 = `
LOOP 2
	CAM 4
	PROJ 4
END`;

	it ('Should generate a sequence with CAM and PROJ statements', () => {
		const obj = mscript.interpret(script3)
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

describe('mscript - Light', () => {
	//Lighting tests
	const script1 = 'L 255,255,255\nCF\nPF';

	it ( `Should set a light value on camera steps`, () => {
		const obj = mscript.interpret(script1)
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
	it ( `Should set light to black on black_forward`, () => {
		const obj = mscript.interpret(script2)
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
	it ( `Should set light within a loop`, () => {
		const obj = mscript.interpret(script3);
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

describe('mscript - Fade', () => {

	const script1 = 
`F 72 0,0,0 10,20,30
CF
END
PF 10`
	it ('Should generate a fade', () => {
		const obj = mscript.interpret(script1)
		//console.dir(obj)
		assert.ok(obj.success, 'Basic fade compiles');
		assert.equal(obj.cam, 72, `Camera moves forward 72 frames`);
		assert.equal(obj.proj, 10, 'Projector moves forward 10 frames');
		assert.equal(obj.arr.length, 82, 'Generates 82 steps');
		assert.equal(obj.light[0], '0,0,0', 'Fade starts with starting color');
		assert.equal(obj.light[71], '10,20,30', 'Fade ends with ending color');
		assert.equal(obj.light[72], '', 'Frame after fade is default color');
	})

	const script2 =
`
F 24 25,255,125 225,125,10
CF
END
L 225,125,10
CF 10`
	
	it ('Should generate a fade and immediately set a light value after', () => {
		const obj = mscript.interpret(script2)
		//console.dir(obj)
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.cam, 34, 'There are 34 camera frames');
		assert.equal(obj.arr.length, 34, 'There are 34 steps in the script');
		assert.equal(obj.light[0], '25,255,125', 'First frame is equal to start color');
		assert.equal(obj.light[23], '225,125,10', 'Last frame in fade is equal to end color');
		assert.equal(obj.light[24], '225,125,10', 'First frame after fade is set using Light command');
	})
})

/*describe('mscript - Variables', () => {
	const script1 = 
`@LIGHT=200,200,200
@COUNT=1
CF 20
PF
@COUNT++
`
	mscript.interpret(script1, obj => {
		//console.dir(obj)
		assert.ok(true)
	})
})*/
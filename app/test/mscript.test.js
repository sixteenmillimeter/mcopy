'use strict';

const Mscript = require('../lib/mscript');
const mscript = new Mscript();

const assert = require('assert')

describe(`mscript module`, () => {
	const script1 = `
CF
PF
CB
PB
BF
BB`;

	it ('Should compile very short scripts as strings', () => {
		const obj = mscript.interpret(script1)
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, `Simple script1 compiles`);
		assert.equal(obj.cam, 0, 'Camera gets equaled out');
		assert.equal(obj.proj, 0, 'Projector gets cancelled out');
		assert.equal(obj.arr.length, 6, 'Generate sequence of 6 steps');
	});

	const script2 = `
CF 3
PF 3`;
	it ('Should compile script with count values after command', () => {
		const obj = mscript.interpret(script2)
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, `Simple script2 compiles`);
		assert.equal(obj.arr[0], 'CF', `First step is a camera_forward command`);
		assert.equal(obj.cam, 3, `Camera finished on frame 3`);
		assert.equal(obj.proj, 3, `Projector finished on frame 3`); 
		assert.equal(obj.arr.length,  6, `Generate sequence of 6 steps`);
	});

const script3 = `
CF
PF`
	it ('Should compile with implied counts of 1', () => {
		const obj = mscript.interpret(script3);
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Simple script3 with implied counts compiles');
		assert.equal(obj.cam, 1, 'Camera state should be at 1');
		assert.equal(obj.proj, 1, 'Projector state should be at 1');
		assert.equal(obj.arr.length, 2, 'Generate sequence of 2 steps');
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
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
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
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
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
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
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
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.cam, 0, 'Camera state ends at 0');
		assert.equal(obj.proj, 0, 'Projector state ends at 0');
	});

	const script2 = `
LOOP 10
	CF
	SET PROJ 10
	PF
END`;

	it('Should fail when SET state within LOOP', () => {
		let errorCaught = false;
		try {
			const obj = mscript.interpret(script2);
		} catch (err) {
			//fail silently
			errorCaught = true;
		}
		assert.ok(typeof obj === 'undefined', 'Mscript fails to produce an output object');
		assert.ok(errorCaught, 'Error should be thrown by script');
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
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.cam, 30, 'Camera state ends at 30');
		assert.equal(obj.proj, 10, 'Projector state ends at 10');
		assert.equal(obj.arr.length, 40, 'Array contains 40 steps');
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
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.cam, 16, 'Camera state ends at 16');
		assert.equal(obj.proj, 16, 'Projector state ends at 16');
		assert.equal(obj.arr.length, 32, 'Array contains 32 steps');
	});

	//LOOP W/ CAM and PROJ
	const script3 = `
LOOP 2
	CAM 4
	PROJ 4
END`;

	it ('Should generate a sequence with CAM and PROJ statements', () => {
		const obj = mscript.interpret(script3)
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.cam, 8, 'Camera state ends at 8');
		assert.equal(obj.proj, 8, 'Projector state ends at 8');
		assert.equal(obj.arr.length, 16, 'Array contains 16 steps');
		assert.equal(obj.meta.length, 16, 'Meta contains 16 steps');
		assert.equal(obj.meta[0], '0,0,0', 'First meta step should be 0,0,0');
	});
});

describe('mscript - Light', () => {
	//Lighting tests
	const script1 = `
L 255,255,255
CF
PF`;
	it ( `Should set a light value on camera steps only`, () => {
		const obj = mscript.interpret(script1)
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.cam, 1, 'Camera state ends at 1');
		assert.equal(obj.proj, 1, 'Projector state ends at 1');
		assert.equal(obj.arr.length, 2, 'Array contains 2 steps');
		assert.equal(obj.meta.length, 2, 'Meta contains 2 steps');
		assert.equal(obj.meta[0], '255,255,255', 'First meta step should be 255,255,255');
		assert.equal(obj.meta[1], '', 'Second meta step should be ""');
	});
	
	const script2 = `
L 255,255,255
CF
PF
BF`;
	it ( `Should set light to black on black_forward`, () => {
		const obj = mscript.interpret(script2)
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.cam, 2, 'Camera state ends at 2');
		assert.equal(obj.proj, 1, 'Projector state ends at 1');
		assert.equal(obj.arr.length, 3, 'Array contains 3 steps');
		assert.equal(obj.meta.length, 3, 'Meta contains 3 steps');
		assert.equal(obj.meta[0], '255,255,255', 'First meta step should be 255,255,255');
		assert.equal(obj.meta[1], '', 'Second meta step should be ""');
		assert.equal(obj.meta[2], '0,0,0', 'Third meta step should be ""');
	});

	const script3 = `
LOOP 2
	L 1,1,1
	CF
	L 2,2,2
	CF
END`;
	it ( `Should set light within a loop`, () => {
		const obj = mscript.interpret(script3);
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.cam, 4, 'Camera state ends at 4');
		assert.equal(obj.proj, 0, 'Projector state ends at 0');
		assert.equal(obj.arr.length, 4, 'Array contains 4 steps');
		assert.equal(obj.meta.length, 4, 'Meta contains 4 steps');
		assert.equal(obj.meta[0], '1,1,1', 'First meta step should be 1,1,1');
		assert.equal(obj.meta[3], '2,2,2', 'Fourth meta step should be 2,2,2');
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
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Basic fade compiles');
		assert.equal(obj.cam, 72, `Camera moves forward 72 frames`);
		assert.equal(obj.proj, 10, 'Projector moves forward 10 frames');
		assert.equal(obj.arr.length, 82, 'Generates 82 steps');
		assert.equal(obj.meta[0], '0,0,0', 'Fade starts with starting color');
		assert.equal(obj.meta[71], '10,20,30', 'Fade ends with ending color');
		assert.equal(obj.meta[72], '', 'Frame after fade is default color');
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
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.cam, 34, 'There are 34 camera frames');
		assert.equal(obj.arr.length, 34, 'There are 34 steps in the script');
		assert.equal(obj.meta[0], '25,255,125', 'First frame is equal to start color');
		assert.equal(obj.meta[23], '225,125,10', 'Last frame in fade is equal to end color');
		assert.equal(obj.meta[24], '225,125,10', 'First frame after fade is set using Light command');
	})
})

describe('mscript - Secondary', () => {
	const script = `
LOOP 10
C2F
P2F
END
`
	it('Should generate an array with secondary devices', () => {
		const obj = mscript.interpret(script)
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript labeled output success');
		assert.equal(obj.arr.length, 20, 'Script should produce 20 steps');
		assert.equal(obj.arr[0], 'C2F', 'First step should be C2F');
		assert.equal(obj.arr[19], 'P2F', 'Twentieth step should be P2F');
	})
	const script2 = `
C2F 1000
CB 1000
SET PROJ2 200
PB 200`;

	it ('Should correctly determine state of secondary device', () => {
		const obj = mscript.interpret(script2);
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript parsed the script correctly');
		assert.equal(obj.arr.length, 2200, 'Script should produce 2200 steps');
		assert.equal(obj.cam, -1000, 'Camera should be at -1000');
		assert.equal(obj.cam2, 1000, 'Camera 2 should be at 1000');
		assert.equal(obj.proj, -200, 'Projector should be at -200');
		assert.equal(obj.proj2, 200, 'Projector 2 should be set to 200');
	});

		const script3 = `
LOOP 5
	CF 10
	PB 200
	P2F
END`;

	it ('Should correctly determine state of secondary device in loops', () => {
		const obj = mscript.interpret(script3);
		assert.ok(typeof obj === 'object', 'Mscript produced an object response');
		assert.ok(obj.success, 'Mscript parsed the script correctly');
		assert.equal(obj.arr.length, 1055, 'Script should produce 1055 steps');
		assert.equal(obj.cam, 50, 'Camera should be at -1000');
		assert.ok(typeof obj.cam2 === 'undefined', 'Camera 2 should not exist');
		assert.equal(obj.proj, -1000, 'Projector should be at -1000');
		assert.equal(obj.proj2, 5, 'Projector 2 should be set to 5');
	});
});

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
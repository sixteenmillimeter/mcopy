var fs,
	input;

var mscript = {};

mscript.arg = function arg (shrt, lng) {
	if (process.argv.indexOf(shrt) !== -1 ||
		process.argv.indexOf(lng) !== -1) {
		return true;
	}
	return false;
};

mscript.arg_pos = function arg_pos (shrt, lng) {
	var pos = -1;
	pos = process.argv.indexOf(shrt);
	if (pos === -1) {
		pos = process.argv.indexOf(lng);
	}
	return pos;
};

mscript.cmd = [
	'CF',
	'PF',
	'BF',
	'CB',
	'PB',
	'BB'
];
mscript.alts = {
	'CF' : ['CAMERA FORWARD', 'CAM FORWARD'],
	'PF' : ['PROJECTOR FORWARD', 'PROJ FORWARD'],
	'BF': ['BLACK FORWARD'],
	'CB' : ['CAMERA BACKWARD', 'CAM BACKWARD', 'CAMERA BACK', 'CAM BACK'],
	'PB' : ['PROJECTOR FORWARD', 'PROJ FORWARD', 'PROJECTOR BACK', 'PROJ BACK'],
	'BB' : ['BLACK BACKWARD', 'BLACK BACK']
};
mscript.alts_unique = function alts_unique () {
	var ids = Object.keys(mscript.alts),
		all = [];
	for (var i = 0; i < ids.length; i++) {
		if (all.indexOf(ids[i]) === -1) {
			all.push(ids[i]);
		} else {
			mscript.fail("Can't compile");
		}
	}
};
mscript.state = {};
mscript.state_clear = function state_clear () {
	mscript.state = {
		cam : 0,
		proj : 0,
		loops : [],
		rec : -1
	};
};
mscript.interpret = function interpret (text, callback) {
	mscript.state_clear();
	if (typeof text === 'undefined') {
		mscript.fail('No input');
	}
	var lines = text.split('\n'),
		two = '',
		arr = [],
		target = 0,
		dist = 0, //?
		output = {};
	for (var i = 0; i < lines.length; i++) {
		lines[i] = lines[i].replace(/\t+/g, ""); //strip tabs
		lines[i] = lines[i].trim(); //remove excess whitespace before and after command
		two = lines[i].substring(0,2);
		if (mscript.cmd.indexOf(two) !== -1) {
			if (mscript.state.loops.length > 0) {
				mscript.state.loops[mscript.state.rec].arr.push.apply(mscript.state.loops[mscript.state.rec].arr, mscript.str_to_arr(lines[i], two));
			} else {
				arr.push.apply(arr, mscript.str_to_arr(lines[i], two));
			}
		} else if (lines[i].substring(0, 4) === 'LOOP') {
			mscript.state.rec++;
			mscript.state.loops[mscript.state.rec] = {
				arr : [],
				cam : 0,
				proj : 0,
				cmd : lines[i] + ''
			};
		} else if (lines[i].substring(0, 3) === 'END') {
			for (var x = 0; x < mscript.loop_count(mscript.state.loops[mscript.state.rec].cmd); x++) {
				if (mscript.state.rec === 0) {
					arr.push.apply(arr, mscript.state.loops[mscript.state.rec].arr);
				} else if (mscript.state.rec >= 1) {
					mscript.state.loops[mscript.state.rec - 1].arr.push.apply(mscript.state.loops[mscript.state.rec - 1].arr, mscript.state.loops[mscript.state.rec].arr);
				}
			}
			mscript.state_update('END', mscript.loop_count(mscript.state.loops[mscript.state.rec].cmd));
			delete mscript.state.loops[mscript.state.rec];
			mscript.state.rec--;
		} else if (lines[i].substring(0, 3) === 'CAM') { //directly go to that frame (black?)
			if (mscript.state.loops.length > 0) { 
				mscript.fail('Cannot go to absolute camera frame within a loop... yet.'); 
			}
			target = parseInt(lines[i].split('CAM ')[1]);
			if (target > mscript.state.cam) {
				dist = target - mscript.state.cam;
				for (var x = 0; x < dist; x++) {
					arr.push('BF');
					mscript.state_update('BF');
				} 
			} else {
				dist = mscript.state.cam - target;
				for (var x = 0; x < dist; x++) {
					arr.push('BB');
					mscript.state_update('BB');
				}
			}
		} else if (lines[i].substring(0, 4) === 'PROJ') { //directly go to that frame
			if (mscript.state.loops.length > 0) { 
				mscript.fail('Cannot go to absolute projector frame within a loop... yet.'); 
			}
			target = parseInt(lines[i].split('PROJ ')[1]);
			if (target > mscript.state.proj) {
				dist = target - mscript.state.proj;
				for (var x = 0; x < dist; x++) {
					arr.push('PF');
					mscript.state_update('PF');
				} 
			} else {
				dist = mscript.state.proj - target;
				for (var x = 0; x < dist; x++) {
					arr.push('PB');
					mscript.state_update('PB');
				} 
			}
		} else if (lines[i].substring(0, 3) === 'SET') { //set that state
			if (lines[i].substring(0, 7) === 'SET CAM') {
				mscript.state.cam = parseInt(lines[i].split('SET CAM')[1]);
			} else if (lines[i].substring(0, 8) === 'SET PROJ') {
				mscript.state.proj = parseInt(lines[i].split('SET PROJ')[1]);
			}
		} else if (lines[i].substring(0, 1) === '#' || lines[i].substring(0, 2) === '//') {
			//comments
			//ignore while parsing
		}
	}
	output.success = true;
	output.arr = arr;
	output.cam = mscript.state.cam;
	output.proj = mscript.state.proj;
	if (typeof callback !== 'undefined') {
		//should only be invoked by running mscript.tests()
		callback(output);
	} else {
		return mscript.output(output);
	}
};
mscript.last_loop = function last_loop () {

	return mscript.state.loops[mscript.state.loops.length - 1];
};
mscript.parent_loop = function parent_loop () {

	return mscript.state.loops[mscript.state.loops.length - 2];
};
mscript.state_update = function state_update (cmd, val) {
	if (cmd === 'END') {
		for (var i = 0; i < val; i++) {
			if (mscript.state.rec === 0) {
				mscript.state.cam += mscript.state.loops[mscript.state.rec].cam;
				mscript.state.proj += mscript.state.loops[mscript.state.rec].proj;
			} else if (mscript.state.rec >= 1) {
				mscript.state.loops[mscript.state.rec - 1].cam += mscript.state.loops[mscript.state.rec].cam;
				mscript.state.loops[mscript.state.rec - 1].proj += mscript.state.loops[mscript.state.rec].proj;
			}
		}
	} else if (cmd === 'CF') {
		if (mscript.state.loops.length < 1) {
			mscript.state.cam++;
		} else {
			mscript.state.loops[mscript.state.rec].cam++;
		}
	} else if (cmd === 'CB') {
		if (mscript.state.loops.length < 1) {
			mscript.state.cam--;
		} else {
			mscript.state.loops[mscript.state.rec].cam--;
		}
	} else if (cmd === 'PF') {
		if (mscript.state.loops.length < 1) {
			mscript.state.proj++;
		} else {
			mscript.state.loops[mscript.state.rec].proj++;
		}		
	} else if (cmd === 'PB') {
		if (mscript.state.loops.length < 1) {
			mscript.state.proj--;
		} else {
			mscript.state.loops[mscript.state.rec].proj--;
		}		
	} else if (cmd === 'BF') {
		if (mscript.state.loops.length < 1) {
			mscript.state.cam++;
		} else {
			mscript.state.loops[mscript.state.rec].cam++;
		}		
	} else if (cmd === 'BB') {
		if (mscript.state.loops.length < 1) {
			mscript.state.cam--;
		} else {
			mscript.state.loops[mscript.state.rec].cam++;
		}		
	}
};
mscript.str_to_arr = function str_to_arr (str, cmd) {
	var cnt = str.split(cmd),
		c = parseInt(cnt[1]),
		arr = [];
	if (cnt[1] === '') {
		c = 1;
	} else {
		c = parseInt(cnt[1]);
	}
	for (var i = 0; i < c; i++) {
		arr.push(cmd);
		mscript.state_update(cmd);
	}
	return arr;
};
mscript.loop_count = function loop_count (str) {

	return parseInt(str.split('LOOP ')[1]);
};
mscript.fail = function fail (reason) {
	console.error(JSON.stringify({success: false, error: true, msg : reason}));
	process.exit();
};
mscript.output = function output (data) {
	var json = true; //default
	if (mscript.arg('-j', '--json')) {
		json = true;
	}

	if (mscript.arg('-t', '--text')) {
		json = false;
	}

	if (json) {
		console.log(JSON.stringify(data));
	} else {
		var ids = Object.keys(data);
		for (var i = 0; i < ids.length; i++) {
			console.log(ids[i] + ': ' + data[ids[i]]);
		}
	}
};
mscript.init = function init () {
	if (mscript.arg('-t', '--tests')) {
		return mscript.tests();
	}

	if (mscript.arg('-v', '--verbose')) {
		console.time('mscript');
	}

	if (mscript.arg('-c', '--cam')) {
		mscript.state.cam = parseInt(process.argv[mscript.arg_pos('-c', '--cam') + 1]);
	}

	if (mscript.arg('-p', '--proj')) {
		mscript.state.proj = parseInt(process.argv[mscript.arg_pos('-p', '--proj') + 1]);
	}

	if (mscript.arg('-f', '--file')) {
		input = process.argv[mscript.arg_pos('-f', '--file') + 1];
		mscript.interpret(fs.readFileSync(input, 'utf8'));
	} else {
		mscript.interpret(input);
	}

	if (mscript.arg('-v', '--verbose')) {
		console.timeEnd('mscript');
	}
};

mscript.tests = function tests () {
	console.log('Running mscript tests');
	console.time('Tests took');

	mscript.alts_unique(); //perform check only during tests
	var fail = function (script, obj) {
		console.log('...Failed :(');
		console.log(script);
		console.log(obj);
		process.exit();
	};
	var script = 'CF\nPF\nCB\nPB\nBF\nBB';
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

	console.log('All tests completed');
	console.timeEnd('Tests took');
};

if (!module.parent) {
	if (typeof process !== 'undefined') {
		fs = require('fs');
		input = process.argv[2];
		mscript.init();
	} else {
		//web
	}
} else {
	console.log('module here');
	fs = require('fs');
	module.exports = mscript;
}

/*

CAM # - go to camera frame #
PROJ # - go to projector frame #

SET CAM # - sets camera count to #
SET PROJ # - sets projector count to #

LOOP # - begin loop, can nest recursively, # times
END LOOP - (or END) closes loop

CF - Camera forwards
PF - Projector forwards
BF - Black forwards
CB - Camera backwards
PB - Projector backwards
BB - Black backwards

*/
var seq = {},
	capture = {};

/******
	Sequence Object
*******/
seq.i = 0;
seq.time = 0;
seq.stopState = false;

mcopy.loop = 1;
mcopy.loopCount = 0;
capture.active = false;
capture.report = '';

seq.cmds = {
	cam_forward : 'CF',
	cam_backward : 'CB',

	proj_forward : 'PF',
	proj_backward : 'PB',

	black_forward : 'BF',
	black_backward : 'BB',

	//dual commands
	cam2_forward : 'C2F',
	cam2_backward : 'C2B',

	cams_forward : 'CCF',
	cams_forward : 'CCB',

	cam_forward_cam2_backward : 'CFCB',
	cam_backward_cam2_forward : 'CBCF',

	proj2_forward : 'P2F',
	proj2_backward : 'P2B',

	projs_forward : 'PPF',
	projs_backward : 'PPB',

	proj_forward_proj2_backward : 'PFPB',
	proj_backward_proj2_forward : 'PBPF'
}

seq.run = function () {
	'use strict';
	var c = mcopy.state.sequence.arr[seq.i],
		timeEnd = 0,
		rgb,
	action = function () {
		setTimeout(function () {
			seq.i++;
			seq.run();
		}, mcopy.cfg.arduino.sequenceDelay);
	}
	if (seq.i == 0) {
		$('#loop_current').text(gui.fmtZero(mcopy.loopCount + 1, 6));
		ipcRenderer.send('seq', { action : 'loop' });
	}
	if (seq.stop()) {
		$('.row input').removeClass('h');
		$('#numbers div').removeClass('h');
		//console.log('Sequence stepped');
		log.info('Sequence stopped', 'SERIAL', true);
		return false;
	}
	if (seq.i <= mcopy.state.sequence.arr.length && c !== undefined) {
		log.info('Step ' + seq.i + ' command ' + c, 'SEQUENCE', true);
		//gui action
		$('.row input').removeClass('h');
		$('#numbers div').removeClass('h');
		$('.row input[x=' + seq.i + ']').addClass('h');
		$('#numbers div[x=' + seq.i + ']').addClass('h');
		if (c === 'CF'){
			rgb = mcopy.state.sequence.light[seq.i].split(',');
			cmd.cam_forward(rgb, action);
		} else if (c === 'CB') {
			rgb = mcopy.state.sequence.light[seq.i].split(',');
			cmd.cam_backward(rgb, action);
		} else if (c === 'PF') {
			cmd.proj_forward(action);
		} else if (c === 'PB') {
			cmd.proj_backward(action);
		} else if (c === 'BF') {
			cmd.black_forward(action);
		} else if (c === 'BB') {
			cmd.black_backward(action);
		}
	} else {
		mcopy.loopCount++;
		$('#loop_current').text(gui.fmtZero(mcopy.loopCount + 1, 6));
		if (mcopy.loopCount < mcopy.loop) {
			log.info('Loop ' + mcopy.loopCount + ' completed', 'SEQUENCE', true);
			$('.row input').removeClass('h');
			$('#numbers div').removeClass('h');
			seq.i = 0;
			seq.run();
		} else {
			timeEnd = +new Date();
			timeEnd = timeEnd - seq.time;
			if (timeEnd < 2000) {
				log.info('Sequence completed in ' + timeEnd + 'ms', 'SEQUENCE', true);
			} else {
				log.info('Sequence completed in ' + humanizeDuration(timeEnd), 'SEQUENCE', true);
			}
			ipcRenderer.send('seq', { action : 'stop' });
			//capture.report = ipcRenderer.sendSync('transfer', { action: 'end'});
			//if (capture.active) {
				//alert(capture.report);
			//}
			gui.notify('Sequence done!', (mcopy.state.sequence.arr.length * mcopy.loop) + ' actions completed in ' + humanizeDuration(timeEnd));
			//clear gui
			$('.row input').removeClass('h');
			$('#numbers div').removeClass('h');
			$('#loop_current').text('');
			seq.stats();
		}
	}
};
seq.stop = function (state) {
	'use strict';
	if (typeof state === 'undefined') {
		if (seq.stopState === true) {
			ipcRenderer.send('seq', { action : 'stop' });
		}
		return seq.stopState;
	} else {
		seq.stopState = state;
	}
	if (state === false) {
		mcopy.loopCount = 0
		$('#loop_current').text('');
	} else {
		ipcRenderer.send('seq', { action : 'stop' });
	}
	return state
};
seq.init = function (start) {
	'use strict';
	if (typeof start === 'undefined') {
		start = 0;
		mcopy.loopCount = 0;
		seq.time = +new Date();
	}
	seq.stop(false);
	seq.i = start;

	//ipcRenderer.sendSync('transfer', { action: 'start'});
	ipcRenderer.send('seq', { action : 'start' });
	seq.run();
};
seq.stats = function () {
	'use strict';
	var ms = 0,
		c = '',
		cam_total = 0,
		proj_total = 0,
		real_total = mcopy.state.sequence.arr.filter(function (elem) {
			if (elem === undefined) {
				return false;
			}
			return true;
		});

	//timing
	for (var i = 0; i < mcopy.state.sequence.arr.length; i++) {
		c = mcopy.state.sequence.arr[i];
		if (c === 'CF' || c === 'CB'){
			ms += mcopy.cfg.arduino.cam.time;
			ms += mcopy.cfg.arduino.cam.delay;
			ms += mcopy.cfg.arduino.serialDelay;
		}
		if (c === 'PF' || c === 'PB'){
			ms += mcopy.cfg.arduino.proj.time;
			ms += mcopy.cfg.arduino.proj.delay;
			ms += mcopy.cfg.arduino.serialDelay;
		}
		if (c === 'BF' || c === 'BB'){
			ms += mcopy.cfg.arduino.black.before;
			ms += mcopy.cfg.arduino.black.after;
			ms += mcopy.cfg.arduino.cam.time;
			ms += mcopy.cfg.arduino.cam.delay;
			ms += mcopy.cfg.arduino.serialDelay;
		}
		ms += mcopy.cfg.arduino.sequenceDelay;

		if (c === 'CF' || c === 'BF') {
			cam_total++;
		}
		if (c === 'CB' || c === 'BB') {
			cam_total--;
		}
		if (c === 'PF') {
			proj_total++;
		}
		if (c === 'PB') {
			proj_total--;
		}
	}

	//timing
	ms = ms * mcopy.loop;
	if (ms < 2000) {
		$('#seq_stats .timing span').text(ms + 'ms');
	} else {
		$('#seq_stats .timing span').text(humanizeDuration(ms));
	}

	//ending frames
	cam_total = cam_total * mcopy.loop;
	proj_total = proj_total * mcopy.loop;

	$('#seq_stats .cam_end span').text(gui.fmtZero(mcopy.state.camera.pos + cam_total, 6));
	$('#seq_stats .proj_end span').text(gui.fmtZero(mcopy.state.projector.pos + proj_total, 6));

	//count
	$('#seq_stats .seq_count span').text(real_total.length * mcopy.loop);
	return ms;
};
seq.clear = function () {
	'use strict';
	mcopy.state.sequence.size = 24;
	mcopy.state.sequence.arr = [];
};

/**
 * Queue for exec function
 */
seq.queue = [];
seq.running = false;
seq.state = {};
/**
 * Execute an array of commands, locking up the UI during execution.
 */
seq.exec = function (arr) {
	'use strict';
	seq.running = true;
	seq.state.len = arr.length;
	//setup queue
	seq.queue = arr;
	//console.dir(arr);
	gui.overlay(true);
	gui.spinner(true, `Running sequence of ${arr.length} frame${(arr.length === 1 ? '' : 's')}`, 0);
	log.info(`Sequence started`, 'SEQUENCE', true);
	seq.step();
};

seq.execStop = function (msg) {
	'use strict';
	gui.overlay(false);
	gui.spinner(false);
	log.info(`Sequence ${msg}`, 'SEQUENCE', true);
	return false;
};

seq.step = function () {
	'use strict';
	let elem;
	let c;
	let rgb;
	let current;
	let max;

	if (!seq.running) {
		return seq.execStop('stopped');
	}

	return setTimeout(() => {
		elem = seq.queue.shift();
		if (typeof elem !== 'undefined') {
			c = elem.cmd;
			if (typeof elem.light !== 'undefined') {
				rgb = elem.light.split(',');
			} else {
				rgb = light.color;
			}
		} else {
			return seq.execStop('completed');
		}
		if (typeof elem !== 'undefined') {
			current = seq.state.len - seq.queue.length;
			max = seq.state.len;
			gui.spinner(true, `Sequence: step ${c} ${current}/${max}`, (current / max) * 100);
			log.info(`Sequence: step ${c} ${current}/${max}`, 'SEQUENCE', true);
			if (c === 'CF'){
				cmd.cam_forward(rgb, seq.step);
			} else if (c === 'CB') {
				cmd.cam_backward(rgb, seq.step);
			} else if (c === 'PF') {
				cmd.proj_forward(seq.step);
			} else if (c === 'PB') {
				cmd.proj_backward(seq.step);
			} else if (c === 'BF') {
				cmd.black_forward(seq.step);
			} else if (c === 'BB') {
				cmd.black_backward(seq.step);
			}
		}
	}, mcopy.cfg.arduino.sequenceDelay);
};

module.exports = seq;
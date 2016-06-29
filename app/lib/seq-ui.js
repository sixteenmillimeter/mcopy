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

			capture.report = ipcRenderer.sendSync('transfer', { action: 'end'});
			if (capture.active) {
				alert(capture.report);
			}
			gui.notify('Sequence done!', (mcopy.state.sequence.arr.length * mcopy.loop) + ' actions completed in ' + humanizeDuration(timeEnd));
			//clear gui
			$('.row input').removeClass('h');
			$('#numbers div').removeClass('h');
			seq.stats();
		}
	}
};
seq.stop = function (state) {
	'use strict';
	if (typeof state === 'undefined') {
		return seq.stopState;
	} else {
		seq.stopState = state;
	}
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
	ipcRenderer.sendSync('transfer', { action: 'start'});
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

module.exports = seq;
const seq = {};
seq.id = 'sequence';
seq.arr = [];
seq.loops = 1;
seq.size = 24;

/******
	Sequence Object
*******/

/*seq.run = function () {
	'use strict';
	var c = mcopy.state.sequence.arr[seq.i],
		timeEnd = 0,
		rgb,
	action = function () {
		setTimeout(function () {
			seq.i++;
			seq.run();
		}, cfg.arduino.sequenceDelay);
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
		if (c === cfg.cmd.camera_forward){
			rgb = mcopy.state.sequence.light[seq.i].split(',');
			cmd.camera_forward(rgb, action);
		} else if (c === cfg.cmd.camera_backward) {
			rgb = mcopy.state.sequence.light[seq.i].split(',');
			cmd.camera_backward(rgb, action);
		} else if (c === cfg.cmd.projector_forward) {
			cmd.projector_forward(action);
		} else if (c === cfg.cmd.projector_backward) {
			cmd.projector_backward(action);
		} else if (c === cfg.cmd.black_forward) {
			cmd.black_forward(action);
		} else if (c === cfg.cmd.black_backward) {
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
			gui.notify('Sequence done!', (mcopy.state.sequence.arr.length * mcopy.loop) + ' actions completed in ' + humanizeDuration(timeEnd));
			//clear gui
			$('.row input').removeClass('h');
			$('#numbers div').removeClass('h');
			$('#loop_current').text('');
			seq.stats();
		}
	}
};*/
seq.stop = function (state) {
	'use strict';
	ipcRenderer.send('seq', { action : 'stop' });
	/*
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
	}*/
	return state
};
seq.init = function (start) {
	'use strict';
	/*if (typeof start === 'undefined') {
		start = 0;
		mcopy.loopCount = 0;
		seq.time = +new Date();
	}*/
	//seq.stop(false);
	//seq.i = start;

	ipcRenderer.send('seq', { action : 'start' });
	//seq.run();
};

seq.set = function (x, cmd) {
	let increase = 0;
	if (x >= seq.arr.length + 1) {
		increase =  x - seq.arr.length;
		for (let i = 0; i < increase; i++) {
			seq.arr.push({});
		}
	}
	if (!seq.arr[x]) seq.arr[x] = {};
	seq.arr[x].x = x;
	seq.arr[x].cmd = cmd;
	if (cmd.indexOf('C') !== -1) {
		seq.arr[x].light = light.color;
	} else {
		if (seq.arr[x].light) {
			delete seq.arr[x].light;
		}
	}
	//set
	ipcRenderer.send(seq.id, { set : [ seq.arr[x] ] });
	//update grid?
}

/**
 * Function bound to the change event on the loop counter
 * input element
 *
 * @param  {integer}  count 	Integer to set loops to
 */
seq.setLoops = function (count) {
	'use strict';
	seq.loops = count;
	seq.stats();
	ipcRenderer.send(seq.id, { loops : seq.count })
};

seq.stats = function () {
	'use strict';
	let ms = 0;
	let c = '';
	let cam_total = 0;
	let proj_total = 0;
	let real_total = mcopy.state.sequence.arr.filter(function (elem) {
		if (elem === undefined) {
			return false;
		}
		return true;
	});

	//timing
	for (let c of mcopy.state.sequence.arr) {
		if (c === cfg.cmd.camera_forward || c === cfg.cmd.camera_backward){
			ms += cfg.arduino.cam.time;
			ms += cfg.arduino.cam.delay;
			ms += cfg.arduino.serialDelay;
		}
		if (c === cfg.cmd.projector_forward || c === cfg.cmd.projector_backward){
			ms += cfg.arduino.proj.time;
			ms += cfg.arduino.proj.delay;
			ms += cfg.arduino.serialDelay;
		}
		if (c === cfg.cmd.black_forward || c === cfg.cmd.black_backward){
			ms += cfg.arduino.black.before;
			ms += cfg.arduino.black.after;
			ms += cfg.arduino.cam.time;
			ms += cfg.arduino.cam.delay;
			ms += cfg.arduino.serialDelay;
		}
		ms += cfg.arduino.sequenceDelay;

		if (c === cfg.cmd.camera_forward || c === cfg.cmd.black_forward) {
			cam_total++;
		}
		if (c === cfg.cmd.camera_backward || c === cfg.cmd.black_backward) {
			cam_total--;
		}
		if (c === cfg.cmd.projector_forward) {
			proj_total++;
		}
		if (c === cfg.cmd.projector_backward) {
			proj_total--;
		}
	}

	//timing
	ms = ms * seq.loops;
	if (ms < 2000) {
		$('#seq_stats .timing span').text(ms + 'ms');
	} else {
		$('#seq_stats .timing span').text(humanizeDuration(ms));
	}

	//ending frames
	cam_total = cam_total * seq.loops;
	proj_total = proj_total * seq.loops;

	$('#seq_stats .cam_end span').text(gui.fmtZero(mcopy.state.camera.pos + cam_total, 6));
	$('#seq_stats .proj_end span').text(gui.fmtZero(mcopy.state.projector.pos + proj_total, 6));

	//count
	$('#seq_stats .seq_count span').text(real_total.length * seq.loops);
	return ms;
};
seq.clear = function () {
	'use strict';
	seq.size = 24;
	seq.arr = [];
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
	gui.spinner(true, `Running sequence of ${arr.length} frame${(arr.length === 1 ? '' : 's')}`, 0, true);
	log.info(`Sequence started`, 'SEQUENCE', true);
	ipcRenderer.send('seq', { action : 'start' });
	//seq.step();
};

seq.cancel = function () {
	gui.spinner(true, `Cancelling sequence...`);
	seq.running = false;
}

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
			gui.spinner(true, `Sequence: step ${c} ${current}/${max}`, (current / max) * 100, true);
			log.info(`Sequence: step ${c} ${current}/${max}`, 'SEQUENCE', true);
			if (c === cfg.cmd.camera_forward){
				cmd.camera_forward(rgb, seq.step);
			} else if (c === cfg.cmd.camera_backward) {
				cmd.camera_backward(rgb, seq.step);
			} else if (c === cfg.cmd.projector_forward) {
				cmd.projector_forward(seq.step);
			} else if (c === cfg.cmd.projector_backward) {
				cmd.projector_backward(seq.step);
			} else if (c === cfg.cmd.black_forward) {
				cmd.black_forward(seq.step);
			} else if (c === cfg.cmd.black_backward) {
				cmd.black_backward(seq.step);
			}
		}
	}, cfg.arduino.sequenceDelay);
};

module.exports = seq;
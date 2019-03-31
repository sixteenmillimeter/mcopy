const seq = {};
seq.id = 'sequence';
seq.grid = [];
seq.gridLoops = 1;
seq.arr = [];
seq.loops = 1;
seq.size = 24;
seq.time = 0;
seq.running = false;

/******
	Sequence Object
*******/

seq.init = function () {
	seq.listen();
}

seq.listen = function () {
	ipcRenderer.on(seq.id, seq.listener);
}

seq.listener = function (event, arg) {
	//console.log(JSON.stringify(arg))
	if (arg.start) {
		if (typeof arg.loop !== 'undefined' && typeof arg.step !== 'undefined') {
			seq.activeStep(arg.step);
			log.info(`Step ${arg.step} running of ${arg.loop}`, 'SERIAL', true);
		} else if (typeof arg.loop !== 'undefined') {
			$('#loop_current').text(gui.fmtZero(arg.loop + 1, 6));
		} else {
			//
		}
	} else if (arg.stop) {
		if (typeof arg.loop !== 'undefined' && typeof arg.step !== 'undefined') {
			//console.log(JSON.stringify(arg))
			seq.progress(arg.step, arg.loop);
			seq.inactiveAll();
		} else if (typeof arg.loop !== 'undefined') {
			$('#loop_current').text('');
		} else {
			gui.overlay(false);
			gui.spinner(false);
			seq.progress(0, 0);
			log.info('Sequence stopped', 'SERIAL', true);
		}
	}
	return event.returnValue = true;
}

seq.progress = function (step, loop) {
	const len = seq.arr.length;
	const total = len * seq.loops;
	const pos = (loop * len) + step;
	const elem = $('.progress-bar');
	let progress;

	console.dir(`${len} * ${seq.loops} = ${total}`)
	console.dir(`(${len} * ${loop}) + ${step} = ${pos}`)
	console.dir(`${pos} / ${total} = ${(pos / total) * 100}`)
	if (pos === 0) {
		progress = 0;
	} else {
		progress = (pos / total) * 100;
	}
	elem.attr('aria-valuenow', progress);
	elem.css('width', `${progress}%`);
}

seq.activeStep = function (x) {
	seq.inactiveAll();
	//console.log(`.row input[x=${x + ''}]`)
	$(`.row input[x=${x + ''}]`).addClass('h');
	$(`#numbers div[x=${x + ''}]`).addClass('h');
}

seq.inactiveAll = function () {
	$('.row input').removeClass('h');
	$('#numbers div').removeClass('h');
}

seq.stop = function (s) {
	'use strict';
	ipcRenderer.send(seq.id, { stop : true });
	$('#loop_current').text('');
};
//start the sequencer from the grid
seq.start = function () {
	'use strict';
	seq.time = +new Date();
	seq.arr = seq.grid;
	seq.loops = seq.gridLoops;
	ipcRenderer.send(seq.id, { start : true });
};

//start a pre-set sequence, not using the gui
seq.exec = function (arr, loops) {
	'use strict';
	seq.time = +new Date();
	seq.arr = arr;
	seq.loops = loops;
	ipcRenderer.send(seq.id, { start : true, arr, loops });
};

seq.set = function (x, cmd) {
	'use strict';
	let increase = 0;
	if (x >= seq.grid.length + 1) {
		increase =  x - seq.grid.length;
		for (let i = 0; i < increase; i++) {
			seq.grid.push({});
		}
	}
	if (!seq.grid[x]) seq.grid[x] = {};
	seq.grid[x].x = x;
	seq.grid[x].cmd = cmd;
	if (cmd.indexOf('C') !== -1) {
		seq.grid[x].light = light.color;
	} else {
		if (seq.grid[x].light) {
			delete seq.grid[x].light;
		}
	}
	//set
	ipcRenderer.send(seq.id, { set : [ seq.grid[x] ] });
	//update grid?
}

seq.unset = function (x) {
	'use strict';
	seq.grid[x] = undefined
	ipcRenderer.send(seq.id, { unset : [ x ]});
}

/**
 * Set the light value at a specific step and then update
 * GUI grid via .state()
 *
 * @param {integer} x   Step in sequence
 * @param {array}   rgb Light value in RGB
 **/
seq.setLight = function (x, rgb) {
	'use strict';
	let color = rgb.join(',');
	seq.grid[x].light = color;
	ipcRenderer.send(seq.id, { x, cmd : seq.grid[x].cmd, light : color });
};

/**
 * Function bound to the change event on the loop counter
 * input element
 *
 * @param  {integer}  count 	Integer to set loops to
 */
seq.setLoops = function (count) {
	'use strict';
	seq.gridLoops = count;
	seq.stats();
	ipcRenderer.send(seq.id, { loops : seq.gridLoops })
};

seq.stats = function () {
	'use strict';
	let ms = 0;
	let c = '';
	let cam_total = 0;
	let proj_total = 0;
	let real_total = seq.grid.filter(function (elem) {
		if (elem === undefined) {
			return false;
		}
		return true;
	});

	//timing
	for (let step of seq.grid) {
		c = seq.cmd;
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
	ms = ms * seq.gridLoops;
	if (ms < 2000) {
		$('#seq_stats .timing span').text(ms + 'ms');
	} else {
		$('#seq_stats .timing span').text(humanizeDuration(ms));
	}

	//ending frames
	cam_total = cam_total * seq.gridLoops;
	proj_total = proj_total * seq.gridLoops;

	$('#seq_stats .cam_end span').text(gui.fmtZero(cam.pos + cam_total, 6));
	$('#seq_stats .proj_end span').text(gui.fmtZero(proj.pos + proj_total, 6));

	//count
	$('#seq_stats .seq_count span').text(real_total.length * seq.gridLoops);
	return ms;
};

seq.clear = function () {
	'use strict';
	seq.size = 24;
	seq.grid = [];
};

seq.cancel = function () {
	gui.spinner(true, `Cancelling sequence...`);
	seq.running = false;
	seq.stop();
}


module.exports = seq;
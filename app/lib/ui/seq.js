const seq = {};
seq.id = 'sequence';
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
	console.log(JSON.stringify(arg))
	if (typeof arg.loop !== 'undefined' && arg.start) {
		$('#loop_current').text(gui.fmtZero(arg.loop + 1, 6));
	} else if (typeof arg.loop !== 'undefined' && arg.stop) {
		$('#loop_current').text('');
	} else if (typeof arg.step !== 'undefined' && arg.start) {
		seq.activeStep(arg.step);
		log.info(`Step ${arg.step} active`, 'SERIAL', true);
	} else if (typeof arg.step !== 'undefined' && arg.stop) {
		seq.inactiveAll();
	} else if (arg.stop) {
		log.info('Sequence stopped', 'SERIAL', true);
	} else if (arg.start) {
		//
	}
	return event.returnValue = true;
}

seq.activeStep = function (x) {
	seq.inactiveAll();
	console.log(`.row input[x=${x + ''}]`)
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
seq.start = function (start) {
	'use strict';
	seq.time = +new Date();
	ipcRenderer.send(seq.id, { start : true });
};

seq.set = function (x, cmd) {
	'use strict';
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

seq.unset = function (x) {
	'use strict';
	seq.arr[x] = undefined
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
	seq.arr[x].light = color;
	ipcRenderer.send(seq.id, { x, cmd : seq.arr[x].cmd, light : color });
};

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
	ipcRenderer.send(seq.id, { loops : seq.loops })
};

seq.stats = function () {
	'use strict';
	let ms = 0;
	let c = '';
	let cam_total = 0;
	let proj_total = 0;
	let real_total = seq.arr.filter(function (elem) {
		if (elem === undefined) {
			return false;
		}
		return true;
	});

	//timing
	for (let step of seq.arr) {
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

seq.cancel = function () {
	gui.spinner(true, `Cancelling sequence...`);
	seq.running = false;
	seq.stop();
}


module.exports = seq;
const cmd = {};

/**
 * Move the projector one frame forward
 *
 * @param {function} callback  Function to call after projector moves one frame
 **/
cmd.projector_forward = function (callback) {
	'use strict';
	var res = function (ms) {
		$('#cmd_proj_forward').removeClass('active');
		gui.updateState();
		if (callback) { callback(ms); }
	};
	$('#cmd_proj_forward').addClass('active');
	if (!mcopy.state.projector.direction) {
		proj.set(true, function (ms) {				
			setTimeout(function () {
				proj.move(res);
			}, cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			proj.move(res);
		}, cfg.arduino.serialDelay);
	}
};
/**
 * Move the projector one frame backward
 *
 * @param {function} callback  Function to call after projector moves one frame
 **/
cmd.projector_backward = function (callback) {
	'use strict';
	var res = function (ms) {
		$('#cmd_proj_backward').removeClass('active');
		gui.updateState();
		if (callback) { callback(ms); }
	};
	$('#cmd_proj_backward').addClass('active');
	if (mcopy.state.projector.direction) {
		proj.set(false, function (ms) {
			setTimeout(function () {
				proj.move(res);
			}, cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			proj.move(res);
		}, cfg.arduino.serialDelay);
	}
};
/**
 * Move the camera one frame forward
 *
 * @param {array} 	 rgb 	   Color to set light for frame
 * @param {function} callback  Function to call after camera moves one frame
 **/
cmd.camera_forward = function (rgb, callback) {
	'use strict';
	var off = [0, 0, 0];
	var res = function (ms) {
		gui.updateState();
		setTimeout(function () {
			light.display(off);
			light.set(off, function () {
				$('#cmd_cam_forward').removeClass('active');
				if (callback) { callback(ms); }
			});
		}, cfg.arduino.serialDelay);	
	};
	$('#cmd_cam_forward').addClass('active');
	if (!mcopy.state.camera.direction) {
		cam.set(true, function () {
			setTimeout( function () {
				light.display(rgb);
				light.set(rgb, function () {
					setTimeout( function () {
						cam.move(res);
					}, cfg.arduino.serialDelay);
				});
			}, cfg.arduino.serialDelay);
		});
	} else {
		light.display(rgb);
		light.set(rgb, function () {
			setTimeout(function () {
				cam.move(res);
			}, cfg.arduino.serialDelay);
		});
	}
};
/**
 * Move the camera one frame forward, light set to black or off
 *
 * @param {function} callback  Function to call after camera moves one frame
 **/
cmd.black_forward = function (callback) {
	'use strict';
	var off = [0, 0, 0];
	var res = function (ms) {
		$('#cmd_black_forward').removeClass('active');
		gui.updateState();	
		if (callback) { callback(ms); }	
	};
	$('#cmd_black_forward').addClass('active');
	if (!mcopy.state.camera.direction) {
		cam.set(true, function () {
			setTimeout( function () {
				light.display(off);
				light.set(off, function () {
					setTimeout( function () {
						cam.move(res);
					}, cfg.arduino.serialDelay);
				});
			}, cfg.arduino.serialDelay);
		});
	} else {
		light.display(off);
		light.set(off, function () {
			setTimeout(function () {
				cam.move(res);
			}, cfg.arduino.serialDelay);
		});
	}
};
/**
 * Move the camera one frame backward
 *
 * @param {array} 	 rgb 	   Color to set light for frame
 * @param {function} callback  Function to call after camera moves one frame
 **/
cmd.camera_backward = function (rgb, callback) {
	'use strict';
	var off = [0, 0, 0];
	var res = function (ms) {
		gui.updateState();
		light.display(off);
		light.set(off, function () {
			$('#cmd_cam_backward').removeClass('active');
			if (callback) { callback(ms); }
		});	
	};
	$('#cmd_cam_backward').addClass('active');
	if (mcopy.state.camera.direction) {
		cam.set(false, function () {
			setTimeout(function () {
				light.display(rgb);
				light.set(rgb, function () {
					cam.move(res);
				});
			}, cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			light.display(rgb);
			light.set(rgb, function () {
				cam.move(res);
			});
		}, cfg.arduino.serialDelay);
	}
};
/**
 * Move the camera one frame forward, light set to black or off
 *
 * @param {function} callback  Function to call after camera moves one frame
 **/
cmd.black_backward = function (callback) {
	'use strict';
	var off = [0, 0, 0];
	var res = function (ms) {
		$('#cmd_black_backward').removeClass('active');
		gui.updateState();
		if (callback) { callback(ms); }
	};
	$('#cmd_black_backward').addClass('active');
	if (mcopy.state.camera.direction) {
		cam.set(false, function () {
			setTimeout(function () {
				light.display(off);
				light.set(off, function () {
					cam.move(res);
				});
			}, cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			light.display(off);
			light.set(off, function () {
				cam.move(res);
			});
		}, cfg.arduino.serialDelay);
	}
};

/*
	cam2_forward : 'C2F',
	cam2_backward : 'C2B',

	cams_forward : 'CCF',
	cams_forward : 'CCB',

	cam_forward_cam2_backward : 'CFCB',
	cam_backward_cam2_forward : 'CBCF',
*/
/**
 * Move the secondary projector forward one frame
 *
 * @param {function} callback  Function to call after action
 **/
cmd.projector_second_forward = function (callback) {};
cmd.projector_second_backward = function (callback) {};

cmd.projectors_forward = function (callback) {};
cmd.projectors_backward = function (callback) {};

cmd.projector_forward_projector_second_backward = function (callback) {};
cmd.projector_backward_projector_second_forward = function (callback) {};

/**
 * Move the camera to a specific frame. Accepts the input with the "move_cam_to"
 * value. Moves as black frames to prevent multiple exposure.
 *
 * @param {object} t  HTML input element with the move to val
 **/
cmd.camera_to = function (t) {
	const raw = $('#move_cam_to').val();
	const val = parseInt(raw);
	let proceed = false;
	let total;
	let steps = [];
	let c;
	let cont;
	if (val !== mcopy.state.camera.pos) {
		if (val < mcopy.state.camera.pos) {
			total = -(mcopy.state.camera.pos - val)
		} else if (val > mcopy.state.camera.pos) {
			total = val - mcopy.state.camera.pos
		}
		if (total > 0) {
			c = 'BF';
		} else if (total < 0) {
			c = 'BB';
		}
		for (let i = 0; i < Math.abs(total); i++) {
			steps.push({ cmd : c })
		}
		cont = confirm(`Do you want to ${(total > 0 ? 'advance' : 'rewind')} the camera ${total} frame${(total === 1 ? '' : 's')} to frame ${val}?`)
		if (cont) {
			seq.exec(steps);
		}
	}
};
/**
 * Move the projector to a specific frame. Accepts the input with the "move_proj_to"
 * value.
 *
 * @param {object} t  HTML input element with the move to val
 **/
cmd.projector_to = function (t) {
	const raw = $('#move_proj_to').val();
	const val = parseInt(raw);
	let proceed = false;
	let total;
	let steps = [];
	let c;
	let cont
	if (val !== mcopy.state.projector.pos) {
		if (val < mcopy.state.projector.pos) {
			total = -(mcopy.state.projector.pos - val)
		} else if (val > mcopy.state.projector.pos) {
			total = val - mcopy.state.projector.pos
		}
		if (total > 0) {
			c = 'PF';
		} else if (total < 0) {
			c = 'PB';
		}
		for (let i = 0; i < Math.abs(total); i++) {
			steps.push({ cmd : c })
		}
		cont = confirm(`Do you want to ${(total > 0 ? 'advance' : 'rewind')} the projector ${total} frame${(total === 1 ? '' : 's')} to frame ${val}?`)
		if (cont) {
			seq.exec(steps);
		}
	}
}

module.exports = cmd;
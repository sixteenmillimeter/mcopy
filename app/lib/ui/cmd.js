const cmd = {};

/**
 * Move the projector one frame forward
 *
 * @param {function} callback  Function to call after projector moves one frame
 **/
cmd.proj_forward = function (callback) {
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
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			proj.move(res);
		}, mcopy.cfg.arduino.serialDelay);
	}
};
/**
 * Move the projector one frame backward
 *
 * @param {function} callback  Function to call after projector moves one frame
 **/
cmd.proj_backward = function (callback) {
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
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			proj.move(res);
		}, mcopy.cfg.arduino.serialDelay);
	}
};
/**
 * Move the camera one frame forward
 *
 * @param {array} 	 rgb 	   Color to set light for frame
 * @param {function} callback  Function to call after camera moves one frame
 **/
cmd.cam_forward = function (rgb, callback) {
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
		}, mcopy.cfg.arduino.serialDelay);	
	};
	$('#cmd_cam_forward').addClass('active');
	if (!mcopy.state.camera.direction) {
		cam.set(true, function () {
			setTimeout( function () {
				light.display(rgb);
				light.set(rgb, function () {
					setTimeout( function () {
						cam.move(res);
					}, mcopy.cfg.arduino.serialDelay);
				});
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		light.display(rgb);
		light.set(rgb, function () {
			setTimeout(function () {
				cam.move(res);
			}, mcopy.cfg.arduino.serialDelay);
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
					}, mcopy.cfg.arduino.serialDelay);
				});
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		light.display(off);
		light.set(off, function () {
			setTimeout(function () {
				cam.move(res);
			}, mcopy.cfg.arduino.serialDelay);
		});
	}
};
/**
 * Move the camera one frame backward
 *
 * @param {array} 	 rgb 	   Color to set light for frame
 * @param {function} callback  Function to call after camera moves one frame
 **/
cmd.cam_backward = function (rgb, callback) {
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
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			light.display(rgb);
			light.set(rgb, function () {
				cam.move(res);
			});
		}, mcopy.cfg.arduino.serialDelay);
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
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			light.display(off);
			light.set(off, function () {
				cam.move(res);
			});
		}, mcopy.cfg.arduino.serialDelay);
	}
};
cmd.cam_to = function (t) {
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
cmd.proj_to = function (t) {
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
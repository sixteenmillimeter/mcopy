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
	if (!proj.dir) {
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
	if (proj.dir) {
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

cmd.projector_second_forward = function (callback) {
	'use strict';
	var res = function (ms) {
		$('#cmd_proj2_forward').removeClass('active');
		gui.updateState();
		if (callback) { callback(ms); }
	};
	$('#cmd_proj2_forward').addClass('active');
	if (!proj.second.dir) {
		proj.second.set(true, function (ms) {				
			setTimeout(function () {
				proj.second.move(res);
			}, cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			proj.second.move(res);
		}, cfg.arduino.serialDelay);
	}
};
cmd.projector_second_backward = function (callback) {
	'use strict';
	var res = function (ms) {
		$('#cmd_proj2_backward').removeClass('active');
		gui.updateState();
		if (callback) { callback(ms); }
	};
	$('#cmd_proj2_backward').addClass('active');
	if (proj.second.dir) {
		proj.second.set(false, function (ms) {
			setTimeout(function () {
				proj.second.move(res);
			}, cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			proj.second.move(res);
		}, cfg.arduino.serialDelay);
	}
};

/*
no ui for these?
cmd.projectors_forward = function (callback) {};
cmd.projectors_backward = function (callback) {};

cmd.projector_forward_projector_second_backward = function (callback) {};
cmd.projector_backward_projector_second_forward = function (callback) {};
*/

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
	if (!cam.dir) {
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
	if (!cam.dir) {
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
	if (cam.dir) {
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
	if (cam.dir) {
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
cmd.camera_second_forward = function (callback) {
	'use strict';
	var off = [0, 0, 0];
	var res = function (ms) {
		gui.updateState();
		setTimeout(function () {
			light.display(off);
			light.set(off, function () {
				$('#cmd_cam2_forward').removeClass('active');
				if (callback) { callback(ms); }
			});
		}, cfg.arduino.serialDelay);	
	};
	$('#cmd_cam2_forward').addClass('active');
	if (!cam.second.dir) {
		cam.second.set(true, function () {
			setTimeout( function () {
				light.display(rgb);
				light.set(rgb, function () {
					setTimeout( function () {
						cam.second.move(res);
					}, cfg.arduino.serialDelay);
				});
			}, cfg.arduino.serialDelay);
		});
	} else {
		light.display(rgb);
		light.set(rgb, function () {
			setTimeout(function () {
				cam.second.move(res);
			}, cfg.arduino.serialDelay);
		});
	}
};
cmd.camera_second_backward = function (callback) {
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
	if (cam.second.dir) {
		cam.second.set(false, function () {
			setTimeout(function () {
				light.display(rgb);
				light.set(rgb, function () {
					cam.second.move(res);
				});
			}, cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			light.display(rgb);
			light.set(rgb, function () {
				cam.second.move(res);
			});
		}, cfg.arduino.serialDelay);
	}
};

cmd.black_second_forward = function (callback) {
	'use strict';
	var off = [0, 0, 0];
	var res = function (ms) {
		$('#cmd_black2_forward').removeClass('active');
		gui.updateState();	
		if (callback) { callback(ms); }	
	};
	$('#cmd_black2_forward').addClass('active');
	if (!cam.second.dir) {
		cam.second.set(true, function () {
			setTimeout( function () {
				light.display(off);
				light.set(off, function () {
					setTimeout( function () {
						cam.second.move(res);
					}, cfg.arduino.serialDelay);
				});
			}, cfg.arduino.serialDelay);
		});
	} else {
		light.display(off);
		light.set(off, function () {
			setTimeout(function () {
				cam.second.move(res);
			}, cfg.arduino.serialDelay);
		});
	}
};

cmd.black2_backward = function (callback) {
	'use strict';
	var off = [0, 0, 0];
	var res = function (ms) {
		$('#cmd_black2_backward').removeClass('active');
		gui.updateState();
		if (callback) { callback(ms); }
	};
	$('#cmd_black2_backward').addClass('active');
	if (cam.second.dir) {
		cam.second.set(false, function () {
			setTimeout(function () {
				light.display(off);
				light.set(off, function () {
					cam.second.move(res);
				});
			}, cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			light.display(off);
			light.set(off, function () {
				cam.second.move(res);
			});
		}, cfg.arduino.serialDelay);
	}
};

/*
cmd.cameras_forward = function (callback) {};
cmd.cameras_backward = function (callback) {};

cmd.camera_forward_camera_second_backward = function (callback) {};
cmd.camera_backward_camera_second_forward = function (callback) {};
*/

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
	if (val !== cam.pos) {
		if (val < cam.pos) {
			total = -(cam.pos - val);
		} else if (val > cam.pos) {
			total = val - cam.pos;
		}
		if (total > 0) {
			c = cfg.cmd.black_forward;
		} else if (total < 0) {
			c = cfg.cmd.black_backward;
		}
		steps = [{ cmd : c, light : [0, 0, 0] }]
		cont = confirm(`Do you want to ${(total > 0 ? 'advance' : 'rewind')} the camera ${total} frame${(total === 1 ? '' : 's')} to frame ${val}?`)
		if (cont) {
			gui.overlay(true);
			gui.spinner(true, `Camera ${(total > 0 ? 'advancing' : 'rewinding')} ${total} frame${(total === 1 ? '' : 's')} `, true, false);
			seq.exec(steps, Math.abs(total));
		}
	}
};

/**
 * Move the secondary camera to a specific frame. Accepts the input with the "move_cam_to_2"
 * value. Moves as black frames to prevent multiple exposure.
 *
 * @param {object} t  HTML input element with the move to val
 **/
cmd.camera_second_to = function (t) {
	const raw = $('#move_cam_to_2').val();
	const val = parseInt(raw);
	let proceed = false;
	let total;
	let steps = [];
	let c;
	let cont;
	if (val !== cam.second.pos) {
		if (val < cam.second.pos) {
			total = -(cam.second.pos - val)
		} else if (val > cam.second.pos) {
			total = val - cam.second.pos;
		}
		if (total > 0) {
			c = cfg.cmd.black_second_forward;
		} else if (total < 0) {
			c = cfg.cmd.black_second_backward;
		}
		steps = [{ cmd : c, light : [0, 0, 0] }]
		cont = confirm(`Do you want to ${(total > 0 ? 'advance' : 'rewind')} the secondary camera ${total} frame${(total === 1 ? '' : 's')} to frame ${val}?`)
		if (cont) {
			gui.overlay(true);
			gui.spinner(true, `Second camera ${(total > 0 ? 'advancing' : 'rewinding')} ${total} frame${(total === 1 ? '' : 's')} `, true, true);
			seq.exec(steps, Math.abs(total));
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
	if (val !== proj.pos) {
		if (val < proj.pos) {
			total = -(proj.pos - val);
		} else if (val > proj.pos) {
			total = val - proj.pos;
		}
		if (total > 0) {
			c = cfg.cmd.projector_forward;
		} else if (total < 0) {
			c = cfg.cmd.projector_backward;
		} else {
			return false;
		}
		steps = [ { cmd : c }];
		cont = confirm(`Do you want to ${(total > 0 ? 'advance' : 'rewind')} the projector ${total} frame${(total === 1 ? '' : 's')} to frame ${val}?`)
		if (cont) {
			gui.overlay(true);
			gui.spinner(true, `Projector ${(total > 0 ? 'advancing' : 'rewinding')} ${total} frame${(total === 1 ? '' : 's')} `, true, true);
			seq.exec(steps, Math.abs(total));
		}
	}
}

/**
 * Move the secondary projector to a specific frame. Accepts the input with the "move_proj_to_2"
 * value.
 *
 * @param {object} t  HTML input element with the move to val
 **/
cmd.projector_second_to = function (t) {
	const raw = $('#move_proj_to_2').val();
	const val = parseInt(raw);
	let proceed = false;
	let total;
	let steps = [];
	let c;
	let cont
	if (val !== proj.second.pos) {
		if (val < proj.second.pos) {
			total = -(proj.second.pos - val);
		} else if (val > proj.second.pos) {
			total = val - proj.second.pos;
		}
		if (total > 0) {
			c = cfg.cmd.projector_second_forward;
		} else if (total < 0) {
			c = cfg.cmd.projector_second_backward;
		} else {
			return false;
		}
		steps = [ { cmd : c }];
		cont = confirm(`Do you want to ${(total > 0 ? 'advance' : 'rewind')} the secondary projector ${total} frame${(total === 1 ? '' : 's')} to frame ${val}?`)
		if (cont) {
			gui.overlay(true);
			gui.spinner(true, `Second projector ${(total > 0 ? 'advancing' : 'rewinding')} ${total} frame${(total === 1 ? '' : 's')} `, true, true);
			seq.exec(steps, Math.abs(total));
		}
	}
}

module.exports = cmd;
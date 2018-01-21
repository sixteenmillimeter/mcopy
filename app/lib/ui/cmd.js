var cmd = {};

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
cmd.black_forward = function (callback) {
	'use strict';
	var off = [0, 0, 0];
	var res = function (ms) {
		$('#cmd_black_forward').removeClass('active');
		gui.updateState();		
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
cmd.black_backward = function (callback) {
	'use strict';
	var off = [0, 0, 0];
	var res = function (ms) {
		$('#cmd_black_backward').removeClass('active');
		gui.updateState();
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

module.exports = cmd;
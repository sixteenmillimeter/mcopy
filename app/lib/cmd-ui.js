var cmd = {};

cmd.proj_forward = function (callback) {
	'use strict';
	var res = function (ms) {
		gui.updateState();
		if (callback) { callback(ms); }
	};
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
		gui.updateState();
		if (callback) { callback(ms); }
	};
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
	var res = function (ms) {
		gui.updateState();
		setTimeout(function () {
			light.display([0,0,0]);
			light.set([0, 0, 0], function () {
				if (callback) { callback(ms); }
			});
		}, mcopy.cfg.arduino.serialDelay);	
	};
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
	cmd.cam_forward(off, callback);
};
cmd.cam_backward = function (rgb, callback) {
	'use strict';
	var res = function (ms) {
		gui.updateState();
		light.display([0,0,0]);
		light.set([0, 0, 0], function () {
			if (callback) { callback(ms); }
		});	
	};
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
	cmd.cam_backward(off, callback);
};

module.exports = cmd;
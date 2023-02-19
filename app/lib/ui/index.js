/* jslint esversion: 6*/

const gui = {};

//GUI
gui.init = function () {
	gui.version();
};

gui.fmtZero = function (val, len) {
	'use strict';
	const raw = val;
	let str = val + '';
	let output = '';
	if (raw < 0) {
		output = '-' + Array(len - (str.length - 1)).join('0') + str.replace('-', '');
	} else {
		if (str.length < len) {
			output = Array(len - str.length).join('0') + str;
		} else if (str.length >= len) {
			str = parseInt(str) + '';
			output = Array(len - str.length).join('0') + str;
		}
	}
	return output;
};
gui.counterFormat = function (t, normal, prevent) {
	'use strict';
	const raw = t.value;
	t.value = gui.fmtZero(raw, 6);
	if (typeof normal !== 'undefined' && parseInt(raw) !== normal) {
		$(t).addClass('changed');
	} else {
		$(t).removeClass('changed');
	}
};
gui.counterUpdate = function (which, raw) {
	'use strict';
	const formattedVal = gui.fmtZero(raw, 6);
	$(`.${which} .count`).val(formattedVal);
};
gui.notifierWorking = true;
gui.notify = function (title, message) {
	'use strict';
	if (!gui.notifierWorking) {
		return true;
	}
	return new Promise((resolve, reject) => {
		try {
			notifier.notify({
				title: title,
				message: message,
				//icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons) 
				sound: true, // Only Notification Center or Windows Toasters 
				wait: true // Wait with callback, until user action is taken against notification 
				}, function (err, response) {
					// Response is response from notification 
					if (err) {
						gui.notifierWorking = false;
						log.error(`Error with notification`, err);
						return reject(err);
					}
					return resolve(true);
			});
		} catch (err) {
			gui.notifierWorking = false;
			//notify-send is not found
			//determine an alternate for raspian
			//this feels like a hack
		}
	});
};
gui.updateCam = async function (t) {
	'use strict';
	const val = t.value;
	let change;

	if (parseInt(val) === cam.pos) { 
		return false; 
	}
	change = await gui.confirm(`Are you sure you want to set camera counter to ${val}?`);

	if (change) {
		cam.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = cam.pos;
		gui.counterFormat(t);
	}
};
gui.updateCam2 = async function (t) {
	'use strict';
	const val = t.value;
	let change;

	if (parseInt(val) === cam.pos) { 
		return false; 
	}
	change = await gui.confirm(`Are you sure you want to set second camera counter to ${val}?`);

	if (change) {
		cam.second.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = cam.second.pos;
		gui.counterFormat(t);
	}
};
gui.updateProj = async function (t) {
	'use strict';
	const val = t.value;
	let change;
	if (parseInt(val) === proj.pos) { 
		return false; 
	}
	change = await gui.confirm(`Are you sure you want to set projector counter to ${val}?`);
	if (change) {
		proj.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = proj.pos;
		gui.counterFormat(t);
	}
	proj.setValue(t.value);
};
gui.updateProj2 = async function (t) {
	'use strict';
	const val = t.value;
	let change;
	if (parseInt(val) === proj.second.pos) { 
		return false; 
	}
	change = await gui.confirm(`Are you sure you want to set second projector counter to ${val}?`);
	if (change) {
		proj.second.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = proj.second.pos;
		gui.counterFormat(t);
	}
	proj.setValue(t.value);
};

gui.updateState = function () {
	'use strict';
	const cpos = cam.pos;
	const ppos = proj.pos;
	
	const p2pos = proj.second.pos;
	const c2pos = cam.second.pos;

	$('#seq_cam_count').val(cpos).change();
	$('#seq_proj_count').val(ppos).change();

	$('#seq_cam_count_2').val(cpos).change();
	$('#seq_proj_count_2').val(ppos).change();

	$('#seq_cam_2_count').val(c2pos).change();
	$('#seq_proj_2_count').val(p2pos).change();

	$('#seq_cam_2_count_2').val(c2pos).change();
	$('#seq_proj_2_count_2').val(p2pos).change();
};
gui.spinnerCfg =  {
	lines: 11, // The number of lines to draw
	length: 15, // The length of each line
	width: 7, // The line thickness
	radius: 20, // The radius of the inner circle
	corners: 1, // Corner roundness (0..1)
	rotate: 0, // The rotation offset
	direction: 1, // 1: clockwise, -1: counterclockwise
	color: '#F2F2F1', // #rgb or #rrggbb or array of colors
	speed: 1, // Rounds per second
	trail: 60, // Afterglow percentage
	shadow: true, // Whether to render a shadow
	hwaccel: true, // Whether to use hardware acceleration
	className: 'spinner', // The CSS class to assign to the spinner
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	top: '50%', // Top position relative to parent
	left: '50%' // Left position relative to parent
};
gui.spinner = function (state, msg, progress, cancel) {
	'use strict';
	let target;
	let spinner;
	if (msg && msg !== '') {
		gui.spinnerMsg(msg);
	}
	if (state && !$('#spinner').hasClass('created')) {
		target = document.getElementById('spinner');
		spinner = new Spinner(gui.spinnerCfg).spin(target);
		$('#spinnerProgress').hide();
		$('#spinner').addClass('created');
	} else if (state) {
		$('#spinner').show();
	} else if (!state) {
		$('#spinner').hide();
		gui.spinnerMsg('');
	}
	if (progress) {
		$('#spinnerProgress').show();
	} else {
		$('#spinnerProgress').hide();
	}
	if (cancel) {
		$('#spinnerCancel').show();
	} else {
		$('#spinnerCancel').hide();
	}
};
gui.spinnerMsg = function (msg) {
	'use strict';
	$('#spinnerMsg').text(msg);
};
gui.overlay = function (state) {
	'use strict';
	if (state) {
		$('#overlay').show();
	} else {
		$('#overlay').hide();
	}
};

gui.info = async function (title, message) {
	'use strict';
	const config = {
		type : 'info',
		buttons : ['Ok'],
		title: title,
		message : message
	};
	return dialog.showMessageBox(config);
};
gui.confirm = async function (message, cancel = 'Cancel') {
	const config = {
		buttons : ['Yes', cancel],
		message
	}
	const res = await dialog.showMessageBox(config);
	return res.response === 0;
};
gui.choice = async function (message, choices) {
	const config = {
		buttons : choices,
		defaultId : 0,
		message
	}
	const res = await dialog.showMessageBox(config);
	return res.response;
};
gui.warn = async function (title, message) {
	'use strict';
	const config = {
		type : 'warning',
		buttons : ['Ok'],
		title: title,
		message : message
	};
	return dialog.showMessageBox(config);
};
gui.error = function () {};

gui.version = function () {
	$('#version').text(PACKAGE.version);
}

module.exports = gui;
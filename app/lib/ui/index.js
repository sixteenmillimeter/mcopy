/* jslint esversion: 6*/

const gui = {};

//GUI
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
	const formattedVal = gui.fmtZero(raw, 6)
	$(`.${which} .count`).val(formattedVal);
};
gui.notify = function (title, message) {
	'use strict';
	notifier.notify({
		title: title,
		message: message,
		//icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons) 
		sound: true, // Only Notification Center or Windows Toasters 
		wait: true // Wait with callback, until user action is taken against notification 
		}, function (err, response) {
		// Response is response from notification 
	});
};
gui.updateCam = function (t) {
	'use strict';
	const val = t.value;
	let change;

	if (parseInt(val) === cam.pos) { 
		return false; 
	}
	change = confirm(`Are you sure you want to set camera counter to ${val}?`);

	if (change) {
		cam.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = cam.pos;
		gui.counterFormat(t);
	}
};
gui.updateProj = function (t) {
	'use strict';
	const val = t.value;
	let change;
	if (parseInt(val) === cam.pos) { 
		return false; 
	}
	change = confirm(`Are you sure you want to set projector counter to ${val}?`);
	if (change) {
		proj.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = proj.pos;
		gui.counterFormat(t);
	}
	proj.setValue(t.value);
};
gui.updateState = function () {
	'use strict';
	const cpos = cam.pos;
	const ppos = proj.pos;

	$('#seq_cam_count').val(cpos).change();
	$('#seq_proj_count').val(ppos).change();

	$('#seq_cam_count_2').val(cpos).change();
	$('#seq_proj_count_2').val(ppos).change();
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

gui.info = function (title, message) {
	'use strict';
	const config = {
		type : 'info',
		buttons : ['Ok'],
		title: title,
		message : message
	};
	dialog.showMessageBox(config);
	/*
	type String - Can be "none", "info", "error", "question" or "warning". On Windows, "question" displays the same icon as "info", unless you set an icon using the "icon" option.
	buttons Array - Array of texts for buttons.
	defaultId Integer - Index of the button in the buttons array which will be selected by default when the message box opens.
	title String - Title of the message box, some platforms will not show it.
	message String - Content of the message box.
	detail String - Extra information of the message.
	icon NativeImage
	cancelId Integer - The value will be returned when user cancels the dialog instead of clicking the buttons of the dialog. By default it is the index of the buttons that have "cancel" or "no" as label, or 0 if there is no such buttons. On OS X and Windows the index of "Cancel" button will always be used as cancelId, not matter whether it is already specified.
	noLink Boolean - On Windows Electron will try to figure out which one of the buttons are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set noLink to true.
	*/
};
gui.confirm = function () {};
gui.warn = function (title, message) {
	'use strict';
	const config = {
		type : 'warning',
		buttons : ['Ok'],
		title: title,
		message : message
	};
	dialog.showMessageBox(config);
};
gui.error = function () {};

module.exports = gui;
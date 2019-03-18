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

	if (parseInt(val) === mcopy.state.camera.pos) { 
		return false; 
	}
	change = confirm(`Are you sure you want to set camera counter to ${val}?`);

	if (change) {
		mcopy.state.camera.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = mcopy.state.camera.pos;
		gui.counterFormat(t);
	}
};
gui.updateProj = function (t) {
	'use strict';
	const val = t.value;
	let change;
	if (parseInt(val) === mcopy.state.projector.pos) { 
		return false; 
	}
	change = confirm(`Are you sure you want to set projector counter to ${val}?`);
	if (change) {
		mcopy.state.projector.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = mcopy.state.projector.pos;
		gui.counterFormat(t);
	}
	proj.setValue(t.value);
};
gui.updateState = function () {
	'use strict';
	const cpos = mcopy.state.camera.pos;
	const ppos = mcopy.state.projector.pos;

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
		$('#spinnerProgress').hide();
	}
	if (progress) {
		gui.spinnerProgress(progress);
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
gui.spinnerProgress = function (progress) {
	'use strict';
	let elem = $('#spinnerProgress .progress-bar');
	$('#spinnerProgress').show();
	elem.attr('aria-valuenow', progress);
	elem.css('width', `${progress}%`);
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

/******
	Sequencer grid
*******/
gui.grid = {};
gui.grid.swatchesElem = {};
gui.grid.init = function () {
	'use strict';
	gui.grid.refresh();
	seq.stats();
	gui.grid.events();
};

/**
 * Set a specific grid pad to the state stored in the sequence
 * array at that step
 *
 * @param {integer}  i 	Step in sequence
 **/
gui.grid.state = function (i) {
	'use strict';
	const elem = $(`input[x=${i}]`);
	const lightElem = $(`.L[x=${i}]`);
	if (typeof mcopy.state.sequence.arr[i] !== 'undefined') {
		elem.prop('checked', false);
		$(`.${mcopy.state.sequence.arr[i]}[x=${i}]`).prop('checked', true);
		if (mcopy.state.sequence.arr[i] === 'CF' || mcopy.state.sequence.arr[i] === 'CB') {
			lightElem.css('background', `rgb(${mcopy.state.sequence.light[i]})`)
				.addClass('a')
				.prop('title', `rgb(${mcopy.state.sequence.light[i]})`);

		} else {
			lightElem.css('background', 'transparent')
				.removeClass('a')
				.prop('title', '');
		}
	} else {
		lightElem.css('background', 'transparent')
			.removeClass('a')
			.prop('title', '');
	}
};
/**
 * Clears the UI of the grid and restores it to the 
 * state of the sequence.
 *
 **/
gui.grid.refresh = function () {
	'use strict';
	const cmds = ['cam_forward', 'proj_forward', 'cam_backward', 'proj_backward', 'light_set', 'numbers'];
	const check = '<input type="checkbox" x="xxxx" />';
	const div = '<div x="xxxx"></div>';
	const width = 970 - 34 + ((940 / 24) * Math.abs(24 - mcopy.state.sequence.size));
	let elem;
	
	$('#sequence').width(`${width}px`);
	for (let i = 0; i < cmds.length; i++) {
		$('#' + cmds[i]).empty();
		for (let x = 0; x < mcopy.state.sequence.size; x++) {
			if (i === cmds.length - 1) {
				elem = div.replace('xxxx', x);
				$('#' + cmds[i]).append($(elem).text(x));
			} else if (i === cmds.length - 2) {
				elem = div.replace('xxxx', x);
				$('#' + cmds[i]).append($(elem).addClass(mcopy.state.sequence.pads[cmds[i]]));
			} else {
				elem = check.replace('xxxx', x);
				$('#' + cmds[i]).append($(elem).addClass(mcopy.state.sequence.pads[cmds[i]]));
			}
			gui.grid.state(x);
		}
	}
};
/**
 * Function bound to click on grid pad elements
 *
 * @param  {object} t This, passed from clicked element
 **/
gui.grid.click = function (t) {
	'use strict';
	const i = parseInt($(t).attr('x'));
	let c;
	if ($(t).prop('checked')) {
		c = $(t).attr('class').replace('.', '');
		mcopy.state.sequence.arr[i] = c;
		if (c === 'CF' || c === 'CB') {
			mcopy.state.sequence.light[i] = light.color.join(',');
		} else {
			mcopy.state.sequence.light[i] = '';
		}
	} else {
		mcopy.state.sequence.arr[i] = undefined;
		delete mcopy.state.sequence.arr[i];
	}
	gui.grid.state(i);
	seq.stats();
};
/**
 * Clears the state of the sequence and then refreshes
 * the grid and then recalculates the stats on the sequence
 **/
gui.grid.clear = function () {
	'use strict';
	const doit = confirm('Are you sure you want to clear this sequence?');
	if (doit) {
		seq.clear();
		gui.grid.refresh();
		seq.stats();
		console.log('Sequencer cleared');
	}
};
/**
 * Function bound to the change event on the loop counter
 * input element
 *
 * @param  {object} t This, passed from changed element
 */
gui.grid.loopChange = function (t) {
	'use strict';
	const count = parseInt(t.value);
	mcopy.loop = count;
	seq.stats();
};
/**
 * Add 24 frames to the sequence in the GUI
 **/
gui.grid.plus_24 = function () {
	'use strict';
	mcopy.state.sequence.size += 24;
	gui.grid.refresh();
	console.log(`Sequencer expanded to ${mcopy.state.sequence.size} steps`);
};
/**
 * Set the light value at a specific step and then update
 * GUI grid via .state()
 *
 * @param {integer} x   Step in sequence
 * @param {array}   rgb Light value in RGB
 **/
gui.grid.setLight = function (x, rgb) {
	'use strict';
	mcopy.state.sequence.light[x] = rgb.join(',');
	gui.grid.state(x);
};
/**
 * Set light value to black (0,0,0) when double clicked
 *
 * @param {object} t This, passed from clicked element
 **/
gui.grid.blackout = function (t) {
	const elem = $(t);
	const i = elem.attr('x');
	if (typeof mcopy.state.sequence.light[i] === 'undefined') {
		return false;
	}
	if (mcopy.state.sequence.light[i] === '0,0,0') {
		gui.grid.setLight(i, light.color);
	} else {
		gui.grid.setLight(i, [0, 0, 0]);
	}	
};

/**
 * Change all lights at all camera commands to a specific
 * RGB value
 *
 * @param {array}  rgb  RGB value [255. 255, 255]
 */
gui.grid.changeAll = function (rgb) {
	'use strict';
	for (let [i, c] of mcopy.state.sequence.arr.entries()) {
		if (c === 'CF' || c === 'CB') {
			gui.grid.setLight(i, rgb);
		}
	}
};
/**
 * Display color swatch modal for selection of light
 * color value at specific step
 *
 * @param {integer} x   Position in sequence to change value
 **/
gui.grid.swatches = function (x) {
	'use strict';
	const current = mcopy.state.sequence.light[x];
	gui.grid.swatchesElem = w2popup.open({
		title   : 'Select Color',
		body    : $('#light-swatches').html(),
		buttons : '<button id="sequencer-ok" class="btn btn-default">Ok</button> <button id="sequencer-changeall" class="btn btn-warning">Change All</button> <button id="sequencer-cancel" class="btn btn-default">Cancel</button>',
		onClose : () => {}
	});
	$('.w2ui-msg-body .swatch').removeClass('default set');
	$(`.w2ui-msg-body .swatch[color="${current}"`).eq(0).addClass('default set');

	$('#sequencer-cancel').on('click', gui.grid.swatchesElem.close);
	$('#sequencer-changeall').on('click', function () {
		const doit = confirm('You sure you want to change all light settings?');
		const elem = $('.w2ui-msg-body .default');
		let rgb;
		if (doit && elem.length > 0) {
			rgb = elem.attr('color').split(',');
			gui.grid.changeAll(rgb);
			gui.grid.swatchesElem.close();
		} else if (doit && elem.length === 0) {
			gui.warn('Select Color', 'Please select a color to proceed.');
		}
	});
	$('#sequencer-ok').on('click', function () {
		var elem =  $('.w2ui-msg-body .default'),
			rgb;
		if (elem.length > 0) {
			rgb = elem.attr('color').split(',');
			gui.grid.setLight(x, rgb);
			light.color = rgb;
			gui.grid.swatchesElem.close();
		} else {
			gui.warn('Select Color', 'Please select a color to proceed.');
		}
	});
};

/**
 * Scroll the grid to a specific step
 *
 * @param {integer} i Step to scroll to
 **/
gui.grid.scrollTo = function (i) {
	'use strict';
	var w = 35 + 3; //width of pad + margin
	$('#seq_scroll').scrollLeft(i * w);
};

/**
 * Bind all events to sequence. Re-evaluate this in search
 * of memory leak issues with long sequences.
 **/
gui.grid.events = function () {
	'use strict';
	$(document.body).on('click', '#sequencer input[type=checkbox]', function () {
		gui.grid.click(this);
	});
	//$(document.body).on('click', '.L', function () {
		//alert('click');
		//console.log('please dont happen');
	//});
	$(document.body).on('dblclick', '.L', function () {
		gui.grid.blackout(this);
	});
	$(document.body).on('contextmenu', '.L', function (e) {
		var x = e.target.attributes.x.value;
		setTimeout(function () {
			gui.grid.swatches(x);
		}, 300);
		e.preventDefault();
		return false;
	});
	$('#seq_scroll').on('scroll', function () {
		var i = Math.ceil($('#seq_scroll').scrollLeft() / (35 + 3));
		$('#seq_scroll_state').val(gui.fmtZero(i, 6));
	});
	$('#seq_scroll_state').on('change', function () {
		var i = parseInt($(this).val());
		$(this).val(gui.fmtZero(i, 6));
		gui.grid.scrollTo(i);
	});
	$(document.body).on('click', '.w2ui-msg-body .swatch', function () {
		var color = $(this).attr('color'),
			title = $(this).attr('title');
		if (typeof color !== 'undefined') {
			color = color.split(',');
			$('.w2ui-msg-body .swatch').removeClass('default set');
			$('#light-swatches .swatch').removeClass('default set');
			$(this).addClass('default set');
			$('#light-swatches .swatch[title="' + title + '"]').eq(0).addClass('default set');
			light.color = color;
		}
	});
};

module.exports = gui;
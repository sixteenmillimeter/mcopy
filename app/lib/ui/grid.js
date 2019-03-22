/******
	Sequencer grid
*******/
const grid = {};
grid.swatchesElem = {};
grid.init = function () {
	'use strict';
	grid.refresh();
	seq.stats();
	grid.events();
};

/**
 * Set a specific grid pad to the state stored in the sequence
 * array at that step
 *
 * @param {integer}  x 	Step in sequence
 **/
grid.state = function (x) {
	'use strict';
	const elem = $(`input[x=${x}]`);
	const lightElem = $(`.L[x=${x}]`);
	const step = seq.arr[x];
	if (typeof step !== 'undefined') {
		elem.prop('checked', false);
		$(`.${step.cmd}[x=${x}]`).prop('checked', true);
		if (step.cmd === 'CF' || step.cmd === 'CB') {
			lightElem.css('background', `rgb(${step.light})`)
				.addClass('a')
				.prop('title', `rgb(${seq.light})`);

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
grid.refresh = function () {
	'use strict';
	const cmds = [
		'cam_forward', 
		'proj_forward', 
		'cam_backward', 
		'proj_backward', 
		'light_set', 
		'numbers'
	];
	const check = '<input type="checkbox" x="xxxx" />';
	const div = '<div x="xxxx"></div>';
	const width = 970 - 34 + ((940 / 24) * Math.abs(24 - seq.size));
	let elem;
	
	$('#sequence').width(`${width}px`);
	for (let i = 0; i < cmds.length; i++) {
		$('#' + cmds[i]).empty();
		for (let x = 0; x < seq.size; x++) {
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
			grid.state(x);
		}
	}
};
/**
 * Function bound to click on grid pad elements
 *
 * @param  {object} t This, passed from clicked element
 **/
grid.click = function (t) {
	'use strict';
	const x = parseInt($(t).attr('x'));
	let c;
	if ($(t).prop('checked')) {

		c = $(t).attr('class').replace('.', '');
		seq.set(x, c);
	} else {
		//seq.arr[i] = undefined;
		//delete seq.arr[i]; 
	}
	grid.state(x);
	seq.stats();
};
/**
 * Clears the state of the sequence and then refreshes
 * the grid and then recalculates the stats on the sequence
 **/
grid.clear = function () {
	'use strict';
	const doit = confirm('Are you sure you want to clear this sequence?');
	if (doit) {
		seq.clear();
		grid.refresh();
		seq.stats();
		log.info('Sequencer cleared');
	}
};
/**
 * Add 24 frames to the sequence in the GUI
 **/
grid.plus_24 = function () {
	'use strict';
	seq.size += 24;
	grid.refresh();
	log.info(`Sequencer expanded to ${seq.size} steps`);
};
/**
 * Set light value to black (0,0,0) when double clicked
 *
 * @param {object} t This, passed from clicked element
 **/
grid.blackout = function (t) {
	const elem = $(t);
	const x = elem.attr('x');
	if (typeof seq.arr[x].light === 'undefined') {
		return false;
	}
	if (seq.arr[x].light === '0,0,0') {
		seq.setLight(i, light.color);
	} else {
		seq.setLight(i, [0, 0, 0]);
	}	
};

/**
 * Change all lights at all camera commands to a specific
 * RGB value
 *
 * @param {array}  rgb  RGB value [255. 255, 255]
 */
grid.changeAll = function (rgb) {
	'use strict';
	let c;
	for (let step of seq.arr) {
		c = step.cmd;
		if (c === 'CF' || c === 'CB') {
			grid.setLight(i, rgb);
		}
	}
};
/**
 * Display color swatch modal for selection of light
 * color value at specific step
 *
 * @param {integer} x   Position in sequence to change value
 **/
grid.swatches = function (x) {
	'use strict';
	const current = seq.arr[x].light;
	grid.swatchesElem = w2popup.open({
		title   : 'Select Color',
		body    : $('#light-swatches').html(),
		buttons : '<button id="sequencer-ok" class="btn btn-default">Ok</button> <button id="sequencer-changeall" class="btn btn-warning">Change All</button> <button id="sequencer-cancel" class="btn btn-default">Cancel</button>',
		onClose : () => {}
	});
	$('.w2ui-msg-body .swatch').removeClass('default set');
	$(`.w2ui-msg-body .swatch[color="${current}"`).eq(0).addClass('default set');

	$('#sequencer-cancel').on('click', grid.swatchesElem.close);
	$('#sequencer-changeall').on('click', function () {
		const doit = confirm('You sure you want to change all light settings?');
		const elem = $('.w2ui-msg-body .default');
		let rgb;
		if (doit && elem.length > 0) {
			rgb = elem.attr('color').split(',');
			grid.changeAll(rgb);
			grid.swatchesElem.close();
		} else if (doit && elem.length === 0) {
			gui.warn('Select Color', 'Please select a color to proceed.');
		}
	});
	$('#sequencer-ok').on('click', function () {
		var elem =  $('.w2ui-msg-body .default'),
			rgb;
		if (elem.length > 0) {
			rgb = elem.attr('color').split(',');
			grid.setLight(x, rgb);
			light.color = rgb;
			grid.swatchesElem.close();
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
grid.scrollTo = function (i) {
	'use strict';
	var w = 35 + 3; //width of pad + margin
	$('#seq_scroll').scrollLeft(i * w);
};

/**
 * Bind all events to sequence. Re-evaluate this in search
 * of memory leak issues with long sequences.
 **/
grid.events = function () {
	'use strict';
	$(document.body).on('click', '#sequencer input[type=checkbox]', function () {
		grid.click(this);
	});
	//$(document.body).on('click', '.L', function () {
		//alert('click');
		//log.warn('please dont happen');
	//});
	$(document.body).on('dblclick', '.L', function () {
		grid.blackout(this);
	});
	$(document.body).on('contextmenu', '.L', function (e) {
		var x = e.target.attributes.x.value;
		setTimeout(function () {
			grid.swatches(x);
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
		grid.scrollTo(i);
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

module.exports = grid;
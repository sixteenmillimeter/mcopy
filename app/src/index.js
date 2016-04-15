var remote = require('remote'),
	fs = require('fs'),
	uuid = require('node-uuid'),
	ipcRenderer = require('electron').ipcRenderer,
	mcopy = {},
	light = {},
	nav = {},
	gui = {},
	log = {};
//console.log(ipcRenderer.sendSync('light', { 'fuck' : true }) );

mcopy.cfg = JSON.parse(fs.readFileSync('./data/cfg.json'), 'utf8');

/******
	State shared by ALL interfaces
*******/
mcopy.state = {
	version : 'alpha', //use for file compatibility check
	camera : {
		pos : 0,
		direction: true
	}, 
	projector : {
		pos : 0,
		direction: true
	},
	sequence : {
		size : 24,
		arr : ['CF', 'PF'],
		cmd : {
			camera: mcopy.cfg.arduino.cmd.camera,
			projector: mcopy.cfg.arduino.cmd.projector,
			cam_direction: mcopy.cfg.arduino.cmd.cam_direction,
			cam_direction: mcopy.cfg.arduino.cmd.proj_direction
		},
		pads: {
			cam_forward: 'CF',
			proj_forward : 'PF',
			black_forward : 'BF',

			cam_backward: 'CB',
			proj_backward : 'PB',
			black_backward : 'BB'
		}
	}
};

log.time = 'MM/DD/YY-HH:mm:ss';
log.count = 0;
log.init = function () {
	'use strict';
	$('#log').w2grid({ 
	    name   : 'log', 
	    columns: [                
	        { field: 'time', caption: 'Time', size: '22%' },
	        { field: 'action', caption: 'Action', size: '58%' },
	        { field: 'service', caption: 'Service', size: '20%' },
	        { field: 'status', caption: 'Status', size: '10%' },
	    ],
	    records: []
	});
	//{ recid: 1, time: moment().format(log.time), action: 'Started app', service: 'MAIN', status: true }
	log.info('Started app', 'MAIN', true);
	log.listen();
};
log.listen = function () {
	'use strict';
	ipcRenderer.on('log', function (event, arg) {
		log.display(arg.action, arg.service, arg.status, arg.time);
		return event.returnValue = true;
	});
};
log.display = function (action, service, status, time) {
	'use strict';
	var obj = {
		recid : log.count++,
		time : time,
		action : action,
		service : service,
		status : status
	}
	if (typeof time === 'undefined') {
		obj.time = moment().format(log.time);
	}
	w2ui['log'].add(obj);
	setTimeout(function () {
		$('#grid_log_table').animate({ 
			scrollTop: $('#grid_log_table').prop('scrollHeight')
		}, 100);
	}, 100);
	return obj;
};
log.report = function (obj) {
	'use strict';
	ipcRenderer.sendSync('log', obj);
};
log.info = function (action, service, status, time) {
	'use strict';
	var obj = log.display(action, service, status, time);
	log.report(obj);
	console.log(obj);
};


/******
	Sequencer grid
*******/
gui.grid = {};
gui.grid.layout = function () {
	'use strict';
	gui.grid.refresh();
	//mcopy.seq.stats();
};
gui.grid.state = function (i) {
	'use strict';
	if (mcopy.state.sequence.arr[i] !== undefined) {
		$('input[x=' + i + ']').prop('checked', false);
		$('.' + mcopy.state.sequence.arr[i] + '[x=' + i + ']').prop('checked', true);
	}
};
gui.grid.refresh = function () {
	'use strict';
	var cmds = ['cam_forward', 'proj_forward', 'black_forward', 'cam_backward', 'proj_backward', 'black_backward'],
		check = '',
		width = 970 + ((940 / 24) * Math.abs(24 - mcopy.state.sequence.size));
	$('#sequence').width(width + 'px');
	for (var i = 0; i < cmds.length; i++) {
		$('#' + cmds[i]).empty();
		for (var x = 0; x < mcopy.state.sequence.size; x++) {
			check = '<input type="checkbox" x="xxxx" />'.replace('xxxx', x);
			
			if (i === cmds.length - 1) {
				$('#' + cmds[i]).append($('<div>').append($(check).addClass(mcopy.state.sequence.pads[cmds[i]])).append($('<div>').text(x)));
			} else {
				$('#' + cmds[i]).append($(check).addClass(mcopy.state.sequence.pads[cmds[i]]));
			}
			gui.grid.state(x);
		}
	}
};
gui.grid.click = function (t) {
	'use strict';
	var i = parseInt($(t).attr('x'));
	if ($(t).prop('checked')) {
		mcopy.log( $(t).attr('class').replace('.', ''));
		mcopy.state.sequence.arr[i] = $(t).attr('class').replace('.', '');
		gui.grid.state(i);
	} else {
		mcopy.state.sequence.arr[i] = undefined;
		delete mcopy.state.sequence.arr[i];
	}
	mcopy.seq.stats();
};
gui.grid.clear = function () {
	'use strict';
	var doit = confirm('Are you sure you want to clear this sequence?');
	if (doit) {
		mcopy.seq.clear();
		gui.grid.refresh();
		mcopy.seq.stats();
		mcopy.log('Sequencer cleared');
	}
};
gui.grid.loopChange = function (t) {
	'use strict';
	count = parseInt(t.value);
	mcopy.loop = count;
	mcopy.log('Loop count set to ' + mcopy.loop);
	mcopy.seq.stats();
};
gui.grid.plus_24 = function () {
	'use strict';
	mcopy.state.sequence.size += 24;
	gui.grid.refresh();
	mcopy.log('Sequencer expanded to ' + mcopy.state.sequence.size + ' steps');
};
gui.grid.events = function () {
	'use strict';
	$(document.body).on('click', 'input[type=checkbox]', function () {
		gui.grid.click(this);
	});
};

//LIGHT
light.preview = false;
light.color = [0, 0, 0]; //preview status
light.current = [0, 0, 0]; //last sent
light.icon = {};
light.init = function () {
	'use strict';

	light.icon = document.createElement('style');
	light.icon.innerHTML = 'span.mcopy-light{background-color: #000;}';
	document.body.appendChild(light.icon);

	$('#colors-tabs').w2tabs({
		name: 'colors',
		active: 'rgb',
		tabs: [
			{ id: 'rgb', caption: 'RGB' },
			{ id: 'cmy', caption: 'CMY'},
			{ id: 'kelvin', caption: 'Kelvin'}
		],
		onClick: function (event) {
			//$('#colors-content').html('Tab: ' + event.target);
		}
	});
	/*var myColorPicker = new ColorPicker({
	    color: '', // see Colors...
	    mode: 'rgb-b', // initial mode the color picker is starting with
	    fps: 60, // the framerate colorPicker refreshes the display if no 'requestAnimationFrame'
	    delayOffset: 8, // pixels offset when shifting mouse up/down inside input fields before it starts acting as slider
	    CSSPrefix: 'cp-', // the standard prefix for (almost) all class declarations (HTML, CSS)
	    size: 0, // one of the 4 sizes: 0 = L (large), 1 = S, 2 = XS, 3 = XXS; resize to see what happens...
	    allMixDetails: true, // see Colors...
	    alphaBG: 'w', // initial 3rd layer bgColor (w = white, c = custom (customBG), b = black);
	    customBG: '#808080', // see Colors...
	    noAlpha: true, // disable alpha input (all sliders are gone and current alpha therefore locked)
	    cmyOnly: false, // display CMY instead of CMYK
	    memoryColors: [], // array of colors in memory section
	    opacityPositionRelative: undefined, // render opacity slider arrows in px or %
	    customCSS: undefined, // if external stylesheet, internal will be ignored...
	    appendTo: document.body, // the HTMLElement the colorPicker will be appended to on initialization
	    noRangeBackground: false, // performance option: doesn't render backgrounds in input fields if set to false
	    textRight: false, // not supported yet. Make numbers appear aligned right
	    noHexButton: false, // button next to HEX input could be used for some trigger...
	    noResize: false, // enable / disable resizing of colorPicker
	    noRGBr: false, // active / passive button right to RGB-R display. Disables rendering of 'real' color possibilities...
	    noRGBg: false, // same as above
	    noRGBb: false, // same as above
	    CSSStrength: 'div.', // not in use
	    devPicker: false, // uses existing HTML instead of internal template for developing
	    renderCallback: function(colors, mode){

	    }, // callback on after rendering (for further rendering outside colorPicker)
	    actionCallback: function(e, action){

	    }, // callback on any action within colorPicker (buttons, sliders, ...)
	    convertCallback: function(colors, type){
	    	var a = colors.RND.rgb;
	    	light.display([a.r, a.g, a.b]);

	    }, // see Colors...
	});*/
	var colors = jsColorPicker('#rgb', {
		customBG: '#222',
		readOnly: true,
		size: 3,
		appendTo : document.getElementById('rgb-page'),
		// patch: false,
		init: function(elm, colors) { // colors is a different instance (not connected to colorPicker)
			elm.style.backgroundColor = elm.value;
			elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
		},
		convertCallback: function(colors, type){
			//console.dir(type);
	    	var a = colors.RND.rgb,
	    		rgb = [a.r, a.g, a.b];
	    	light.color = rgb;
	    	if (light.preview) {
	    		light.display(rgb);
				light.set(rgb);
			}

	    }
	});
	light.display([0, 0, 0]);
	$('#preview').on('change', function () {
		light.preview = $(this).prop('checked');
		if (light.preview) {
			light.display(light.color);
			light.set(light.color);
		} else {
			light.display([0,0,0]);
			light.set([0,0,0]);
		}
	});
};
//rgb = [0,0,0]
light.set = function (rgb) {
	'use strict';
	light.current = rgb;
	return ipcRenderer.sendSync('light', rgb);
};
light.display = function (rgb) {
	'use strict';
	var str,
		i;
	for (i = 0; i < 3; i++) {
		rgb[i] = Math.floor(rgb[i]);
		$('#light-status form input').eq(i).val(rgb[i]);
	}
	str = 'rgb(' + rgb.join(',') + ')';
	$('#color').css('background-color', str);
	light.icon = document.styleSheets[document.styleSheets.length - 1];
	light.icon.deleteRule(0);
	light.icon.insertRule('span.mcopy-light{background-color: ' + str + ';}', 0)
};
light.color_on = false;
light.color_init = function () {
	'use strict';
	if (!light.color_on) {
		$('#rgb').focus();
		light.color_on = true;
	}
};

nav.init = function () {
	'use strict';
	$('#toolbar').w2toolbar({
		name: 'toolbar',
		items: [
			{ type: 'radio',  id: 'sequencer',  group: '1', caption: 'Sequencer', icon: 'fa fa-th', checked: true },
			{ type: 'radio',  id: 'script',  group: '1', caption: 'Script', icon: 'fa fa-code' },
			{ type: 'radio',  id: 'controls',  group: '1', caption: 'Controls', icon: 'fa fa-tasks' },
			{ type: 'radio',  id: 'light',  group: '1', caption: 'Light', icon: 'mcopy-light' },
			{ type: 'spacer' },
			{ type: 'button',  id: 'settings',  group: '1', caption: 'Settings', icon: 'fa fa-cogs' }
		],
		onClick : function (event) {
			nav.change(event.target);
		}
	});
};
nav.change = function (id) {
	'use strict';
	$('.screen').hide();
	$('#' + id).show();
	if (id === 'light') {
		light.color_init();
	} else if (id === 'controls') {
		w2ui['log'].resize();
	}
};

var init = function () {
	'use strict';
	nav.init();
	gui.grid.layout();
	log.init();
	light.init();
};
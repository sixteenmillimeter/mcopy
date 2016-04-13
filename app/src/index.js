var remote = require('remote'),
	ipcRenderer = require('electron').ipcRenderer,
	light = {},
	nav = {},
	log = {};
//console.log(ipcRenderer.sendSync('light', { 'fuck' : true }) );

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
//color = [0,0,0]
light.set = function (rgb) {
	'use strict';
	light.current = rgb;
	ipcRenderer.sendSync('light', rgb);
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
	}
};

nav.init = function () {
	'use strict';
	$('#toolbar').w2toolbar({
		name: 'toolbar',
		items: [
			{ type: 'radio',  id: 'sequence',  group: '1', caption: 'Sequence', icon: 'fa-star', checked: true },
			{ type: 'radio',  id: 'script',  group: '1', caption: 'Script', icon: 'fa-star-empty' },
			{ type: 'radio',  id: 'controls',  group: '1', caption: 'Controls', icon: 'fa-star-empty' },
			{ type: 'radio',  id: 'light',  group: '1', caption: 'Light', icon: 'mcopy-light' },
			{ type: 'spacer' },
			{ type: 'button',  id: 'settings',  group: '1', caption: 'Settings', icon: 'fa-home' }
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
	log.init();
	light.init();
};
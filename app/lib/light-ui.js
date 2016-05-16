var light = {};

//LIGHT
light.preview_state = false; //light is on/off for preview viewing
light.color = [255, 255, 255]; //default color
light.current = [0, 0, 0]; //last sent
light.icon = {};
light.swatches = [
	{
		rgb : [0, 0, 0],
		name : 'off'
	},
	{
		rgb : [255, 255, 255],
		name : 'white (LED)'
	},
	{
		rgb : chroma.kelvin(2500).rgb(),
		name : '2500 kelvin'
	},
	{
		rgb : chroma.kelvin(5600).rgb(),
		name : '5600 kelvin'
	},
	{
		rgb : chroma.kelvin(6500).rgb(),
		name : '6500 kelvin'
	},
	{
		rgb : light.color,
		set : true,
		default : true
	}
];
light.queue = {};
light.lock = false;
light.init = function () {
	'use strict';

	//create dynamic style for displaying light across screens
	light.icon = document.createElement('style');
	light.icon.innerHTML = 'span.mcopy-light{background-color: #000;}';
	document.body.appendChild(light.icon);

	light.colorPickers();
	light.swatch.init();
	light.listen();

	light.display(light.current);

	$('#preview').on('change', function () {
		light.preview_state = $(this).prop('checked');
		if (light.preview_state) {
			light.display(light.color);
			light.set(light.color);
		} else {
			light.display([0,0,0]);
			light.set([0,0,0]);
		}
	});
};
light.colorPickers = function () {
	'use strict';
	$('#colors-tabs').w2tabs({
		name: 'colors',
		active: 'kelvin',
		tabs: [
			{ id: 'kelvin', caption: 'Kelvin'},
			{ id: 'cmy', caption: 'CMY'},
			{ id: 'rgb', caption: 'RGB' }
		],
		onClick: function (event) {
			$('.colors-page').hide();
			$('#' + event.target + '-page').show();
			if (event.target === 'rgb') {
				light.rgb.page();
			}
		}
	});
	light.rgb.init();
	light.kelvin.init();
};
light.set = function (rgb, callback) { //rgb = [0,0,0]
	'use strict';
	var obj;

	if (light.lock) {
		//potential for logging overlapping commands
		return false;
	}

	obj = {
		rgb : rgb,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('light', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	light.queue[obj.id] = obj;
	light.current = rgb;
	light.lock = true;
};
light.end = function (id) {
	'use strict';
	if (typeof light.queue[id] !== 'undefined') {
		if (typeof light.queue[id].callback !== 'undefined') {
			light.queue[id].callback();
		}
		delete light.queue[id];
		light.lock = false;
	}
}
light.listen = function () {
	'use strict';
	ipcRenderer.on('light', function (event, arg) {
		light.end(arg.id);
		return event.returnValue = true;
	});
};
light.preview = function (rgb, name) { 
	'use strict';
	var rgbStr;
	rgb = light.rgb.floor(rgb);
	rgbStr = 'rgb(' + rgb.join(',') + ')';
	light.color = rgb;
	if (typeof name === 'undefined') {
		name = rgbStr;
	}
	$('#light-swatches .swatch.set').css('background', rgbStr)
		.attr('color', rgb.join(','))
		.prop('title', name);

	if (light.preview_state) {
		light.display(rgb);
		light.set(rgb);
	}
};
light.display = function (rgb) { //display light active state
	'use strict';
	var str,
		i;
	rgb = light.rgb.floor(rgb);
	for (i = 0; i < 3; i++) {
		$('#light-status form input').eq(i).val(rgb[i]);
	}
	str = 'rgb(' + rgb.join(',') + ')';
	$('#color').css('background-color', str);
	light.icon = document.styleSheets[document.styleSheets.length - 1];
	light.icon.deleteRule(0);
	light.icon.insertRule('span.mcopy-light{background-color: ' + str + ';}', 0)
};

//KELVIN GUI
light.kelvin = {};
light.kelvin.steps = 348;
light.kelvin.min = light.kelvin.steps * 4;
light.kelvin.max = 20000;
light.kelvin.moving = false;
light.kelvin.init = function () {
	'use strict';
	$('#kelvin').on('change', light.kelvin.change);
	$('#kelvin').on('keypup', function (e) {
		var code = e.keyCode || e.which;
		if (code === 13) {
			light.kelvin.change();
		}
	});
	$('#kelvin-slider').on('mousemove', function (event) {
		if (light.kelvin.moving) {
			light.kelvin.click(this, event);
		}
	});
	$('#kelvin-slider').on('mousedown', function (event) {
		light.kelvin.moving = true;
		light.kelvin.click(this, event);
	});
	$(document).on('mouseup', function () {
		light.kelvin.moving = false;
	});
	light.kelvin.scale();
	light.kelvin.set(5600); //default value
};
light.kelvin.change = function () {
	'use strict';
	var val = $('#kelvin').val(),
		rgb = chroma.kelvin(val).rgb();
	light.kelvin.preview(rgb);
	light.kelvin.pos(val);
	light.preview(rgb, val + ' kelvin');
};
light.kelvin.preview = function (rgb_float) {
	'use strict';
	var elem = $('#kelvin-preview'),
		rgb = light.rgb.floor(rgb_float),
		rgb_str = 'rgb(' + rgb.join(', ') + ')';
	elem.css('background', rgb_str);
	elem.text(rgb_str);
};
light.kelvin.scale = function () {
	'use strict';
	var i,
		min = light.kelvin.min,
		max = light.kelvin.max,
		steps = light.kelvin.steps,
		rgb,
		elem,
		elemStr = '<span style="background: rgb(XXXX);"></span>'
	for (i = 0; i < steps; i++) {
		rgb = chroma.kelvin((i * ((max - min) / steps)) + min).rgb();
		rgb = light.rgb.floor(rgb).join(',');
		elem = $(elemStr.replace('XXXX', rgb));
		$('#kelvin-scale').append(elem);
	}
};
light.kelvin.pos = function (kelvin) {
	'use strict';
	var min = light.kelvin.min,
		max = light.kelvin.max,
		steps = light.kelvin.steps,
		start = -1,
		pos = Math.round((kelvin - min) / ( (max - min) / steps)) + start;
	if (pos < start) {
		pos = start;
	}
	if (pos > steps) {
		pos = steps;
	}
	$('#kelvin-pos').css('left', pos + 'px');
};
light.kelvin.set = function (kelvin) {
	'use strict';
	$('#kelvin').val(kelvin);
	light.kelvin.change();
};
light.kelvin.click = function (t, e) {
	'use strict';
	var parentOffset = $(t).parent().offset(),
   		relX = e.pageX - parentOffset.left - 31, //?
   		min = light.kelvin.min,
   		max = light.kelvin.max,
   		steps = light.kelvin.steps,
   		kelvin = Math.round((relX * ((max - min) / steps)) + min);
   	light.kelvin.set(kelvin);
};

//CMY GUI
light.cmy = {};
light.cmy.init = function () {
	'use strict';

};

light.cmy.set = function (rgb) {

};

light.cmy.setDial = function (dial, val) {
	'use strict';
	var elem = $('#dial-' + dial),
		angle = Math.floor(360 * val);
	elem.find('.dial-container1 .dial-wedge').css('transform', 'rotateZ(' + angle + 'deg)');
	elem.find('.dial-end').css('transform', 'rotateZ(' + angle + 'deg)');
};

light.cmy.preview = function (rgb_float) {
	'use strict';
	var elem = $('#cmy-preview'),
		rgb = light.rgb.floor(rgb_float),
		rgb_str = 'rgb(' + rgb.join(', ') + ')';
	elem.css('background', rgb_str);
	elem.text(rgb_str);
};

//RGB GUI
light.rgb = {};
light.rgb.elem;
light.rgb.lock = true;
light.rgb.init = function () {
	'use strict';
	light.rgb.elem = jsColorPicker('#rgb', {
		customBG: '#222',
		readOnly: true,
		size: 3,
		appendTo : document.getElementById('rgb-page'),
		// patch: false,
		init: function(elm, colors) { // colors is a different instance (not connected to colorPicker)
			elm.style.backgroundColor = elm.value;
			elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
		},
		convertCallback: light.rgb.change
	});
};
light.rgb.page = function () {
	'use strict';
	if (light.rgb.lock) {
		$('#rgb').focus();
		light.rgb.lock = false;
	}
	light.rgb.set(light.color);
};
light.rgb.change = function (colors, type) {
	'use strict';
	var a = colors.RND.rgb,
		rgb = [a.r, a.g, a.b];
	if (!light.rgb.lock) {
		light.preview(rgb);
	}
};
light.rgb.floor = function (rgb) {
	'use strict';
	return [
		Math.floor(rgb[0]),
		Math.floor(rgb[1]),
		Math.floor(rgb[2])
	];
};
light.rgb.set = function (rgb) {
	'use strict';
	var hex = chroma.rgb(rgb).hex();
	light.rgb.elem.current.startRender();
	light.rgb.elem.current.setColor(hex);
	light.rgb.elem.current.stopRender();
};

//SWATCH GUI
light.swatch = {};
light.swatch.init = function () {
	'use strict';
	var number = 12,
		add,
		elem,
		rgb,
		i,
		x;
	for (i = 0; i < light.swatches.length; i++) {
		light.swatches[i].rgb = light.rgb.floor(light.swatches[i].rgb);
		rgb = 'rgb(' + light.swatches[i].rgb.join(',') + ')';
		elem = $('<div class="swatch"></div>');
		elem.css('background', rgb);
		elem.attr('color', light.swatches[i].rgb.join(','));
		if (typeof light.swatches[i].name !== 'undefined') {
			elem.prop('title', light.swatches[i].name);
		} else {
			elem.prop('title', rgb);
		}
		if (light.swatches[i].default) {
			elem.addClass('default');
		}
		if (light.swatches[i].set) {
			elem.addClass('set');
		}
		$('#new-swatch').before(elem);
	}
	$('#new-swatch').on('click', light.swatch.add);
	$(document.body).on('click', '#light-swatches .swatch', function () {
		var rgb = $(this).attr('color');
		if (typeof color !== 'undefined') {
			rgb = rgb.split(',');
			$('#light-swatches .swatch').removeClass('default set');
			$(this).addClass('default set');
			if (w2ui['colors'].active === 'rgb') {
				light.rgb.set(light.color);
			}
			light.preview(rgb);
		}
	});
	$(document.body).on('dblclick', '.swatch', function () {
		
	});
};
light.swatch.add = function () {
	'use strict';
	var swatch = $('<div class="swatch default set"></div>');
	$('#light-swatches .swatch').removeClass('default set');
	$('#new-swatch').before(swatch);
	light.preview(light.color);
};

module.exports = light;
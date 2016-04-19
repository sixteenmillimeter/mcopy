var remote = require('remote'),
	dialog = require('electron').remote.dialog,
	fs = require('fs'),
	uuid = require('node-uuid'),
	moment = require('moment'),
	humanizeDuration = require('humanize-duration')
	ipcRenderer = require('electron').ipcRenderer,
	mcopy = {},
	light = {},
	proj = {},
	cam = {},
	nav = {},
	seq = {},
	cmd = {},
	gui = {},
	log = {};
//console.log(ipcRenderer.sendSync('light', { 'fuck' : true }) );

mcopy.cfg = JSON.parse(fs.readFileSync('./data/cfg.json'), 'utf8');

/******
	State shared by ALL interfaces
*******/
mcopy.state = {
	version : '2.0.0', //use for file compatibility check
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
		light : ['255,255,255', ''],
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
			black_backward : 'BB',

			light_set : 'L'
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
	if (nav.active === 'controls') {
		w2ui['log'].scrollIntoView(log.count - 1);
		w2ui['log'].selectNone();
		w2ui['log'].select(log.count - 1);
	}
	
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
	//console.log(obj);
};

/******
	Sequence Object
*******/
seq.i = 0;
mcopy.loop = 1;
mcopy.loopCount = 0;
seq.time = 0;
seq.stopState = false;
seq.run = function () {
	var c = mcopy.state.sequence.arr[seq.i],
		timeEnd = 0,
		rgb,
	action = function () {
		setTimeout(function () {
			seq.i++;
			seq.run();
		}, mcopy.cfg.arduino.sequenceDelay);
	}
	if (seq.stop()) {
		$('.row input').removeClass('h');
		$('#numbers div').removeClass('h');
		//console.log('Sequence stepped');
		log.info('Sequence stopped', 'SERIAL', true);
		return false;
	}
	if (seq.i <= mcopy.state.sequence.arr.length && c !== undefined) {
		log.info('Step ' + seq.i + ' command ' + c, 'SEQUENCE', true);
		//gui action
		$('.row input').removeClass('h');
		$('#numbers div').removeClass('h');
		$('.row input[x=' + seq.i + ']').addClass('h');
		$('#numbers div[x=' + seq.i + ']').addClass('h');
		if (c === 'CF'){
			rgb = mcopy.state.sequence.light[seq.i].split(',');
			cmd.cam_forward(rgb, action);
		} else if (c === 'CB') {
			rgb = mcopy.state.sequence.light[seq.i].split(',');
			cmd.cam_backward(rgb, action);
		} else if (c === 'PF') {
			cmd.proj_forward(action);
		} else if (c === 'PB') {
			cmd.proj_backward(action);
		} else if (c === 'BF') {
			cmd.black_forward(action);
		} else if (c === 'BB') {
			cmd.black_backward(action);
		}
	} else {
		mcopy.loopCount++;
		if (mcopy.loopCount < mcopy.loop) {
			log.info('Loop ' + mcopy.loopCount + ' completed', 'SEQUENCE', true);
			$('.row input').removeClass('h');
			$('#numbers div').removeClass('h');
			seq.i = 0;
			seq.run();
		} else {
			timeEnd = +new Date();
			timeEnd = timeEnd - seq.time;
			if (timeEnd < 2000) {
				log.info('Sequence completed in ' + timeEnd + 'ms', 'SEQUENCE', true);
			} else {
				log.info('Sequence completed in ' + humanizeDuration(timeEnd), 'SEQUENCE', true);
			}
			//clear gui
			$('.row input').removeClass('h');
			$('#numbers div').removeClass('h');
			seq.stats();
		}
	}
};
seq.stop = function (state) {
	if (typeof state === 'undefined') {
		return seq.stopState;
	} else {
		seq.stopState = state;
	}
};
seq.init = function (start) {
	if (typeof start === 'undefined') {
		start = 0;
		mcopy.loopCount = 0;
		seq.time = +new Date();
	}
	seq.stop(false);
	seq.i = start;
	seq.run();
};
seq.stats = function () {
	var ms = 0,
		c = '',
		cam_total = 0,
		proj_total = 0,
		real_total = mcopy.state.sequence.arr.filter(function (elem) {
			if (elem === undefined) {
				return false;
			}
			return true;
		});

	//timing
	for (var i = 0; i < mcopy.state.sequence.arr.length; i++) {
		c = mcopy.state.sequence.arr[i];
		if (c === 'CF' || c === 'CB'){
			ms += mcopy.cfg.arduino.cam.time;
			ms += mcopy.cfg.arduino.cam.delay;
			ms += mcopy.cfg.arduino.serialDelay;
		}
		if (c === 'PF' || c === 'PB'){
			ms += mcopy.cfg.arduino.proj.time;
			ms += mcopy.cfg.arduino.proj.delay;
			ms += mcopy.cfg.arduino.serialDelay;
		}
		if (c === 'BF' || c === 'BB'){
			ms += mcopy.cfg.arduino.black.before;
			ms += mcopy.cfg.arduino.black.after;
			ms += mcopy.cfg.arduino.cam.time;
			ms += mcopy.cfg.arduino.cam.delay;
			ms += mcopy.cfg.arduino.serialDelay;
		}
		ms += mcopy.cfg.arduino.sequenceDelay;

		if (c === 'CF' || c === 'BF') {
			cam_total++;
		}
		if (c === 'CB' || c === 'BB') {
			cam_total--;
		}
		if (c === 'PF') {
			proj_total++;
		}
		if (c === 'PB') {
			proj_total--;
		}
	}

	//timing
	ms = ms * mcopy.loop;
	if (ms < 2000) {
		$('#seq_stats .timing span').text(ms + 'ms');
	} else {
		$('#seq_stats .timing span').text(humanizeDuration(ms));
	}

	//ending frames
	cam_total = cam_total * mcopy.loop;
	proj_total = proj_total * mcopy.loop;

	$('#seq_stats .cam_end span').text(gui.fmtZero(mcopy.state.camera.pos + cam_total, 6));
	$('#seq_stats .proj_end span').text(gui.fmtZero(mcopy.state.projector.pos + proj_total, 6));

	//count
	$('#seq_stats .seq_count span').text(real_total.length * mcopy.loop);
	return ms;
};
seq.clear = function () {
	mcopy.state.sequence.size = 24;
	mcopy.state.sequence.arr = [];
};


//mcopy.gui.updateState();

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

proj.queue = {};
proj.lock = false;
proj.init = function () {
	'use strict';
	proj.listen();
};
proj.set = function (dir, callback) {
	'use strict';
	var obj;
	if (proj.lock) {
		return false;
	}
	obj = {
		dir : dir,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('proj', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock = true;
};
proj.move = function (callback) {
	'use strict';
	var obj;
	if (proj.lock) {
		return false;
	}
	obj = {
		frame : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('proj', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock = true;
};
proj.end = function (c, id, ms) {
	'use strict';
	if (c === mcopy.cfg.arduino.cmd.proj_forward) {
		mcopy.state.projector.direction = true;
	} else if (c === mcopy.cfg.arduino.cmd.proj_backward) {
		mcopy.state.projector.direction = false;
	} else if (c === mcopy.cfg.arduino.cmd.projector) {
		if (mcopy.state.projector.direction) {
			mcopy.state.projector.pos += 1;
		} else {
			mcopy.state.projector.pos -= 1;
		}
	}
	if (typeof proj.queue[id] !== 'undefined') {
		if (typeof proj.queue[id].callback !== 'undefined') {
			proj.queue[id].callback(ms);
		}
		delete proj.queue[id];
		proj.lock = false;
	}
};
proj.listen = function () {
	'use strict';
	ipcRenderer.on('proj', function (event, arg) {
		proj.end(arg.cmd, arg.id, arg.ms);		
		return event.returnValue = true;
	});
};

cam.queue = {};
cam.lock = false;
cam.init = function () {
	'use strict';
	cam.listen();
};
cam.set = function (dir, callback) {
	'use strict';
	var obj;
	if (cam.lock) {
		return false;
	}
	obj = {
		dir : dir,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('cam', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	cam.queue[obj.id] = obj;
	cam.lock = true;
};
cam.move = function (callback) {
	'use strict';
	var obj;
	if (cam.lock) {
		return false;
	}
	obj = {
		frame : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('cam', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	cam.queue[obj.id] = obj;
	cam.lock = true;
};
cam.end = function (c, id, ms) {
	'use strict';
	if (c === mcopy.cfg.arduino.cmd.cam_forward) {
		mcopy.state.camera.direction = true;
	} else if (c === mcopy.cfg.arduino.cmd.cam_backward) {
		mcopy.state.camera.direction = false;
	} else if (c === mcopy.cfg.arduino.cmd.camera) {
		if (mcopy.state.camera.direction) {
			mcopy.state.camera.pos += 1;
		} else {
			mcopy.state.camera.pos -= 1;
		}
	}
	if (typeof cam.queue[id] !== 'undefined') {
		if (typeof cam.queue[id].callback !== 'undefined') {
			cam.queue[id].callback(ms);
		}
		delete cam.queue[id];
		cam.lock = false;
	}
};
cam.listen = function () {
	'use strict';
	ipcRenderer.on('cam', function (event, arg) {
		cam.end(arg.cmd, arg.id, arg.ms);		
		return event.returnValue = true;
	});
};

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
	light.kelvin.pos(val);
	light.preview(rgb, val + ' kelvin');
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

//GUI
gui.fmtZero = function (val, len) {
	var raw = val,
		str = val + '',
		output = ''
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
	var raw = t.value;
	t.value = gui.fmtZero(raw, 6);
	if (typeof normal !== 'undefined' && parseInt(raw) !== normal) {
		$(t).addClass('changed');
	} else {
		$(t).removeClass('changed');
	}
	if (typeof prevent === 'undefined') { prevent = false; }
	if (!prevent) {
		gui.shootGoto(t);
	}
};
gui.shootGoto = function (t) {
	var elem = $(t),
		id = elem.attr('id').split('_'),
		val = 0,
		comp = 0,
		other = {};
	if (id[1] === 'cam') {
		comp = mcopy.state.camera.pos;
	} else if (id[1] === 'proj') {
		comp = mcopy.state.projector.pos;
	}
	if (id[0] === 'shoot') {
		other = $('#goto_' + id[1]);
		val = parseInt(elem.val()) + comp;
		other.val(val);
		gui.counterFormat(other[0], comp, true);
		//other.trigger('change');
	} else if (id[0] === 'goto'){
		other = $('#shoot_' + id[1]);
		val = parseInt(elem.val()) - comp;
		other.val(val);
		gui.counterFormat(other[0], undefined, true);
	} else {
		//ALLOW TO EXECUTE WITH NO RESULTS
		//console.log('You screwed up the markup.');
	}
};
gui.updateCam = function (t) {
	var val = t.value,
		change;
	if (parseInt(val) === mcopy.state.camera.pos) { return false; }
	change = confirm('Are you sure you want to set camera counter to ' + val + '?');
	if (change) {
		mcopy.state.camera.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = mcopy.state.camera.pos;
		gui.counterFormat(t);
	}
};
gui.updateProj = function (t) {
	var val = t.value,
		change;
	if (parseInt(val) === mcopy.state.projector.pos) { return false; }
	change = confirm('Are you sure you want to set projector counter to ' + val + '?');
	if (change) {
		mcopy.state.projector.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = mcopy.state.projector.pos;
		gui.counterFormat(t);
	}
};
gui.updateState = function () {
	var cpos = mcopy.state.camera.pos,
		ppos = mcopy.state.projector.pos;

	$('#seq_cam_count').val(cpos).change();
	$('#seq_proj_count').val(ppos).change();

	$('#seq_cam_count_2').val(cpos).change();
	$('#seq_proj_count_2').val(ppos).change();
};
gui.spinner = function (state) {
	var cfg = {
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
	},
	target,
	spinner;
	if (state) {
		target = document.getElementById('spinner');
		spinner = new Spinner(cfg).spin(target);
	} else {
		$('#spinner').hide();
		$('#psinner').empty();
	}
};
gui.overlay = function (state) {
	if (state) {
		$('#overlay').show();
	} else {
		$('#overlay').hide();
	}
};

gui.info = function (title, message) {
	'use strict';
	var config = {
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
	var config = {
		type : 'warning',
		buttons : ['Ok'],
		title: title,
		message : message
	};
	dialog.showMessageBox(config);
};
gui.error = function () {};

/******
	Mscript GUI
*******/
gui.mscript = {};
gui.mscript.editor = {};
gui.mscript.data = {};
gui.mscript.raw = '';
gui.mscript.init = function () {
	'use strict';
	$('#editor').val('CF 1\nPF 1');
	gui.mscript.editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
		lineNumbers: true,
		mode: 'python',
		matchBrackets: true,
		theme: 'monokai'
	});
	gui.mscript.editor.setSize(null, $(window).height() - $('footer').eq(0).height() - 30);
	gui.mscript.editor.on('change', function (e) {
		var data = gui.mscript.editor.getValue(),
			output = gui.mscript.parse(data);
	});
	$(document).on('resize', function () {
		gui.mscript.editor.setSize(null, $(window).height() - $('footer').eq(0).height() - 30);
	});
};
gui.mscript.open = function () {
	'use strict';
	gui.mscript.editor.setSize(null, $(window).height() - $('footer').eq(0).height() - 30);
	gui.mscript.editor.refresh();
};
gui.mscript.update = function () {
	//ehhhhh
	$('#mscript textarea').val(mcopy.state.sequence.arr.join('\n'));
};
gui.mscript.parse = function (str) {
	/*var cmd = 'node mscript.js "' + str + '\n"';
	gui.mscript.raw = str;
	mcopy.exec(cmd, function (data) {
		gui.mscript.data = JSON.parse(data);
	});*/
};

/*******
 *   gui console
 *******/
gui.console = {};
gui.console.elem = {};
gui.console.init = function () {
	'use script';
	gui.console.elem = $('#console textarea');
	gui.console.elem.on('keyup', function (e) {
		var code = e.keyCode || e.which;
		if (code === 13) {
			gui.console.exec();
			e.preventDefault();
			return false;
		}
	});
};
gui.console.exec = function () {
	'use strict';
	gui.console.newLine();
};
gui.console.newLine = function () {
	'use strict';
	var current = gui.console.elem.val();
	current += '> ';
	gui.console.elem.val(current);
};

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

gui.grid.state = function (i) {
	'use strict';
	var elem = $('input[x=' + i + ']'),
		lightElem = $('.L' + '[x=' + i + ']');
	if (typeof mcopy.state.sequence.arr[i] !== 'undefined') {
		elem.prop('checked', false);
		$('.' + mcopy.state.sequence.arr[i] + '[x=' + i + ']').prop('checked', true);
		if (mcopy.state.sequence.arr[i] === 'CF'
			|| mcopy.state.sequence.arr[i] === 'CB') {
			lightElem.css('background', 'rgb(' + mcopy.state.sequence.light[i] + ')')
				.addClass('a')
				.prop('title', 'rgb(' + mcopy.state.sequence.light[i] + ')');

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
gui.grid.refresh = function () {
	'use strict';
	var cmds = ['cam_forward', 'proj_forward', 'cam_backward', 'proj_backward', 'light_set', 'numbers'],
		check = '<input type="checkbox" x="xxxx" />',
		div = '<div x="xxxx"></div>',
		elem,
		width = 970 - 34 + ((940 / 24) * Math.abs(24 - mcopy.state.sequence.size));
	$('#sequence').width(width + 'px');
	for (var i = 0; i < cmds.length; i++) {
		$('#' + cmds[i]).empty();
		for (var x = 0; x < mcopy.state.sequence.size; x++) {
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
gui.grid.click = function (t) {
	'use strict';
	var i = parseInt($(t).attr('x')),
		c;
	if ($(t).prop('checked')) {
		c = $(t).attr('class').replace('.', '');
		mcopy.state.sequence.arr[i] = c;
		if (c === 'CF'
			|| c === 'CB') {
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
gui.grid.clear = function () {
	'use strict';
	var doit = confirm('Are you sure you want to clear this sequence?');
	if (doit) {
		seq.clear();
		gui.grid.refresh();
		seq.stats();
		console.log('Sequencer cleared');
	}
};
gui.grid.loopChange = function (t) {
	'use strict';
	var count = parseInt(t.value);
	mcopy.loop = count;
	seq.stats();
};
gui.grid.plus_24 = function () {
	'use strict';
	mcopy.state.sequence.size += 24;
	gui.grid.refresh();
	console.log('Sequencer expanded to ' + mcopy.state.sequence.size + ' steps');
};
gui.grid.setLight = function (x, rgb) {
	'use strict';
	mcopy.state.sequence.light[x] = rgb.join(',');
	gui.grid.state(x);
};
gui.grid.blackout = function (t) {
	var elem = $(t),
		i = elem.attr('x');
	if (typeof mcopy.state.sequence.light[i] === 'undefined') {
		return false;
	}
	if (mcopy.state.sequence.light[i] === '0,0,0') {
		gui.grid.setLight(i, light.color);
	} else {
		gui.grid.setLight(i, [0, 0, 0]);
	}	
};
gui.grid.changeAll = function (rgb) {
	'use strict';
	var i;
	for (i = 0; i < mcopy.state.sequence.arr.length; i++) {
		if (mcopy.state.sequence.arr[i] === 'CF'
			|| mcopy.state.sequence.arr[i] === 'CB') {
			gui.grid.setLight(i, rgb);
		}
	}
};
gui.grid.swatches = function (x) {
	'use strict';
	var current = mcopy.state.sequence.light[x];
	gui.grid.swatchesElem = w2popup.open({
		title   : 'Select Color',
		body    : $('#light-swatches').html(),
		buttons : '<button id="sequencer-ok" class="btn btn-default">Ok</button> <button id="sequencer-changeall" class="btn btn-warning">Change All</button> <button id="sequencer-cancel" class="btn btn-default">Cancel</button>',
		onClose : function () {
		}
	});
	$('.w2ui-msg-body .swatch').removeClass('default set');
	$('.w2ui-msg-body .swatch[color="' + current + '"').eq(0).addClass('default set');

	$('#sequencer-cancel').on('click', function () {
		gui.grid.swatchesElem.close();
	});
	$('#sequencer-changeall').on('click', function () {
		var doit = confirm('You sure you want to change all light settings?'),
			elem = $('.w2ui-msg-body .default'),
			rgb;
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
gui.grid.scrollTo = function (i) {
	'use strict';
	var w = 35 + 3; //width of pad + margin
	$('#seq_scroll').scrollLeft(i * w);
};
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

//NAV GUI
nav.active = 'sequencer';
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
	nav.active = id;
	$('.screen').hide();
	$('#' + id).show();
	if (id === 'controls') {
		w2ui['log'].resize();
		w2ui['log'].scrollIntoView(log.count - 1);
		w2ui['log'].selectNone();
		w2ui['log'].select(log.count - 1);
	} else if (id === 'light') {
		if (w2ui['colors'].active === 'rgb') {
			light.rgb.set(light.color);
		}
	} else if (id === 'script') {
		gui.mscript.open();
	}
};

var devices = {};
devices.init = function () {
	'use strict';
	devices.listen();
	gui.overlay(true);
	gui.spinner(true);
};
devices.listen = function () {
	'use strict';
	ipcRenderer.on('ready', function (event, arg) {
		//console.log(arg.camera);
		//console.log(arg.projector);
		devices.ready();
		return event.returnValue = true;
	});
};
devices.ready = function () {
	'use strict';
	gui.spinner(false);
	gui.overlay(false);
};

var init = function () {
	'use strict';
	nav.init();
	gui.grid.init();
	gui.mscript.init();
	gui.console.init();
	log.init();	
	devices.init();
	light.init();
	proj.init();
	cam.init();
};
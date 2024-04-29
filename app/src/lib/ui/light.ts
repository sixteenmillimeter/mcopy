'use strict';

declare var uuid : any;
declare var chroma : any;
declare var ipcRenderer : any;
declare var jsColorPicker : any;
declare var color : any;
declare var w2ui : any;

interface RGB extends Array <number> {}

interface CMYK extends Array <number> {}

interface LightEvent {
	id : string;
	disable? : boolean;
	enable? : boolean;
	rgb? : RGB;
	callback? : Function;
}

let light : Light;

class Light {
	id : string = 'light';
	preview_state : boolean = false; //light is on/off for preview viewing
	color : RGB = [255, 255, 255]; //default color
	current : RGB = [0, 0, 0]; //last sent
	icon : any = {};
	public swatches : any = [
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
			rgb : chroma.kelvin(3200).rgb(),
			name : '3200 kelvin'
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
			rgb : this.color,
			set : true,
			default : true
		}
	];

	help : string = `
		Light Source		Kelvin	R G B Values Color
		Candle 				1900 	255, 147, 41
		40W Tungsten 		2600 	255, 197, 143
		100W Tungsten 		2850 	255, 214, 170
		Halogen 			3200 	255, 241, 224
		Carbon Arc 			5200 	255, 250, 244
		High Noon Sun 		5400 	255, 255, 251
		Direct Sunlight	 	6000 	255, 255, 255
		Overcast Sky 		7000 	201, 226, 255
		Clear Blue Sky 		20000 	64, 156, 255
		Warm Fluorescent 			255, 244, 229
		Standard Fluorescent 		244, 255, 250
		Cool White Fluorescent 		212, 235, 255
		Full Spectrum Fluorescent 	255, 244, 242
		Grow Light Fluorescent 		255, 239, 247
		Black Light Fluorescent 	167, 0, 255
		Mercury Vapor 				216, 247, 255
		Sodium Vapor 				255, 209, 178
		Metal Halide 				242, 252, 255
		High Pressure Sodium 		255, 183, 76
	`;

	queue : any = {};
	lock : boolean = false;
	disabled : boolean = false;

	rgb : LightRGB = new LightRGB();
	//cmy : LightCMY = new LightCMY();
	kelvin : LightKelvin = new LightKelvin();
	swatch : LightSwatch = new LightSwatch();

	constructor () {

	}

	public init () {
		//create dynamic style for displaying light across screens
		this.icon = document.createElement('style');
		this.icon.innerHTML = 'span.mcopy-light{background-color: #000;}';
		document.body.appendChild(this.icon);

		this.colorPickers();
		this.swatch.init();
		this.listen();

		this.display(this.current);

		$('#preview').on('change', this.onPreviewChange.bind(this));
	}

	private onPreviewChange () {
		this.preview_state = $('#preview').prop('checked');
		if (this.preview_state) {
			this.display(this.color);
			this.set(this.color);
		} else {
			this.display([0,0,0]);
			this.set([0,0,0]);
		}
	}

	public async disable () {
		const obj : LightEvent = {
			disable : true,
			id : uuid()
		};
		this.disabled = true;
		$('#tb_toolbar_item_light').hide();
		$('#seq_labels .spacer').eq(1).hide();
		$('#light_set').hide();

		return ipcRenderer.invoke(this.id, obj);
	}

	public async enable () {
		const obj = {
			enable : true,
			id : uuid()
		};
		this.disabled = false;
		$('#tb_toolbar_item_light').show();
		$('#seq_labels .spacer').eq(1).show();
		$('#light_set').show();

		return ipcRenderer.invoke(this.id, obj);
	}

	public colorPickers () {
		//@ts-ignore
		$('#colors-tabs').w2tabs({
			name: 'colors',
			active: 'kelvin',
			tabs: [
				{ id: 'kelvin', caption: 'Kelvin'},
				//{ id: 'cmy', caption: 'CMY'},
				{ id: 'rgb', caption: 'RGB' }
			],
			onClick: function (event : MouseEvent) {
				$('.colors-page').hide();
				log.info(event.target);
				$('#' + event.target + '-page').show();
				//@ts-ignore
				//if (event.target === 'rgb') {
					light.rgb.page();
				//} else if (event.target) {
					//light.cmy.page();
				//}
			}
		});
		this.rgb.init();
		this.kelvin.init();
		//light.cmy.init();
	};
	
	public set (rgb : RGB, callback? : Function) { //rgb = [0,0,0]
		var obj : LightEvent;

		if (this.disabled){
			if (callback) {
				return callback();
			} else {
				return false;
			}
		}

		if (this.lock) {
			//potential for logging overlapping commands
			return false;
		}

		obj = {
			rgb,
			id : uuid()
		};
		ipcRenderer.sendSync(this.id, obj);

		if (typeof callback !== 'undefined') {
			obj.callback = callback;
		}
		this.queue[obj.id] = obj;//
		this.current = rgb;
		this.lock = true;
	}

	public end  (id : string) {
		if (typeof this.queue[id] !== 'undefined') {
			if (typeof this.queue[id].callback !== 'undefined') {
				this.queue[id].callback();
			}
			delete this.queue[id];
			this.lock = false;
		}
	}

	public listen () {
		ipcRenderer.on(this.id, function (event : Event, arg : any) {
			light.end(arg.id);
			return event.returnValue = true;
		});
	}
	
	public preview (rgb : RGB, name? : string) { 
		let rgbStr : any;

		if (this.disabled) {
			return false;
		}

		rgb = this.rgb.floor(rgb);
		rgbStr = 'rgb(' + rgb.join(',') + ')';
		this.color = rgb;

		if (typeof name === 'undefined') {
			name = rgbStr;
		}

		$('#light-swatches .swatch.set').css('background', rgbStr)
			.attr('color', rgb.join(','))
			.prop('title', name);

		if (this.preview_state) {
			this.display(rgb);
			this.set(rgb);
		}
	}

	public display (rgb : RGB) { //display light active state
		let str : string;
		let i : number;

		if (this.disabled) {
			return false;
		}

		rgb = this.rgb.floor(rgb);
		for (i = 0; i < 3; i++) {
			$('#light-status form input').eq(i).val(rgb[i]);
		}
		str = 'rgb(' + rgb.join(',') + ')';
		$('#color').css('background-color', str);
		this.icon = document.styleSheets[document.styleSheets.length - 1];
		this.icon.deleteRule(0);
		this.icon.insertRule('span.mcopy-light{background-color: ' + str + ';}', 0)
	};
}

class LightKelvin {
	//KELVIN GUI
	steps : number = 348;
	min : number = this.steps * 4;
	max : number = 20000;
	moving : boolean = false;

	constructor () {

	}

	init () {
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
	}
	
	change () {
		let valStr : any = $('#kelvin').val();
		let val : number = parseInt( valStr );
		var rgb = chroma.kelvin(val).rgb();
		light.kelvin.preview(rgb);
		light.kelvin.pos(val);
		light.preview(rgb, val + ' kelvin');
	}

	preview (rgb_float : number[]) {
		var elem = $('#kelvin-preview'),
			rgb = light.rgb.floor(rgb_float),
			rgb_str = 'rgb(' + rgb.join(', ') + ')';
		elem.css('background', rgb_str);
		elem.text(rgb_str);
	}

	scale () {
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
	}

	pos (kelvin : number) {
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
	}

	set (kelvin : number) {
		$('#kelvin').val(kelvin);
		light.kelvin.change();
	}
	
	click (t : any, e : any) {
		var parentOffset = $(t).parent().offset(),
	   		relX = e.pageX - parentOffset.left - 31, //?
	   		min = light.kelvin.min,
	   		max = light.kelvin.max,
	   		steps = light.kelvin.steps,
	   		kelvin = Math.round((relX * ((max - min) / steps)) + min);
	   	light.kelvin.set(kelvin);
	}
}

class LightRGB {
	//RGB GUI
	elem : any;
	lock : boolean = true;

	constructor () {

	}

	init () {
		this.elem = jsColorPicker('#rgb', {
			customBG: '#222',
			readOnly: true,
			size: 3,
			appendTo : document.getElementById('rgb-page'),
			// patch: false,
			init: function(elem : HTMLInputElement, colors : any) { // colors is a different instance (not connected to colorPicker)
				elem.style.backgroundColor = elem.value;
				elem.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
			},
			convertCallback: light.rgb.change
		});
	}

	page () {
		if (this.lock) {
			$('#rgb').focus();
			this.lock = false;
		}
		this.set(light.color);
	}
	
	change (colors : any, type : any) {
		var a = colors.RND.rgb,
			rgb = [a.r, a.g, a.b];
		if (!light.rgb.lock) {
			light.preview(rgb);
		}
	}
	
	floor (rgb : any[]) {
		return [
			Math.floor(rgb[0]),
			Math.floor(rgb[1]),
			Math.floor(rgb[2])
		];
	}

	set (rgb : RGB) {
		var hex = chroma.rgb(rgb).hex();
		this.elem.current.startRender();
		this.elem.current.setColor(hex);
		this.elem.current.stopRender();
	};
}

/*class LightCMY {
	//CMY GUI
	constructor () {

	}

	init () {
		$('.dial-wrapper input').on('input', function () {
			light.cmy.change(this);
		});
		$('.dial-wrapper input').on('change',  function () {
			light.cmy.change(this);
		});
	}

	page  () {
		this.fromRgb(light.color);
	}

	change (t : any) {
		var id = $(t).parent().attr('id').split('-')[1],
			val = $(t).val(),
			cmy = [];

		cmy[0] = $('#dial-c input').val();
		cmy[1] = $('#dial-m input').val();
		cmy[2] = $('#dial-y input').val();
		cmy[3] = $('#dial-k input').val();

		light.cmy.setDial(id, val);
		light.cmy.preview(cmy);
	}

	fromRgb (rgb : RGB) {
		var cmy = chroma.rgb(rgb).cmyk();
		light.cmy.set(cmy);
	}

	set (cmy) {
		light.cmy.setDial('c', cmy[0]);
		light.cmy.setDial('m', cmy[1]);
		light.cmy.setDial('y', cmy[2]);
		light.cmy.setDial('k', cmy[3]);

		light.cmy.preview(cmy);
	}

	setDial (dial : any, val : number) {
		var elem = $('#dial-' + dial),
			angle = Math.floor(360 * val),
			container1 = 0,
			container2 = 0;
			elem.find('.dial-end').hide();
		if (angle === 0) {
			container1 = 180;
			container2 = 180;
		} else if (angle < 180) {
			container1 = 180;
			container2 = 180 - angle;
		} else if (angle === 180) {
			container1 = 180;
			container2 = 0;
		} else if (angle > 180 && angle < 360) {
			container1 = 180 - (angle - 180);
			container2 = 0;
		} else if (angle === 360) {
			//
		}

		if (angle !== 0) {
			elem.find('.dial-end').show();
		}

		elem.find('.dial-container1 .dial-wedge').css('transform', 'rotateZ(' + container1 + 'deg)');
		elem.find('.dial-container2 .dial-wedge').css('transform', 'rotateZ(' + container2 + 'deg)');
		elem.find('.dial-end').css('transform', 'rotateZ(' + (360 - angle) + 'deg)');
		elem.find('input').val(val);
	}

	preview (cmy : CMYK) {
		var elem = $('#cmy-preview'),
			rgb = light.rgb.floor(chroma.cmyk(cmy).rgb()),
			rgb_str = 'rgb(' + rgb.join(', ') + ')';
		elem.css('background', rgb_str);
		elem.text(rgb_str);
	}
}*/

class LightSwatch {
	//SWATCH GUI

	constructor () {

	}

	init () {
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
		$(document).on('click', '#light-swatches .swatch', this.onClick);
		// swatch modal logic in grid.ts
	}

	private onClick () {
		let rgbStr : string = $(this).attr('color');
		let rgb : RGB;
		if (typeof color !== 'undefined') {
			rgb = rgbStr.split(',').map(el => { return parseInt(el) });
			$('#light-swatches .swatch').removeClass('default set');
			$(this).addClass('default set');

			if (w2ui['colors'].active === 'rgb') {
				light.rgb.set(light.color);
			} else if (w2ui['colors'].active === 'cmy') {
				//light.cmy.fromRgb(light.color);
			}
			light.preview(rgb);
		}
	}

	add () {
		var swatch = $('<div class="swatch default set"></div>');
		$('#light-swatches .swatch').removeClass('default set');
		$('#new-swatch').before(swatch);
		light.preview(light.color);
	}
}

light = new Light();
module.exports = light;
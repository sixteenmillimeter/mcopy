'use strict';

/// <reference path ="jquery.d.ts"/> 

declare var gui : any;
declare var seq : any;
declare var light : any;
declare var cfg : any;
declare var log : any;
declare var w2popup : any;
declare var cam : any;
declare var proj : any;
declare var grid : any;
declare var dialog : any;
declare var ipcRenderer : any;
declare var path : any;

/**
 * Determine the greatest common denominator
 */
function gcd (a : number, b : number) : any { 
    if (b === 0) return a;
    return gcd(b, a % b);
}

/**
 * Reduce a numerator and denominator to it's smallest, integer ratio using Euclid's Algorithm
 */
function reduceRatio (numerator : number, denominator : number) {
	// from: http://pages.pacificcoast.net/~cazelais/euclid.html
    let temp : any;
    let divisor : any;
    if (!isInteger(numerator) || !isInteger(denominator)) return '? : ?';
    if (numerator === denominator) return '1 : 1';
    // make sure numerator is always the larger number
    if (+numerator < +denominator) {
        temp        = numerator;
        numerator   = denominator;
        denominator = temp;
    }
    divisor = gcd(+numerator, +denominator);
    return 'undefined' === typeof temp ? (numerator / divisor) + ' : ' + (denominator / divisor) : (denominator / divisor) + ' : ' + (numerator / divisor);
}

/**
 * Determine whether a value is an integer (ie. only numbers)
 */
function isInteger(value : any) {
    return /^[0-9]+$/.test(value);
}

let filmout : FilmOut;

class FilmOut {
	private id : string = 'filmout';
	private extensions : string[] =  ['.mpg', '.mpeg', '.mov', '.mkv', '.avi', '.mp4', 
									  '.gif',
									  '.tif', '.tiff', '.png', '.jpg', '.jpeg', '.bmp'];
	private displays : any[] = [];
	private state : any = {
		frame : 0,
		display : null
	}
	constructor () {

	}
	init () {
		this.listen();
	}
	listen () {
		ipcRenderer.on(this.id, this.onFilmout.bind(this));
		ipcRenderer.on('system', this.onSystem.bind(this));
		ipcRenderer.on('preview_frame', this.onFrame.bind(this));
	}
	onSystem (evt : Event, args : any) {
		let option : any;

		for (let display of args.displays) {
			this.displays.push(display);
			option = $('<option>');
			option.val(display.id);
			option.text(display.name);
			if (display.primary) {
				this.setDisplay(display.id);
			}
			$('#filmout_displays').append(option);
		}

		if (args.displays.length > 1) {
			$('#filmout_displays').on('change', this.onChange.bind(this));
		}
		$('#filmout_position').on('change', this.previewFrame.bind(this));
	}

	onChange () {
		const val : any = $('#filmout_displays').val();
		this.setDisplay(val);
	}

	setDisplay (id : any) {
		const maxW : number = 800;
		const maxH : number = 360;
		const display : any = this.displays.find((elem : any) => {
			if (elem.id == id) return true;
		});
		let scale : number = display.height / maxH;
		const w : number = display.width / scale;
		const elem : any = $('#filmout_monitor');
		const aspect : any = reduceRatio(display.width, display.height);

		let h : number;
		let top : number;

		if (w > maxW) {
			scale = display.width / maxW;
			h = display.height / scale;
			top = Math.floor((maxH - h) / 2);
			elem.height(h);
			elem.width(maxW - 4);
			elem.css('top', `${top}px`);
		} else {
			elem.width(w);
			elem.height(maxH - 4);
			elem.css('top', `0px`);
		}
		
		elem.addClass('on');
		$('#filmout_stats_monitor_size').text(`${display.width} x ${display.height}`);
		$('#filmout_stats_monitor_aspect').text(`${aspect}`);
		$('#filmout_stats_monitor_scale').text(`${parseFloat(display.scale).toFixed(1)} scale factor`);
		//console.dir(display);
		this.state.display = id;
		ipcRenderer.send('display', { display : id });
	}
	selectFile () {
		const elem : any = $('#digital');
		dialog.showOpenDialog({
			title : `Select video or image sequence`,
	        properties : [`openFile`], // openDirectory, multiSelection, openFile
	        defaultPath: 'c:/',
	        filters : [
	            {
	                name: 'All Files',
	                extensions: ['*']
	            },
	        ]
	    }, (files : string[]) => {
	    	if (!files) return false;
	    	let valid : boolean = false;
	    	let pathStr : string = files[0];
	    	let displayName : string;
	    	let ext : string;
			if (pathStr && pathStr !== '') {
				ext = path.extname(pathStr.toLowerCase());
				valid = this.extensions.indexOf(ext) === -1 ? false : true;
				if (!valid) {
					return false;
				}
				log.info(`Selected video ${pathStr.split('/').pop()}`, 'DIGITAL', true);
				elem.attr('data-file', pathStr);
				displayName = pathStr.split('/').pop();
				elem.val(displayName);
				$('#filmout_file').val(displayName);
			}
	    })
	}
	useFile () {
		const elem : any = $('#digital');
		const filePath : string = elem.attr('data-file');
		const fileName : string = elem.val();
		let proceed : boolean = false;
		let obj : any = {
			path : filePath,
			fileName
		};

		if (filePath && filePath !== '') {
			proceed = confirm(`Are you sure you want to use ${fileName}?`);
		} else {
			this.selectFile();
		}
		
		if (proceed) {
			gui.overlay(true);
			gui.spinner(true, `Getting info about ${fileName}`);
			ipcRenderer.send('filmout', obj);
		} else {
			$('#projector_type_digital').prop('checked', 'checked');
			$('#digital').removeClass('active');
		}
	}
	onFilmout (evt : any, args : any) {
		let state : any;
		let color : number[] = [255, 255, 255];

		gui.spinner(false);
		gui.overlay(false);

		if (args.valid && args.valid === true) {
			state = JSON.parse(args.state);
			$('#digital').addClass('active');
			$('#projector_type_digital').prop('checked', 'checked');
			gui.notify('DEVICES', `Using video ${state.fileName}`);

			seq.set(0, 'PF');
			grid.state(0);

			seq.set(1, 'CF');
			seq.setLight(1, color);
			grid.state(1);

			if (light.disabled) {
				light.enable();
			}

			this.state.frame = 0;
			this.state.frames = state.frames;
			this.state.width = state.info.width;
			this.state.height = state.info.height;
			this.state.name = state.fileName;

			$('#seq_loop').val(`${state.frames - 1}`).trigger('change');
			$('#filmout_stats_video_name').text(state.fileName);
			$('#filmout_stats_video_size').text(`${state.info.width} x ${state.info.height}`);
			$('#filmout_stats_video_frames').text(`${state.frames} frames`);

			gui.updateState();
			this.previewFrame();
		} else {
			$('#projector_type_digital').prop('checked', 'checked');
			$('#digital').removeClass('active');
		}
	}
	previewFrame () {
		const frameStr : string = $('#filmout_position').val() as string;
		const frame : number = parseInt(frameStr, 10);
		this.state.frame = frame;
		ipcRenderer.send('preview_frame', { frame });
	}
	onFrame (evt : any, args : any) {
		const elem : any = $('#filmout');
		elem[0].style.backgroundImage = `url('${args.path}')`;
		elem.addClass('on');
	}
	advance () {
		this.state.frame++;
		if (this.state.frame >= this.state.frames) {
			this.state.frame = 0;
		}
		$('#filmout_position').val(this.state.frame).trigger('change');
	}
	rewind () {
		this.state.frame--;
		if (this.state.frame < 0) {
			this.state.frame = this.state.frames - 1;
		}
		$('#filmout_position').val(this.state.frame).trigger('change');
	}

	preview () {
		const frame : number = this.state.frame;
		ipcRenderer.send('preview', { frame });
	}

	focus () {
		ipcRenderer.send('focus', { focus : true });
	}

	field () {
		let ratio : number = null;
		if (this.state.name) {
			ratio = this.state.width / this.state.height
		}
		ipcRenderer.send('field', { field : true, ratio });
	}

	meter () {
		ipcRenderer.send('meter', { meter : true });
	}

	close (evt : any, arg : any) {

	}
}

filmout = new FilmOut();

module.exports = filmout;
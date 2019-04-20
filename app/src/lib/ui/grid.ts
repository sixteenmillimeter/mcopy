'use strict'

/// <reference path ="jquery.d.ts"/> 

declare var gui : any;
declare var seq : any;
declare var light : any;
declare var cfg : any;
declare var log : any;
declare var w2popup : any;
declare var cam : any;
declare var proj : any;

interface Step {
	cmd : string;
	light: string;
	x : number;
}

let grid : Grid;

/******
	Sequencer grid
*******/
class Grid {
	private swatchesElem : any = {};
	constructor () {

	}
	public init () {
		this.refresh();
		this.events();
		seq.stats();
	}

	/**
	 * Set a specific grid pad to the state stored in the sequence
	 * array at that step
	 *
	 * @param {integer}  x 	Step in sequence
	 **/
	public state (x : number) {
		const elem : any = $(`input[x=${x}]`);
		const lightElem : any = $(`.L[x=${x}]`);
		const step : Step = seq.grid[x];
		let className : string;
		let className2 : string;
		if (typeof step !== 'undefined') {
			elem.prop('checked', false);
			if (step.cmd === cfg.cmd.cameras_forward) {
				className = cfg.cmd.camera_forward;
				className2 = cfg.cmd.camera_second_forward;
			} else if (step.cmd === cfg.cmd.cameras_backward) {
				className = cfg.cmd.camera_backward;
				className2 = cfg.cmd.camera_second_backward;
			} else if (step.cmd === cfg.cmd.camera_forward_camera_second_backward) {
				className = cfg.cmd.camera_forward;
				className2 = cfg.cmd.camera_second_backward;
			} else if (step.cmd === cfg.cmd.camera_backward_camera_second_forward) {
				className = cfg.cmd.camera_backward;
				className2 = cfg.cmd.camera_second_forward;

			} else 	if (step.cmd === cfg.cmd.projectors_forward) {
				className = cfg.cmd.projector_forward;
				className2 = cfg.cmd.projector_second_forward;
			} else if (step.cmd === cfg.cmd.projectors_backward) {
				className = cfg.cmd.projector_backward;
				className2 = cfg.cmd.projector_second_backward;
			} else if (step.cmd === cfg.cmd.projector_forward_projector_second_backward) {
				className = cfg.cmd.projector_forward;
				className2 = cfg.cmd.projector_second_backward;
			} else if (step.cmd === cfg.cmd.projector_backward_projector_second_forward) {
				className = cfg.cmd.projector_backward;
				className2 = cfg.cmd.projector_second_forward;
			} else {
				className = step.cmd;
			}

			$(`.${className}[x=${x}]`).prop('checked', true);
			if (className2) {
				$(`.${className2}[x=${x}]`).prop('checked', true);
			}
			
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
	}
	private otherCmd (x : number, c : string) {
		const step : any = $(`input[x=${x}]`);
		let elem : any;
		let selected : string = '';
		let cmdStr : string;
		$.each(step, function (index : number, value : any) {
			elem = $(this);
			cmdStr = elem.attr('class').replace('.', '');
			//console.log(cmdStr)
			if (elem.prop('checked') && cmdStr !== c) {
				selected = cmdStr;
				return false;
			}
		});
		return selected;
	}
	/**
	 * Clears the UI of the grid and restores it to the 
	 * state of the sequence.
	 *
	 **/
	public refresh () {
		const cmds : string[] = [
			'camera_forward',
			'camera_second_forward', 
			'projector_forward',
			'projector_second_forward',  
			'camera_backward', 
			'camera_second_backward', 
			'projector_backward',
			'projector_second_backward',  
			'light_set', 
			'numbers'
		];
		const width : number = 970 - 34 + ((940 / 24) * Math.abs(24 - seq.size));
		let elem : any;
		let cmd : string;
		
		$('#sequence').width(`${width}px`);
		for (let i : number = 0; i < cmds.length; i++) {
			cmd = `#${cmds[i]}`;
			$(cmd).empty();
			for (let x : number = 0; x < seq.size; x++) {
				if (cmds[i] === 'numbers') {
					elem = `<div x="${x}">${x}</div>`
					$(cmd).append($(elem));
				} else if (cmds[i] === 'light_set') {
					elem = `<div x="${x}" class="L"></div>`
					$(cmd).append($(elem));
				} else {
					elem = `<input type="checkbox" x="${x}" />`;
					$(cmd).append($(elem).addClass(cfg.cmd[cmds[i]]));
				}
				this.state(x);
			}
		}
	}
	/**
	 * Function bound to click on grid pad elements
	 *
	 * @param  {object} elem This, passed from clicked element
	 **/
	public click (elem : any) {
		const x : number = parseInt($(elem).attr('x'));
		let checked : boolean = $(elem).prop('checked');
		let c : string = '';
		let current : string = '';
		let other : string;

		// if input was not checked, but now is
		// event occurs after user action
		c = $(elem).attr('class').replace('.', '');
		if (checked) {
			if (cam.second.enabled) {
				other = this.otherCmd(x, c);
				if (c === cfg.cmd.camera_forward) {
					if (other === '') {
						//skip modification
					} else if (other === cfg.cmd.camera_second_forward) {
						c = cfg.cmd.cameras_forward;
					} else if (other === cfg.cmd.camera_second_backward) {
						c = cfg.cmd.camera_forward_camera_second_backward;
					}
				} else if (c === cfg.cmd.camera_backward) {
					if (other === '') {
						//skip modification
					} else if (other === cfg.cmd.camera_second_forward) {
						c = cfg.cmd.camera_backward_camera_second_forward;
					} else if (other === cfg.cmd.camera_second_backward) {
						c = cfg.cmd.cameras_backward;
					}
				} else if (c === cfg.cmd.camera_second_forward) {
					if (other === '') {
						//skip modification
					} else if (other === cfg.cmd.camera_forward) {
						c = cfg.cmd.cameras_forward;
					} else if (other === cfg.cmd.camera_second_backward) {
						c = cfg.cmd.camera_forward_camera_second_backward;
					}
				} else if (c === cfg.cmd.camera_second_backward) {
					if (other === '') {
						//skip modification
					} else if (other === cfg.cmd.camera_second_forward) {
						c = cfg.cmd.camera_backward_camera_second_forward;
					} else if (other === cfg.cmd.camera_second_backward) {
						c = cfg.cmd.cameras_backward;
					}
				}
			}

			if (proj.second.enabled) {
				other = this.otherCmd(x, c);
				if (c === cfg.cmd.projector_forward) {
					if (other === '') {
						//skip modification
					} else if (other === cfg.cmd.projector_second_forward) {
						c = cfg.cmd.projectors_forward;
					} else if (other === cfg.cmd.projector_second_backward) {
						c = cfg.cmd.projector_forward_projector_second_backward;
					}
				} else if (c === cfg.cmd.projector_backward) {
					if (other === '') {
						//skip modification
					} else if (other === cfg.cmd.projector_second_forward) {
						c = cfg.cmd.projector_backward_projector_second_forward;
					} else if (other === cfg.cmd.projector_second_backward) {
						c = cfg.cmd.projectors_backward;
					}
				} else if (c === cfg.cmd.projector_second_forward) {
					if (other === '') {
						//skip modification
					} else if (other === cfg.cmd.projector_forward) {
						c = cfg.cmd.projectors_forward;
					} else if (other === cfg.cmd.projector_backward) {
						c = cfg.cmd.projector_backward_projector_second_forward;
					}
				} else if (c === cfg.cmd.projector_second_backward) {
					if (other === '') {
						//skip modification
					} else if (other === cfg.cmd.projector_forward) {
						c = cfg.cmd.projector_forward_projector_second_backward;
					} else if (other === cfg.cmd.projector_backward) {
						c = cfg.cmd.projectors_backward;
					}
				}
			}
			seq.set(x, c);
		} else {
			if (seq.grid[x]) {
				current = seq.grid[x].cmd + '' // cast to string, bad hack
			}
			if (cam.second.enabled) {
				other = this.otherCmd(x, c);
				if (current === cfg.cmd.cameras_forward) {
					if (other === cfg.cmd.camera_second_forward) {
						c = cfg.cmd.camera_second_forward;
					} else if (other === cfg.cmd.camera_forward) {
						c = cfg.cmd.camera_forward;
					}
				} else if (current === cfg.cmd.cameras_backward) {
					if (other === cfg.cmd.camera_second_backward) {
						c = cfg.cmd.camera_second_backward;
					} else if (other === cfg.cmd.camera_backward) {
						c = cfg.cmd.camera_backward;
					}
				} else if (current === cfg.cmd.camera_forward_projector_second_backward) {
					if (other === cfg.cmd.camera_second_backward) {
						c = cfg.cmd.camera_second_backward;
					} else if (other === cfg.cmd.camera_forward) {
						c = cfg.cmd.camera_forward;
					}
				} else if (current === cfg.cmd.camera_backward_projector_second_forward) {
					if (other === cfg.cmd.camera_second_forward) {
						c = cfg.cmd.camera_second_forward;
					} else if (other === cfg.cmd.camera_backward) {
						c = cfg.cmd.camera_backward;
					}
				}
			}

			if (proj.second.enabled) {
				other = this.otherCmd(x, c);
				if (current === cfg.cmd.projectors_forward) {
					if (other === cfg.cmd.projector_second_forward) {
						c = cfg.cmd.projector_second_forward;
					} else if (other === cfg.cmd.projector_forward) {
						c = cfg.cmd.projector_forward;
					}
				} else if (current === cfg.cmd.projectors_backward) {
					if (other === cfg.cmd.projector_second_backward) {
						c = cfg.cmd.projector_second_backward;
					} else if (other === cfg.cmd.projector_backward) {
						c = cfg.cmd.projector_backward;
					}
				} else if (current === cfg.cmd.projector_forward_projector_second_backward) {
					if (other === cfg.cmd.projector_second_backward) {
						c = cfg.cmd.projector_second_backward;
					} else if (other === cfg.cmd.projector_forward) {
						c = cfg.cmd.projector_forward;
					}
				} else if (current === cfg.cmd.projector_backward_projector_second_forward) {
					if (other === cfg.cmd.projector_second_forward) {
						c = cfg.cmd.projector_second_forward;
					} else if (other === cfg.cmd.projector_backward) {
						c = cfg.cmd.projector_backward;
					}
				}
			}
			if (c === '') {
				seq.unset(x);
			} else {
				seq.set(x, c);
			}
		}

		this.state(x);
		seq.stats();
	}
	/**
	 * Clears the state of the sequence and then refreshes
	 * the grid and then recalculates the stats on the sequence
	 **/
	public clear () {
		const doit = confirm('Are you sure you want to clear this sequence?');
		if (doit) {
			seq.clear();
			this.refresh();
			seq.stats();
			log.info('Sequencer cleared');
		}
	}
	/**
	 * Add 24 frames to the sequence in the GUI
	 **/
	public plus_24 () {
		seq.size += 24;
		this.refresh();
		log.info(`Sequencer expanded to ${seq.size} steps`);
	}
	/**
	 * Set light value to black (0,0,0) when double clicked
	 *
	 * @param {object} t This, passed from clicked element
	 **/
	public blackout (t : any) {
		const elem : any = $(t);
		const x : number = parseInt(elem.attr('x'));
		if (typeof seq.grid[x].light === 'undefined') {
			return false;
		}
		//console.log(x)
		if (seq.grid[x].light === '0,0,0') {
			seq.setLight(x, light.color);
		} else {
			seq.setLight(x, [0, 0, 0]);
		}	
	}

	/**
	 * Change all lights at all camera commands to a specific
	 * RGB value
	 *
	 * @param {array}  rgb  RGB value [255. 255, 255]
	 */
	public changeAll (rgb : string[]) {
		let c : string;
		for (let step of seq.grid) {
			c = step.cmd;
			if (c === 'CF' || c === 'CB') {
				seq.setLight(step.x, rgb);
			}
		}
	}
	/**
	 * Display color swatch modal for selection of light
	 * color value at specific step
	 *
	 * @param {integer} x   Position in sequence to change value
	 **/
	public swatches (x : number) {
		const current : any = seq.grid[x].light;
		this.swatchesElem = w2popup.open({
			title   : 'Select Color',
			body    : $('#light-swatches').html(),
			buttons : '<button id="sequencer-ok" class="btn btn-default">Ok</button> <button id="sequencer-changeall" class="btn btn-warning">Change All</button> <button id="sequencer-cancel" class="btn btn-default">Cancel</button>',
			onClose : () => {}
		});
		$('.w2ui-msg-body .swatch').removeClass('default set');
		$(`.w2ui-msg-body .swatch[color="${current}"`).eq(0).addClass('default set');

		$('#sequencer-cancel').on('click', this.swatchesElem.close);
		$('#sequencer-changeall').on('click', function () {
			const doit = confirm('You sure you want to change all light settings?');
			const elem = $('.w2ui-msg-body .default');
			let rgb : string[];
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
				seq.setLight(x, rgb);
				light.color = rgb;
				grid.swatchesElem.close();
			} else {
				gui.warn('Select Color', 'Please select a color to proceed.');
			}
		});
	}

	/**
	 * Scroll the grid to a specific step
	 *
	 * @param {integer} x Step to scroll to
	 **/
	public scrollTo (x : number) {
		const w : number = 35 + 3; //width of pad + margin
		$('#seq_scroll').scrollLeft(x * w);
	}

	/**
	 * Bind all events to sequence. Re-evaluate this in search
	 * of memory leak issues with long sequences.
	 **/
	public events () {
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
			const x : number = e.target.attributes.x.value;
			setTimeout(function () {
				grid.swatches(x);
			}, 300);
			e.preventDefault();
			return false;
		});
		$('#seq_scroll').on('scroll', function () {
			let x : number = Math.ceil($('#seq_scroll').scrollLeft() / (35 + 3));
			$('#seq_scroll_state').val(gui.fmtZero(x, 6));
		});
		$('#seq_scroll_state').on('change', function () {
			let x : number = parseInt($(this).val() + '');
			$(this).val(gui.fmtZero(x, 6));
			grid.scrollTo(x);
		});
		$(document.body).on('click', '.w2ui-msg-body .swatch', function () {
			const colorStr = $(this).attr('color');
			const title = $(this).attr('title');
			let color : string[];
			if (typeof color !== 'undefined') {
				color = colorStr.split(',');
				$('.w2ui-msg-body .swatch').removeClass('default set');
				$('#light-swatches .swatch').removeClass('default set');
				$(this).addClass('default set');
				$(`#light-swatches .swatch[title="${title}"]`).eq(0).addClass('default set');
				light.color = color;
			}
		});
	};
}

grid = new Grid();

module.exports = grid
'use strict';

/// <reference path ="jquery.d.ts"/> 

import { Mscript } from 'mscript';

declare var nav : any;
declare var gui : any;
declare var CodeMirror : any;
declare var mscript : any;
declare var cmd : any;

interface MSE {
	mscript : MscriptGUI,
	console : MscriptConsole
}

/******
	Mscript GUI
*******/

class MscriptGUI {
	public editor : any = {};
	public data : any = {};
	public raw : string = '';

	constructor () {

	}

	/**
	 * Initializes the mscript GUI. Sets up CodeMirror instance,
	 * binds events and sets height of editor.
	 **/
	public init () {
		const startingScript : string = `CF 1
PF 1`; 
		const editorHeight : number = $(window).height() - $('footer').eq(0).height() - 30;
		const editorElem : HTMLTextAreaElement = document.getElementById('editor') as HTMLTextAreaElement;
		const editorConfig : any = {
			lineNumbers: true,
			mode: 'python',
			matchBrackets: true,
			theme: 'monokai'
		};
		$('#editor').val(startingScript);
		this.editor = CodeMirror.fromTextArea(editorElem, editorConfig);
		this.editor.setSize(null, editorHeight);
		this.editor.on('change', (e : Event) => { });
		$(document).on('resize', function (e : Event) {
			this.editor.setSize(null, editorHeight);
		}.bind(this));
	}

	/**
	 * Callback for when open event occurs.
	 **/
	public open () {
		//recalcuate in case resize has occurred needed
		const editorHeight : number = $(window).height() - $('footer').eq(0).height() - 30;
		this.editor.setSize(null, editorHeight);
		this.editor.refresh();
	}

	/**
	 * Create script from the sequencer's current state.
	 * Previous comment: ehhhh
	 * TODO: Make this smarter.
	 **/
	 fromSequence () {
		let str : string;
		let tmp : any[] = [];
		let cont : boolean;
		let cmd : string;
		
		//str = seq.grid.map(step => { return step.cmd }).join('\n'); //quick hack
		//console.dir(seq.grid);

		for (let step of seq.grid) {
			if (!step || !step.cmd) {
				continue;
			}
			cmd = step.cmd;
			if (tmp.length > 0 && tmp[tmp.length - 1].cmd === cmd) {
				tmp[tmp.length - 1].num++;
				continue;
			}
			tmp.push({ cmd, num : 1 });
		}

		tmp = tmp.map(line => {
			return `${line.cmd} ${line.num}`
		})

		if (seq.gridLoops > 1) {
			tmp.map(line => {
				return `	${line}`;
			})
			tmp.reverse();
			tmp.push(`LOOP ${seq.gridLoops}`);
			tmp.reverse();
			tmp.push('END');
		}

		str = tmp.join('\n');

		nav.change('script');
		cont = confirm(`Are you sure you want to over-write the current sequence?`);
		if (cont) {
			this.editor.getDoc().setValue(str);
		}
	}

	/**
	 * Take current compiled mscript state and send it to the sequencer
	 * GUI. TODO: Add confirm step if sequence is longer than X steps.
	 * TODO: Make this smarter (detect outer non-fade loop and assign to loop counter)
	 **/ 
	toGUI () {
		let c : string;
		let step : string;
		for (let x : number = 0; x < this.data.arr.length; x++) {
			c = this.data.arr[x];
			seq.set(x, c);
			if (c === 'CF' || c === 'CB') {
				if (typeof this.data.meta[x] !== 'undefined' && this.data.meta[x] !== '') {
					seq.setLight(x, this.data.meta[x]);
				} else {
					seq.setLight(x, light.color);
				}
			} else {
				//unset light?
			}
			grid.state(x);
		}
	}

	/**
	 * Handles compilation of mscript and switches to sequencer
	 * GUI after confirmation questions.
	 **/
	 toSequence () {
		const data : string = this.editor.getValue();
		let cont : boolean = false;
		if (data !== this.raw) {
			cont = confirm(`Current script has not been compiled. Compile first?`);
			if (cont) {
				this.compile()
			}
		}
		mse.console.print(`Sending compiled script to GUI sequencer...`);
		seq.clear();
		this.toGUI();
		grid.refresh();
		seq.stats();
		return nav.change('sequencer');
	}

	/**
	 * Compiles text in editor using the Mscript library.
	 * 
	 **/
	 compile () {
		const data : string = this.editor.getValue();
		const mscript : Mscript = new Mscript();
		const output : any = mscript.interpret(data);
		const len : number = output.arr.length;
		const cam2 : string = typeof output.cam2 !== 'undefined' ? `, CAM2 : ${output.cam2}` : '';
		const proj2 : string = typeof output.proj2 !== 'undefined' ? `, PROJ2 : ${output.proj2}` : '';
		const report : string = `Sequence contains ${len} step${(len === 1 ? '' : 's')}, CAM: ${output.cam}, PROJ: ${output.proj}${cam2}${proj2}`;

		this.raw = data;
		this.data = output;
		//mse.console.print(JSON.stringify(output, null, '\t') + '\n')
		mse.console.print(report);
	}

	/**
	 * This function re-writes the optional "meta" attribute
	 * of an mcopy command object to "light". TODO: change this.
	 * Do not re-write this object and improve the consumers
	 * of the compiled data.
	 **/
	prepare () {
		const arr : any[] = [];
		let obj : any;
		for (let i : number = 0; i < this.data.arr.length; i++) {
			obj = {
				cmd : this.data.arr[i]
			};
			if (typeof this.data.meta[i] !== 'undefined' && this.data.meta[i] !== '') {
				obj.light = this.data.meta[i];
			} else {
				obj.light = light.color.join(',');
			}
			arr.push(obj);
		}
		return arr;
	}

	/**
	 * Method which compiles script if needs and then runs as a sequence.
	 **/
	run () {
		const data : string = this.editor.getValue();
		let arr : any[];
		let cont : boolean = false;
		if (data !== this.raw) {
			cont = confirm(`Current script has not been compiled. Compile first?`);
			if (cont) {
				this.compile();
			}
		}
		arr = this.prepare();
		mse.console.print(`Started running compiled sequence...`);
		gui.overlay(true);
		gui.spinner(true, `Running mscript sequence...`, true, true);
		return seq.exec(arr, 1);
	}
}


/*******
 *   Mscript GUI Console
 *******/

class MscriptConsole {
	public elem : JQuery;
	private lines : string[];
	

	/**
	 * Initializes the console by creating the element
	 * containing the output text and binding to
	 * keyup event.
	 **/
	public init () {
		this.elem = $('#console textarea');
		this.elem.on('keyup', function (e : KeyboardEvent) {
			var code : number = e.keyCode || e.which;
			if (code === 13) {
				this.exec();
				e.preventDefault();
				return false;
			}
		}.bind(this));
	}
	
	/**
	 * Parse the current state of the console and get the last
	 * line to add to the current state array.
	 **/
	parse () {
		const lines : string[] = (this.elem.val() + '').split('\n');
		const line : string = lines[lines.length - 2].replace('>', '').trim();
		this.lines.push(line);
	}

	/**
	 * Executes the command in the last line of the console.
	 * TODO: implement the remaining commands. Currently only camera
	 * forward and backward will be executed.
	 **/
	exec () {
		let command : string;
		this.parse();
		command = this.lines[this.lines.length - 1].replace('>', '').trim();
		log.info(command);
		this.newLine();
		if (mscript.cmd.indexOf(command) !== -1) {
			if (command === 'CF') {
				cmd.camera_forward(light.color);
			} else if (cmd === 'CB') {
				cmd.camera_backward(light.color);
			}
		}

		if (command === 'compile') {
			mse.mscript.compile();
		} else if (command === 'run') {
			mse.mscript.run();
		}
	}

	/**
	 * Adds a new line to the console after an event
	 * and re-establishes the height of the array. Animates
	 * the console to scroll down to last line.
	 **/
	newLine () {
		let current : string = (this.elem.val() + '');
		let height : number;
		current += '> ';
		this.elem.val(current);
		height = this.elem[0].scrollHeight;
		this.elem.animate({
		    scrollTop : height
		}, 'normal');
	}

	/**
	 * Print string to the console and add new line
	 **/
	print (str : string) {
		let current : string = (this.elem.val() + '');
		let height : number;
		current += str;
		mse.console.elem.val(current);
		mse.console.elem.focus();

		this.newLine();
	}
}

const mse : MSE = {
	mscript : new MscriptGUI(),
	console : new MscriptConsole()
};

module.exports = mse;
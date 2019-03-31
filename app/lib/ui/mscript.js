const mse = {};

/******
	Mscript GUI
*******/
mse.mscript = {};
mse.mscript.editor = {};
mse.mscript.data = {};
mse.mscript.raw = '';
mse.mscript.init = function () {
	'use strict';
	$('#editor').val('CF 1\nPF 1');
	mse.mscript.editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
		lineNumbers: true,
		mode: 'python',
		matchBrackets: true,
		theme: 'monokai'
	});
	mse.mscript.editor.setSize(null, $(window).height() - $('footer').eq(0).height() - 30);
	mse.mscript.editor.on('change', function (e) {
		//
	});
	$(document).on('resize', function (e) {
		mse.mscript.editor.setSize(null, $(window).height() - $('footer').eq(0).height() - 30);
	});
};
mse.mscript.open = function () {
	'use strict';
	mse.mscript.editor.setSize(null, $(window).height() - $('footer').eq(0).height() - 30);
	mse.mscript.editor.refresh();
};
mse.mscript.fromSequence = function () {
	//ehhhhh
	'use strict';
	let str;
	let tmp = [];
	let cont;
	let cmd;
	//str = seq.grid.map(step => { return step.cmd }).join('\n'); //quick hack
	console.dir(seq.grid);
	for (let step of seq.grid) {
		cmd = step.cmd;
		if (tmp.length > 0 && tmp[tmp.length - 1].cmd === cmd) {
			tmp[tmp.length - 1].num++;
			continue;
		}
		tmp.push({ cmd : cmd, num : 1 });
	}
	tmp = tmp.map(line => {
		return `${line.cmd} ${line.num}`
	})
	
	if (seq.loop > 1) {
		tmp.map(line => {
			return `	${line}`;
		})
		tmp.reverse();
		tmp.push(`LOOP ${seq.loop}`);
		tmp.reverse();
		tmp.push('END');
	}

	str = tmp.join('\n');

	nav.change('script');
	cont = confirm(`Are you sure you want to over-write the current sequence?`);
	if (cont) {
		mse.mscript.editor.getDoc().setValue(str);
	}
};
mse.mscript.toGUI = function () {
	'use strict';
	let c;
	let step;
	for (let x = 0; x < mse.mscript.data.arr.length; x++) {
		c = mse.mscript.data.arr[x];
		seq.set(x, c);
		console.dir(mse.mscript.data);
		if (c === 'CF' || c === 'CB') {
			if (typeof mse.mscript.data.light[x] !== 'undefined' && mse.mscript.data.light[x] !== '') {
				seq.setLight(x, mse.mscript.data.light[x]);
			} else {
				seq.setLight(x, light.color.join(','));
			}
		} else {
			//unset light?
		}
		grid.state(i);
	}
};
mse.mscript.toSequence = function () {
	'use strict';
	const data = mse.mscript.editor.getValue();
	let cont;
	if (data !== mse.mscript.raw) {
		cont = confirm(`Current script has not been compiled. Compile first?`);
		if (cont) {
			return mse.mscript.compile(() => {
				mse.console.print(`Sending compiled script to GUI sequencer...`);
				seq.clear();
				mse.mscript.toGUI();
				grid.refresh();
				seq.stats();
				return nav.change('sequencer');
			})
		}
	}
	mse.console.print(`Sending compiled script to GUI sequencer...`);
	seq.clear();
	mse.mscript.toGUI();
	grid.refresh();
	seq.stats();
	return nav.change('sequencer');
}
mse.mscript.compile = function (cb) {
	'use strict';
	const data = mse.mscript.editor.getValue();
	let mscript = new Mscript();
	let output;
	mse.mscript.raw = data;
	mscript.interpret(data, (output) => {
		let len = output.arr.length;
		mse.mscript.data = output;
		//mse.console.print(JSON.stringify(output, null, '\t') + '\n')
		mse.console.print(`Sequence contains ${len} step${(len === 1 ? '' : 's')}, CAM: ${output.cam}, PROJ: ${output.proj}`);
		if (cb) cb();
	});
};

mse.mscript.prepare = function () {
	'use strict';
	const arr = [];
	let obj;
	for (let i = 0; i < mse.mscript.data.arr.length; i++) {
		obj = {
			cmd : mse.mscript.data.arr[i]
		};
		if (typeof mse.mscript.data.light[i] !== 'undefined' && mse.mscript.data.light[i] !== '') {
			obj.light = mse.mscript.data.light[i];
		} else {
			obj.light = light.color.join(',');
		}
		arr.push(obj);
	}
	return arr;
};

mse.mscript.run = function () {
	'use strict';
	const data = mse.mscript.editor.getValue();
	let arr;
	let cont;
	if (data !== mse.mscript.raw) {
		cont = confirm(`Current script has not been compiled. Compile first?`);
		if (cont) {
			return mse.mscript.compile(() => {
				mse.console.print(`Started running compiled sequence...`);
				arr = mse.mscript.prepare();
				gui.overlay(true);
				gui.spinner(true, `Running mscript sequence...`, true, true);
				return seq.exec(arr, 1);
			})
		}
	}
	arr = mse.mscript.prepare();

	mse.console.print(`Started running compiled sequence...`);
	gui.overlay(true);
	gui.spinner(true, `Running mscript sequence...`, true, true);

	return seq.exec(arr, 1);
};

/*******
 *   gui console
 *******/
mse.console = {};
mse.console.elem = {};
mse.console.init = function () {
	'use script';
	mse.console.elem = $('#console textarea');
	mse.console.elem.on('keyup', function (e) {
		var code = e.keyCode || e.which;
		if (code === 13) {
			mse.console.exec();
			e.preventDefault();
			return false;
		}
	});
};
mse.console.lines = [];
mse.console.parse = function () {
	'use strict';
	const lines = mse.console.elem.val().split('\n');
	const line = lines[lines.length - 2].replace('>', '').trim();
	mse.console.lines.push(line);
};

mse.console.exec = function () {
	'use strict';
	let command;
	mse.console.parse();
	command = mse.console.lines[mse.console.lines.length - 1].replace('>', '').trim();
	console.log(command);
	mse.console.newLine();
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
};

mse.console.newLine = function () {
	'use strict';
	let current = mse.console.elem.val();
	let height;
	current += '> ';
	mse.console.elem.val(current);
	height = mse.console.elem[0].scrollHeight;
	mse.console.elem.animate({
	    scrollTop : height
	},'normal');
};

mse.console.print = function (str) {
	'use strict'
	let current = mse.console.elem.val();
	let height;
	current += str;
	current += '\n> ';
	mse.console.elem.val(current);
	mse.console.elem.focus();

	height = mse.console.elem[0].scrollHeight;
	mse.console.elem.animate({
	    scrollTop : height
	},'normal');
};

module.exports = mse;
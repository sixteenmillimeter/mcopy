var mse = {};

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
	$('#mscript textarea').val(mcopy.state.sequence.arr.join('\n'));
};
mse.mscript.eval = function () {
	'use strict';
	const data = mse.mscript.editor.getValue();
	const output = mscript.interpret(data, function (output) {
		console.dir(output);
		mse.console.print(JSON.stringify(output, null, '\t'))
	});
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
	if (mscript.cmd.indexOf(command) !== -1) {
		if (command === 'CF') {
			cmd.cam_forward(light.color);
		} else if (cmd === 'CB') {
			cmd.cam_backward(light.color);
		}
	}
	mse.console.newLine();
};
mse.console.newLine = function () {
	'use strict';
	let current = mse.console.elem.val();
	current += '> ';
	mse.console.elem.val(current);
};

mse.console.print = function (str) {
	'use strict'
	let current = mse.console.elem.val();
	current += '> ';
	current += str;
	mse.console.elem.val(current);
};

module.exports = mse;
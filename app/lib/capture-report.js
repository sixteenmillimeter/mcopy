var capture = {},
	fs = require('fs'),
	exec = require('child_process').exec;

capture.active = false;
capture.store = {};

capture.start = function () {
	'use strict';
	capture.store.events = [];
	capture.store.start = +new Date();
};

capture.proj_start = function () {
	'use strict';
	var e = {
		'start' : +new Date()
	};
	capture.store.events.push(e);
};

capture.proj_end = function () {
	'use strict';
	var e = {
		'end' : +new Date()
	};
	capture.store.events.push(e);
};

capture.report = {};

capture.report.parse = function (first, report, fps, type) {
	'use strict';
	var output = [],
		frame,
		last = null,
		buffer;
	if (typeof fps === 'undefined') {
		fps = 24;
	}
	frame = 1000 / fps; 
	if (typeof report === 'undefined') {
		report = capture.store;
	} else {
		report = JSON.parse(fs.readFileSync(report, 'utf8'));
	}
	if (typeof type === 'undefined') {
		type = 'still';
	}
	if (typeof first === 'undefined') {
		first = 0;
	}
	if (type === 'still') {
		//first clean frame
		for (i = 0; i < report.events.length; i++) {
			if (typeof report.events[i].start !=== 'undefined') {
				buffer = report.events[i].start;
				if (last !== null) {
					
					output.push();
				}
			} else {
				buffer = report.events[i].end - buffer;
				last = report.events[i].end;
			}
		}

	} else if (type === 'video') {

	}
	return output;
};

capture.report.render = function () {
	'use strict';

};

capture.test = function () {
	'use strict';
	var i = -1,
		len = 10,
		intval,
		next = function () {
			i++
			if (i === len) {
				clearInterval(intval);
				intval = null;
				console.dir(capture.store);
				parse();
			} else {
				if (i % 2 === 0) {
					capture.proj_start();
				} else {
					capture.proj_end();
				}
			}
	},
	parse = function () {
		capture.report.parse();
	};
	capture.start();
	intval = setInterval(next, 800);
};


capture.test();
//module.exports = capture;
var capture = {},
	eventEmitter,
	fs = require('fs'),
	exec = require('child_process').exec;

capture.active = true;
capture.store = {
	events : [],
	start : 0
};

capture.start = function (first) {
	'use strict';
	//reset storage
	capture.store.events = [];
	capture.store.start = +new Date();
};
capture.end = function () {
	'use strict';
	return capture.store;
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
//out-000001
capture.pad = function (frame, len) {
	'use strict';
	var pad = '',
		ch = '0';
	frame += '';
	len = len - frame.length;
  	if (len <= 0) return frame;
	  while (true) {
	    if (len & 1) {
	    	pad += ch;
	    }
	    len >>= 1;
	    if (len) {
	    	ch += ch;
	    } else {
	    	break;
	    }
	  }
  return pad + frame;
};
capture.extract = function (input, output, good, real, neg) {
	'use strict';
	var tc = capture.report.timecode(good),
		frame = capture.pad(real, 6),
		neg_cmd = ' -vf lutrgb="r=negval:g=negval:b=negval" ',
		cmd = 'ffmpeg -ss ' + tc + ' -i ' + input + '{{neg_cmd}}-vframes 1 ' + output + 'out-' + frame + '.tif';
	if (neg) {
		cmd = cmd.replace('{{neg_cmd}}', neg_cmd);
	} else {
		cmd = cmd.replace('{{neg_cmd}}', ' ');
	}
	console.log(cmd);
	exec(cmd, function (err, std) {
		console.log(err);
		console.log(std);
	});
};
capture.cp = function (input, output, good, real) {
	'use strict';
	var still = '';
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
				//console.dir(capture.store);
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
		capture.report.parse(45, 0);
	};
	capture.start();
	next();
	intval = setInterval(next, 800);
};
capture.init = function () {
	'use strict';
	eventEmitter.on('arduino_send', function (cmd) {
		if (capture.active
			&& cmd.trim() === 'p') {
			capture.proj_start();
		}
	});
	eventEmitter.on('arduino_end', function (cmd) {
		if (capture.active
			&& cmd.trim() === 'p') {
			capture.proj_end();
		}
	});
};

capture.save = function () {
	'use strict';
	var file = './data/transfer-',
		time = +new Date(),
		json = JSON.stringify(capture.store);
	fs.writeFileSync(file + time + '.json', json, 'utf8');
};

//ffmpeg -f image2 -framerate 24 -start_number 090000 -i input_file_%06d.ext -c:v v210 -an output_file
//'-%06d

capture.report = {};
capture.report.parse = function (inmark, first, report, fps) {
	'use strict';
	var all = [],
		output = {
			good : [],
			real : []
		},
		good = [],
		real,
		f,
		frame,
		last = -1,
		i;
	if (typeof fps === 'undefined') {
		fps = 24;
	}
	f = 1000 / fps; 
	if (typeof report === 'undefined') {
		report = capture.store;
	}
	if (typeof first === 'undefined') {
		first = 0;
	}
	if (typeof inmark === 'undefined') {
		inmark = 0;
	}
	//first clean frame
	for (i = 0; i < report.events.length; i++) {
		if (typeof report.events[i].end !== 'undefined') {
			frame = (report.events[i].end - report.start) / f;
			frame = Math.round(frame);
			last = frame;
		} else if (typeof report.events[i].start !== 'undefined') {
			frame = (report.events[i].start - report.start) / f;
			frame = Math.round(frame);
			if (last !== -1) {
				//console.log(last + '-' + frame);
				all.push(capture.report.arr(last, frame));
			}
		}
	}
	good = all.map(function (arr) {
		var center = Math.round(arr.length / 2);
		return arr[center] + inmark;
	});

	real = output.map(function (val, i) {
		return first + i;
	});

	output.good = good;
	output.real = real;

	return output;
};
capture.report.arr = function (start, end) {
	'use strict';
	var arr = [],
		i;
	for (i = start; i < end + 1; i++) {
		arr.push(i);
	}
	return arr;
};
capture.report.timecode = function (frame) {
	'use strict';
	 //00:03:00 no dropframe
	 var a = capture.pad(Math.floor((frame / 60) / 60), 2),
	 	b = capture.pad(Math.floor(frame / 60), 2),
	 	c = capture.pad(frame % 24);
	 return a + ':' + b + ':' + c;
};
capture.report.render = function () {
	'use strict';

};

module.exports = function (ee) {
	eventEmitter = ee;
	return capture;
};


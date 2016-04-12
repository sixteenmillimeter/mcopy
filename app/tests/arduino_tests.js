var fs = require('fs'),
	mcopy = {};

mcopy.cfg = JSON.parse(fs.readFileSync('./cfg.json', 'utf8'));
mcopy.arduino = require('../lib/mcopy-arduino.js')(mcopy.cfg);

mcopy.arduino.colorTest = function (color, cb) {
	mcopy.arduino.send(mcopy.cfg.arduino.cmd.light, function () {
		console.log('Light set to ' + color);
		if (cb) setTimeout(cb, 20);
	});
	mcopy.arduino.string(color);
};

mcopy.arduino.init(function (success) {
	mcopy.arduino.connect(function () {
		/*
		mcopy.arduino.colorTest('255,140,70', function () {
		mcopy.arduino.colorTest('5,0,0', function () {
		mcopy.arduino.colorTest('255,255,255', function () {
		mcopy.arduino.colorTest('160,14,250', function () {
		mcopy.arduino.colorTest('5,32,200', function () {
			
		});//5	
		});//4		
		});//3	
		});//2
		});//1
		*/
	});
});
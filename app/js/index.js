var ipcRenderer = require('electron').ipcRenderer,
	light = {};
//console.log(ipcRenderer.sendSync('light', { 'fuck' : true }) );


light.set = function (color) {
	'use strict';
	console.log('color: ' + color.join(','));
	ipcRenderer.sendSync('light', color);
};

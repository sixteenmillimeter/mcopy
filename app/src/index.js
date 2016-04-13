var ipcRenderer = require('electron').ipcRenderer,
	light = {};
//console.log(ipcRenderer.sendSync('light', { 'fuck' : true }) );


light.set = function (color) {
	'use strict';
	console.log('color: ' + color.join(','));
	ipcRenderer.sendSync('light', color);
};


var init = function () {
	'use strict';
	$('#toolbar').w2toolbar({
		name: 'toolbar',
		items: [
			{ type: 'check',  id: 'item1', caption: 'Check', img: 'icon-page', checked: true },
			{ type: 'break',  id: 'break0' },
			{ type: 'menu',   id: 'item2', caption: 'Drop Down', img: 'icon-folder', items: [
				{ text: 'Item 1', icon: 'icon-page' }, 
				{ text: 'Item 2', icon: 'icon-page' }, 
				{ text: 'Item 3', value: 'Item Three', icon: 'icon-page' }
			]},
			{ type: 'break', id: 'break1' },
			{ type: 'radio',  id: 'item3',  group: '1', caption: 'Radio 1', icon: 'fa-star', checked: true },
			{ type: 'radio',  id: 'item4',  group: '1', caption: 'Radio 2', icon: 'fa-star-empty' },
			{ type: 'spacer' },
			{ type: 'button',  id: 'item5',  caption: 'Item 5', icon: 'fa-home' }
		]
	});
};

init();
const nav = {};

//NAV
nav.active = 'sequencer';
nav.init = function () {
	'use strict';
	$('#toolbar').w2toolbar({
		name: 'toolbar',
		items: [
			{ type: 'radio',  id: 'sequencer',  group: '1', caption: 'Sequencer', icon: 'fa fa-th', checked: true },
			{ type: 'radio',  id: 'controls',  group: '1', caption: 'Controls', icon: 'fa fa-tasks' },
			{ type: 'radio',  id: 'light',  group: '1', caption: 'Light', icon: 'mcopy-light' },
			{ type: 'radio',  id: 'script',  group: '1', caption: 'Script', icon: 'fa fa-code' },
			{ type: 'radio',  id: 'video', group: '1', caption : 'Film Out', icon: 'fa fa-video-camera'},
			{ type: 'spacer' },
			{ type: 'radio',  id: 'settings',  group: '1', caption: 'Settings', icon: 'fa fa-cogs' }
		],
		onClick : function (event) {
			nav.change(event.target);
		}
	});
};
nav.change = function (id) {
	'use strict';
	nav.active = id;
	$('.screen').hide();
	$('#' + id).show();
	if (id === 'light') {
		if (w2ui['colors'].active === 'rgb') {
			light.rgb.set(light.color);
		}
	} else if (id === 'script') {
		mse.mscript.open();
	}
};

module.exports = nav;
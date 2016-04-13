var ipcRenderer = require('electron').ipcRenderer,
	light = {},
	log = {};
//console.log(ipcRenderer.sendSync('light', { 'fuck' : true }) );

log.time = 'MM/DD/YY-HH:mm:ss';
log.count = 0;
log.init = function () {
	'use strict';
	$('#log').w2grid({ 
	    name   : 'log', 
	    columns: [                
	        { field: 'time', caption: 'Time', size: '22%' },
	        { field: 'action', caption: 'Action', size: '58%' },
	        { field: 'service', caption: 'Service', size: '20%' },
	        { field: 'status', caption: 'Status', size: '10%' },
	    ],
	    records: []
	});
	//{ recid: 1, time: moment().format(log.time), action: 'Started app', service: 'MAIN', status: true }
	log.info('Started app', 'MAIN', true);
};

log.listen = function () {
	ipcRender.on('log', function (event, arg) {
		console.log(arg);
		return event.returnValue = true;
	});
};

log.display = function (action, service, status, time) {
	'use strict';
	var obj = {
		recid : log.count++,
		time : time,
		action : action,
		service : service,
		status : status
	}
	if (typeof time === 'undefined') {
		obj.time = moment().format(log.time);
	}
	w2ui['log'].add(obj);
	$('#log').animate({ scrollTop: $('#log').prop('scrollHeight')}, 100);
	return obj;
};

log.report = function (obj) {
	'use strict';
	ipcRenderer.sendSync('log', obj);
};

log.info = function (action, service, status, time) {
	'use strict';
	var obj = log.display(action, service, status, time);
	log.report(obj);
	console.log(obj);
};

//color = [0,0,0]
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
			{ type: 'radio',  id: 'item1',  group: '1', caption: 'Sequence', icon: 'fa-star', checked: true },
			{ type: 'radio',  id: 'item2',  group: '1', caption: 'Script', icon: 'fa-star-empty' },
			{ type: 'radio',  id: 'item3',  group: '1', caption: 'Controls', icon: 'fa-star-empty' },
			{ type: 'radio',  id: 'item4',  group: '1', caption: 'Light', icon: 'fa-star-empty' },
			{ type: 'spacer' },
			{ type: 'button',  id: 'item5',  group: '1', caption: 'Settings', icon: 'fa-home' }
		]
	});
	log.init();
};
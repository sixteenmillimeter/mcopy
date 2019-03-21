const log = {};

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
	log.listen();
};
log.listen = function () {
	'use strict';
	ipcRenderer.on('log', function (event, arg) {
		log.display(arg.action, arg.service, arg.status, arg.time);
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
	if (nav.active === 'controls') {
		w2ui['log'].scrollIntoView(log.count - 1);
		w2ui['log'].selectNone();
		w2ui['log'].select(log.count - 1);
	}
	
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
	//console.log(obj);
};

module.exports = log;
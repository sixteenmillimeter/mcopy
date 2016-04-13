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
			{ type: 'radio',  id: 'item1',  group: '1', caption: 'Sequence', icon: 'fa-star', checked: true },
			{ type: 'radio',  id: 'item2',  group: '1', caption: 'Script', icon: 'fa-star-empty' },
			{ type: 'radio',  id: 'item3',  group: '1', caption: 'Controls', icon: 'fa-star-empty' },
			{ type: 'radio',  id: 'item4',  group: '1', caption: 'Light', icon: 'fa-star-empty' },
			{ type: 'spacer' },
			{ type: 'button',  id: 'item5',  group: '1', caption: 'Settings', icon: 'fa-home' }
		]
	});
	$('#log').w2grid({ 
	    name   : 'myGrid', 
	    columns: [                
	        { field: 'fname', caption: 'First Name', size: '30%' },
	        { field: 'lname', caption: 'Last Name', size: '30%' },
	        { field: 'email', caption: 'Email', size: '40%' },
	        { field: 'sdate', caption: 'Start Date', size: '120px' },
	    ],
	    records: [
	        { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	        { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	        { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	        { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	        { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	        { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	        { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	        { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	        { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
	    ]
	});
};
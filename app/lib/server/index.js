'use script'

let os
let restify
let app

let cam
let proj
let light

class Server {
	constructor (mcopy) {
		restify = require('restify')
		os = require('os')
		app = express()


		this.getIp()
		app.get('/', function (req, res) {
			mcopy.mobile.log('Device connected');
			res.send(fs.readFileSync('tmpl/mcopy_index.html', 'utf8'));
		});
	app.get('/js/mcopy_mobile.js', function (req, res) {
		res.send(fs.readFileSync('js/mcopy_mobile.js', 'utf8'));
	});
	app.get('/js/jquery.js', function (req, res) {
		res.send(fs.readFileSync('js/jquery.js', 'utf8'));
	});
	app.get('/cmd/:cmd', function (req, res) {
		var cmd,
			success = function (res) {
				var obj = {
					success: true, 
					cmd : cmd,
					cam : mcopy.state.camera,
					proj : mcopy.state.projector
				}
				res.json(obj);
			};
		if (typeof req.params.cmd !== 'undefined') {
			mcopy.log('Receiving command from mobile: ' + req.params.cmd);
			cmd = req.params.cmd;
			if (cmd === 'CF'){
				mcopy.cmd.cam_forward(success);
			} else if (cmd === 'CB') {
				mcopy.cmd.cam_backward(success);
			} else if (cmd === 'PF') {
				mcopy.cmd.proj_forward(success);			
			} else if (cmd === 'PB') {
				mcopy.cmd.proj_backward(success);			
			} else {
				mcopy.mobile.fail(res, 'Command ' + cmd + ' not found');
			}
		} else {
			mcopy.mobile.fail(res, 'No command provided');
		}
	});
	app.get('/state', function (req, res) {
		res.json({
			cam: mcopy.state.camera,
			proj: mcopy.state.projector
		});
	});
	var http = require('http');
	http.createServer(app).listen(mcopy.cfg.ext_port);
	}
	end () {
		app.close()
	}
}

module.exports = Server
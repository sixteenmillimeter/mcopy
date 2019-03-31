'use script'

let os
let restify
let app

let cam
let proj
let light

const PACKAGE = require('../../package.json')

class Server {
	constructor (camera, projector, light) {
		restify = require('restify')
		os = require('os')
		app = restify.createServer({
			name: 'mcopy-server',
			version: PACKAGE.version
		})

		this.ip = this.getIp()

		/*app.get('/', function (req, res) {
			mcopy.mobile.log('Device connected');
			res.send(fs.readFileSync('tmpl/mcopy_index.html', 'utf8'));
		})
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
						cam: {
							dir : cam.dir,
							pos : cam.pos
						},
						proj: {
							dir : proj.dir,
							pos : proj.pos
						}
					}
					res.json(obj);
				};
			if (typeof req.params.cmd !== 'undefined') {
				mcopy.log('Receiving command from mobile: ' + req.params.cmd);
				cmd = req.params.cmd;
				if (cmd === 'CF'){
					mcopy.cmd.camera_forward(success);
				} else if (cmd === 'CB') {
					mcopy.cmd.camera_backward(success);
				} else if (cmd === 'PF') {
					mcopy.cmd.projector_forward(success);			
				} else if (cmd === 'PB') {
					mcopy.cmd.projector_backward(success);			
				} else {
					mcopy.mobile.fail(res, 'Command ' + cmd + ' not found');
				}
			} else {
				mcopy.mobile.fail(res, 'No command provided');
			}
		});
		app.get('/state', function (req, res) {
			res.json({
				cam: {
					dir : cam.dir,
					pos : cam.pos
				},
				proj: {
					dir : proj.dir,
					pos : proj.pos
				}
			});
		});*/

		
	}
	end () {
		app.close()
		app = null
	}
}

module.exports = Server
import WebSocket, { WebSocketServer } from 'ws'
import express, { Express, Request, Response, Application } from 'express'
import { readFile } from 'fs/promises'
import mime from 'mime'
import Log = require('log')

interface ServerData {
	[key: string]: string;
	PORT? : string;
}

interface ServerTemplate {
	name : string;
	path : string;
	data? : string;
}

interface ServerProxy {
	path : string;
	mime : string;
}

interface ServerProxyList {
	[key: string]: ServerProxy;
}

class Server {
	private id : string = 'server'
	public isActive : boolean = false
	private log : any
	private templates : ServerTemplate[] = [
		{
			name :'index',
			path : 'server.html'
		}, 
		{
			name : 'script',
			path : 'lib/client/index.js'
		}
	]
	private http : Application
	private httpd : Server
	private wss : WebSocketServer
	private port : number = 9900
	private wsPort : number = 9901
	private proxy : ServerProxyList = {}

	constructor () {
		this.init()
		
	}

	async init () {
		this.log = await Log({ label : this.id });
		await this.load()
		await this.start()
	}

	async load () {
		this.http = express()
		for (let tmpl of this.templates) {
			tmpl.data = await readFile(tmpl.path, 'utf8')
		}

		this.http.get('/', this.index.bind(this))
		this.http.get('/client.js', this.script.bind(this))
		this.http.get('/image/:key', this.image.bind(this))

		this.log.info("Server assets loaded")
	}

	template (name: string, data : ServerData) {
		let html : string = this.templates.find(el => el.name === name).data
		for (let key  of Object.keys(data)) {
			html = html.replace(`{{${key}}}`, data[key])
		}
		return html
	}

	async startWss () {
		try {
			this.wss = new WebSocketServer({ port: this.wsPort })
		} catch (err) {
			this.log.error(err)
			return
		}
		this.wss.on('connection', (ws) => {
			this.log.info(`Client connected to WebSocketServer`)
			ws.send(JSON.stringify({ action : 'mcopy' });
		})
		this.log.info(`WSS [ ws://localhost:${this.wsPort} ]`)
	}

	async startHttp () {
		return new Promise(function (resolve : Function, reject : Function) {
			this.httpd = this.http.listen(this.port, function () {
				this.log.info(`Server started!`)
				this.log.info(`URL [ http://localhost:${this.port} ]`)
				return resolve(true)
			}.bind(this))
		}.bind(this))
	}

	async start () {
		await this.startHttp()
		await this.startWss()
		this.isActive = true
	}

	async stop() {
		return new Promise(function (resolve : Function, reject : Function) {
			return this.httpd.close(function () {
				this.isActive = false
				this.log.info(`Server stopped :(`)
				return resolve(false)
			}.bind(this))
		}.bind(this))
	}

	index (req : Request, res : Response, next : Function) {
		const html : string = this.template('index', { PORT : `${this.port}` })
		this.log.info('GET /')
		return res.send(html)
	}
	script (req : Request, res : Response, next : Function) {
		const js : string = this.template('script', { PORT : `${this.wsPort}` })
		res.contentType('text/javascript')
		this.log.info('GET /script.js')
		return res.send(js)
	}

	async image (req : Request, res : Response, next : Function) {
		let filePath : string
		if (req.params && req.params.key) {
			if (this.proxy[req.params.key]) {
				filePath = this.proxy[req.params.key].path
			} else {
				return false
			}
		} else {
			return false
		}
		return new Promise(function (resolve : Function, reject: Function) {
			return res.sendFile(filePath, function (err : any) {
		        if (err) {
		            res.status(err.status).end()
		            return reject(err)
		        }
		        return resolve(true)
		    })
		}.bind(this))
	}

	public addProxy (key : string, filePath : string) {
		this.proxy[key] = {
			path : filePath,
			mime : mime.getType(filePath)
		}
		this.log.info(`Added proxy image [${key}]`)
	}
}

module.exports = function () {
	return new Server()
}
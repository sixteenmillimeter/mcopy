import WebSocket, { WebSocketServer } from 'ws'
import express, { Express, Request, Response, Application } from 'express'
import { readFile } from 'fs/promises'
import mime from 'mime'
import { v4 as uuidv4 } from 'uuid'
import Log = require('log')
import { delay }  from 'delay';

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

interface ServerQueue {
	[key: string]: Function;
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
	private queue : ServerQueue = {}
	private interval : ReturnType<typeof setInterval>
	private intervalPeriod : number = 10000 //10 sec

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
		this.wss.on('connection', async function (ws : WebSocket) {
			ws.on("message", function (data : string ) {
				let obj : any = JSON.parse(data)
				this.log.info(data)
				if (obj.id && this.queue[obj.id]) {
					this.queue[obj.id](obj)
					delete this.queue[obj.id]
				}
    		}.bind(this))

    		ws.on('close', function () {
    			this.log.info('Client disconnected')
    		}.bind(this))

    		await this.cmd(ws, 'mcopy')
    		this.log.info('Client connected')

		}.bind(this))
		this.log.info(`Websocket server started!`)
		this.log.info(`WSS [ ws://localhost:${this.wsPort} ]`)
	}

	async startHttp () {
		return new Promise(function (resolve : Function, reject : Function) {
			this.httpd = this.http.listen(this.port, function () {
				this.log.info(`HTTP server started!`)
				this.log.info(`URL [ http://localhost:${this.port} ]`)
				return resolve(true)
			}.bind(this))
		}.bind(this))
	}

	async start () {
		await this.startHttp()
		await this.startWss()
		this.interval = setInterval(async function () { 
			await this.cmdAll('ping');
		}.bind(this), this.intervalPeriod)
		this.isActive = true
	}

	async stopHttp() {
		return new Promise(function (resolve : Function, reject : Function) {
			return this.httpd.close(function () {
				this.log.info(`HTTP server stopped :(`)
				return resolve(false)
			}.bind(this))
		}.bind(this))
	}

	async stop () {
		await this.stopHttp()
		clearInterval(this.interval)
		this.isActive = false
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
		//wipe every time
		this.proxy = {}
		this.proxy[key] = {
			path : filePath,
			mime : mime.getType(filePath)
		}
		this.log.info(`Added proxy image [${key}]`)
	}

	public async cmdAll (action : string, options : any = {}) {
		const cmds : any[] = []
		if (this.isActive && this.wss.clients.size > 0) {
			this.wss.clients.forEach(function (ws : WebSocket) {
				cmds.push(this.cmd(ws, action, options))
			}.bind(this))
			return await Promise.all(cmds)
		}
		return false
	}

	/**
	 * WSS
	 **/

	public async cmd (ws : WebSocket, action : string, options : any = {}) {
		const id : string = uuidv4()
		let obj = {
			id, action
		}
		let str : string

		obj = Object.assign(obj, options)
		str = JSON.stringify(obj)
		ws.send(str)

		return new Promise(function (resolve : Function, reject: Function) {
			this.queue[id] = function (obj : any) {
				return resolve(obj)
			}
			//setTimeout() ?
		}.bind(this))
	}
}

module.exports = function () {
	return new Server()
}
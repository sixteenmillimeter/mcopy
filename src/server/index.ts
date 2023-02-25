import * as WebSocket from 'ws'
import express, { Express, Request, Response, Application } from 'express'
import { readFile } from 'fs/promises'
import Log = require('log');

interface ServerData {
	[key: string]: string;
	PORT? : string;
}

interface ServerTemplate {
	name : string;
	path : string;
	data? : string
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
	private port : number = 9900
	private wsPort : number = 9901

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

		this.log.info("Server assets loaded")
	}

	template (name: string, data : ServerData) {
		let html : string = this.templates.find(el => el.name === name).data
		for (let key  of Object.keys(data)) {
			html = html.replace(`{{${key}}}`, data[key])
		}
		return html
	}

	async start () {
		return new Promise(function (resolve : Function, reject : Function) {
			this.httpd = this.http.listen(this.port, function () {
				this.isActive = true
				this.log.info(`Server started!`)
				this.log.info(`URL [ http://localhost:${this.port} ]`)
				return resolve(true)
			}.bind(this))
		}.bind(this))
	}

	stop() {
		return new Promise(function (resolve : Function, reject : Function) {
			return this.httpd.close(function () {
				this.isActive = false
				this.log.info(`Server stopped :(`)
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
}

module.exports = function () {
	return new Server()
}
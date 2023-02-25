import * as WebSocket from 'ws'
import express from 'express'
import type { Request, Response } from 'express'
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
	private http : any
	private port : number = 9900
	private wsPort : number = 9901
	constructor () {
		this.init()
	}

	async init () {
		this.log = await Log({ label : this.id });
	}

	async load () {
		for (let tmpl of this.templates) {
			tmpl.data = await readFile(tmpl.path, 'utf8')
		}
		this.log.info("Server assets loaded")
	}

	template (name: string, data : ServerData) {
		let html : string = this.templates.find(el => el.name === name).data
		for (let key  of Object.keys(data)) {
			html = html.replace(`{{${key}}}`, data[key])
		}
		return html
	}

	start () {
		this.http.listen(function () {
			this.isActive = true
			this.log.inf(`Server started!`)
			this.log.info(`URL [ http://localhost:${this.port} ]`)
		}.bind(this))
	}

	stop() {
		this.http.close()
		this.isActive = false
		this.log.info(`Server stopped :(`)
	}

	index (req : Request, res : Response, next : Function) {
		const html : string = this.template('index', { PORT : `${this.port}` })
		return res.send(html)
	}
	script (req : Request, res : Response, next : Function) {
		const js : string = this.template('script', { PORT : `${this.wsPort}` })
	}
}
'use strict'

import os = require('os');
import path = require('path');
import fs = require('fs-extra');

class Settings {
	private file : string= path.join(os.homedir(), `/.mcopy/settings.json`);
	private defaultState : any = {
		server : {
			port : 1111,
			enabled : true
		},
		devices : [],
		profile : 'mcopy',
		camera : {},
		projector : {},
		light : {},
		capper : {},
		timing : {}
	}
	public state : any;
	/**
	 *
	 **/
	constructor () {
		this.state = this.freshState();
	}

	private freshState () {
		return JSON.parse(JSON.stringify(this.defaultState));
	}
	/**
	 *
	 **/
	private async checkDir () {
		const dir : string = path.join(os.homedir(), '.mcopy/');
		const exists : boolean = await fs.exists(dir)
		if (!exists) {
			try {
				await fs.mkdir(dir);
			} catch (err) {
				if (err.code === 'EEXIST') return true
				console.error(err);
			}
		}
		return true
	}
	/**
	 *
	 **/
	public async save  () {
		const str = JSON.stringify(this.state, null, '\t');
		this.checkDir();
		try {
			await fs.writeFile(this.file, str, 'utf8');
		} catch (err) {
			console.error(err);
		}
	}
	/**
	 *
	 **/
	public update (key : string, val : any) {
		this.state[key] = val;
	}
	/**
	 *
	 **/
	public get (key : string) {
		return this.state[key];
	}
	/**
	 *
	 **/
	public all () {
		return this.state;
	}
	/**
	 *
	 **/
	public async restore () {
		let exists;
		let str;

		this.checkDir();
		exists = await fs.exists(this.file);
		
		if (exists) {
			str = await fs.readFile(this.file, 'utf8');
			this.state = JSON.parse(str);
			//console.dir(this.state)
		} else {
			this.save();
		}
	}
	/**
	 *
	 **/
	public async reset () {
		const exists = await fs.exists(this.file);
		if (exists) {
			try {
				await fs.unlink(this.file);
			} catch (err) {
				console.error(err);
			}
		}
		this.state = this.freshState();
		this.restore();
	};
}

module.exports = new Settings()
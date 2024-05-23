'use strict'

import { homedir } from 'os';
import { join } from 'path';
import { mkdir, writeFile, readFile, unlink, access } from 'fs/promises';
import type { Stats } from 'fs';

export class Settings {
	private file : string = join(homedir(), `/.mcopy/settings.json`);
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

	private async exists (path : string) : Promise<boolean> {  
		try {
			await access(path);
			return true;
		} catch {
			return false;
		}
	}

	private freshState () {
		return JSON.parse(JSON.stringify(this.defaultState));
	}
	/**
	 *
	 **/
	private async checkDir () {
		const dir : string = join(homedir(), '.mcopy/');
		const exists : boolean = await this.exists(dir)
		if (!exists) {
			try {
				await mkdir(dir);
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
		const str  : string = JSON.stringify(this.state, null, '\t');
		this.checkDir();
		try {
			await writeFile(this.file, str, 'utf8');
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
		let exists : boolean = false;
		let str : string;

		this.checkDir();
		exists = await this.exists(this.file);
		
		if (exists) {
			str = await readFile(this.file, 'utf8');
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
		const exists : boolean = await this.exists(this.file);
		if (exists) {
			try {
				await unlink(this.file);
			} catch (err) {
				console.error(err);
			}
		}
		this.state = this.freshState();
		this.restore();
	};
}

module.exports = new Settings();
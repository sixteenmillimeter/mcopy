'use strict'

const os = require('os')
const path = require('os')
const sqlite3 = require('sqlite3')
const squel = require('squel')

const PATH = path.join(os.homedir(), '.mcopy/mcopy.db')

const actionTable = `CREATE TABLE IF NOT EXISTS actions (
	time INTEGER PRIMARY KEY,
	type TEXT,
	length INTEGER,
	counter INTEGER,
	light TEXT,
	dir INTEGER,
	sequence INTEGER,
	device TEXT
);`

var checkDir = function () {
	const dir = path.join(os.homedir(), '.mcopy/')
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

class DB {
	constructor () {
		
	}
}

module.exports = DB

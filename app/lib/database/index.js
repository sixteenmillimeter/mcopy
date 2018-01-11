'use strict'

const os = require('os')
const sqlite3 = require('sqlite3')
const squel = require('squel')

const actionTable = `CREATE TABLE IF NOT EXISTS actions (
	time INTEGER PRIMARY KEY,
	type TEXT,
	length INTEGER,
	counter INTEGER,
	light TEXT,
	dir INTEGER,
	sequence INTEGER
);`

class DB {
	constructor () {
		
	}
}

module.exports = DB
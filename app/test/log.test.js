const assert = require('assert')

let log

describe('log module', async () => {
	log = await require('log')({})

	it('should be an object', () =>{
		assert.equal(typeof log, 'object')
	})

	it('should have a method named info', () =>{
		assert.equal(typeof log.info, 'function')
	})

	it('should have a method named warn', () =>{
		assert.equal(typeof log.warn, 'function')
	})

	it('should have a method named error', () =>{
		assert.equal(typeof log.error, 'function')
	})
})
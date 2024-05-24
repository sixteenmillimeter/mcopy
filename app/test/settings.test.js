const assert = require('assert')

const { Settings }  = require('settings')

const settings = new Settings()
describe('settings module', async () => {
	it('should be an object', () =>{
		assert.equal(typeof settings, 'object')
	})
	it('should have a save method', () =>{
		assert.equal(typeof settings.save, 'function')
	})
	it('should have a restore method', () =>{
		assert.equal(typeof settings.restore, 'function')
	})
	it('should have a reset method', () =>{
		assert.equal(typeof settings.reset, 'function')
	})
})
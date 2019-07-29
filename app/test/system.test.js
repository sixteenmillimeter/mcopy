const assert = require('assert')

const system = require('system')
let sys
/*
describe('system module', async () => {
	it('should be a function', () =>{
		assert.equal(typeof system, 'function')
	})

	it('should return an object', async () => {
		sys = await system()	
		assert.equal(typeof sys, 'object')
		//console.dir(sys)
	})

	it('should have a tmp property that is a string', () => {
		assert.notEqual(typeof sys.tmp, 'undefined')
		assert.equal(typeof sys.tmp, 'string')
	})
	it('should have a platform property that is a string that is nix, win or osx', () => {
		const choices = ['nix', 'win', 'osx']
		assert.notEqual(typeof sys.platform, 'undefined')
		assert.equal(typeof sys.platform, 'string')
		assert.ok(choices.indexOf(sys.platform) !== -1)
	})
	it('should have a deps property that is an object', () => {
		assert.notEqual(typeof sys.deps, 'undefined')
		assert.equal(typeof sys.deps, 'object')
	})

	it('should have a displays property that is an array', () => {
		assert.notEqual(typeof sys.displays, 'undefined')
		assert.equal(typeof sys.displays, 'object')
	})
})*/
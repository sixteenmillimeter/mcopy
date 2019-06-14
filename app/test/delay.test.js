const assert = require('assert')

const { delay } = require('delay')

describe('delay module', async () => {
	it('should be a function', () =>{
		assert.equal(typeof delay, 'function')
	})

	it('should pause a function for specified length in milliseconds', async () => {
		const delay1 = 1000;
		const start = +new Date()
		await delay(delay1)	
		const res1 = +new Date() - start
		assert.ok(delay1 <= res1)
	})
})
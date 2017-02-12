/**
 * External dependencies
 */
const test = require('ava')

// this must run first before requiring config module in order for test to pass
const processPort = process.env.PORT
delete process.env.PORT

/**
 * Internal dependencies
 */
const config = require('./config')

test.after(() => { process.env.PORT = processPort })

test('Default port', t =>
  t.is(config.PORT, 3000, 'sets port to 3000 when no env var supplied'))

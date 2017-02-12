require('app-module-path').addPath(__dirname + '/../') // eslint-disable-line

/**
 * External dependencies
 */
const bluebird = require('bluebird')
const fs = require('fs')
const path = require('path')

/**
 * Internal dependencies
 */
const config = require('src/lib/config')
const errors = require('src/lib/errors')
const persistence = require('src/persistence/repository')
const executor = require('src/core/executor')
const rest = require('src/adapters/rest')

process.on('uncaughtException', errors.uncaughtExceptionHandler)
bluebird.onPossiblyUnhandledRejection(errors.onPossiblyUnhandledRejection)

const domainNames = fs.readdirSync(path.join(__dirname, 'domain')).map(domainFile => domainFile.replace(/.js$/, ''))

const domains = domainNames.reduce((result, domain) => {
  result[domain] = require(`src/domain/${domain}`)
  return result
}, {})

const services = domainNames.reduce((result, domain) => {
  result[domain] = require(`src/services/${domain}`)
  return result
}, {})

const persistenceOptions = { dbUrl: config.DB_URI}
const restOptions = { port: config.PORT }

const serverPromise = persistence.init({ domains, options: persistenceOptions })
  .then(() => rest.init({ executor, domains, services, options: restOptions }))

module.exports = serverPromise

require('app-module-path').addPath(__dirname + '/../../') // eslint-disable-line

const { NODE_ENV } = process.env

if (NODE_ENV !== 'test' && NODE_ENV !== 'local') {
  throw new Error('Cleanup script can only be run in test and local NODE_ENV')
}

const repository = require('src/persistence/repository')

repository.init({ domains: {}, dbUrl: process.env.DB_URI })
  .then(() => repository.getDb().dropDatabase()) // TODO: make this db agnostic
  .finally(process.exit)

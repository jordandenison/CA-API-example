/**
 * Internal dependencies
 */
const mongo = require('ca-db-mongo-native-adapter')

module.exports = {
  init: mongo.init,
  getDb: mongo.getDb,

  getModel: mongo.getModel,
  getModels: mongo.getModels,
  createModel: mongo.create,
  editModel: mongo.edit,
  deleteModel: mongo.remove
}

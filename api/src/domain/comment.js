/**
 * Internal dependencies
 */
var validate = require('ca-validation')

var schema = {
  type: { type: 'enum', types: [ 'comment', 'reply' ], required: true },
  text: { type: 'string' },
  resourceId: { type: 'string', required: true }
}

function Comment (data, options) {
  var errors = validate(data, schema, options)
  if (errors) { throw new Error(JSON.stringify(errors)) }

  return data
}

Comment.getSchema = function () { return JSON.parse(JSON.stringify(schema)) }

module.exports = Comment

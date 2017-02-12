/**
 * External dependencies
 */
const Promise = require('bluebird')

/**
 * Internal dependencies
 */
const Comment = require('src/domain/comment')

module.exports = function createComment ({
  currentUser,
  data,
  create,
  respond,
  errorHandler
}) {
  return Promise.try(() => {
    const comment = Comment(data)

    return create(comment, currentUser)
      .then(respond)
  })
    .catch(errorHandler)
}

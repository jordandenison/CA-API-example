/**
 * External dependencies
 */
const Promise = require('bluebird')

/**
 * Internal dependencies
 */
const Comment = require('src/domain/comment')

module.exports = function editComment ({
  id,
  data,
  edit,
  respond,
  errorHandler
}) {
  return Promise.try(() => {
    const comment = Comment(data, { partial: true })

    return edit(id, comment)
      .then(respond)
  })
    .catch(errorHandler)
}

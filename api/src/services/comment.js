/**
 * Internal dependencies
 */
const { createModel, getModels, getModel, editModel, deleteModel } = require('src/persistence/repository')

module.exports = {
  /**
   * Gets any comment by it's id
   *
   * @return Object
   */
  getById (id) {
    return getModel('comment', { id })
  },

  /**
   * Gets the comment list.
   *
   * @param  Number page The current page
   * @param  Number limit The amount of records to retrieve (default 20)
   * @return Object
   */
  getList (query, { page, limit }) {
    return getModels('comment', query, { page, limit, sort: 'createdAt' })
  },

  /**
   * Creates a new comment
   *
   * @param  Object comment
   * @param  String currentUser  The UUID of the current user.
   * @return Object
   */
  create (comment, currentUser) {
    return createModel('comment', comment, currentUser)
  },

  /**
   * Edits an existing comment
   *
   * @param  String id   The uuid of the comment
   * @param  Object comment The changes object
   * @return Object
   */
  edit (id, comment) {
    return editModel('comment', id, comment)
  },

  /**
   * Deletes a specific comment.
   *
   * @param  String id The uuid of the comment
   * @return Object
   */
  remove (id) {
    return deleteModel('comment', id)
  }
}

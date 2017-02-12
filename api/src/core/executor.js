/**
 * Internal dependencies
 */
const { authorize } = require('src/core/services/authorization')

/**
 * Use case interactors
 */
const useCases = {
  getCommentById: require('src/core/queries/comment/getCommentById'),
  getCommentList: require('src/core/queries/comment/getCommentList'),
  createComment: require('src/core/commands/comment/createComment'),
  deleteComment: require('src/core/commands/comment/deleteComment'),
  editComment: require('src/core/commands/comment/editComment')
}

module.exports = {
  /**
   * Executes a single use case interactor with the specified options and valid data as well as handles any general operations to be performed before and/or after each use case (like authorization)
   *
   * @param  String useCase name of the use case (query)
   * @param  Object options
   * @return nothing
   */
  query (useCase, options = {}) {
    authorize(useCase, options)
      .then(() => useCases[useCase](options))
      .catch(options.errorHandler)
  },

  /**
   * Executes a single use case interactor with the specified options and valid data as well as handles any general operations to be performed before and/or after each use case (like authorization)
   *
   * @param  String useCase name of the use case (command)
   * @param  Object options
   * @return nothing
   */
  run (useCase, options = {}) {
    authorize(useCase, options)
      .then(() => useCases[useCase](options))
      .catch(options.errorHandler)
  }
}

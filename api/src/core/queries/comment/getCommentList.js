module.exports = function getCommentList ({
  query,
  options,
  getList,
  respond,
  errorHandler
}) {
  return getList(query, options)
    .then(respond)
    .catch(errorHandler)
}

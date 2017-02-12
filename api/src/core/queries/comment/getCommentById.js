module.exports = function getCommentById ({
  id,
  getById,
  respond,
  errorHandler
}) {
  return getById(id)
    .then(respond)
    .catch(errorHandler)
}

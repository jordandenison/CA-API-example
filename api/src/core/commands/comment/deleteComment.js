module.exports = function deleteComment ({
  id = 0,
  remove,
  respond,
  errorHandler
}) {
  return remove(id)
    .then(respond)
    .catch(errorHandler)
}

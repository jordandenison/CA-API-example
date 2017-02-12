/* eslint camelcase: 0 */
require('app-module-path').addPath(__dirname + '/../../') // eslint-disable-line

/**
 * External dependencies
 */
const test = require('ava')
// const Promise = require('bluebird')
// const { v1: uuidv1 } = require('node-uuid')

/**
 * SUT
 */
// const comment = require('./comment')

// const createTestComment = () => new Promise((resolve, reject) => {
//   const _id = uuidv1()

//   mongo.getDb().collection('comment').insert({ _id, active: true, text: 'Test Comment', resourceId: 'test-resource-uuid', type: 'comment' }, (e, data) => {
//     if (e) return reject(e)

//     resolve(_id)
//   })
// })

test('TODO: refactor this to unit tests', t => t.pass())

// test.before(mongo.init)

// test('it gets a comment successfully', t =>
//   createTestComment()
//     .then(id =>
//       comment.getById(id)
//         .then(result => {
//           t.is(result.text, 'Test Comment')
//           t.is(result.resourceId, 'test-resource-uuid')
//           t.is(result.active, true)
//         })
//     ))

// test('it adds the comment successfully', t =>
//   comment.create({ text: 'Test Comment', resourceId: 'test-resource-uuid', type: 'comment' })
//     .then(result => {
//       t.is(result.text, 'Test Comment')
//       t.is(result.resourceId, 'test-resource-uuid')
//       t.is(result.active, true)
//     }))

// test('it edits the text of a comment successfully', t =>
//   createTestComment()
//     .then(id =>
//       comment.edit(id, { text: 'Other text' })
//         .then(result => {
//           t.is(result.text, 'Other text')
//         })
//   ))

// test('it deletes a comment successfully', t =>
//   createTestComment()
//     .then(id =>
//       comment.remove(id)
//         .then(result => {
//           mongo.getDb().collection('comment').findOne({ _id: id }, (err, data) => {
//             t.is(err, null)
//             t.is(data.active, true)
//           })
//         })))

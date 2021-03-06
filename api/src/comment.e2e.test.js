/**
 * External dependencies
 */
const test = require('ava')
const { assign, times } = require('lodash')
const request = require('supertest')
const proxyquire = require('proxyquire')
const { all } = require('bluebird')

/**
 * SUT
 */
let server
const serverModule = proxyquire('./index', {
  'src/lib/config': {
    PORT: 3010
  },
  'winston': {
    error: () => {}
  }
})

test.before(() => serverModule.then(restServer => { server = restServer }))

const Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE0ODY4NDM0ODR9.ogZL8HncZ2ERz84dsLhuLDyH7Un2-2W8IHMdz-UMT6k'

const sampleData = { text: 'some comment', resourceId: 'some-test-resourceId-uuid', type: 'comment' }

const createTestComment = resourceId =>
  request(server)
    .post('/comment')
    .set({ Authorization })
    .send(resourceId ? assign(sampleData, { resourceId }) : sampleData)
    .then(res => res.body.result)

test('comment route: responds 201 when a comment has been created', t =>
  request(server)
    .post('/comment')
    .set({ Authorization })
    .send({ text: 'some comment', resourceId: 'some-test-resourceId-uuid', type: 'comment' })
    .then(res => {
      t.is(res.status, 201)
      t.is(res.body.result.text, 'some comment')
      t.truthy(res.body.result.type)
      t.truthy(res.body.result.resourceId)
      t.truthy(res.body.result.createdBy)
      t.truthy(res.body.result.createdAt)
      t.truthy(res.body.result.updatedAt)
      t.truthy(res.body.result.id)
      t.true(res.body.result.active)
    }))

test('comment route: responds 204 when a comment is deleted and 404 when fetched again', t =>
  createTestComment()
    .then(comment =>
      request(server)
        .delete(`/comment/${comment.id}`)
        .set({ Authorization })
        .then(res => t.is(res.status, 204))
        .then(() =>
          request(server)
            .get(`/comment/${comment.id}`)
            .set({ Authorization })
            .then(res => t.is(res.status, 404)))))

test('comment route: responds 404 when a comment is not deleted', t =>
  request(server)
    .delete(`/comment/non-existing`)
    .set({ Authorization })
    .then(res => t.is(res.status, 404)))

test('comment route: responds 422 when a comment has not been created', t =>
  request(server)
    .post('/comment')
    .set({ Authorization })
    .send({})
    .then(res => t.is(res.status, 422)))

test('comment route: responds 200 when getting the comment list', t =>
  all(times(8, () => createTestComment()))
    .then(res2 =>
      request(server)
        .get(`/comment?limit=2`)
        .set({ Authorization })
        .then(res => {
          t.is(res.status, 200)
          t.is(res.body.results.records.length, 2)
          t.true(res.body.results.total >= 2)
        })
    ))

test('comment route: responds 200 when getting the comment list for a specific resource', t =>
  all([
    createTestComment('resource1'),
    createTestComment('resource1'),
    createTestComment('resource2'),
    createTestComment('resource2'),
    createTestComment('resource2'),
    createTestComment('resource3'),
    createTestComment()
  ])
    .then(res2 =>
      request(server)
        .get(`/comment?limit=2&resourceId=resource1`)
        .set({ Authorization })
        .then(res => {
          t.is(res.status, 200)
          t.is(res.body.results.records.length, 2)
          t.true(res.body.results.total >= 2)
        })
    ))

test('comment route: responds 200 when getting an existing comment', t =>
  createTestComment()
    .then(comment =>
      request(server)
        .get(`/comment/${comment.id}`)
        .set({ Authorization })
        .then(res => {
          t.is(res.status, 200)
          t.deepEqual(res.body.result, comment)
        })
    ))

test('comment route: responds 404 when getting a nonexisting comment', t =>
  request(server)
    .get('/comment/nonexisting')
    .set({ Authorization })
    .then(res => t.is(res.status, 404)))

test('comment route: responds 200 when editing an existing comment', t =>
  createTestComment()
    .then(comment =>
      request(server)
        .put(`/comment/${comment.id}`)
        .set({ Authorization })
        .send({ text: 'another text' })
        .then(res => {
          t.is(res.status, 200)
          t.is(res.body.result.text, 'another text')
          t.is(res.body.result.id, comment.id)
        })
    )
)

test('comment route: responds 404 when editing a nonexisting comment', t =>
  request(server)
    .put('/comment/some-id')
    .set({ Authorization })
    .send({ text: 'another title' })
    .then(res => t.is(res.status, 404))
)

test('comment route: responds 422 when editing nothing valid', t =>
  createTestComment()
    .then(comment =>
      request(server)
        .put(`/comment/${comment.id}`)
        .set({ Authorization })
        .send({ text: true })
        .then(res => {
          t.is(res.status, 422)
          t.is(JSON.parse(res.text).text, 'must be a string')
        })
  )
)

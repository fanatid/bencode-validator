'use strict'
var test = require('tape').test
var validator = require('../')
var fixtures = require('./fixtures.json')

test('expected Buffer', function (t) {
  t.throws(function () {
    validator()
  }, /^TypeError: expected Buffer, found undefined$/)
  t.end()
})

test('offset & end are defined', function (t) {
  var err = validator(new Buffer('?i0e?', 'ascii'), 1, 4)
  t.same(err, null)
  t.end()
})

Object.keys(fixtures).forEach(function (name) {
  var fixture = fixtures[name]
  test(name, function (t) {
    var err = validator(new Buffer(fixture.input, 'ascii'))
    if (fixture.output === null) t.same(err, null, 'should return null')
    else t.true(new RegExp(fixture.output).test(err), 'should return error')
    t.end()
  })
})

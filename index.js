'use strict'

// i = 0x69
// l = 0x6c
// d = 0x64
// : = 0x3a
// e = 0x65
// 0 = 0x30
// 9 = 0x39
// - = 0x2d

var TYPES = {
  0x69: integer,
  0x6c: list,
  0x64: dictionary
}

function string (buffer, offset, end) {
  for (var pos = offset + 1; buffer[pos] !== 0x3a && pos < end; ++pos);
  if (pos === end) throw new Error('string delimiter not found')

  var slength = buffer.toString('ascii', offset, pos)
  var length = parseInt(slength, 10)
  if (isNaN(length) || length % 1 !== 0 || length.toString() !== slength) {
    throw new Error('invalid string length: ' + slength)
  }

  if (pos + length > end) throw new Error('string out of bounds')
  return pos + length + 1
}

function integer (buffer, offset, end) {
  // skip minus and throw for i-0e
  if (buffer[offset + 1] === 0x2d) {
    if (buffer[offset + 2] === 0x30 && buffer[offset + 3] === 0x65) {
      throw new Error('i-0e is invalid integer')
    }

    offset += 1
  }

  // handle ie
  if (buffer[offset + 1] === 0x65) throw new Error('invalid integer')

  // handle i0
  if (buffer[offset + 1] === 0x30) {
    if (buffer[offset + 2] === 0x65) return offset + 3
    throw new Error('leading zeros for integers are not allowed')
  }

  for (var pos = offset + 1; buffer[pos] !== 0x65 && pos < end; ++pos) {
    if (buffer[pos] < 0x30 || buffer[pos] > 0x39) throw new Error('invalid integer')
  }

  if (pos === end) throw new Error('stop symbol for integer not found')
  return pos + 1
}

function list (buffer, offset, end) {
  for (++offset; buffer[offset] !== 0x65 && offset < end;) {
    offset = next(buffer, offset, end)
  }

  if (offset === end) throw new Error('stop symbol for list not found')
  return offset + 1
}

function dictionary (buffer, offset, end) {
  for (++offset; buffer[offset] !== 0x65 && offset < end;) {
    offset = string(buffer, offset, end)
    offset = next(buffer, offset, end)
  }

  if (offset === end) throw new Error('stop symbol for dictionary not found')
  return offset + 1
}

function next (buffer, offset, end) {
  var type = TYPES[buffer[offset]] || string
  return type(buffer, offset, end)
}

module.exports = function (buffer, offset, end) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError('expected Buffer, found ' + typeof buffer)
  if (!offset) offset = 0
  if (!end) end = buffer.length
  try {
    next(buffer, offset, end)
    return null
  } catch (err) { return err }
}

// https://github.com/substack/node-browserify/issues/1531
;(function () { Buffer(0) })()

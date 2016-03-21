/* global suite, bench */
var fs = require('fs')
var path = require('path')

var validator = require('../')
var bencode = require('bencode')
var bencoding = require('bencoding')
var dht_bencode = require('dht-bencode')
var bncode = require('bncode')
var dht = require('dht.js/lib/dht/bencode')

var buffer = fs.readFileSync(path.join(__dirname, 'Fedora-Live-MATE_Compiz-x86_64-23.torrent'))

function validatorFN () { return !validator(buffer) }
function getFN (pkg) {
  return function () {
    try {
      pkg.decode(buffer)
      return true
    } catch (err) { return false }
  }
}

suite('validate torrent file', () => {
  bench('validator', validatorFN)
  bench('bencode', getFN(bencode))
  bench('bencoding', getFN(bencoding))
  bench('dht_bencode', getFN(dht_bencode))
  bench('bncode', getFN(bncode))
  bench('dht', getFN(dht))
})

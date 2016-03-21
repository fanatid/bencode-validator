# bencode-validator

[![NPM Package](https://img.shields.io/npm/v/bencode-validator.svg?style=flat-square)](https://www.npmjs.org/package/bencode-validator)
[![Build Status](https://img.shields.io/travis/fanatid/bencode-validator.svg?branch=master&style=flat-square)](https://travis-ci.org/fanatid/bencode-validator)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A super fast [BEncode](http://www.bittorrent.org/beps/bep_0003.html) validator.

## Benchmark

Validate [Fedora-Live-MATE_Compiz-x86_64-23.torrent](https://torrent.fedoraproject.org/torrents/Fedora-Live-MATE_Compiz-x86_64-23.torrent):

```shell
$ cd benchmark/
$ npm i
...
$ npm start
                      validate torrent file
         143,485 op/s » validator
          25,289 op/s » bencode
          23,808 op/s » bencoding
          38,906 op/s » dht_bencode
             541 op/s » bncode
          27,581 op/s » dht


  Suites:  1
  Benches: 6
  Elapsed: 7,996.47 ms
```

## License

MIT

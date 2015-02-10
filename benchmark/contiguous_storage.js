var Components = require('../lib/components')
var ContiguousStorage = require('../lib/contiguous_storage')

var N = 8
var Cs = [
  function() {},
  function() {},
  function() {},
  function() {}
]

var components = new Components(Cs)
var storage = new ContiguousStorage(components, N)

suite('ContiguousStorage', function() {
  var capacity = N

  bench('#get', function() {
    for (var id = 0; id < N; id++) {
      for (var index = 0; index < Cs.length; index++) {
        if (storage.get(id, index) !== null) {
          throw new Error()
        }
      }
    }
  })

  bench('#set', function() {
    for (var id = 0; id < N; id++) {
      for (var index = 0; index < Cs.length; index++) {
        storage.set(id, index, null)
      }
    }
  })

  bench('#delete', function() {
    for (var id = 0; id < N; id++) {
      for (var index = 0; index < Cs.length; index++) {
        storage.delete(id, index)
      }
    }
  })

  bench('#destroy', function() {
    for (var id = 0; id < N; id++) {
      storage.destroy(id)
    }
  })

  bench('#resize', function() {
    capacity += N
    storage.resize(capacity)
  })
})

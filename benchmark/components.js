var Components = require('../lib/components')

var Cs = [
  function() {},
  function() {},
  function() {},
  function() {}
]

var components = new Components(Cs)

suite('Components', function() {
  bench('count', function() {
    if (components.count !== 4) {
      throw new Error()
    }
  })

  bench('index', function() {
    for (var i = 0; i < Cs.length; i++) {
      if (components.index(Cs[i]) !== i) {
        throw new Error()
      }
    }
  })

  bench('mask', function() {
    for (var i = 0; i < Cs.length; i++) {
      if (components.mask(Cs[i]) !== 1 << i) {
        throw new Error()
      }
    }
  })
})

var makr = require('../lib/index')
var em

function A() {}
function B() {}
function C() {}
function D() {}
function E() {}
function F() {}
function G() {}
function H() {}
function I() {}
function J() {}

suite('EntityManager', function() {
  before(function() {
    em = makr(A, B, C, D, E, F, G, H, I, J)

    for (var i = 0; i < 1000; i++) {
      var e = em.create()

      i % 2 === 0 && e.add(new A())
      i % 3 === 0 && e.add(new B())
      i % 4 === 0 && e.add(new C())
      i % 5 === 0 && e.add(new D())
      i % 6 === 0 && e.add(new E())
      i % 7 === 0 && e.add(new F())
      i % 8 === 0 && e.add(new G())
      i % 9 === 0 && e.add(new H())
      i % 2 === 0 && e.add(new I())
      i % 3 === 0 && e.add(new J())
    }
  })

  bench('query on 1000 entities with 1 component (500 matches)', function() {
    keep = em.query(A)
  })

  bench('query on 1000 entities with 3 components (84 matches)', function() {
    keep = em.query(A, B, C)
  })

  bench('query on 1000 entities with 10 components (1 match)', function() {
    keep = em.query(A, B, C, D, E, F, G, H, I, J)
  })
})

suite('EntityManager', function() {
  before(function() {
    em = makr(A, B, C, D, E, F, G, H, I, J)
  })

  bench('#create', function() {
    em.create()
  })

  bench('#get', function() {
    em.get(randomID())
  })

  bench('#valid', function() {
    em.valid(randomID())
  })
})

function randomID() {
  return (Math.random() * 1000) | 0
}

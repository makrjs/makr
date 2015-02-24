var makr = require('../lib/index')

function Component() {}

var em = makr(Component)
var entity = em.create()
var component = new Component()

suite('Entity', function() {
  bench('#add', function() {
    entity.add(component)
  })

  bench('#get', function() {
    entity.get(Component)
  })

  bench('#has', function() {
    entity.has(Component)
  })

  bench('#remove', function() {
    entity.remove(Component)
  })

  bench('#destroy', function() {
    entity.destroy()
  })
})

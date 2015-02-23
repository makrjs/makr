var makr = require('../lib/index')

var Component = function() {}
var component = new Component()

var em = makr(Component)
var entity = em.create()

entity.add(component)

suite('Entities', function() {
  bench('add', function() {
    entity.add(component)
  })

  bench('get', function() {
    entity.get(Component)
  })

  bench('has', function() {
    entity.has(Component)
  })

  bench('destroy', function() {
    entity.destroy()
  })

  bench('remove', function() {
    entity.remove(Component)
  })

})

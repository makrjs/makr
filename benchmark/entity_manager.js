var makr = require('../lib/index')

var Component = function() {}
var component = new Component()

var em = makr(Component)
var entity
var id

function createNumEntities(num) {
  for(var i = 0; i < num; i++) {
    em.create()
  }
}

function destroyAllEntities() {
  for(var i = 0; i < em._entityInst.length; i++) {
    var entity = em.get(i)
    if(entity !== null) {
      entity.destroy()
    }
  }
}

suite('Entity Manager query 1x entities, 1x components', function() {
  before(function() {
    createNumEntities(1)
  })

  bench('query 1 entity', function() {
    em.query(Component)
  })

  after(function() {
    destroyAllEntities()
  })
})

suite('Entity Manager query 10x entities, 1x components', function() {
  before(function() {
    createNumEntities(10)
  })

  bench('query 10 entities', function() {
    em.query(Component)
  })

  after(function() {
    destroyAllEntities()
  })
})

suite('Entity Manager query 100x entities, 1x components', function() {
  before(function() {
    createNumEntities(100)
  })

  bench('query 100 entities', function() {
    em.query(Component)
  })

  after(function() {
    destroyAllEntities()
  })
})

suite('Entity Manager query 1000x entities, 1x components', function() {
  before(function() {
    createNumEntities(1000)
  })

  bench('query 1000 entities', function() {
    em.query(Component)
  })

  after(function() {
    destroyAllEntities()
  })
})

suite('Entity Manager query 10000x entities, 1x components', function() {
  before(function() {
    createNumEntities(10000)
  })

  bench('query 10000 entities', function() {
    em.query(Component)
  })

  after(function() {
    destroyAllEntities()
  })
})

suite('Entity Manager query 100000x entities, 1x components', function() {
  before(function() {
    createNumEntities(100000)
  })

  bench('query 100000 entities', function() {
    em.query(Component)
  })

  after(function() {
    destroyAllEntities()
  })
})

suite('Entity Manager query 1000000x entities, 1x components', function() {
  before(function() {
    createNumEntities(1000000)
  })

  bench('query 1000000 entities', function() {
    em.query(Component)
  })

  after(function() {
    destroyAllEntities()
  })
})

suite('Entity Manager', function() {
  before(function() {
    entity = em.create()
    id = entity.id
  })

  bench('create', function() {
    em.create()
  })

  bench('get', function() {
    em.get(id)
  })

  bench('valid', function() {
    em.valid(id)
  })

  after(function() {
    entity.destroy()
  })
})

var expect = require("chai").expect
var fixtures = require("./fixtures")
var EntityManager = require("..")

var Position = fixtures.Position
var Motion = fixtures.Motion
var Tag = fixtures.Tag

describe("EntityManager", function() {
  var em

  beforeEach(function() {
    em = new EntityManager(Position, Motion, Tag)
  })

  it("should throw on invalid component list", function() {
    expect(function() {
      new EntityManager(
        function() {}, function() {}, function() {}, function() {},
        function() {}, function() {}, function() {}, function() {},
        function() {}, function() {}, function() {}, function() {},
        function() {}, function() {}, function() {}, function() {},
        function() {}, function() {}, function() {}, function() {},
        function() {}, function() {}, function() {}, function() {},
        function() {}, function() {}, function() {}, function() {},
        function() {}, function() {}, function() {}, function() {},
        function() {}, function() {}, function() {}, function() {}
      )
    }).to.throw(RangeError)
  })

  it("should create entity", function() {
    var e1 = em.create()
    var e2 = em.create()

    expect(e1).to.exist()
    expect(e1.valid).to.be.true()
    expect(e1).to.not.be.equal(e2)

    expect(e1.id).to.be.equal(0)
    expect(e2.id).to.be.equal(1)
  })

  it("should destroy entity", function() {
    var e1 = em.create()

    e1.destroy()
    expect(e1.valid).to.be.false()
  })

  it("should reuse entity", function() {
    var e1 = em.create()
    var e2

    e1.destroy()
    e2 = em.create()

    expect(e2).to.be.equal(e1)
  })

  it("should validate entities", function() {
    var em1 = new EntityManager(Position, Motion, Tag)
    var em2 = new EntityManager(Position, Motion, Tag)

    var e1 = em1.create()
    var e2 = em2.create()

    expect(em1.valid(e1)).to.be.true()
    expect(em1.valid(e2)).to.be.false()

    e1.destroy()

    expect(em1.valid(e1)).to.be.false()
  })

  it("should retrieve entities using there ID", function() {
    var e1 = em.create()
    var e2 = em.create()

    expect(em.get(e1.id)).to.equal(e1)
    expect(em.get(e2.id)).to.equal(e2)
  })

  it("should query entities", function() {
    for (var i = 0; i < 10; i++) {
      var e = em.create()
      e.add(new Position(0, 0))
      e.add(new Motion(0, 0))
    }

    for (var i = 0; i < 10; i++) {
      var e = em.create()
      e.add(new Position(0, 0))
      e.add(new Tag('foo'))
    }

    for (var i = 0; i < 10; i++) {
      var e = em.create()
      e.add(new Tag('bar'))
    }

    expect(em.query(Position)).to.have.length(20)
    expect(em.query(Motion)).to.have.length(10)
    expect(em.query(Tag)).to.have.length(20)
    expect(em.query()).to.have.length(0)

    var tagged = em.query(Tag)
    for (var i = 0; i < tagged.length; i++) {
      if ((i & 1) === 0) {
        tagged[i].destroy()
      }
    }

    expect(em.query(Tag)).to.have.length(10)
  })

  it("should return the correct entities when querying", function() {
    var destroyedEntities = []
    var aliveEntities = []

    for (var i = 0; i < 10; i++) {
      var e = em.create()
      e.add(new Position(0, 0))
      e.add(new Motion(0, 0))
      aliveEntities.push(e)
    }

    // We destroy them in a separate loop to ensure entities aren't picked from the object pool
    // as this would make the entities in the destroyEntities alive again
    for (var i = 0; i < 10; i++) {
      var e = aliveEntities[i]
      if (i % 2 === 0) {
        e.destroy()
        destroyedEntities.push(e)
      }
    }

    // It should not return destroyed entities
    var queryEntities = em.query(Position, Motion)
    for (var i = 0; i < queryEntities.length; i++) {
      expect(queryEntities[i].get(Position)).not.to.be.null()
      expect(queryEntities[i].has(Position)).not.to.be.false()
      for (var j = 0; j < destroyedEntities.length; j++) {
        expect(queryEntities[i]).not.to.equal(destroyedEntities[j])
      }
    }

    for (var i = 0; i < queryEntities.length; i++) {
      queryEntities[i].remove(Position)
    }

    queryEntities = em.query(Motion)

    // It should return entities with the correct components after removing components
    for (var i = 0; i < queryEntities.length; i++) {
      expect(queryEntities[i].get(Position)).to.be.null()
      expect(queryEntities[i].has(Position)).to.be.false()
      expect(queryEntities[i].get(Motion)).not.to.be.null()
      expect(queryEntities[i].has(Motion)).not.to.be.false()
    }

    for (var i = 0; i < queryEntities.length; i++) {
      queryEntities[i].add(new Position(0, 0))
    }

    queryEntities = em.query(Position, Motion)

    // It should return entities with the correct components after adding components
    for (var i = 0; i < queryEntities.length; i++) {
      expect(queryEntities[i].get(Position)).not.to.be.null()
      expect(queryEntities[i].has(Position)).not.to.be.false()
    }
  })

  it("should expand", function() {
    var capacity = em.capacity

    expect(em.capacity).to.be.above(0)

    for (var i = 0; i < capacity; i++) {
      em.create()
    }

    expect(em.capacity).to.equal(capacity)

    // It should grow
    em.create()
    expect(em.capacity).to.be.above(capacity)
    var c2 = em.capacity

    // It should not grow
    em.create()
    expect(em.capacity).to.equal(c2)
  })
})

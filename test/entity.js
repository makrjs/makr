var expect = require("chai").expect
var fixtures = require("./fixtures")
var EntityManager = require("..")

var Position = fixtures.Position
var Motion = fixtures.Motion
var Tag = fixtures.Tag

describe("Entity", function() {
  var em

  beforeEach(function() {
    em = new EntityManager(Position, Motion, Tag)
  })

  it("should validate itself", function() {
    var entity = em.create()
    expect(entity.valid).to.equal(em.valid(entity))

    entity.destroy()
    expect(entity.valid).to.equal(em.valid(entity))
    expect(entity.valid).to.be.false()
  })

  it("should manipulate components", function() {
    var entity = em.create()
    var tag = new Tag('foo')

    expect(entity.has(Tag)).to.be.false()
    expect(entity.get(Tag)).to.be.null()

    entity.add(tag)

    expect(entity.has(Tag)).to.be.true()
    expect(entity.get(Tag)).to.equal(tag)

    entity.remove(Tag)

    expect(entity.has(Tag)).to.be.false()
    expect(entity.get(Tag)).to.be.null()
  })

  describe("#destroy", function() {
    it("should clear its components", function() {
      var entity = em.create()

      entity.add(new Position(0, 0))
      entity.add(new Motion(0, 0))
      entity.destroy()

      expect(entity.has(Position)).to.be.false()
      expect(entity.get(Position)).to.be.null()

      expect(entity.has(Motion)).to.be.false()
      expect(entity.get(Motion)).to.be.null()
    })

    it("should be invalidated", function() {
      var entity = em.create()
      entity.destroy()

      expect(entity.valid).to.be.false()
    })
  })
})

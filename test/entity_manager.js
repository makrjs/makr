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
})

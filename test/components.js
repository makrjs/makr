var expect = require("chai").expect
var Components = require("../lib/components")

var Cs = [
  function() {},
  function() {},
  function() {},
  function() {}
]

function UnknownComponent() {}

describe("Components", function() {
  var components = new Components(Cs)

  it("counts component types", function() {
    expect(components.count).to.equal(4)
  })

  it("does not accept unknown component types", function() {
    expect(components.index.bind(null, UnknownComponent)).to.throw(TypeError)
    expect(components.mask.bind(null, UnknownComponent)).to.throw(TypeError)
  })

  it("returns component type's index", function() {
    for (var i = 0; i < Cs.length; i++) {
      expect(components.index(Cs[i])).to.equal(i)
    }
  })

  it("returns component's type mask", function() {
    for (var i = 0; i < Cs.length; i++) {
      expect(components.mask(Cs[i])).to.equal(1 << i)
    }
  })
})

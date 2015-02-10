var expect = require("chai").expect
var Components = require("../lib/components")
var ContiguousStorage = require("../lib/contiguous_storage")

function A() { this.x = 0 }
function B() { this.x = 1 }
function C() { this.x = 2 }
function D() { this.x = 3 }

var Cs = [A, B, C, D]
var N = 8

var components = new Components(Cs)
var storage

describe("ContiguousStorage", function() {
  beforeEach(function() {
    storage = new ContiguousStorage(components, N)
  })

  it("initializes components to null", function() {
    for (var id = 0; id < N; id++) {
      for (var index = 0; index < Cs.length; index++) {
        expect(storage.get(id, index)).to.be.null()
      }
    }
  })

  it("sets and gets components", function() {
    for (var index = 0; index < Cs.length; index++) {
      var comp = new Cs[index]
      storage.set(3, index, comp)
      expect(storage.get(3, index)).to.equal(comp)
    }
  })

  it("deletes components", function() {
    for (var index = 0; index < Cs.length; index++) {
      var comp = new Cs[index]
      storage.set(3, index, comp)
      storage.delete(3, index)

      expect(storage.get(3, index)).to.be.null()
    }
  })

  it("destroys components", function() {
    for (var id = 0; id < N; id++) {
      for (var index = 0; index < Cs.length; index++) {
        storage.set(id, index, new Cs[index])
      }
    }

    storage.destroy(3)

    for (var id = 0; id < 3; id++) {
      for (var index = 0; index < Cs.length; index++) {
        expect(storage.get(id, index)).to.exist()
      }
    }

    for (var index = 0; index < Cs.length; index++) {
      expect(storage.get(3, index)).to.be.null()
    }

    for (var id = 4; id < N; id++) {
      for (var index = 0; index < Cs.length; index++) {
        expect(storage.get(id, index)).to.exist()
      }
    }
  })

  it("resizes", function() {
    for (var id = 0; id < N; id++) {
      for (var index = 0; index < Cs.length; index++) {
        storage.set(id, index, new Cs[index])
      }
    }

    storage.resize(N + 1)

    for (var id = 0; id < N; id++) {
      for (var index = 0; index < Cs.length; index++) {
        expect(storage.get(id, index)).to.exist()
      }
    }

    for (var index = 0; index < Cs.length; index++) {
      expect(storage.get(N, index)).to.be.null()
    }
  })
})

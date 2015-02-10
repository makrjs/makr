var expect = require("chai").expect
var utils = require("../lib/utils")

describe("utils", function() {
  describe("arrayCreate", function() {
    it("creates a fixed array", function() {
      expect(utils.arrayCreate(100)).to.have.length(100)
    })
    it("fills the array", function() {
      expect(utils.arrayCreate(4, 0)).to.eql([0, 0, 0, 0])
    })
  })

  describe("arrayExpand", function() {
    it("expands the specified array", function() {
      var arr = utils.arrayCreate(2, 0)
      expect(utils.arrayExpand(arr, 4, 1)).to.eql([0, 0, 1, 1])
    })
  })

  describe("arrayFill", function() {
    it("fills the array", function() {
      var arr = utils.arrayCreate(3, 0)
      expect(utils.arrayFill(arr, 1, 0, 3)).to.eql([1, 1, 1])
    })
    it("can expand the array", function() {
      var arr = utils.arrayCreate(3, 0)
      expect(utils.arrayFill(arr, 1, 2, 4)).to.eql([0, 0, 1, 1])
    })
  })

  describe("typedArrayExpand", function() {
    it("expands the specified typed array", function() {
      var arr = new Uint8Array([1, 1])
      var out = utils.typedArrayExpand(arr, 4)

      expect(out).to.be.instanceof(Uint8Array)
      expect(out).to.be.eql({0: 1, 1: 1, 2: 0, 3: 0})
    })
  })
})

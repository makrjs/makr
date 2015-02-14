var Components = require("./components")
var ContiguousStorage = require("./contiguous_storage")
var EntityManager = require("./entity_manager")
var message = require("./message")

module.exports = function() {
  var count = arguments.length
  if (count > 32) throw new RangeError(message("too_many_components", 32))

  var Cs = new Array(count)
  for (var i = 0; i < Cs.length; i++) {
    Cs[i] = arguments[i]
  }

  var components = new Components(Cs)
  var storage = new ContiguousStorage(components)

  return new EntityManager(components, storage)
}

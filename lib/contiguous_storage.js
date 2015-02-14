var utils = require("./utils")
var arrayCreate = utils.arrayCreate
var arrayExpand = utils.arrayExpand
var arrayFill = utils.arrayFill

function ContiguousStorage(components, capacity) {
  if (capacity === void 0) {
    capacity = 0
  }

  this._count = components.count
  this._components = arrayCreate(this._count * capacity, null)
}

ContiguousStorage.prototype.get = function(id, index) {
  return this._components[this._count * id + index]
}

ContiguousStorage.prototype.set = function(id, index, component) {
  this._components[this._count * id + index] = component
}

ContiguousStorage.prototype.delete = function(id, index) {
  this.set(id, index, null)
}

ContiguousStorage.prototype.destroy = function(id) {
  arrayFill(this._components, null, this._count * id, this._count * (id + 1))
}

ContiguousStorage.prototype.resize = function(capacity) {
  arrayExpand(this._components, this._count * capacity, null)
}

module.exports = ContiguousStorage

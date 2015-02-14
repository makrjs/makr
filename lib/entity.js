function Entity(manager, id) {
  this._manager = manager
  this._id = id
}

Entity.prototype.add = function(C) {
  this._manager._add(this._id, C)
}

Entity.prototype.remove = function(C) {
  this._manager._remove(this._id, C)
}

Entity.prototype.has = function(C) {
  return this._manager._has(this._id, C)
}

Entity.prototype.get = function(C) {
  return this._manager._get(this._id, C)
}

Entity.prototype.destroy = function() {
  return this._manager._destroy(this._id)
}

Object.defineProperty(Entity.prototype, "id", {
  get: function() {
    return this._id
  }
})

Object.defineProperty(Entity.prototype, "valid", {
  get: function() {
    return this._manager.valid(this)
  }
})

module.exports = Entity

var Entity = require("./entity")
var utils = require("./utils")

var arrayCreate = utils.arrayCreate
var arrayExpand = utils.arrayExpand
var typedArrayExpand = utils.typedArrayExpand
var FastMap = utils.FastMap

var INITIAL_CAPACITY = 1024
var ENTITY_DEAD = 0
var ENTITY_ALIVE = 1

function EntityManager(components, storage) {
  // Components storages
  this._components = components
  this._storage = storage
  this._storage.resize(INITIAL_CAPACITY)

  // Entities storages
  this._entityFlag = new Uint8Array(INITIAL_CAPACITY)
  this._entityMask = new Uint32Array(INITIAL_CAPACITY)
  this._entityInst = arrayCreate(INITIAL_CAPACITY, null)

  this._entityPool = []
  this._entityCounter = 0

  this._entityCacheIndices = new Uint32Array(INITIAL_CAPACITY)
  this._entityCache = FastMap()
  this._entityCache[0] = []
}

EntityManager.prototype.create = function() {
  var id
  if (this._entityPool.length > 0) {
    id = this._entityPool.pop()
  } else {
    id = this._entityCounter++
    this._entityInst[id] = new Entity(this, id)
    this._accomodate(id)
  }

  var entity = this._entityInst[id]
  this._entityFlag[id] = ENTITY_ALIVE

  this._entityCacheIndices[entity._id] = this._entityCache[0].push(entity) - 1

  return entity
}

EntityManager.prototype.get = function(id) {
  return this._entityInst[id]
}

EntityManager.prototype.query = function() {
  var mask = 0
  for (var i = 0; i < arguments.length; i++) {
    mask |= this._components.mask(arguments[i])
  }

  if (mask === 0) {
    return []
  }

  var allocLen = 0
  var entityMasks = Object.keys(this._entityCache)
  for (var index = 0; index < entityMasks.length; index++) {
    var entityMask = entityMasks[index]
    if((entityMask & mask) === mask) {
      allocLen += this._entityCache[entityMask].length
    }
  }
   
  var result = new Array(allocLen)
  var resultIndex = 0

  for (var index = 0; index < entityMasks.length; index++) {
    var entityMask = entityMasks[index]
    if((entityMask & mask) === mask) {
      var cache = this._entityCache[entityMask]
      for (var i = 0; i < cache.length; i++) {
        result[resultIndex] = cache[i]
        resultIndex++
      }
    }
  }

  return result
}

EntityManager.prototype.valid = function(entity) {
  var id = entity._id
  return this._entityFlag[id] === ENTITY_ALIVE && this._entityInst[id] === entity
}

EntityManager.prototype._accomodate = function(id) {
  var capacity = this._entityFlag.length
  if (capacity <= id) {
    capacity *= 2

    this._entityFlag = typedArrayExpand(this._entityFlag, capacity)
    this._entityMask = typedArrayExpand(this._entityMask, capacity)
    this._entityCacheIndices = typedArrayExpand(this._entityCacheIndices, capacity)
    this._entityInst = arrayExpand(this._entityInst, capacity, null)
    this._storage.resize(capacity)
  }
}

EntityManager.prototype._add = function(id, component) {
  var ctor = component.constructor
  var index = this._components.index(ctor)

  this._cacheRemove(id)
  this._entityMask[id] |= 1 << index
  this._cacheAdd(id)
  this._storage.set(id, index, component)
}

EntityManager.prototype._remove = function(id, C) {
  var index = this._components.index(C)

  this._cacheRemove(id)
  this._entityMask[id] &= ~(1 << index)
  this._cacheAdd(id)

  this._storage.delete(id, index)
}

EntityManager.prototype._has = function(id, C) {
  var mask = this._components.mask(C)
  return (this._entityMask[id] & mask) !== 0
}

EntityManager.prototype._get = function(id, C) {
  var index = this._components.index(C)
  return this._storage.get(id, index)
}

EntityManager.prototype._cacheAdd = function(id) {
  var entity = this._entityInst[id]
  var cache = this._entityCache[this._entityMask[id]]
  if (cache === undefined) {
    this._entityCache[this._entityMask[id]] = []
  }
  this._entityCacheIndices[id] = this._entityCache[this._entityMask[id]].push(entity) - 1
}

EntityManager.prototype._cacheRemove = function(id) {
  var entity = this._entityInst[id]
  var cache = this._entityCache[this._entityMask[id]]
  if (cache.length === 1 || this._entityCacheIndices[id] === cache.length - 1) {
    cache.pop()
  } else {
    var lastCacheElement = cache.pop()
    this._entityCacheIndices[lastCacheElement._id] = this._entityCacheIndices[entity._id]
    cache[this._entityCacheIndices[lastCacheElement._id]] = lastCacheElement
  }
}

EntityManager.prototype._destroy = function(id) {
  if (this._entityFlag[id] !== ENTITY_DEAD) {
    this._cacheRemove(id)
  }                   
  this._entityFlag[id] = ENTITY_DEAD
  this._entityMask[id] = 0
  this._entityPool.push(id)
  this._storage.destroy(id)
}

Object.defineProperty(EntityManager.prototype, "capacity", {
  get: function() {
    return this._entityFlag.length
  }
})

module.exports = EntityManager

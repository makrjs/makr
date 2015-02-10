var message = require("./message")

function Components(Cs) {
  this._count = Cs.length
  this._types = Cs
}

Components.prototype.index = function(C) {
  for (var i = 0; i < this._types.length; i++) {
    if (this._types[i] === C) return i
  }

  throw new TypeError(message("unknown_component", C))
}

Components.prototype.mask = function(C) {
  return 1 << this.index(C)
}

Object.defineProperty(Components.prototype, "count", {
  get: function() {
    return this._count
  }
})

module.exports = Components

// Export
// ------

// Register makr classes
makr.BitSet = BitSet;
makr.FastBitSet = FastBitSet;
makr.IteratingSystem = IteratingSystem;
makr.System = System;
makr.World = World;

// Used to determine if values are of the language type Object.
// Borrowed from lodash.js.
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

// Find the `root` object
var root = (objectTypes[typeof window] && window) || this;
var rootGlobal = objectTypes[typeof global] && global;
if (rootGlobal && (rootGlobal.global === rootGlobal || rootGlobal.window === rootGlobal)) {
  root = rootGlobal;
}

if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
  // AMD / RequireJS
  define([], function () {
    return makr;
  });
} else if (objectTypes[typeof module] && module.exports) {
  // Node.js
  module.exports = makr;
} else {
  // Browser
  root.makr = makr;
}

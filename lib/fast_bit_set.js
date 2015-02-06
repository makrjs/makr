/**
 * @class FastBitSet
 * @constructor
 */
function FastBitSet() {
  /**
   * @private
   * @property {Uint} _bits
   */
  this._bits = 0;
}

/**
 * @method set
 * @param {Uint} index
 * @param {Boolean} value
 */
FastBitSet.prototype.set = function(index, value) {
  if (value) {
    this._bits |= 1 << index;
  } else {
    this._bits &= ~(1 << index);
  }
};

/**
 * @method get
 * @param  {Uint} index
 * @return {Boolean}
 */
FastBitSet.prototype.get = function(index) {
  return !!(this._bits & (1 << index));
};

/**
 * @method reset
 */
FastBitSet.prototype.reset = function() {
  this._bits = 0;
};

/**
 * @method contains
 * @param  {FastBitSet} other
 * @return {Boolean}
 */
FastBitSet.prototype.contains = function(other) {
  return (this._bits & other._bits) == other._bits;
};

module.exports = FastBitSet;

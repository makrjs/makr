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
FastBitSet.prototype.set = function set(index, value) {
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
FastBitSet.prototype.get = function get(index) {
  return !!(this._bits & (1 << index));
};

/**
 * @method reset
 */
FastBitSet.prototype.reset = function reset() {
  this._bits = 0;
};

/**
 * @method contains
 * @param  {FastBitSet} other
 * @return {Boolean}
 */
FastBitSet.prototype.contains = function contains(other) {
  return (this._bits & other._bits) == other._bits;
};

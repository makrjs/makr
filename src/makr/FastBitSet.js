/**
 * @class FastBitSet
 * @constructor
 */
makr.FastBitSet = function() {
  /**
   * @private
   * @property {Uint} _bits
   */
  this._bits = 0;
};

makr.FastBitSet.prototype = {
  /**
   * @method set
   * @param {Uint} index
   * @param {Boolean} value
   */
  set: function(index, value) {
    if (value) {
      this._bits |= 1 << index;
    } else {
      this._bits &= ~(1 << index);
    }
  },
  /**
   * @method get
   * @param  {Uint} index
   * @return {Boolean}
   */
  get: function(index) {
    return !!(this._bits & (1 << index));
  },
  /**
   * @method reset
   */
  reset: function() {
    this._bits = 0;
  },
  /**
   * @method contains
   * @param  {FastBitSet} other
   * @return {Boolean}
   */
  contains: function(other) {
    return (this._bits & other._bits) == other._bits;
  }
};

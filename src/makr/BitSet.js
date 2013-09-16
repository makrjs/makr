/**
 * @class BitSet
 * @constructor
 * @param {Uint} size
 */
makr.BitSet = function(size) {
  /**
   * @private
   * @property {Uint} _length
   */
  this._length = Math.ceil(size / 32);

  /**
   * @private
   * @property {Uint32Array} _words
   */
  this._words = new Uint32Array(this._length);
};

makr.BitSet.prototype = {
  /**
   * @method set
   * @param {Uint} index
   * @param {Boolean} value
   */
  set: function(index, value) {
    var wordOffset = index / 32 | 0;
    var bitOffset = index - wordOffset * 32;

    if (value) {
      this._words[wordOffset] |= 1 << bitOffset;
    } else {
      this._words[wordOffset] &= ~(1 << bitOffset);
    }
  },
  /**
   * @method get
   * @param  {Uint} index
   * @return {Boolean}
   */
  get: function(index) {
    var wordOffset = index / 32 | 0;
    var bitOffset = index - wordOffset * 32;

    return !!(this._words[wordOffset] & (1 << bitOffset));
  },
  /**
   * @method reset
   */
  reset: function() {
    this._words = new Uint32Array(this._length);
  },
  /**
   * @method contains
   * @param  {BitSet} other
   * @return {Boolean}
   */
  contains: function(other) {
    if (this._length != other._length) {
      return false;
    }

    var words = this._words;
    var i = 0;
    var n = this._length;

    for (; i < n; i++) {
      if ((words[i] & other._words[i]) != other._words[i]) {
        return false;
      }
    }

    return true;
  }
};

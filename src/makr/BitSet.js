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
  var length = this._length = Math.ceil(size / 32);

  /**
   * @private
   * @property {Array} _words
   */
  var words = this._words = new Array(length);

  // Create empty words
  while (length--) {
    words[length] = 0;
  }
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
    var words = this._words;
    var i = this._length;

    while (i--) {
      words[i] = 0;
    }
  },
  /**
   * @method contains
   * @param  {BitSet} other
   * @return {Boolean}
   */
  contains: function(other) {
    var words = this._words;
    var i = this._length;

    if (i != other._length) {
      return false;
    }

    while (i--) {
      if ((words[i] & other._words[i]) != other._words[i]) {
        return false;
      }
    }

    return true;
  }
};

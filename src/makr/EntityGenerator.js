makr.EntityGenerator = function() {
  this._current = 0;
  this._ids = [];
  this._size = 0;
};

makr.EntityGenerator.prototype = {
  acquire: function() {
    if (this._size) {
      return this._ids[--this._size];
    } else {
      return this._current++;
    }
  },
  release: function(id) {

  }
};

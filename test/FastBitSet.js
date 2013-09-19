var should = require('should');
var makr = require('../dist/makr');

describe('FastBitSet', function() {
  var bitSet;
  beforeEach(function() {
    bitSet = new makr.FastBitSet();
  });

  describe('#get', function() {
    it('should return false when a bit is not set', function() {
      bitSet.get(11).should.equal(false);
    });

    it('should return true when a bit is set', function() {
      bitSet.set(11, true);
      bitSet.get(11).should.equal(true);
    });
  });

  describe('#set', function() {
    it('should set or unset the specified bit', function() {
      bitSet.set(11, true);
      bitSet.get(11).should.equal(true);

      bitSet.set(11, false);
      bitSet.get(11).should.equal(false);
    });
  });

  describe('#reset', function() {
    it('should reset all bits to 0', function() {
      bitSet.set(2, true);
      bitSet.set(3, true);
      bitSet.reset();

      bitSet.get(2).should.equal(false);
      bitSet.get(3).should.equal(false);
    });
  });

  describe('#contains', function() {
    it('should return true if this FastBitSet contains the second', function() {
      var other = new makr.FastBitSet();

      other.set(1, true);
      other.set(9, true);

      bitSet.contains(other).should.equal(false);

      bitSet.set(0, true);
      bitSet.set(1, true);

      bitSet.contains(other).should.equal(false);

      bitSet.set(8, true);
      bitSet.set(9, true);

      bitSet.contains(other).should.equal(true);
    });
  });
});

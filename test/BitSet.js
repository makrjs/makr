var should = require('should');
var makr = require('../dist/makr');

describe('BitSet', function() {
  var bitSet;
  beforeEach(function() {
    bitSet = new makr.BitSet(64);
  });

  describe('#get', function() {
    it('should return false when a bit is not set', function() {
      bitSet.get(48).should.equal(false);
    });

    it('should return true when a bit is set', function() {
      bitSet.set(48, true);
      bitSet.get(48).should.equal(true);
    });
  });

  describe('#set', function() {
    it('should set or unset the specified bit', function() {
      bitSet.set(48, true);
      bitSet.get(48).should.equal(true);

      bitSet.set(48, false);
      bitSet.get(48).should.equal(false);
    });
  });

  describe('#reset', function() {
    it('should reset all bits to 0', function() {
      bitSet.set(2, true);
      bitSet.set(3, true);
      bitSet.set(32, true);
      bitSet.set(63, true);
      bitSet.reset();

      bitSet.get(2).should.equal(false);
      bitSet.get(3).should.equal(false);
      bitSet.get(32).should.equal(false);
      bitSet.get(63).should.equal(false);
    });
  });

  describe('#contains', function() {
    it('should return false if two BitSet have different sizes', function() {
      bitSet.contains(new makr.BitSet(32)).should.equal(false);
      bitSet.contains(new makr.BitSet(64)).should.equal(true);
    });

    it('should return true BitSet contains the second', function() {
      var other = new makr.BitSet(64);

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

var should = require('should');
var makr = require('../dist/makr');

describe('World', function() {
  var world;
  beforeEach(function() {
    world = new makr.World();
  });

  describe('#create', function() {
    it('should create a new entity', function() {
      var entity = world.create();

      should.exist(entity);
      should.equal(entity.id, 0);
      should.equal(entity.alive, true);
    });

    it('should reuse dead entities', function() {
      var e0 = world.create();
      var e1 = world.create();

      world.kill(e0);
      world.loopStart();

      e0 = world.create();

      should.exist(e0);
      should.equal(e0.id, 0);
      should.equal(e0.alive, true);
    });
  });

  describe('#kill', function() {
    it('should kill the entity', function() {
      var entity = world.create();

      world.kill(entity);
      world.loopStart();

      should.equal(entity.alive, false);
    });
  });
});

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

    it('should remove the entity from all groups', function() {
      var entity = world.create();

      world.addToGroup(entity, 'test1');
      world.addToGroup(entity, 'test2');
      world.kill(entity);
      world.loopStart();

      world.isInGroup(entity, 'test1').should.equal(false);
      world.isInGroup(entity, 'test2').should.equal(false);
    });
  });

  describe('#addToGroup', function() {
    it('should add an entity to the specified group without error', function() {
      world.addToGroup(world.create(), 'test');
    });
  });

  describe('#isInGroup', function() {
    it('should check if an entity is in the specified group', function() {
      var e0 = world.create();
      var e1 = world.create();

      world.addToGroup(e0, 'test');

      world.isInGroup(e0, 'test').should.equal(true);
      world.isInGroup(e1, 'test').should.equal(false);
    });
  });

  describe('#removeFromGroup', function() {
    it('should remove an entity from the specified group', function() {
      var e0 = world.create();
      var e1 = world.create();

      world.addToGroup(e0, 'test');
      world.removeFromGroup(e0, 'test');
      world.removeFromGroup(e1, 'test');

      world.isInGroup(e0, 'test').should.equal(false);
      world.isInGroup(e1, 'test').should.equal(false);
    });
  });

  describe('#removeFromGroups', function() {
    it('should remove an entity from all specified groups', function() {
      var entity = world.create();

      world.addToGroup(entity, 'test1');
      world.addToGroup(entity, 'test2');
      world.addToGroup(entity, 'test3');
      world.removeFromGroups(entity);

      world.isInGroup(entity, 'test1').should.equal(false);
      world.isInGroup(entity, 'test2').should.equal(false);
      world.isInGroup(entity, 'test3').should.equal(false);
    });
  });

  describe('#getEntitiesByGroup', function() {
    it('should retrieve all entities of the specified group', function() {
      var e0 = world.create();
      var e1 = world.create();

      var entity = world.create();

      world.addToGroup(e0, 'test');
      world.addToGroup(e1, 'test');

      var testEntities = world.getEntitiesByGroup('test');
      var voidEntities = world.getEntitiesByGroup('void');

      testEntities.should.have.length(2);
      voidEntities.should.have.length(0);

      testEntities.should.eql([e0, e1]);
    });
  });
});

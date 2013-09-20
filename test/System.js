var should = require('should');
var makr = require('../dist/makr');

function DummySystem() {
  makr.IteratingSystem.call(this);
  this.registerComponent(0);
  this.registerComponent(1);
}

DummySystem.prototype = Object.create(makr.IteratingSystem.prototype);
DummySystem.prototype.constructor = DummySystem;

describe('System', function() {
  var world;
  var system;

  beforeEach(function() {
    world = new makr.World();
    world.registerSystem(system = new DummySystem());
  });

  describe('entities', function() {
    it('should add an entity if its components match', function() {
      var entity = world.create();

      entity.add({}, 0);
      world.loopStart();

      system._entities.indexOf(entity).should.equal(-1);

      entity.add({}, 1);
      entity.add({}, 2);
      world.loopStart();

      system._entities.indexOf(entity).should.not.equal(-1);
    });

    it('should remove an entity if its components no longer match', function() {
      var entity = world.create();

      entity.add({}, 0);
      entity.add({}, 1);
      world.loopStart();

      system._entities.indexOf(entity).should.not.equal(-1);

      entity.remove(1);
      world.loopStart();

      system._entities.indexOf(entity).should.equal(-1);
    });

    it('should remove an entity when all its components are removed', function() {
      var entity = world.create();

      entity.add({}, 0);
      entity.add({}, 1);
      world.loopStart();

      system._entities.indexOf(entity).should.not.equal(-1);

      entity.clear();
      world.loopStart();

      system._entities.indexOf(entity).should.equal(-1);
    });

    it('should remove an entity when killed', function() {
      var entity = world.create();

      entity.add({}, 0);
      entity.add({}, 1);
      world.loopStart();

      system._entities.indexOf(entity).should.not.equal(-1);

      entity.kill();
      world.loopStart();

      system._entities.indexOf(entity).should.equal(-1);
    });
  });

  describe('events', function() {
    it('should call onBegin before iterating entities', function(done) {
      DummySystem.prototype.onBegin = function(entity) {
        DummySystem.prototype.onBegin = function() {};
        done();
      };

      world.update();
    });

    it('should call onEnd after iterating entities', function(done) {
      DummySystem.prototype.onEnd = function(entity) {
        DummySystem.prototype.onEnd = function() {};
        done();
      };

      world.update();
    });

    it('should call onAdded when an entity is added to this system', function(done) {
      DummySystem.prototype.onAdded = function(entity) {
        DummySystem.prototype.onAdded = function() {};
        done();
      };

      var entity = world.create();

      entity.add({}, 0);
      entity.add({}, 1);
      world.loopStart();
    });

    it('should call onRemoved when an entity is removed from this system', function(done) {
      DummySystem.prototype.onRemoved = function(entity) {
        DummySystem.prototype.onRemoved = function() {};
        done();
      };

      var entity = world.create();

      entity.add({}, 0);
      entity.add({}, 1);
      world.loopStart();

      entity.remove(1);
      world.loopStart();
    });
  });
});

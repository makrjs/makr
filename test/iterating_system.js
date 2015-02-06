var should = require('should');
var makr = require('..');

function IterationTestSystem() {
  makr.IteratingSystem.call(this);
  this.registerComponent(0);
  this.i = 0;
}

IterationTestSystem.prototype = Object.create(makr.IteratingSystem.prototype);
IterationTestSystem.prototype.constructor = IterationTestSystem;

IterationTestSystem.prototype.onBegin = function() {
  this.i = 0;
};

IterationTestSystem.prototype.onEnd = function() {
  this.i.should.equal(this._entities.length);
};

IterationTestSystem.prototype.process = function(entity) {
  should.exist(entity);
  this.i++;
};

describe('IteratingSystem', function() {
  var world;
  var system;

  beforeEach(function() {
    world = new makr.World();
    world.registerSystem(system = new IterationTestSystem());
  });

  it('should traverse all its entities', function() {
    var entity, i = 10;
    while (i--) {
      entity = world.create();
      entity.add({}, 0);
    }

    world.update();
    system.i.should.equal(10);
  });
});

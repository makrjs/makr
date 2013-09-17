var should = require('should');
var makr = require('../dist/makr');

function Point() {}
function Rectangle() {}

describe('Entity', function() {
  var world;
  beforeEach(function() {
    world = new makr.World();
  });

  describe('#add', function() {
    it('should add a component to the entity', function() {
      var entity = world.create();

      entity.add(new Point(), 4);
      should.equal(entity._componentMask.get(3), false);
      should.equal(entity._componentMask.get(4), true);
      should.equal(entity._componentMask.get(5), false);
    });

    it('should replace an existing component with the same type', function() {
      var entity = world.create();

      entity.add(new Point(), 4);
      entity.add(new Rectangle(), 4);

      should.equal(entity._componentMask.get(3), false);
      should.equal(entity._componentMask.get(4), true);
      should.equal(entity._componentMask.get(5), false);
    });
  });

  describe('#remove', function() {
    it('should remove a component with the specified type', function() {
      var entity = world.create();

      entity.add(new Point(), 4);
      entity.remove(4);

      should.equal(entity._componentMask.get(4), false);
    });

    it('should do nothing when the entity has no component of the specified type', function() {
      var entity = world.create();

      entity.remove(4);

      should.equal(entity._componentMask.get(4), false);
    });
  });

  describe('#get', function() {
    it('should return a component with the specified type', function() {
      var entity = world.create();
      var component;

      entity.add(new Point(), 4);
      entity.add(new Rectangle(), 4);
      component = entity.get(4);

      should.exist(component);
      component.should.be.an.instanceOf(Rectangle);
    });

    it('should return undefined if there is no component of the specified type', function() {
      var entity = world.create();
      var component = entity.get(4);

      should.not.exist(component);
    });
  });

  describe('#clear', function() {
    it('should remove all components', function() {
      var entity = world.create();

      entity.add(new Point(), 1);
      entity.add(new Point(), 3);
      entity.add(new Point(), 8);
      entity.clear();

      should.equal(entity._componentMask.get(1), false);
      should.equal(entity._componentMask.get(3), false);
      should.equal(entity._componentMask.get(8), false);
    });
  });

  describe('#kill', function() {
    it('should kill the entity', function() {
      var entity = world.create();

      entity.kill();
      world.update();

      should.equal(entity.alive, false);
    });
  });
});

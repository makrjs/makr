global.Ash = require('./lib/ash');
global.makr = require('../dist/makr');

global.ashFixtures = require('./fixtures/ash');
global.makrFixtures = require('./fixtures/makr');
global.sharedFixtures = require('./fixtures/shared');

module.exports = {
  name: 'Add 200 entities to 3 systems',
  tests: [
    {
      name: "Ash",
      setup: function() {
        var engine = new Ash.Engine();
        engine.addSystem(new ashFixtures.MovementSystem(), 0);
        engine.addSystem(new ashFixtures.CollisionSystem(), 1);
        engine.addSystem(new ashFixtures.RenderingSystem(), 2);
      },
      fn: function() {
        var i = 200;
        while (i--) {
          var entity = new Ash.Entity();
          entity.add(new sharedFixtures.Position());
          entity.add(new sharedFixtures.Motion());
          entity.add(new sharedFixtures.Body());
          entity.add(new sharedFixtures.Display());
          engine.addEntity(entity);
        }
      }
    },
    {
      name: "Ash (after creation)",
      setup: function() {
        var engine = new Ash.Engine();
        engine.addSystem(new ashFixtures.MovementSystem(), 0);
        engine.addSystem(new ashFixtures.CollisionSystem(), 1);
        engine.addSystem(new ashFixtures.RenderingSystem(), 2);
      },
      fn: function() {
        var i = 200;
        while (i--) {
          var entity = new Ash.Entity();
          engine.addEntity(entity);
          entity.add(new sharedFixtures.Position());
          entity.add(new sharedFixtures.Motion());
          entity.add(new sharedFixtures.Body());
          entity.add(new sharedFixtures.Display());
        }
      }
    },
    {
      name: "makr",
      setup: function() {
        var world = new makr.World();
        world.registerSystem(new makrFixtures.MovementSystem());
        world.registerSystem(new makrFixtures.CollisionSystem());
        world.registerSystem(new makrFixtures.RenderingSystem());
      },
      fn: function() {
        var i = 200;
        while (i--) {
          var entity = world.create();
          entity.add(new sharedFixtures.Position(), makrFixtures.TYPE_POSITION);
          entity.add(new sharedFixtures.Motion(), makrFixtures.TYPE_MOTION);
          entity.add(new sharedFixtures.Body(), makrFixtures.TYPE_BODY);
          entity.add(new sharedFixtures.Display(), makrFixtures.TYPE_DISPLAY);
        }
        world.loopStart();
      }
    }
  ]
};
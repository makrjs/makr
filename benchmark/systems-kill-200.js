global.Ash = require('./lib/ash');
global.makr = require('../dist/makr');

global.ashFixtures = require('./fixtures/ash');
global.makrFixtures = require('./fixtures/makr');
global.sharedFixtures = require('./fixtures/shared');

module.exports = {
  name: 'Kill 200 entities added to 3 systems',
  tests: [
    {
      name: "Ash",
      setup: function() {
        var entities = new Array(200);
        var engine = new Ash.Engine();
        engine.addSystem(new ashFixtures.MovementSystem(), 0);
        engine.addSystem(new ashFixtures.CollisionSystem(), 1);
        engine.addSystem(new ashFixtures.RenderingSystem(), 2);
        var i = 200;
        while (i--) {
          var entity = entities[i] = new Ash.Entity();
          entity.add(new sharedFixtures.Position());
          entity.add(new sharedFixtures.Motion());
          entity.add(new sharedFixtures.Body());
          entity.add(new sharedFixtures.Display());
          engine.addEntity(entity);
        }
      },
      fn: function() {
        var i = 200;
        while (i--) {
          engine.removeEntity(entities[i]);
        }
      }
    },
    {
      name: "makr",
      setup: function() {
        var entities = new Array(200);
        var world = new makr.World();
        world.registerSystem(new makrFixtures.MovementSystem());
        world.registerSystem(new makrFixtures.CollisionSystem());
        world.registerSystem(new makrFixtures.RenderingSystem());
        var i = 200;
        while (i--) {
          var entity = entities[i] = world.create();
          entity.add(new sharedFixtures.Position(), makrFixtures.TYPE_POSITION);
          entity.add(new sharedFixtures.Motion(), makrFixtures.TYPE_MOTION);
          entity.add(new sharedFixtures.Body(), makrFixtures.TYPE_BODY);
          entity.add(new sharedFixtures.Display(), makrFixtures.TYPE_DISPLAY);
        }
        world.loopStart();
      },
      fn: function() {
        var i = 200;
        while (i--) {
          world.kill(entities[i]);
        }
        world.loopStart();
      }
    }
  ]
};

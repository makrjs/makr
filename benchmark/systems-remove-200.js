global.Ash = require('./lib/ash');
global.makr = require('../dist/makr');

global.ashFixtures = require('./fixtures/ash');
global.makrFixtures = require('./fixtures/makr');
global.sharedFixtures = require('./fixtures/shared');

module.exports = {
  name: 'Remove 200 entities from 3 systems',
  tests: [
    {
      name: "Ash",
      setup: function() {
        var engine = new Ash.Engine();
        var entities = new Array(200), entity;
        engine.addSystem(new ashFixtures.MovementSystem(), 0);
        engine.addSystem(new ashFixtures.CollisionSystem(), 1);
        engine.addSystem(new ashFixtures.RenderingSystem(), 2);
        var i = 200;
        while (i--) {
          entity = entities[i] = new Ash.Entity();
          entity.add(new sharedFixtures.Position());
          entity.add(new sharedFixtures.Motion());
          entity.add(new sharedFixtures.Body());
          entity.add(new sharedFixtures.Display());
          engine.addEntity(entity);
        }
      },
      fn: function() {
        i = 200;
        while (i--) {
          entity = entities[i];
          entity.remove(sharedFixtures.Position);
          entity.remove(sharedFixtures.Motion);
          entity.remove(sharedFixtures.Body);
          entity.remove(sharedFixtures.Display);
        }
      }
    },
    {
      name: "makr",
      setup: function() {
        var world = new makr.World();
        var entities = new Array(200), entity;
        world.registerSystem(new makrFixtures.MovementSystem());
        world.registerSystem(new makrFixtures.CollisionSystem());
        world.registerSystem(new makrFixtures.RenderingSystem());
        var i = 200;
        while (i--) {
          entity = entities[i] = world.create();
          entity.add(new sharedFixtures.Position(), makrFixtures.TYPE_POSITION);
          entity.add(new sharedFixtures.Motion(), makrFixtures.TYPE_MOTION);
          entity.add(new sharedFixtures.Body(), makrFixtures.TYPE_BODY);
          entity.add(new sharedFixtures.Display(), makrFixtures.TYPE_DISPLAY);
        }
        world.loopStart();
      },
      fn: function() {
        i = 200;
        while (i--) {
          entity = entities[i];
          entity.remove(makrFixtures.TYPE_POSITION);
          entity.remove(makrFixtures.TYPE_MOTION);
          entity.remove(makrFixtures.TYPE_BODY);
          entity.remove(makrFixtures.TYPE_DISPLAY);
        }
        world.loopStart();
      }
    },
    {
      name: "makr (clear components)",
      setup: function() {
        var world = new makr.World();
        var entities = new Array(200), entity;
        world.registerSystem(new makrFixtures.MovementSystem());
        world.registerSystem(new makrFixtures.CollisionSystem());
        world.registerSystem(new makrFixtures.RenderingSystem());
        var i = 200;
        while (i--) {
          entity = entities[i] = world.create();
          entity.add(new sharedFixtures.Position(), makrFixtures.TYPE_POSITION);
          entity.add(new sharedFixtures.Motion(), makrFixtures.TYPE_MOTION);
          entity.add(new sharedFixtures.Body(), makrFixtures.TYPE_BODY);
          entity.add(new sharedFixtures.Display(), makrFixtures.TYPE_DISPLAY);
        }
        world.loopStart();
      },
      fn: function() {
        i = 200;
        while (i--) {
          entities[i].clear();
        }
        world.loopStart();
      }
    }
  ]
};

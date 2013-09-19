global.Ash = require('./lib/ash');
global.makr = require('../dist/makr');

module.exports = {
  name: 'Create 1 entity',
  tests: [
    {
      name: "Ash",
      setup: function() {
        var engine = new Ash.Engine();
      },
      fn: function() {
        engine.addEntity(new Ash.Entity());
      }
    },
    {
      name: "makr (empty entity pool)",
      setup: function() {
        var world = new makr.World();
      },
      fn: function() {
        world.create();
        world.loopStart();
      }
    },
    {
      name: "makr (full entity pool)",
      setup: function() {
        var world = new makr.World();
        world.kill(world.create());
        world.loopStart();
      },
      fn: function() {
        world.create();
        world.loopStart();
      }
    }
  ]
};

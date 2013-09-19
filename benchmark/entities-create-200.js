global.Ash = require('./lib/ash');
global.makr = require('../dist/makr');

module.exports = {
  name: 'Create 200 entities',
  tests: [
    {
      name: "Ash",
      setup: function() {
        var engine = new Ash.Engine();
      },
      fn: function() {
        var i = 200;
        while (i--) {
          engine.addEntity(new Ash.Entity());
        }
      }
    },
    {
      name: "makr (empty entity pool)",
      setup: function() {
        var world = new makr.World();
      },
      fn: function() {
        var i = 200;
        while (i--) {
          world.create();
        }
        world.loopStart();
      }
    },
    {
      name: "makr (full entity pool)",
      setup: function() {
        var world = new makr.World();
        var i = 200;
        while (i--) {
          world.kill(world.create());
        }
        world.loopStart();
      },
      fn: function() {
        var i = 200;
        while (i--) {
          world.create();
        }
        world.loopStart();
      }
    }
  ]
};

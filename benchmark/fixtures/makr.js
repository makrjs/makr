var makr = require('../../dist/makr');

var TYPE_POSITION = 0;
var TYPE_MOTION = 1;
var TYPE_DISPLAY = 2;
var TYPE_BODY = 3;

module.exports = {
  // Component types
  TYPE_POSITION: TYPE_POSITION,
  TYPE_MOTION: TYPE_MOTION,
  TYPE_DISPLAY: TYPE_DISPLAY,
  TYPE_BODY: TYPE_BODY,
  // Systems
  MovementSystem: (function() {
    function MovementSystem() {
      makr.IteratingSystem.call(this);
      this.registerComponent(TYPE_POSITION);
      this.registerComponent(TYPE_MOTION);
    }

    makr.inherits(MovementSystem, makr.IteratingSystem);
    return MovementSystem;
  })(),
  CollisionSystem: (function() {
    function CollisionSystem() {
      makr.IteratingSystem.call(this);
      this.registerComponent(TYPE_POSITION);
      this.registerComponent(TYPE_MOTION);
      this.registerComponent(TYPE_BODY);
    }

    makr.inherits(CollisionSystem, makr.IteratingSystem);
    return CollisionSystem;
  })(),
  RenderingSystem: (function() {
    function RenderingSystem() {
      makr.IteratingSystem.call(this);
      this.registerComponent(TYPE_POSITION);
      this.registerComponent(TYPE_DISPLAY);
    }

    makr.inherits(RenderingSystem, makr.IteratingSystem);
    return RenderingSystem;
  })(),
};

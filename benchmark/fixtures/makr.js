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

    MovementSystem.prototype = Object.create(makr.IteratingSystem.prototype);
    MovementSystem.prototype.constructor = MovementSystem;

    return MovementSystem;
  })(),
  CollisionSystem: (function() {
    function CollisionSystem() {
      makr.IteratingSystem.call(this);
      this.registerComponent(TYPE_POSITION);
      this.registerComponent(TYPE_MOTION);
      this.registerComponent(TYPE_BODY);
    }

    CollisionSystem.prototype = Object.create(makr.IteratingSystem.prototype);
    CollisionSystem.prototype.constructor = CollisionSystem;

    return CollisionSystem;
  })(),
  RenderingSystem: (function() {
    function RenderingSystem() {
      makr.IteratingSystem.call(this);
      this.registerComponent(TYPE_POSITION);
      this.registerComponent(TYPE_DISPLAY);
    }

    RenderingSystem.prototype = Object.create(makr.IteratingSystem.prototype);
    RenderingSystem.prototype.constructor = RenderingSystem;

    return RenderingSystem;
  })(),
};

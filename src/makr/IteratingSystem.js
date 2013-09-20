/**
 * @class IteratingSystem
 * @extends {System}
 * @constructor
 */
function IteratingSystem() {
  System.call(this);
}

// Extend System
IteratingSystem.prototype = Object.create(System.prototype, {
  constructor: {
    value: IteratingSystem,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

/**
 * @override
 */
IteratingSystem.prototype.processEntities = function IteratingSystem_processEntities(entities, elapsed) {
  var i = 0;
  var n = entities.length;

  for (i = 0; i < n; i++) {
    this.process(entities[i], elapsed);
  }
};

/**
 * @method process
 * @param {Entity} entity
 * @param {Float} elapsed
 */
IteratingSystem.prototype.process = function IteratingSystem_process(entity, elapsed) {};

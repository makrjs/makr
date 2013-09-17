/**
 * @class IteratingSystem
 * @extends {System}
 * @constructor
 */
makr.IteratingSystem = function() {
  makr.System.call(this);
};

makr.IteratingSystem.prototype = Object.create(makr.System.prototype);
makr.IteratingSystem.prototype.constructor = makr.IteratingSystem;

makr.IteratingSystem.prototype.processEntities = function(entities, elapsed) {
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
makr.IteratingSystem.prototype.process = function(entity, elapsed) {};

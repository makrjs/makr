/**
 * @final
 * @class World
 * @constructor
 */
makr.World = function() {
  /**
   * @private
   * @property {System[]} _systems
   */
  this._systems = [];

  /**
   * @private
   * @property {Uint} _nextEntityID
   */
  this._nextEntityID = 0;

  /**
   * @private
   * @property {Entity[]} _alive
   */
  this._alive = [];

  /**
   * @private
   * @property {Entity[]} _dead
   */
  this._dead = [];

  /**
   * @private
   * @property {Entity[]} _removed
   */
  this._removed = [];

  /**
   * @private
   * @property {Entity[]} _refreshed
   */
  this._refreshed = [];
};

makr.World.prototype = {
  /**
   * @method registerSystem
   * @param {System} system
   */
  registerSystem: function(system) {
    if (this._systems.indexOf(system) >= 0) {
      throw "Cannot register a system twice";
    }

    this._systems.push(system);

    system.world = this;
    system.onRegistered();
  },
  /**
   * @method create
   * @return {Entity}
   */
  create: function() {
    var entity;
    if (this._dead.length > 0) {
      // Revive entity
      entity = this._dead.pop();
      entity._alive = true;
    } else {
      entity = new Entity(this, this._nextEntityID++);
    }

    this._alive.push(entity);
    return entity;
  },
  /**
   * @method kill
   * @param {Entity} entity
   */
  kill: function(entity) {
    if (!entity._waitingForRemoval) {
      entity._waitingForRemoval = true;
      this._removed.push(entity);
    }
  },
  /**
   * @method refresh
   * @param {Entity} entity
   */
  refresh: function(entity) {
    if (!entity._waitingForRefresh) {
      entity._waitingForRefresh = true;
      this._refreshed.push(entity);
    }
  },
  /**
   * @method update
   * @param {Float} elapsed
   */
  update: function(elapsed) {
    var i, entities;

    // Process entities queued for removal
    for (entities = this._removed, i = entities.length; i--;) {
      this._removeEntity(entities[i]);
    }

    entities.length = 0;

    // Process entities queded for refresh
    for (entities = this._refreshed, i = entities.length; i--;) {
      this._refreshEntity(entities[i]);
    }

    entities.length = 0;

    var systems = this._systems;
    var n = systems.length;
    for (i = 0; i < n; i++) {
      systems.update(elapsed);
    }
  },
  /**
   * @private
   * @method _refreshEntity
   * @param {Entity} entity
   */
  _refreshEntity: function(entity) {
    var systems = this._systems;
    var i = 0;
    var n = systems.length;

    for (; i < n; i++) {
      var contains = entity._systemMask.get(i);
      var interested = entity._componentMask.contains(systems[i]._componentMask);

      if (contains && !interested) {
        // Remove entity from the system
        systems[i]._removeEntity(entity);
        entity._systemMask.set(i, 0);
      } else if (!contains && interested) {
        // Add entity to the system
        systems[i]._addEntity(entity);
        entity._systemMask.set(i, 1);
      }
    }
  },
  /**
   * @private
   * @method _removeEntity
   * @param {Entity} entity
   */
  _removeEntity: function(entity) {
    if (entity._alive) {
      // Unset removal flag
      entity._waitingForRemoval = false;

      // Murder the entity!
      entity._alive = false;

      // Remove from alive entities by swapping with the last entity
      this._alive[this._alive.indexOf(entity)] = this._alive[this._alive.length - 1];
      this._alive.pop();

      // Add to dead entities
      this._dead.push(entity);

      // Reset component mask
      entity._componentMask.reset();

      // Refresh systems
      this._refreshEntity(entity);
    }
  },
  /**
   * @private
   * @method _getComponent
   * @param  {Entity} entity
   * @param  {Uint} type
   * @return {Object}
   */
  _getComponent: function(entity, type) {
    if (entity._componentMask.get(type)) {
      return this._componentBags[entity.id][type];
    }

    return null;
  },
  /**
   * @private
   * @method _addComponent
   * @param {Entity} entity
   * @param {Object} component
   * @param {type} type
   */
  _addComponent: function(entity, component, type) {
    entity._componentMask.set(type, 1);

    this._componentBags[entity.id] || (this._componentBags[entity.id] = []);
    this._componentBags[entity.id][type] = component;
  },
  /**
   * @private
   * @method _removeComponent
   * @param {Entity} entity
   * @param {Uint} type
   */
  _removeComponent: function(entity, type) {
    entity._componentMask.set(type, 0);
  },
  /**
   * @private
   * @method _removeComponents
   * @param {Entity} entity
   */
  _removeComponents: function(entity) {
    entity._componentMask.reset();
  }
};

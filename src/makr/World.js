/**
 * The primary instance for the framework. It contains all the managers.
 * You must use this to create, delete and retrieve entities.
 *
 * @final
 * @class World
 * @constructor
 */
function World() {
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

  /**
   * @private
   * @property {Object[][]} _componentBags
   */
  this._componentBags = [];
}

/**
 * Registers the specified system.
 *
 * @method registerSystem
 * @param {System} system
 */
World.prototype.registerSystem = function World_registerSystem(system) {
  if (this._systems.indexOf(system) >= 0) {
    throw "Cannot register a system twice";
  }

  this._systems.push(system);

  system._world = this;
  system.onRegistered();
};

/**
 * Creates a new entity.
 *
 * @method create
 * @return {Entity}
 */
World.prototype.create = function World_create() {
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
};

/**
 * Kills the specified entity.
 *
 * @method kill
 * @param {Entity} entity
 */
World.prototype.kill = function World_kill(entity) {
  if (!entity._waitingForRemoval) {
    entity._waitingForRemoval = true;
    this._removed.push(entity);
  }
};

/**
 * Queues the entity to be refreshed.
 *
 * @method refresh
 * @param {Entity} entity
 */
World.prototype.refresh = function World_refresh(entity) {
  if (!entity._waitingForRefresh) {
    entity._waitingForRefresh = true;
    this._refreshed.push(entity);
  }
};

/**
 * Updates all systems.
 *
 * @method update
 * @param {Float} elapsed
 */
World.prototype.update = function World_update(elapsed) {
  // Process entities
  this.loopStart();

  var systems = this._systems;
  var i = 0;
  var n = systems.length;

  for (; i < n; i++) {
    systems[i].update(elapsed);
  }
};

/**
 * Processes all queued entities.
 *
 * @method loopStart
 */
World.prototype.loopStart = function World_loopStart() {
  var i;

  // Process entities queued for removal
  for (i = this._removed.length; i--;) {
    this._removeEntity(this._removed[i]);
  }

  this._removed.length = 0;

  // Process entities queded for refresh
  for (i = this._refreshed.length; i--;) {
    this._refreshEntity(this._refreshed[i]);
  }

  this._refreshed.length = 0;
};

/**
 * @private
 * @method _refreshEntity
 * @param {Entity} entity
 */
World.prototype._refreshEntity = function World__refreshEntity(entity) {
  // Unset refresh flag
  entity._waitingForRefresh = false;

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
};

/**
 * @private
 * @method _removeEntity
 * @param {Entity} entity
 */
World.prototype._removeEntity = function World__removeEntity(entity) {
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

    // Refresh entity
    this._refreshEntity(entity);
  }
};

/**
 * @private
 * @method _getComponent
 * @param  {Entity} entity
 * @param  {Uint} type
 * @return {Object}
 */
World.prototype._getComponent = function World__getComponent(entity, type) {
  if (entity._componentMask.get(type)) {
    return this._componentBags[entity._id][type];
  }

  return null;
};

/**
 * @private
 * @method _addComponent
 * @param {Entity} entity
 * @param {Object} component
 * @param {type} type
 */
World.prototype._addComponent = function World__addComponent(entity, component, type) {
  entity._componentMask.set(type, 1);

  this._componentBags[entity._id] || (this._componentBags[entity._id] = []);
  this._componentBags[entity._id][type] = component;

  this.refresh(entity);
};

/**
 * @private
 * @method _removeComponent
 * @param {Entity} entity
 * @param {Uint} type
 */
World.prototype._removeComponent = function World__removeComponent(entity, type) {
  entity._componentMask.set(type, 0);
  this.refresh(entity);
};

/**
 * @private
 * @method _removeComponents
 * @param {Entity} entity
 */
World.prototype._removeComponents = function World__removeComponents(entity) {
  entity._componentMask.reset();
  this.refresh(entity);
};

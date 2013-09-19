/**
 * @final
 * @class Entity
 * @constructor
 */
makr.Entity = function(world, id) {
  /**
   * @private
   * @property {Uint} _id
   */
  this._id = id;

  /**
   * @private
   * @property {World} _world
   */
  this._world = world;

  /**
   * @private
   * @property {Boolean} _alive
   */
  this._alive = true;

  /**
   * @private
   * @property {Boolean} _waitingForRefresh
   */
  this._waitingForRefresh = false;

  /**
   * @private
   * @property {Boolean} _waitingForRemoval
   */
  this._waitingForRemoval = false;

  // Choose the BitSet class according to the engine configuration
  var BitSetClass = (makr.config.MAX_COMPONENTS <= 32 && makr.config.MAX_SYSTEMS <= 32) ? makr.FastBitSet : makr.BitSet;

  /**
   * @private
   * @property {BitSet} _componentMask
   */
  this._componentMask = new BitSetClass(makr.config.MAX_COMPONENTS);

  /**
   * @private
   * @property {BitSet} _systemMask
   */
  this._systemMask = new BitSetClass(makr.config.MAX_SYSTEMS);
};

makr.Entity.prototype = {
  /**
   * @method get
   * @param  {Uint} type
   * @return {Object}
   */
  get: function(type) {
    return this._world._getComponent(this, type);
  },
  /**
   * @method add
   * @param {Object} component
   * @param {Uint} type
   */
  add: function(component, type) {
    this._world._addComponent(this, component, type);
  },
  /**
   * @method remove
   * @param {Uint} type
   */
  remove: function(type) {
    this._world._removeComponent(this, type);
  },
  /**
   * @method clear
   */
  clear: function() {
    this._world._removeComponents(this);
  },
  /**
   * @method kill
   */
  kill: function() {
    this._world.kill(this);
  },
  /**
   * @method refresh
   */
  refresh: function() {
    this._world.refresh(this);
  }
};

/**
 * @property {Uint} id
 */
Object.defineProperty(makr.Entity.prototype, 'id', {
  get: function() {
    return this._id;
  }
});

/**
 * @property {Boolean} alive
 */
Object.defineProperty(makr.Entity.prototype, 'alive', {
  get: function() {
    return this._alive;
  }
});

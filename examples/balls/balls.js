// Components
// ----------

function Clock(lifespan) {
  this.lifespan = lifespan || 1;
  this.t = this.lifespan;
}

function Point(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

function Radius(r) {
  this.r = r || 0;
}

function Color(c) {
  this.c = c || '#000';
}

var typeCounter = 0;
var TYPE_CLOCK = typeCounter++;
var TYPE_POSITION = typeCounter++;
var TYPE_VELOCITY = typeCounter++;
var TYPE_RADIUS = typeCounter++;
var TYPE_COLOR = typeCounter++;

// Systems
// -------

function CollisionSystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(TYPE_POSITION);
  this.registerComponent(TYPE_VELOCITY);
  this.registerComponent(TYPE_RADIUS);
}

CollisionSystem.prototype = Object.create(makr.IteratingSystem.prototype);
CollisionSystem.prototype.constructor = CollisionSystem;

CollisionSystem.prototype.onBegin = function() {
  this._width = document.body.clientWidth;
  this._height = document.body.clientHeight;

  BallManager.setDimensions(this._width, this._height);
};

CollisionSystem.prototype.process = function(entity, elapsed) {
  var position = entity.get(TYPE_POSITION);
  var velocity = entity.get(TYPE_VELOCITY);
  var radius = entity.get(TYPE_RADIUS);

  if ((position.x - radius.r < 0 && velocity.x < 0) || (position.x + radius.r > this._width && velocity.x > 0)) {
    velocity.x = -velocity.x * 0.95;
  }

  if ((position.y - radius.r < 0 && velocity.y < 0) || (position.y + radius.r > this._height && velocity.y > 0)) {
    velocity.y = -velocity.y * 0.95;
  }
};

function GravitySystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(TYPE_VELOCITY);
}

GravitySystem.prototype = Object.create(makr.IteratingSystem.prototype);
GravitySystem.prototype.constructor = GravitySystem;

GravitySystem.prototype.process = function(entity, elapsed) {
  entity.get(TYPE_VELOCITY).y += elapsed * 500;
};

function MovementSystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(TYPE_POSITION);
  this.registerComponent(TYPE_VELOCITY);
}

MovementSystem.prototype = Object.create(makr.IteratingSystem.prototype);
MovementSystem.prototype.constructor = MovementSystem;

MovementSystem.prototype.process = function(entity, elapsed) {
  var position = entity.get(TYPE_POSITION);
  var velocity = entity.get(TYPE_VELOCITY);

  position.x += velocity.x * elapsed;
  position.y += velocity.y * elapsed;
};

function LifetimeSystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(TYPE_CLOCK);
}

LifetimeSystem.prototype = Object.create(makr.IteratingSystem.prototype);
LifetimeSystem.prototype.constructor = LifetimeSystem;

LifetimeSystem.prototype.process = function(entity, elapsed) {
  var clock = entity.get(TYPE_CLOCK);

  clock.t -= elapsed;
  if (clock.t < 0) {
    entity.kill();
  }
};

function RenderingSystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(TYPE_POSITION);
  this.registerComponent(TYPE_RADIUS);
  this.registerComponent(TYPE_COLOR);
  this.registerComponent(TYPE_CLOCK);
}

RenderingSystem.prototype = Object.create(makr.IteratingSystem.prototype);
RenderingSystem.prototype.constructor = RenderingSystem;

RenderingSystem.prototype.onRegistered = function() {
  this.canvas = document.getElementById('game');
  this.ctx = this.canvas.getContext('2d');
};

RenderingSystem.prototype.onBegin = function() {
  this.canvas.width = document.body.clientWidth;
  this.canvas.height = document.body.clientHeight;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

RenderingSystem.prototype.process = function(entity, elapsed) {
  var position = entity.get(TYPE_POSITION);
  var radius = entity.get(TYPE_RADIUS);
  var color = entity.get(TYPE_COLOR);
  var clock = entity.get(TYPE_CLOCK);

  var ctx = this.ctx;

  ctx.beginPath();
  ctx.arc(position.x, position.y, radius.r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.globalAlpha = clock.t / clock.lifespan;
  ctx.fillStyle = color.c;
  ctx.fill();
};

// World
// -----

// Configure makr (optional)
makr({
  MAX_COMPONENTS: 16,
  MAX_SYSTEMS: 16
});

var world = new makr.World();

// Register systems
world.registerSystem(new CollisionSystem());
world.registerSystem(new GravitySystem());
world.registerSystem(new MovementSystem());
world.registerSystem(new RenderingSystem());
world.registerSystem(new LifetimeSystem());

var BallManager = {
  _width: 0,
  _height: 0,
  setDimensions: function(width, height) {
    this._width = width;
    this._height = height;
  },
  createBalls: function(number) {
    while (number--) {
      var ball = world.create();

      ball.add(new Clock(rand(5, 10)), TYPE_CLOCK);
      ball.add(new Point(rand(0, this._width), rand(0, this._height)), TYPE_POSITION);
      ball.add(new Point(rand(10, 100), rand(10, 100)), TYPE_VELOCITY);
      ball.add(new Radius(rand(10, 50)), TYPE_RADIUS);
      ball.add(new Color(toHex(rand(0, 15), rand(0, 15), rand(0, 15))), TYPE_COLOR);
    }
  }
};

// Main
// ----

function runGame() {
  // Keyboard events
  Mousetrap.bind('space', function(e) {
    e.preventDefault();
    BallManager.createBalls(10);
  });

  // Ticker
  var time = Date.now();
  var gameLoop = function() {
    var now = Date.now();
    world.update((now - time) / 1000);
    time = now;

    requestAnimationFrame(gameLoop);
  };

  // Start the game loop
  gameLoop();
}

// Utility
// -------

function rand(min, max) {
  return min + Math.random() * (max - min + 1) | 0;
}

function toHex(r, g, b) {
  return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

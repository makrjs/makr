// Gravity
// -------

function GravitySystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(ComponentRegister.get(Velocity));
}

GravitySystem.POWER = 500;

inherits(GravitySystem, makr.IteratingSystem, {
  process: function (entity, elapsed) {
    entity.get(ComponentRegister.get(Velocity)).dy += elapsed * GravitySystem.POWER;
  }
});

// Collisions
// ----------

function CollisionSystem(viewport) {
  makr.IteratingSystem.call(this);

  this.registerComponent(ComponentRegister.get(Position));
  this.registerComponent(ComponentRegister.get(Velocity));
  this.registerComponent(ComponentRegister.get(Radius));
  this.viewport = viewport;
}

CollisionSystem.FRICTION = 0.95;

inherits(CollisionSystem, makr.IteratingSystem, {
  process: function (entity, elapsed) {
    var position = entity.get(ComponentRegister.get(Position));
    var velocity = entity.get(ComponentRegister.get(Velocity));
    var radius = entity.get(ComponentRegister.get(Radius));

    if ((position.x - radius.r < 0 && velocity.dx < 0) || (position.x + radius.r > this.viewport.width && velocity.dx > 0)) {
      velocity.dx = -velocity.dx * CollisionSystem.FRICTION;
    }

    if ((position.y - radius.r < 0 && velocity.dy < 0) || (position.y + radius.r > this.viewport.height && velocity.dy > 0)) {
      velocity.dy = -velocity.dy * CollisionSystem.FRICTION;
    }
  }
});

// Movement
// --------

function MovementSystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(ComponentRegister.get(Position));
  this.registerComponent(ComponentRegister.get(Velocity));
}

inherits(MovementSystem, makr.IteratingSystem, {
  process: function (entity, elapsed) {
    var position = entity.get(ComponentRegister.get(Position));
    var velocity = entity.get(ComponentRegister.get(Velocity));

    position.x += velocity.dx * elapsed;
    position.y += velocity.dy * elapsed;
  }
});

// Expiration
// ----------

function LifetimeSystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(ComponentRegister.get(Clock));
}

inherits(LifetimeSystem, makr.IteratingSystem, {
  process: function (entity, elapsed) {
    var clock = entity.get(ComponentRegister.get(Clock));

    clock.t -= elapsed;
    if (clock.t < 0) {
      entity.kill();
    }
  }
});

// Rendering
// ---------

function RenderingSystem(viewport, canvas) {
  makr.IteratingSystem.call(this);

  this.registerComponent(ComponentRegister.get(Position));
  this.registerComponent(ComponentRegister.get(Radius));
  this.registerComponent(ComponentRegister.get(Color));
  this.registerComponent(ComponentRegister.get(Clock));
  this.viewport = viewport;
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
}

inherits(RenderingSystem, makr.IteratingSystem, {
  onBegin: function() {
    if (this.canvas.width != this.viewport.width) {
      this.canvas.width = this.viewport.width;
    }

    if (this.canvas.height != this.viewport.height) {
      this.canvas.height = this.viewport.height;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  process: function (entity, elapsed) {
    var position = entity.get(ComponentRegister.get(Position));
    var radius = entity.get(ComponentRegister.get(Radius));
    var color = entity.get(ComponentRegister.get(Color));
    var clock = entity.get(ComponentRegister.get(Clock));

    var ctx = this.ctx;

    ctx.beginPath();
    ctx.arc(position.x, position.y, radius.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.globalAlpha = clock.t / clock.lifespan;
    ctx.fillStyle = color.c;
    ctx.fill();
  }
});

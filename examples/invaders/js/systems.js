// Controller
// ----------

function ShipControlSystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(ComponentRegister.get(ShipController));
  this.registerComponent(ComponentRegister.get(Position));
  this.registerComponent(ComponentRegister.get(Velocity));
}

inherits(ShipControlSystem, makr.IteratingSystem, {
  process: function(entity, elapsed) {
    var controller = entity.get(ComponentRegister.get(ShipController));
    var position = entity.get(ComponentRegister.get(Position));
    var velocity = entity.get(ComponentRegister.get(Velocity));

    if (controller.moveLeft) {
      velocity.dx = -ShipControlSystem.SPEED;
    } else if (controller.moveRight) {
      velocity.dx = ShipControlSystem.SPEED;
    } else {
      velocity.dx = 0;
    }

    var now = Date.now();
    if (controller.shoot) {
      if (controller.shootTimer + ShipControlSystem.FIRE_RATE < now) {
        controller.shootTimer = now;
        EntityCreator.createBullet(position.x, position.y);
      }
    }
  }
});

ShipControlSystem.SPEED = 200;
ShipControlSystem.FIRE_RATE = 250;

// Movement
// --------

function MovementSystem() {
  makr.IteratingSystem.call(this);

  this.registerComponent(ComponentRegister.get(Position));
  this.registerComponent(ComponentRegister.get(Velocity));
}

inherits(MovementSystem, makr.IteratingSystem, {
  process: function(entity, elapsed) {
    var position = entity.get(ComponentRegister.get(Position));
    var velocity = entity.get(ComponentRegister.get(Velocity));

    position.x += velocity.dx * elapsed;
    position.y += velocity.dy * elapsed;
  }
});

// Bullets
// -------

function BulletSystem() {
  makr.System.call(this);
}

inherits(BulletSystem, makr.IteratingSystem, {
  processEntities: function() {
    var bullets = world.getEntitiesByGroup('bullets');
    var invaders = world.getEntitiesByGroup('invaders');

    for (var b = bullets.length; b--;) {
      var bullet = bullets[b];
      var bulletPosition = bullet.get(ComponentRegister.get(Position));
      var bulletRadius = bullet.get(ComponentRegister.get(Radius));

      // Check viewport collisions
      if (bulletPosition.y < 0) {
        bullet.kill();
        continue;
      }

      // Check collisions against invaders
      for (var i = invaders.length; i--;) {
        var invader = invaders[i];
        var invaderPosition = invader.get(ComponentRegister.get(Position));
        var invaderRadius = invader.get(ComponentRegister.get(Radius));

        var collisionRadius = bulletRadius.r + invaderRadius.r;

        var dx = Math.abs(bulletPosition.x - invaderPosition.x);
        var dy = Math.abs(bulletPosition.y - invaderPosition.y);

        if (dx + dy < collisionRadius) {
          bullet.kill();
          invader.kill();
        }
      }
    }
  }
});

// Rendering
// ---------

function RenderingSystem(canvas) {
  makr.IteratingSystem.call(this);

  this.registerComponent(ComponentRegister.get(Position));
  this.registerComponent(ComponentRegister.get(Display));

  this.renderer = PIXI.autoDetectRenderer(800, 600, canvas);
  this.stage = new PIXI.Stage(0x111111);
  this.sprites = [];
}

inherits(RenderingSystem, makr.IteratingSystem, {
  onAdded: function(entity) {
    var display = entity.get(ComponentRegister.get(Display));
    var sprite = PIXI.Sprite.fromImage('assets/' + display.sprite + '.png');

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    this.sprites[entity.id] = sprite;
    this.stage.addChild(sprite);
  },
  onRemoved: function(entity) {
    this.stage.removeChild(this.sprites[entity.id]);
    this.sprites[entity.id] = undefined;
  },
  process: function(entity, elapsed) {
    var position = entity.get(ComponentRegister.get(Position));
    var sprite = this.sprites[entity.id];

    sprite.position.x = position.x | 0;
    sprite.position.y = position.y | 0;
  },
  onEnd: function() {
    this.renderer.render(this.stage);
  }
});

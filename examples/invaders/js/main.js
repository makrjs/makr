// World
// -----

var world = new makr.World();
var shipController = new ShipController();

// Register components
ComponentRegister.register(ShipController);
ComponentRegister.register(Position);
ComponentRegister.register(Velocity);
ComponentRegister.register(Radius);
ComponentRegister.register(Display);

// Register systems
world.registerSystem(new ShipControlSystem());
world.registerSystem(new MovementSystem());
world.registerSystem(new BulletSystem());
world.registerSystem(new RenderingSystem(document.getElementById('game')));

// Create player
EntityCreator.createPlayer(400, 500);

// Create invaders
for (var y = 0; y < 4; y++) {
  for (var x = 0; x < 10; x++) {
    EntityCreator.createInvader(170 + x * 48, 100 + y * 50);
  }
}

// Keyboard
// --------

window.addEventListener('keydown', function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  key == 32 && (shipController.shoot = true);
  key == 37 && (shipController.moveLeft = true);
  key == 39 && (shipController.moveRight = true);

  ~[32, 37, 39].indexOf(key) && e.preventDefault();
});

window.addEventListener('keyup', function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  key == 32 && (shipController.shoot = false);
  key == 37 && (shipController.moveLeft = false);
  key == 39 && (shipController.moveRight = false);
});

// Main
// ----

var paused = false;

function runGame() {
  // Ticker
  var now, time = Date.now();
  var ticker = function() {
    now = Date.now();
    gameLoop((now - time) / 1000);
    time = now;
    requestAnimationFrame(ticker);
  };

  // Start the game loop
  ticker();
}

function gameLoop(elapsed) {
  world.update(elapsed);
}

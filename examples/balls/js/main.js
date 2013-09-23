// World
// -----

var paused = false;
var world = new makr.World();

// Register components
ComponentRegister.register(Position);
ComponentRegister.register(Velocity);
ComponentRegister.register(Radius);
ComponentRegister.register(Color);
ComponentRegister.register(Clock);

// Register systems
world.registerSystem(new GravitySystem());
world.registerSystem(new CollisionSystem(Viewport));
world.registerSystem(new MovementSystem());
world.registerSystem(new RenderingSystem(Viewport, document.getElementById('game')));
world.registerSystem(new LifetimeSystem());

// Keyboard
// --------

window.addEventListener('keydown', function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  key == 32 && BallManager.createBalls(10);
  key == 80 && (paused = !paused);

  ~[32, 80].indexOf(key) && e.preventDefault();
});

// Main
// ----

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
  Viewport.width = document.body.clientWidth;
  Viewport.height = document.body.clientHeight;

  !paused && world.update(elapsed);
}

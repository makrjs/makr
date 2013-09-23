// World
// -----

// Configure makr (optional)
makr({
  MAX_COMPONENTS: 16,
  MAX_SYSTEMS: 16
});

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

// Main
// ----

var paused = false;

function runGame() {
  // Keyboard event: add balls
  Mousetrap.bind('space', function(e) {
    e.preventDefault();
    BallManager.createBalls(10);
  });

  // Keyboard event: pause
  Mousetrap.bind('p', function(e) {
    e.preventDefault();
    paused = !paused;
  });

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

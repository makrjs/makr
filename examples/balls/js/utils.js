var Viewport = {
  width: 0,
  height: 0
};

var BallManager = {
  createBalls: function(number) {
    while (number--) {
      var ball = world.create();

      ball.add(new Position(rand(0, Viewport.width), rand(0, Viewport.height)), ComponentRegister.get(Position));
      ball.add(new Velocity(rand(10, 100), rand(10, 100)), ComponentRegister.get(Velocity));
      ball.add(new Radius(rand(10, 50)), ComponentRegister.get(Radius));
      ball.add(new Color(toHex(rand(0, 15), rand(0, 15), rand(0, 15))), ComponentRegister.get(Color));
      ball.add(new Clock(rand(5, 10)), ComponentRegister.get(Clock));
    }
  }
};

function toHex(r, g, b) {
  return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

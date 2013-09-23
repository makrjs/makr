var EntityCreator = {
  createPlayer: function(x, y) {
    var player = world.create();
    player.add(shipController, ComponentRegister.get(ShipController));
    player.add(new Position(x, y), ComponentRegister.get(Position));
    player.add(new Velocity(), ComponentRegister.get(Velocity));
    player.add(new Display('ship'), ComponentRegister.get(Display));
    return player;
  },
  createInvader: function(x, y) {
    var invader = world.create();
    invader.add(new Position(x, y), ComponentRegister.get(Position));
    invader.add(new Radius(8), ComponentRegister.get(Radius));
    invader.add(new Display('invader'), ComponentRegister.get(Display));
    world.addToGroup(invader, 'invaders');
    return invader;
  },
  createBullet: function(x, y) {
    var bullet = world.create();
    bullet.add(new Position(x, y), ComponentRegister.get(Position));
    bullet.add(new Velocity(0, -300), ComponentRegister.get(Velocity));
    bullet.add(new Radius(8), ComponentRegister.get(Radius));
    bullet.add(new Display('bullet'), ComponentRegister.get(Display));
    world.addToGroup(bullet, 'bullets');
    return bullet;
  }
};

function ShipController() {
  this.moveLeft = false;
  this.moveRight = false;
  this.shoot = false;
  this.shootTimer = 0;
}

function Position(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

function Velocity(x, y) {
  this.dx = x || 0;
  this.dy = y || 0;
}

function Radius(r) {
  this.r = r || 0;
}

function Display(sprite) {
  this.sprite = sprite;
}

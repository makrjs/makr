var Ash = require('../lib/ash');
var shared = require('./shared');

var MovementNode, CollisionNode, RenderNode;

module.exports = {
  // Nodes
  MovementNode: MovementNode = Ash.Node.create({
    position: shared.Position,
    motion: shared.Motion
  }),
  CollisionNode: CollisionNode = Ash.Node.create({
    position: shared.Position,
    motion: shared.Motion,
    body: shared.Body
  }),
  RenderNode: RenderNode = Ash.Node.create({
    position: shared.Position,
    display: shared.Display
  }),
  // Systems
  MovementSystem: Ash.System.extend({
    constructor: function() { return this; },
    addToEngine: function(game) { this.nodeList = game.getNodeList(MovementNode); },
    updateNode: function(node) {},
    update: function() {
      for (var node = this.nodeList.head; node; node = node.next) {
        this.updateNode(node);
      }
    }
  }),
  CollisionSystem: Ash.System.extend({
    constructor: function() { return this; },
    addToEngine: function(game) { this.nodeList = game.getNodeList(CollisionNode); },
    updateNode: function(node) {},
    update: function() {
      for (var node = this.nodeList.head; node; node = node.next) {
        this.updateNode(node);
      }
    }
  }),
  RenderingSystem: Ash.System.extend({
    constructor: function() { return this; },
    addToEngine: function(game) { this.nodeList = game.getNodeList(RenderNode); },
    updateNode: function(node) {},
    update: function() {
      for (var node = this.nodeList.head; node; node = node.next) {
        this.updateNode(node);
      }
    }
  })
};

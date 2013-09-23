var ComponentRegister = (function() {
  var nextType = 0;
  var ctors = [];
  var types = [];

  return {
    register: function(ctor) {
      var i = ctors.indexOf(ctor);
      if (i < 0) {
        ctors.push(ctor);
        types.push(nextType++);
      }
    },
    get: function(ctor) {
      var i = ctors.indexOf(ctor);
      if (i < 0) {
        throw "Unknown type " + ctor;
      }

      return types[i];
    }
  };
})();

function inherits(ctor, superCtor, methods) {
  ctor.prototype = Object.create(superCtor.prototype);
  ctor.prototype.constructor = ctor;

  if (methods) {
    for (var p in methods) {
      if (methods.hasOwnProperty(p)) {
        ctor.prototype[p] = methods[p];
      }
    }
  }
}

function rand(min, max) {
  return min + Math.random() * (max - min + 1) | 0;
}

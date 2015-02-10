exports.arrayCreate = arrayCreate
exports.arrayExpand = arrayExpand
exports.arrayFill = arrayFill
exports.typedArrayExpand = typedArrayExpand

// Arrays
// ------

function arrayCreate(length, value) {
  return arrayFill(new Array(length), value, 0, length)
}

function arrayExpand(source, length, value) {
  return arrayFill(source, value, source.length, length)
}

function arrayFill(target, value, start, end) {
  for (var i = start; i < end; i++) {
    target[i] = value
  }

  return target
}

// Typed arrays
// ------------

function typedArrayExpand(source, length) {
  var SourceTypedArray = source.constructor
  var target = new SourceTypedArray(length)

  target.set(source)
  return target
}

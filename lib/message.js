var messages = {
  "too_many_components":  "Too many components declared (only {0} allowed)",
  "unknown_component":    "Unknown component type '{0}'",
  "invalid_entity":       "Invalid entity '{0}'",
  "illegal_entity":       "Illegal access to entity '{0}'",
  "realloc_performed":    "Reallocation performed to handle {0} entities"
}

function message(type) {
  return messages[type].replace(/{(\d+)}/g, function(i) {
    return arguments[i + 1]
  })
}

module.exports = message

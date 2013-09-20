/**
 * @module makr
 * @param {Object} config
 */
function makr(config) {
  if (config) {
    for (var p in config) {
      if (config.hasOwnProperty(p)) {
        makr[p] = config[p];
      }
    }
  }
}

// Install default config
makr.MAX_COMPONENTS = 32;
makr.MAX_SYSTEMS = 32;

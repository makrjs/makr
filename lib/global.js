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

module.exports = makr;

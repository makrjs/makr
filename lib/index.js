var makr = require('./global')

// Install default config
makr.MAX_COMPONENTS = 32;
makr.MAX_GROUPS = 32;
makr.MAX_SYSTEMS = 32;

// Register makr classes
makr.BitSet = require('./bit_set');
makr.FastBitSet = require('./fast_bit_set');
makr.IteratingSystem = require('./iterating_system');
makr.System = require('./system');
makr.World = require('./world');

module.exports = makr;

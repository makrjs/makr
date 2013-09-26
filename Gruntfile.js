module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-benchmark');
  grunt.loadNpmTasks('grunt-simple-mocha');

  var files = [
    'support/head.js',
    'src/makr.js',
    'src/makr/BitSet.js',
    'src/makr/FastBitSet.js',
    'src/makr/Entity.js',
    'src/makr/World.js',
    'src/makr/System.js',
    'src/makr/IteratingSystem.js',
    'support/export.js',
    'support/tail.js',
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        '-W014': true,
        '-W030': true,
      },
      makr: {
        src: ['Gruntfile.js', 'src/**/*.js'],
      },
      benchmarks: {
        src: ['benchmark/*.js', 'benchmark/fixtures/*.js'],
      },
      examples: {
        src: ['examples/balls/**/*.js', 'examples/invaders/**/*.js'],
      },
      tests: {
        src: ['test/**/*.js'],
      },
    },
    concat: {
      makr: {
        src: files,
        dest: 'dist/makr.js',
      },
    },
    uglify: {
      makr: {
        src: 'dist/makr.js',
        dest: 'dist/makr.min.js',
      },
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'src/',
          outdir: 'docs/',
        },
      },
    },
    simplemocha: {
      options: {
        reporter: 'spec',
        timeout: 5000,
      },
      all: {
        src: 'test/*.js',
      },
    },
    benchmark: {
      entities: {
        src: 'benchmark/entities-*.js',
        dest: 'dist/benchmark-entities.csv',
      },
      systems: {
        src: 'benchmark/systems-*.js',
        dest: 'dist/benchmark-systems.csv',
      },
    },
  });

  grunt.registerTask('default', ['jshint:makr', 'concat:makr', 'uglify:makr', 'jshint:examples']);
  grunt.registerTask('docs', ['concat:makr', 'yuidoc']);
  grunt.registerTask('test', ['concat:makr', 'jshint:examples', 'simplemocha:all']);
  grunt.registerTask('perf', ['concat:makr', 'jshint:benchmark', 'benchmark']);

};

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-mocha-test');

  var files = [
    'src/makr.js',
    'src/makr/BitSet.js',
    'src/makr/Entity.js',
    'src/makr/World.js',
    'src/makr/System.js',
    'src/makr/IteratingSystem.js',
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        '-W030': true,
      },
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'examples/**/*.js'],
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
    },
    concat: {
      dist: {
        src: files,
        dest: 'dist/makr.js',
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
    mochaTest: {
      dist: {
        options: {
          reporter: 'spec',
        },
        src: 'test/**/*.js',
      },
    },
  });

  grunt.registerTask('default', ['jshint', 'concat', 'mochaTest']);

};

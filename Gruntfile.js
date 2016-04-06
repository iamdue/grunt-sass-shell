/*
 * grunt-sass-shell
 * https://github.com/iamdue/grunt-sass-shell
 *
 * Copyright (c) 2016 Sagi Gyorgy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    sass_shell: {
      testWithoutMap: {
        options: {
          outputStyle: 'expanded',
          sourceMap: false
        },
        files: {
          'test/tmp/compile.css' : 'test/fixtures/test.scss',
          'test/tmp/compile2.css' : 'test/fixtures/test.scss'
        }
      },
      testWithMap: {
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        },
        files: {
          'test/tmp/source-map.css' : 'test/fixtures/test.scss',
          'test/tmp/source-map-simple.css' : 'test/fixtures/test.scss'
        }
      },
      testWithPrecision: {
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
          precision: 3
        },
        files: {
          'test/tmp/precision.css' : 'test/fixtures/precision.scss',
        }
      },
      testWithIncludePaths: {
        options: {
          outputStyle: 'nested',
          loadPath: 'test/fixtures/partials',
          sourceMap: false
        },
        files: {
          'test/tmp/include-paths.css' : 'test/fixtures/include-paths.scss'
        }
      }
    },

    //// Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sass_shell', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['sass_shell:dist']);

};

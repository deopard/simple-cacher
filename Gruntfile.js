// jshint esnext:true
// jshint node:true
'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    common: {

    },

    // https://github.com/karma-runner/grunt-karma
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },

      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      cacher: {
        files: { src: 'src/simple-cacher.js' }
      },
      spec: {
        files: { src: 'test/spec/simple-cacher.spec.js' }
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'dist/simple-cacher.js': 'src/simple-cacher.js'
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'dist/simple-cacher.min.js': ['dist/simple-cacher.js']
        },
        options: {
          sourceMap: true,
          sourceMapName: 'dist/simple-cacher.min.js.map'
        }
      }
    },

    jsdoc2md: {
      oneOutputFile: {
        src: 'src/*.js',
        dest: 'doc/documentation.md'
      },
    },

    clean: ['dist']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'babel', 'uglify', 'test', 'jsdoc2md']);

  grunt.registerTask('test', 'Run unit tests', ['jshint', 'karma:continuous']);
};

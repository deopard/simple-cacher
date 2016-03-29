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
        comments: false,
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
          'dist/simple-cacher.min.js': ['dist/simple-cacher.js'],
          'dist/array.shim.js': ['src/array.shim.js']
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

    shim: {
      dest: 'src/array.shim.js',
      modules: [
        'es6.array.filter',
        'es6.array.find',
        'es6.array.find-index',
        'es6.array.for-each',
        'es6.array.is-array'
      ]
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
  grunt.registerTask('default', ['clean', 'babel', 'shim', 'uglify', 'test', 'jsdoc2md']);

  grunt.registerTask('test', 'Run unit tests', ['jshint', 'karma:continuous']);

  grunt.registerTask('shim', 'Create shim file', function () {
    const fs = require('fs');
    let done = this.async();

    require('core-js-builder')({
      modules: grunt.config('shim.modules'),
      uglify: true
    })
    .then(code => {
      fs.writeFile(grunt.config('shim.dest'), code, err => {
        if (err) {
          grunt.log.writeln(err);
        }
        grunt.log.writeln('Shim file saved.');
        done();
      });
    });
  });
};

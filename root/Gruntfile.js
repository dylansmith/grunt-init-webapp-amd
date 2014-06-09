/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // auto-load grunt tasks & time execution
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /* see: https://www.npmjs.org/package/grunt-browserify */
    browserify: {
      options: {},
      dist: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/build.js'
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            '!dist/.git*',
            '!dist/index.html'
          ]
        }]
      }
    },

    concat: {
      options: {
        stripBanners: true
      },
      js: {
        files: {
          // core libs including the module loader
          'dist/js/lib/core.js': [
            'bower_components/curl/dist/curl-kitchen-sink/curl.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/handlebars/handlebars.runtime.js',
            'src/templates/compiled.js',
            'src/js/loader.js'
          ],
          'dist/js/app.js': [
            'src/js/app.js'
          ]
        }
      }
    },

    copy: {
      js_libs: {
        files: [
          // jquery source map support
          { expand: true, flatten: true, src: ['bower_components/jquery/dist/jquery.*.*'], dest: 'dist/js/lib/' }
        ]
      }
    },

    handlebars: {
      options: {
        amd: false,
        namespace: 'JST',
        processName: function(filePath) {
          return filePath.replace('src/templates/', '').replace(/\.hbs$/i, '');
        },
        processPartialName: function(filePath) {
          return filePath.replace('src/templates/', '').replace(/\.hbs$/i, '');
        }
      },
      templates: {
        files: {
          'src/templates/compiled.js': ['src/templates/**/*.hbs']
        }
      }
    },

    jshint: {
      options: { /* use .jshintrc instead */ },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/js/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },

    /* see: https://www.npmjs.org/package/grunt-mocha-istanbul */
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          mask: '*.spec.js',
          // reporters: dot, spec, nyan, tap, landing, list, progress
          reporter: 'spec'
        }
      }
    },

    uglify: {
      options: {
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src']
      },
      templates: {
        files: 'src/templates',
        tasks: ['handlebars:templates']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'test']
      }
    }

  });

  // tasks
  grunt.registerTask('test', [
    'mocha_istanbul:coverage'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'handlebars:templates',
    'concat',
    'copy'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

};

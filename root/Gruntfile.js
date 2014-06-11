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
    // browserify: {
    //   options: {},
    //   dist: {
    //     src: 'src/js/**/*.js',
    //     dest: 'dist/js/build.js'
    //   }
    // },

    /* see: https://github.com/gruntjs/grunt-contrib-clean */
    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'public/css/*',
            'public/js/*',
            '!.gitignore'
          ]
        }]
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-concat */
    concat: {
      options: {
        stripBanners: true
      },
      css: {
        files: {
          'public/css/app.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            '.tmp/css/app.css'
          ]
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-copy */
    copy: {
      // bootstrap resources
      bootstrap: {
        files: [
          { src: 'bower_components/bootstrap/dist/js/bootstrap.min.js', dest: 'public/lib/bootstrap', expand: true, flatten: true },
          { src: 'bower_components/bootstrap/dist/css/bootstrap.css.map', dest: 'public/lib/bootstrap', expand: true, flatten: true },
          { src: 'bower_components/bootstrap/dist/fonts/*.*', dest: 'public/lib/bootstrap/fonts', expand: true, flatten: true }
        ]
      },
      // jquery with source map support
      jquery: {
        files: [
          { src: ['bower_components/jquery/dist/jquery.*.*'], dest: 'public/lib/jquery', expand: true, flatten: true }
        ]
      },
      // requirejs runtime
      requirejs: {
        files: [
          { src: 'bower_components/requirejs/require.js', dest: 'public/lib', expand: true, flatten: true }
        ]
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-handlebars */
    handlebars: {
      options: {
        amd: true,
        namespace: 'App.templates',
        processName: function(filePath) {
          return filePath.replace('app/templates/', '').replace(/\.hbs$/i, '');
        },
        processPartialName: function(filePath) {
          return filePath.replace('app/templates/', '').replace(/\.hbs$/i, '');
        }
      },
      templates: {
        files: {
          '.tmp/templates.js': ['app/templates/**/*.hbs']
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-jshint */
    jshint: {
      options: { /* use .jshintrc instead */ },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: [
          'app/**/*.js',
          'config/**/*.js',
          '!app/templates/**/*.js',
          '!config/build.*.js'
        ]
      },
      test: {
        src: ['test/**/*.js']
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-less */
    less: {
      development: {
        options: {
          cleancss: true,       // Compress output using clean-css.
          compress: true,       // Compress output by removing some whitespaces
          paths: ['less/'],     // Specifies directories to scan for @import directives when parsing.
          relativeUrls: false,  // Rewrite urls to be relative.
          report: 'gzip',       // Report minification [min] or minification+gzip [gzip] results.
          rootpath: ''          // A path to add on to the start of every url resource.
        },
        files: {
          '.tmp/css/app.css': 'less/app.less'
        }
      },
    },

    /* see: https://www.npmjs.org/package/grunt-mocha-istanbul */
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          mask: '*.spec.js',
          reporter: 'spec'  // dot, spec, nyan, tap, landing, list, progress
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-requirejs */
    requirejs: {
      compile: {
        options: {
          baseUrl: 'app/',
          paths: {
              'backbone'  : '../bower_components/backbone/backbone',
              'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap.min',
              'handlebars': '../bower_components/handlebars/handlebars.runtime',
              'jquery'    : '../bower_components/jquery/dist/jquery',
              'lodash'    : '../bower_components/lodash/dist/lodash',
              'underscore': '../bower_components/lodash/dist/lodash',
              'templates' : '../.tmp/templates',
              'config'    : '../config/config'
          },
          shim: {
              'bootstrap' : [ 'jquery' ],
              'handlebars': { exports: 'Handlebars' },
              'jquery'    : { exports: '$' },
              'underscore': { exports: '_' }
          },
          name: '../bower_components/almond/almond',
          include: 'app',
          out: 'public/js/app.js',
          // extras
          preserveLicenseComments: false,
          uglify: {
            max_line_length: 1000
          }
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-uglify */
    uglify: {
      options: {
      },
      templates: {
        files: {
          '.tmp/templates.min.js': ['.tmp/templates.js']
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-watch */
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app']
      },
      less: {
        files: 'less/**/*.less',
        tasks: 'less:development'
      },
      templates: {
        files: 'app/templates/**/*.hbs',
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
    'clean:build',
    'handlebars',
    'less',
    'requirejs',
    'copy',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

};
